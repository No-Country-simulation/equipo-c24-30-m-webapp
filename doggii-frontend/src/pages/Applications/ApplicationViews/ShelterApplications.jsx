import axios from 'axios';
import HorizontalCard from '../../../components/Cards/HorizontalCard';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';

const ShelterApplications = () => {
    const [visibleItems, setVisibleItems] = useState(6);
  const [petsData, setPetsData] = useState([]);
  const [applications, setApplications] = useState(petsData.slice(0, visibleItems));
  const [adoptionRequest, setAdoptionRequest] = useState(true);
  const navigate = useNavigate();

   const { id: shelterId } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAdoptionRequestsAndPets = async () => {
      const token = localStorage.getItem('accessToken');
      const adoptionRequestsEndpoint =  import.meta.env.VITE_BACKEND_URI +
        `/api/adoptionRequest/filter?shelter=${shelterId}`;
      
      if (!token) return;

      try {
        // Validar si el token ha expirado
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('accessToken');
          delete axios.defaults.headers.common['Authorization'];
          return;
        }
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Obtener las solicitudes de adopción para el refugio
        const response = await axios.get(adoptionRequestsEndpoint);
        console.log('Respuesta del backend (solicitudes de adopción para refugio):', response);
        
        // Validar que la respuesta contenga datos y que el array de solicitudes no esté vacío
       if (response.data && Array.isArray(response.data.payload) && response.data.payload.length > 0) {
          const adoptionRequests = response.data.payload;
          
          // Para cada solicitud, obtener la información completa de la mascota
          const petDetailsPromises = adoptionRequests.map(async (request) => {
            const petEndpoint = import.meta.env.VITE_BACKEND_URI + '/api/pet/' + request.pet;
            const petResponse = await axios.get(petEndpoint);
             // Crear un nuevo objeto que combine la información de la mascota con el status de la solicitud
            const newPetDetail = {
              ...petResponse.data,
              payload: {
                ...petResponse.data.payload,
                status: request.status
              }
            };

            return newPetDetail;
          });
          
          // Ejecutar todas las peticiones de forma concurrente
          const combinedPetsDetails = await Promise.all(petDetailsPromises);
          console.log('Detalles combinados de las mascotas (refugio):', combinedPetsDetails);

          
          // Guardar los datos para renderizarlos
           setPetsData(combinedPetsDetails);
          setApplications(combinedPetsDetails.slice(0, visibleItems));
        } else {
          setAdoptionRequest(false);
          console.warn('No se encontraron solicitudes de adopción.');
        }
      } catch (error) {
        setAdoptionRequest(false);
        console.error('Error al obtener solicitudes de adopción o detalles de mascotas:', error);
      }
    };

    fetchAdoptionRequestsAndPets();
    
  }, [shelterId, visibleItems]);

  console.log('Pets data:', petsData);

   const handleSeeMore = () => {
    const newVisibleItems = visibleItems + 6;
    setVisibleItems(newVisibleItems);
    setApplications(petsData.slice(0, newVisibleItems));
  };

  const handleGoToApplicationDetails = (id) => {
    const petData = petsData.find((pet) => pet.payload.id === id);
    navigate(`/adoption-request/${id}`, { state: { petData } });
  };
  const handleTranslateStatus = (status) => {
    switch (status) {
      case 'Pending':
        return 'Pendiente';
      case 'Approved':
        return 'Aprobado';
      case 'Rejected':
        return 'Rechazado';
      default:
        return 'Cancelado';
    }
  }
  return (
    <div className='pl-8 pr-8'>
      <p>Consultá todas las solicitudes de adopción que recibiste y gestionalas.</p>
      {adoptionRequest ? 
            <div>
              <div className='flex flex-wrap justify-center gap-6 pt-8'>
                {petsData.map((petData, index) => (
                          <HorizontalCard
                            key={index}
                            id={petData.payload.id} 
                            subtitle='Estado' 
                            text={handleTranslateStatus(petData.payload.status)} 
                            image={petData.payload.photos} title={petData.payload.name} 
                            description={`Refugio: ${petData.payload.shelter.shelterName}`} 
                            onSee={() => handleGoToApplicationDetails(petData.payload.id)}
                            isShelter={true}
                          />
                  ))}
              </div>
              {visibleItems < applications.length && (
                <Button
                  className='m-auto mt-8 text-xl'
                  onClick={handleSeeMore}
                >
                  Ver más
                </Button>
              )}
            </div> : <p className='flex justify-center mt-10'>No hay solicitudes de adopción.</p>}
    </div>
  )
}

export default ShelterApplications;
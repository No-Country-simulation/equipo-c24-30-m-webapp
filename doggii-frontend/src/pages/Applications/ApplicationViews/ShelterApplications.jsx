import axios from 'axios';
import HorizontalCard from '../../../components/Cards/HorizontalCard';
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
  const idShelter = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchAdoptionRequestsAndPets = async () => {
      const adoptionRequestsEndpoint =  import.meta.env.VITE_BACKEND_URI +
        "/api/adoptionRequest/filter?shelter=" + idShelter;
      
      try {
        // Obtener las solicitudes de adopción del refugio
        const response = await axios.get(adoptionRequestsEndpoint);
        console.log('Respuesta del backend (solicitudes de adopción para refugio):', response);
        
        // Validar que la respuesta contenga datos y que el array de solicitudes no esté vacío
       if (response.data && Array.isArray(response.data.payload) && response.data.payload.length > 0) {
          const adoptionRequests = response.data.payload;
          
          // Para cada solicitud, obtener la información completa de la mascota
          const petDetailsPromises = adoptionRequests.map(async (request) => {
            const petEndpoint = import.meta.env.VITE_BACKEND_URI + '/api/pet/' + request.pet;
            const petResponse = await axios.get(petEndpoint);
              // Crear un nuevo objeto combinando la info de la mascota con el status y adopter de la solicitud
            const newPetDetail = {
              ...petResponse.data,
              _id: request._id,
              payload: {
                ...petResponse.data.payload,
                status: request.status,      // Se reemplaza el status del pet por el status de la solicitud
                adopter: request.adopter     // Se reemplaza el adopter del pet por el adopter de la solicitud
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
    
  }, [idShelter, visibleItems]);

  console.log('Pets data:', petsData);

   const handleSeeMore = () => {
    const newVisibleItems = visibleItems + 6;
    setVisibleItems(newVisibleItems);
    setApplications(petsData.slice(0, newVisibleItems));
  };

  const handleGoToApplicationDetails = (petId, requestId) => {
    const petData = petsData.find((pet) => pet.payload.id === petId);
    navigate(`/application-manage/${requestId}`, { state: { petData } });
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
                            subtitle1='Estado' 
                            text1={handleTranslateStatus(petData.payload.status)} 
                            image={petData.payload.photos} title={petData.payload.name} 
                            subtitle2={`Solicitante:`}
                            text2={petData.payload.adopter.name} 
                            onSee={() => handleGoToApplicationDetails(petData.payload.id, petData._id)}
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
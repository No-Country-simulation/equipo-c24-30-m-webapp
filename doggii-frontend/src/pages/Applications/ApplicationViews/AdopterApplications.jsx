import { useState, useEffect } from 'react';
import HorizontalCard from '../../../components/Cards/HorizontalCard'
import applicationsDataMock from '../../../test/applicationsDataMock.json'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const AdopterApplications = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [applications, setApplications] = useState(applicationsDataMock.slice(0, visibleItems));
  const [petsData, setPetsData] = useState([]);
  const [adoptionRequest, setAdoptionRequest] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdoptionRequestsAndPets = async () => {
      const token = localStorage.getItem('accessToken');
      const adoptionRequestsEndpoint = import.meta.env.VITE_BACKEND_URI + "/api/adoptionRequest/";
      
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
        
        // Obtener las solicitudes de adopción
        const response = await axios.get(adoptionRequestsEndpoint);
        console.log('Respuesta del backend (solicitudes de adopción):', response);
        
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
                status: request.status // Se reemplaza el status del pet por el status de la solicitud
              }
            };
            return newPetDetail;
          });
          
          // Ejecutar todas las peticiones de forma concurrente
          const combinedPetsDetails = await Promise.all(petDetailsPromises);
          console.log('Detalles combinados de las mascotas:', combinedPetsDetails);
          
          // Guardar los datos para renderizarlos
          setPetsData(combinedPetsDetails);
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
    
  }, []);
  console.log('Pets data:', petsData);

  const handleSeeMore = () => {
    const newVisibleItems = visibleItems + 6;
    setVisibleItems(newVisibleItems);
    setApplications(applicationsDataMock.slice(0, newVisibleItems));
  }

    const handleGoToApplicationDetails = (id) => {
    navigate(`/adoption-request/${id}`);
  }

  return (
    <div className='pl-8 pr-8'>
      <p>Consultá todas las solicitudes de adopción que iniciaste y sus estados.</p>
      {adoptionRequest ? 
      <div>
        <div className='flex flex-wrap justify-center gap-6 pt-8'>
          {applications.map((application, index) => (
                    <HorizontalCard key={index} id={application.id} subtitle='Estado' text={application.status} image={application.photo} title={application.petName} description={`Refugio: ${application.shelterName}`} onSee={() => handleGoToApplicationDetails(application.id)}/>
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

export default AdopterApplications;
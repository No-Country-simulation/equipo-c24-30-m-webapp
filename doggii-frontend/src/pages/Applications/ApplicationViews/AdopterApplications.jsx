import { useState, useEffect } from 'react';
import HorizontalCard from '../../../components/Cards/HorizontalCard';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdopterApplications = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [adoptionRequestsData, setAdoptionRequestsData] = useState([]);
  const [applications, setApplications] = useState([]);
  const [adoptionRequestExists, setAdoptionRequestExists] = useState(true);
  const navigate = useNavigate();
  const idAdopter = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchAdoptionRequestsAndPets = async () => {
      const adoptionRequestsEndpoint = import.meta.env.VITE_BACKEND_URI + "/api/adoptionRequest/filter?adopter=" + idAdopter;
      
      try {
        // Obtener las solicitudes de adopción del adoptante
        const response = await axios.get(adoptionRequestsEndpoint);
        console.log('Respuesta del backend (solicitudes de adopción):', response);
        
        if (response.data && Array.isArray(response.data.payload) && response.data.payload.length > 0) {
          const adoptionRequests = response.data.payload;
          
          // Para cada solicitud, obtener la información completa de la mascota
          const adoptionRequestsWithPetDetailsPromises = adoptionRequests.map(async (request) => {
            const petEndpoint = import.meta.env.VITE_BACKEND_URI + '/api/pet/' + request.pet;
            const petResponse = await axios.get(petEndpoint);
            // Se crea un nuevo objeto con la misma estructura de la solicitud, reemplazando "pet" con la info completa de la mascota
            return {
              ...request,
              pet: petResponse.data.payload
            };
          });
          
          const combinedAdoptionRequests = await Promise.all(adoptionRequestsWithPetDetailsPromises);
          console.log('Solicitudes combinadas con detalle de mascota:', combinedAdoptionRequests);
          
          setAdoptionRequestsData(combinedAdoptionRequests);
          setApplications(combinedAdoptionRequests.slice(0, visibleItems));
        } else {
          setAdoptionRequestExists(false);
          console.warn('No se encontraron solicitudes de adopción.');
        }
      } catch (error) {
        setAdoptionRequestExists(false);
        console.error('Error al obtener solicitudes de adopción o detalles de mascotas:', error);
      }
    };

    fetchAdoptionRequestsAndPets();
    
  }, [idAdopter, visibleItems]);
  console.log('Adoption requests data:', adoptionRequestsData);

  const handleSeeMore = () => {
    const newVisibleItems = visibleItems + 6;
    setVisibleItems(newVisibleItems);
    setApplications(adoptionRequestsData.slice(0, newVisibleItems));
  };

   const handleGoToApplicationDetails = (requestId, petId) => {
    const requestData = adoptionRequestsData.find(request => request.pet.id === petId);
    navigate(`/adoption-request/${requestId}`, { state: { petData: requestData } });
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
  };

  return (
    <div className='pl-8 pr-8'>
      <p>Consultá todas las solicitudes de adopción que iniciaste y sus estados.</p>
      {adoptionRequestExists ? 
      <div>
        <div className='flex flex-wrap justify-center gap-6 pt-8'>
          {applications.map((request, index) => (
            <HorizontalCard 
              key={index} 
              id={request.pet.id} 
              subtitle1='Estado' 
              text1={handleTranslateStatus(request.status)} 
              subtitle2='Refugio' 
              text2={request.pet.shelter.shelterName} 
              image={request.pet.photos} 
              title={request.pet.name} 
              onSee={() => handleGoToApplicationDetails(request._id, request.pet.id)}
            />
          ))}
        </div>
        {visibleItems < adoptionRequestsData.length && (
          <Button
            className='m-auto mt-8 text-xl'
            onClick={handleSeeMore}
          >
            Ver más
          </Button>
        )}
      </div> : <p className='flex justify-center mt-10'>No hay solicitudes de adopción.</p>}
      
    </div>
  );
};

export default AdopterApplications;

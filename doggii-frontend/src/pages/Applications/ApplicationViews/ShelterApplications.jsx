import axios from 'axios';
import HorizontalCard from '../../../components/Cards/HorizontalCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';

const ShelterApplications = () => {
  const [visibleItems, setVisibleItems] = useState(4);
  const [petsData, setPetsData] = useState([]);
  const navigate = useNavigate();
  const idShelter = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchAdoptionRequestsAndPets = async () => {
      const adoptionRequestsEndpoint = `${import.meta.env.VITE_BACKEND_URI}/api/adoptionRequest/filter?shelter=${idShelter}`;
      
      try {
        const response = await axios.get(adoptionRequestsEndpoint);
        console.log('Respuesta del backend (solicitudes de adopción para refugio):', response);

        if (
          response.data &&
          Array.isArray(response.data.payload) &&
          response.data.payload.length > 0
        ) {
          const adoptionRequests = response.data.payload;
          
          // Por cada solicitud se obtiene la información de la mascota y del adoptante,
          // reemplazando los valores originales pero manteniendo la estructura.
          const combinedRequests = await Promise.all(
            adoptionRequests.map(async (request) => {
              // Obtener información de la mascota
              const petEndpoint = `${import.meta.env.VITE_BACKEND_URI}/api/pet/${request.pet}`;
              const petResponse = await axios.get(petEndpoint);
              
              // Obtener información del adoptante
              const adopterEndpoint = `${import.meta.env.VITE_BACKEND_URI}/api/adopter/${request.adopter}`;
              const adopterResponse = await axios.get(adopterEndpoint);
              
              // Se devuelve un objeto que mantiene la estructura original,
              // reemplazando los valores de "pet" y "adopter" con las respuestas correspondientes.
              return {
                _id: request._id,
                adopter: adopterResponse.data.payload,
                pet: petResponse.data.payload,
                shelter: request.shelter,
                status: request.status,
                formAnswers: request.formAnswers
              };
            })
          );

          console.log('Datos combinados:', combinedRequests);
          setPetsData(combinedRequests);
        } else {
          console.warn('No se encontraron solicitudes de adopción.');
        }
      } catch (error) {
        console.error('Error al obtener solicitudes o detalles:', error);
      }
    };

    fetchAdoptionRequestsAndPets();
  }, [idShelter]);

  // Se calcula el subconjunto de datos a renderizar en función de visibleItems
  const applications = petsData.slice(0, visibleItems);

  const handleSeeMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  // Se pasa el objeto completo de la solicitud y se utiliza su _id en la ruta
  const handleGoToApplicationDetails = (application) => {
    navigate(`/application-manage/${application._id}`, { state: { application } });
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
    <div className='px-8'>
      <p className='text-lg'>Consultá todas las solicitudes de adopción que recibiste y gestionalas.</p>
      {petsData.length > 0 ? (
        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 py-8'>
            {applications.map((data, index) => (
              <HorizontalCard
                key={index}
                // Se utiliza la información del objeto actualizado:
                // Para el id, nombre, foto de la mascota y el adoptante.
                id={data.pet.id}
                subtitle1='Estado'
                text1={handleTranslateStatus(data.status)}
                image={data.pet.photos}
                title={data.pet.name}
                subtitle2='Solicitante'
                text2={data.adopter.userName}
                onSee={() => handleGoToApplicationDetails(data)}
                isShelter={true}
              />
            ))}
          {visibleItems < petsData.length && (
            <Button className='col-span-full mx-auto mt-4 text-lg' onClick={handleSeeMore}>
              Ver más
            </Button>
          )}
        </div>
      ) : (
        <p className='flex justify-center mt-8 text-lg'>No hay solicitudes de adopción.</p>
      )}
    </div>
  );
};

export default ShelterApplications;

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import applicationServices from '../../../services/applicationServices';
import petServices from '../../../services/petServices';
import userServices from '../../../services/userServices';
import HorizontalCard from '../../../components/Cards/HorizontalCard';
import Button from '../../../components/Button';

const ShelterDashboard = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = useCallback(async () => {    
    try {
      setFetchError(null);
      setIsLoading(true);

      const response = await applicationServices.getApplicationsByShelter(user.id);
      const pendingApplications = response.payload.filter(application => application.status === "Pending");

      const petsAndAdoptersData = await Promise.all(
        pendingApplications.map(async (app) => {
          const [petResponse, adopterResponse] = await Promise.all([
            petServices.getPet(app.pet),
            userServices.getUser(app.adopter, 'adopter')
          ]);
          return {
            id: app._id,
            pet: petResponse.payload,
            adopter: adopterResponse.payload
          };
        })
      );

      setApplications(petsAndAdoptersData);
    } catch (error) {
      if (error.status === 404) {
        console.error('No data found:', error);
        setFetchError(null);
        setApplications([]);
        return;
      } else {
        console.error('Error fetching data:', error);
        setFetchError('No pudimos cargar las solicitudes. Tocá el botón para intentar de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  const handleGoToApplicationsSection = () => {
    navigate('/applications');
  }

  const handleGoToApplicationDetails = (id) => {
    navigate(`/application-manage/${id}`);
  };

  return (
    <div className='px-8 pb-8'>
      <p className='text-lg'>En esta sección, podés ver un resumen de la información importante de tu cuenta.</p>
      <h2 className='text-3xl text-center mt-6'>Solicitudes de adopción pendientes</h2>
      {isLoading ? (
        <div className='flex items-center justify-center h-150'>
          <div className='animate-spin rounded-full h-30 w-30 my-auto border-b-8 border-(--secondary)'></div>
        </div>
      ) : fetchError ? (
        <>
          <div className="flex items-center justify-center max-w-3xl p-6 space-x-4 mx-auto my-8 rounded-md bg-red-100">
            <div className="flex items-center self-stretch justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span className='text-lg'>{fetchError}</span>
          </div>
          <Button 
            onClick={getApplications}
            className="mx-auto"
          >
            Reintentar
          </Button>
        </>
      ) : (
        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 py-8'>
          {applications.length === 0 ? (
            <div className='col-span-full flex flex-col items-center justify-center h-120 gap-6'>
              <img src="/src/assets/images/hound.png" alt="Sin contenido" />
              <p className="text-gray-500 text-xl text-center">No hay ninguna solicitud de adopción pendiente.</p>
              <Button
                onClick={handleGoToApplicationsSection}
              >
                Ver todas las solicitudes
              </Button>
            </div>
          ) : (
            <>
              {applications.map((application, index) => (
                <HorizontalCard 
                  key={index}
                  image={application.pet.photos[0]} 
                  title={application.pet.name} 
                  subtitle1='Estado' 
                  text1='Pendiente'
                  subtitle2='Solicitante' 
                  text2={application.adopter.userName}
                  onSee={() => handleGoToApplicationDetails(application.id)}
                />
              ))}
              <Button
                onClick={handleGoToApplicationsSection}
                className='col-span-full mx-auto mt-4 text-lg'
              >
                Ver todas
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ShelterDashboard;
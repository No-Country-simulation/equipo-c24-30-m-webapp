import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import petServices from '../../../services/petServices';
import VerticalCard from '../../../components/Cards/VerticalCard';
import Button from '../../../components/Button';

const AdopterDashboard = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState(user.address.city);

  const fetchPetsByCity = useCallback(async (city) => {
    if (!city.trim()) return;
    
    try {
      setFetchError(null);
      setIsLoading(true);
      const response = await petServices.getPetsByCity(city);
      const availablePets = response.payload.filter(pet => pet.available);
      setPets(availablePets.slice(0, 3));
      setCurrentCity(city);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setFetchError('No pudimos cargar las mascotas. Tocá el botón para intentar de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPetsByCity(currentCity);
  }, [fetchPetsByCity, currentCity]);

  const handleGoToPetsSection = () => {
    navigate('/pets');
  } 

  const handleGoToPetDetails = (id) => {
    navigate(`/pet/${id}`);
  }

  return (
    <div className="pl-8 pr-8 pb-8">
      <p>En esta sección, podés ver un resumen de la información importante de tu cuenta.</p>
      <h2 className='text-3xl text-center mt-6'>Estas mascotas buscan hogar en {currentCity}</h2>
      {isLoading ? (
        <div className='flex items-center justify-center h-150'>
          <div className='animate-spin rounded-full h-30 w-30 my-auto border-b-8 border-(--secondary)'></div>
        </div>
      ) : fetchError ? (
        <>
          <div className="flex items-center justify-center max-w-3xl p-6 space-x-4 mx-auto my-10 rounded-md bg-red-100">
            <div className="flex items-center self-stretch justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span className='text-lg'>{fetchError}</span>
          </div>
          <Button 
            onClick={() => fetchPetsByCity(currentCity)}
            className="mx-auto w-50 text-lg"
          >
            Reintentar
          </Button>
        </>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-8'>
          {pets.length === 0 ? (
            <div className='col-span-full flex flex-col items-center justify-center h-120 gap-6'>
              <img src="/src/assets/images/hound.png" alt="Sin contenido" />
              <p className="text-gray-500 text-2xl text-center">No hay ninguna mascota en adopción en tu ciudad.</p>
              <Button
                onClick={handleGoToPetsSection}
                className='text-xl w-65'
              >
                Buscar en otra ciudad
              </Button>
            </div>
          ) : (
            <>
              {pets.map((pet) => (
                <VerticalCard
                  key={pet.id}
                  image={pet.photos[0]}
                  title={pet.name}
                  description={`Refugio: ${pet.shelter.shelterName}`} 
                  onSee={() => handleGoToPetDetails(pet.id)}
                />
              ))}
              <Button
                onClick={handleGoToPetsSection}
                className='col-span-full mx-auto w-50 mt-8 text-xl'
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

export default AdopterDashboard;
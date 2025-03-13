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
  const [currentCity, setCurrentCity] = useState("");

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

  const fetchAllPets = useCallback(async () => {
    try {
      setFetchError(null);
      setIsLoading(true);
      const response = await petServices.getPets();
      const availablePets = response.payload.filter(pet => pet.available);
      const randomPets = availablePets.sort(() => 0.5 - Math.random()).slice(0, 3);
      setPets(randomPets);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setFetchError('No pudimos cargar las mascotas. Tocá el botón para intentar de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user.address?.city) {
      fetchPetsByCity(user.address.city);
    } else {
      fetchAllPets();
    }
  }, [fetchPetsByCity, fetchAllPets, user.address?.city]);

  const handleGoToPetsSection = () => {
    navigate('/pets');
  } 

  const handleGoToPetDetails = (id) => {
    navigate(`/pet/${id}`);
  }

  const handleGoToProfile = () => {
    navigate('/profile');
  }

  return (
    <div className="px-8 pb-8">
      <p className='text-lg'>En esta sección, podés ver un resumen de la información importante de tu cuenta.</p>
      <h2 className='text-3xl text-center mt-6'>
        {currentCity ? `Estas mascotas buscan hogar en ${currentCity}` : 'Estas mascotas buscan hogar'}
      </h2>
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
            onClick={user.address?.city ? () => fetchPetsByCity(currentCity) : fetchAllPets}
            className="mx-auto"
          >
            Reintentar
          </Button>
        </>
      ) : (
        <>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-8'>
            {pets.length === 0 ? (
              <div className='col-span-full flex flex-col items-center justify-center h-120 gap-6'>
                <img src="/src/assets/images/hound.png" alt="Sin contenido" />
                <p className="text-gray-500 text-xl text-center">No hay ninguna mascota en adopción{currentCity ? ' en tu ciudad' : ''}.</p>
                <Button
                  onClick={handleGoToPetsSection}
                >
                  {currentCity ? 'Buscar en otra ciudad' : 'Buscar por ciudad'}
                </Button>
              </div>
            ) : (
              <>
                {pets.map((pet) => (
                  <VerticalCard
                    key={pet.id}
                    image={pet.photos?.[0] || "/src/assets/images/pet-not-available.png"}
                    title={pet.name}
                    description={`Refugio: ${pet.shelter.shelterName}`} 
                    onSee={() => handleGoToPetDetails(pet.id)}
                  />
                ))}
                <Button
                  onClick={handleGoToPetsSection}
                  className='col-span-full mx-auto mt-4 text-lg'
                >
                  Ver todas
                </Button>
              </>
            )}
          </div>
          {!user.address?.city && (
            <div className='flex flex-col items-center justify-center gap-6 mt-6'>
              <p className="text-lg text-center text-gray-800">Completá tu perfil para que te mostremos las mascotas que están en adopción en tu ciudad.</p>
              <Button
                onClick={handleGoToProfile}
                className="mx-auto btn-secondary"
              >
                Completar perfil
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdopterDashboard;
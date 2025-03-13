import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import petServices from '../../../services/petServices';
import VerticalCard from '../../../components/Cards/VerticalCard';
import Button from '../../../components/Button';

const AdopterPets = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePets, setVisiblePets] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const [inputCity, setInputCity] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  const fetchPetsByCity = useCallback(async (city) => {
    if (!city.trim()) return;
    
    try {
      setFetchError(null);
      setIsLoading(true);
      const response = await petServices.getPetsByCity(city);
      const availablePets = response.payload.filter(pet => pet.available);
      setPets(availablePets);
      setVisiblePets(availablePets.slice(0, 6));
      setCurrentCity(city);
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
      setIsLoading(false);
    }
  }, [fetchPetsByCity, user.address?.city]);

  const handleSearch = () => {
    fetchPetsByCity(inputCity);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSeeMore = () => {
    const newVisibleItems = visibleItems + 6;
    setVisibleItems(newVisibleItems);
    setVisiblePets(pets.slice(0, newVisibleItems));
  };

  const handleGoToPetDetails = (id) => {
    navigate(`/pet/${id}`);
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  }

  return (
    <div className='px-8'>
      <p className='text-lg'>En esta sección, podés ver las mascotas que están en adopción.</p>
      <div className='flex items-center justify-start mt-4'>
        <input
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyPress={handleKeyPress}
          type='text'
          placeholder='🔍  Ciudad'
          className='w-60 px-3 py-2 rounded-md focus:outline-none focus:border-(--secondary-dark) border-2 border-(--secondary) font-light'
        />
        <Button
          onClick={handleSearch}
          className='ml-4'
        >
          Buscar
        </Button>
      </div>
      {!currentCity ? (
        <div className='col-span-full flex flex-col items-center justify-center h-120 gap-6 mt-16'>
          <div className='col-span-full flex flex-col items-center justify-center h-120 gap-6'>
            <img src="/src/assets/images/hound.png" alt="Sin contenido" />
            <p className="text-gray-500 text-xl text-center px-20">Cómo no tenemos tu dirección, no te podemos mostrar las mascotas que están en adopción en tu ciudad. Completá tu perfil para que se muestren de forma automática o usá el buscador que se encuentra arriba para hacerlo manualmente.</p>
            <Button
              onClick={handleGoToProfile}
            >
              Completar perfil
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h2 className='text-3xl text-center mt-6'>Mascotas en adopción en {currentCity}</h2>
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
                onClick={() => fetchPetsByCity(currentCity)}
                className="mx-auto"
              >
                Reintentar
              </Button>
            </>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
              {pets.length === 0 ? (
                <div className='col-span-full flex flex-col items-center justify-center h-120 gap-6 mt-8'>
                  <img src="/src/assets/images/hound.png" alt="Sin contenido" />
                  <div>
                    <p className="text-gray-500 text-xl text-center">No hay ninguna mascota en adopción en esta ciudad.</p>
                    <p className="text-gray-500 text-xl text-center">Probá buscar en otra ciudad.</p>
                  </div>
                  {user.address?.city !== currentCity && user.address?.city && (
                    <Button
                      onClick={() => fetchPetsByCity(user.address.city)}
                    >
                      Buscar en tu ciudad
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  {visiblePets.map((pet) => (
                    <VerticalCard
                      key={pet.id}
                      image={pet.photos[0] || "/src/assets/images/pet-not-available.png"}
                      title={pet.name}
                      description={`Refugio: ${pet.shelter.shelterName}`} 
                      onSee={() => handleGoToPetDetails(pet.id)}
                    />
                  ))}
                  {visibleItems < pets.length && (
                    <Button
                      className='col-span-full mx-auto mt-4 text-lg'
                      onClick={handleSeeMore}
                    >
                      Ver más
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdopterPets;
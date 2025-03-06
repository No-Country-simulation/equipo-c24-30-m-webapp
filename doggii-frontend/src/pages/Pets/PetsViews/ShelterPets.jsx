import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VerticalCard from '../../../components/Cards/VerticalCard';
import Button from '../../../components/Button';
import petServices from '../../../services/petServices';

const ShelterPets = () => {
  const shelterId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetPets = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await petServices.getPetsByShelter(shelterId);
      setPets(response.payload);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setError('No pudimos cargar tus mascotas. Tocá el botón para intentar de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [shelterId]);

  useEffect(() => {
    handleGetPets();
  }, [handleGetPets]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  const handleGoToPetDetails = (id) => {
    navigate(`/pet/${id}`);
  }

  const handleGoToPetPost = () => {
    navigate('/pets/post');
  }

  return (
    <div className='pl-8 pr-8'>
      <div className='flex justify-between items-center'>
        <p>Estas son las mascotas que publicaste para dar en adopción.</p>
        <Button
          onClick={handleGoToPetPost}
          className='w-50'
        >
          Nueva publicación
        </Button>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center h-150'>
          <div className='animate-spin rounded-full h-30 w-30 my-auto border-b-8 border-(--secondary)'></div>
        </div>
      ) : (
      error ? (
        <>
        <div className="flex items-center justify-center max-w-3xl p-6 space-x-4 mx-auto my-10 rounded-md bg-red-100">
          <div className="flex items-center self-stretch justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
          </div>
          <span className='text-lg'>{error}</span>
        </div>
        <Button 
          onClick={handleGetPets}
          className="mx-auto w-50 text-lg"
        >
          Reintentar
        </Button>
        </>
      ) : (
        <div className='flex flex-wrap justify-center gap-6 py-8'>
          {pets.length === 0 ? (
            <div>
              <img src="/src/assets/images/hound.png" alt="Sin contenido" />
              <p className="text-gray-500 text-2xl text-center">Todavía no publicaste ninguna mascota.</p>
            </div>
          ) : (
            pets.map((pet, index) => (
              <VerticalCard 
                key={index} 
                id={pet.id} 
                image={pet.photos[0]} 
                title={pet.name} 
                description={`Última actualización: ${formatDate(pet.updatedAt)}`} 
                isPaused={!pet.available} 
                onSee={() => handleGoToPetDetails(pet.id)}
              />
            ))
          )}
        </div>
      ))}
    </div>
  )
}

export default ShelterPets;
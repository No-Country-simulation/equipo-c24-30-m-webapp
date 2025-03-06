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

  const handleGetPets = useCallback(async () => {
    try {
      const response = await petServices.getPetsByShelter(shelterId);
      setPets(response.payload);
      console.log(response.payload);
    } catch (error) {
      console.error('Error fetching pets:', error);
      // TODO: Add proper error handling
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
      <div className='flex flex-wrap justify-center gap-6 py-8'>
        {pets.map((pet, index) => (
          <VerticalCard 
            key={index} 
            id={pet.id} 
            image={pet.photos[0]} 
            title={pet.name} 
            description={`Última actualización: ${formatDate(pet.updatedAt)}`} 
            isPaused={!pet.available} 
            onSee={() => handleGoToPetDetails(pet.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ShelterPets;
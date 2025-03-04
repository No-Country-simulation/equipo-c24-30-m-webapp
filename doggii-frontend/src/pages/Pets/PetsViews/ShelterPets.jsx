import { useNavigate } from 'react-router-dom';
import VerticalCard from '../../../components/Cards/VerticalCard';
import Button from '../../../components/Button';
import petDataMock from '../../../test/petsDataMock.json';

const ShelterPets = () => {
  const navigate = useNavigate();
  const pets = petDataMock.filter((pet) => pet.shelterId === '0001');

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

  return (
    <div className='pl-8 pr-8'>
      <div className='flex justify-between items-center'>
        <p>Estas son las mascotas que publicaste para dar en adopción.</p>
        <Button className='w-50'>
          Nueva publicación
        </Button>
      </div>
      <div className='flex flex-wrap justify-center gap-6 py-8'>
        {pets.map((pet, index) => (
          <VerticalCard key={index} id={pet.id} image={pet.photo} title={pet.name} description={`Última actualización: ${formatDate(pet.updatedAt)}`} isPaused={!pet.available} onSee={() => handleGoToPetDetails(pet.id)}/>
        ))}
      </div>
    </div>
  )
}

export default ShelterPets;
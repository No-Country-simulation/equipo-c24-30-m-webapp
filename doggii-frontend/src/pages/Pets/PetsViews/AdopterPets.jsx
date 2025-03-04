import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalCard from '../../../components/Cards/VerticalCard';
import Button from '../../../components/Button';
import petDataMock from '../../../test/petsDataMock.json';

const AdopterPets = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [pets, setPets] = useState(petDataMock.slice(0, visibleItems));
  const navigate = useNavigate();

  const handleSeeMore = () => {
    const newVisibleItems = visibleItems + 6;
    setVisibleItems(newVisibleItems);
    setPets(petDataMock.slice(0, newVisibleItems));
  }

  const handleGoToPetDetails = (id) => {
    navigate(`/pet/${id}`);
  }

  return (
    <div className='pl-8 pr-8 pb-8'>
      <p>En esta sección, podés ver las mascotas que están en adopción.</p>
      <input id='search-location' type='text' placeholder='🔍  Ciudad' className='w-60 h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 mt-6 text-lg focus:dark:ring-violet-600 dark:border-gray-300'/>
      <div className='flex flex-wrap justify-center gap-6 pt-8'>
        {pets.map((pet, index) => (
          <VerticalCard key={index} id={pet.id} image={pet.photo} title={pet.name} description={`Refugio: ${pet.shelterName}`} onSee={() => handleGoToPetDetails(pet.id)}/>
        ))}
      </div>
      {visibleItems < petDataMock.length && (
        <Button
          className='m-auto my-8 text-xl'
          onClick={handleSeeMore}
        >
          Ver más
        </Button>
      )}
    </div>
  )
}

export default AdopterPets;
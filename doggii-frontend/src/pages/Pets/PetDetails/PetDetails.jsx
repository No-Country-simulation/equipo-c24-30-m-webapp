import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import petDataMock from '../../../test/petsDataMock.json';

const PetDetails = () => {
  const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  const petId = useParams().id;
  const pet = petDataMock.find((pet) => pet.id === petId);
  const age = pet.age.years > 0 ? `${pet.age.years} años` : 
              (pet.age.months > 0 ? `${pet.age.months} meses` :
              (pet.age.days > 0 ? `${pet.age.days} días` : ''));

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>{pet.name}</h1>
      </div>
      <div className='py-10 grid lg:grid-cols-5 sm:grid-cols-1 gap-10'>
        <div className='lg:col-span-2'>
          <img src={pet.photo} alt={pet.name} className='min-h-110 object-cover rounded-xl'/>
        </div>
        <div className='lg:col-span-3 flex flex-col justify-between py-2'>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Sexo: </span>
            <span>{pet.sex}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Edad: </span>
            <span>{age}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Tamaño: </span>
            <span>{pet.size}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Vacunación: </span>
            <span>{pet.vaccinated ? 'Al día' : 'Faltan vacunas'}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Castración: </span>
            <span>{pet.neutered ? (pet.sex === 'macho' ? 'Castrado' : 'Castrada') : 'Pendiente'}</span>
          </p>
          {pet.specialCare && (
            <p className='pb-2 text-xl'>
              <span className='font-medium'>Cuidados especiales: </span>
              <span>{pet.specialCare}</span>
            </p>
          )}
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Descripción: </span>
            <span>{pet.description}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Refugio: </span>
            <span>{pet.shelterName}</span>
          </p>
        </div>
      </div>
      {userRole === "shelter" ?
        <div>
          <Button className='text-2xl mx-auto w-60'>
            Editar
          </Button>
          <Button className='text-2xl mx-auto w-60'>
            Pausar
          </Button>
          <Button className='text-2xl mx-auto w-60'>
            Eliminar
          </Button>
        </div>
        :
        <Button className='text-2xl mx-auto w-60'>
          Adoptar
        </Button>
      }
    </div>
  )
}

export default PetDetails;
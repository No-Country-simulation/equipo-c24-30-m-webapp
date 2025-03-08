import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
//import Button from '../../../components/Button';
import getTimeElapsed from '../../../utils/getTimeElapsed';
//import petDataMock from '../../../test/petsDataMock.json';
//import amplicationDataMock from '../../../test/applicationsDataMock.json';

const AplicationDetail = () => {
  const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const location = useLocation();
  const { petData } = location.state || {};

  if (!petData) {
    return <p>No se encontró la información de la mascota.</p>;
  }

  const age = petData.payload.age.years > 0 ? `${petData.payload.age.years} años` : 
              (petData.payload.age.months > 0 ? `${petData.payload.age.months} meses` :
              (petData.payload.age.days > 0 ? `${petData.payload.age.days} días` : '')); 

  const handleGoBack = () => {
    navigate(-1);
  }
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
  }

  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>{petData.payload.name}</h1>
      </div>
      <div className='py-10 grid lg:grid-cols-5 sm:grid-cols-1 gap-10'>
        <div className='lg:col-span-2'>
          <img src={petData.payload.photos} alt={petData.payload.name} className='min-h-110 object-cover rounded-xl'/>
        </div>
        <div className='lg:col-span-3 flex flex-col justify-between py-2'>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Sexo: </span>
            <span>{(petData.payload.sex === "male" ? "Macho" : "Hembra")}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Edad: </span>
            <span>{age}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Tamaño: </span>
            <span>{petData.payload.size}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Vacunación: </span>
            <span>{petData.payload.vaccinated ? 'Al día' : 'Faltan vacunas'}</span>
          </p>
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Castración: </span>
            <span>{petData.payload.neutered ? (petData.payload.sex === 'macho' ? 'Castrado' : 'Castrada') : 'Pendiente'}</span>
          </p>
          {petData.payload.specialCare && (
            <p className='pb-2 text-xl'>
              <span className='font-medium'>Cuidados especiales: </span>
              <span>{petData.payload.specialCare}</span>
            </p>
          )}
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Descripción: </span>
            <span>{petData.payload.description}</span>
          </p> 
          {userRole === "adopter" && (
            <p className='pb-2 text-xl'>
              <span className='font-medium'>Refugio: </span>
              <span>{petData.payload.shelter.shelterName}</span>
            </p>
          )}
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Estado: </span>
            <span>{handleTranslateStatus(petData.payload.status)}</span>
          </p>
           <p className='pb-2 text-xl'>
            <span className='font-medium'>Publicado hace: </span>
            <span>{getTimeElapsed(petData.payload.createdAt)}</span>
          </p> 
        </div>
      </div>
      {/* {userRole === "shelter" ?
        <div className='flex justify-around'>
          <Button className='text-2xl w-50'>
            Eliminar
          </Button>
          <Button className='text-2xl w-50'>
            Editar
          </Button>
          <Button className='text-2xl w-50'>
            {petData.payload.available ? 'Pausar' : 'Reanudar'}
          </Button>
        </div>
        :
        <Button className='text-2xl mx-auto w-60'>
          Adoptar
        </Button>
      } */}
    </div>
  )
}

export default AplicationDetail;
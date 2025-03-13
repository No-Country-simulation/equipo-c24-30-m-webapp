import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
//import Button from '../../../components/Button';
//import getTimeElapsed from '../../../utils/getTimeElapsed';
//import petDataMock from '../../../test/petsDataMock.json';
//import amplicationDataMock from '../../../test/applicationsDataMock.json';

const AplicationDetail = () => {
  const { id } = useParams();
  const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const location = useLocation();
 const [petData, setPetData] = useState(location.state?.petData || null);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (petData) return; // Evita llamadas innecesarias si ya tenemos los datos

      try {
        // Obtener la solicitud de adopción
        const { data: adoptionRequestResponse } = await axios.get(import.meta.env.VITE_BACKEND_URI + `/api/adoptionRequest/${id}`);
        const adoptionRequestData = adoptionRequestResponse.payload;

        // Obtener los datos de la mascota
        const { data: petResponse } = await axios.get(import.meta.env.VITE_BACKEND_URI + `/api/pet/${adoptionRequestData.pet}`
        );
        const petDetails = petResponse.payload;

        // Reemplazar la referencia 'pet' con los datos completos de la mascota
        setPetData({ ...adoptionRequestData, pet: petDetails });
      } catch (error) {
        console.error('Error al obtener los detalles:', error);
      }
    };

    fetchApplicationDetails();
  }, [id, petData]);

  if (!petData) {
    return <p>Cargando detalles de la solicitud...</p>;
  }

  // Usamos petData.pet para obtener los detalles de la mascota
  const age =
    petData.pet.age.years > 0
      ? `${petData.pet.age.years} años`
      : petData.pet.age.months > 0
      ? `${petData.pet.age.months} meses`
      : petData.pet.age.days > 0
      ? `${petData.pet.age.days} días`
      : '';

  const handleGoBack = () => {
    navigate(-1);
  };

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
  };

  return (
    <div className='p-8'>
      <div className='flex items-center gap-4'>
        <button onClick={handleGoBack} className='text-4xl text-(--secondary) cursor-pointer'>
          ←
        </button>
        <h1 className='text-3xl'>{petData.pet.name}</h1>
      </div>
      <div className='py-8 grid lg:grid-cols-3 sm:grid-cols-1 gap-10'>
        <div className='lg:col-span-1'>
          <div className='w-full aspect-square relative'>
            <img
              src={petData.pet.photos}
              alt={petData.pet.name}
              className='absolute inset-0 w-full h-full object-cover rounded-xl'
            />
          </div>
        </div>
        <div className='lg:col-span-2 flex flex-col justify-between py-2'>
          <p className='pb-2 text-lg'>
            <span className='font-medium'>Sexo: </span>
            <span>{petData.pet.sex === 'male' ? 'Macho' : 'Hembra'}</span>
          </p>
          <p className='pb-2 text-lg'>
            <span className='font-medium'>Edad: </span>
            <span>{age}</span>
          </p>
          {petData.pet.specialCare && (
            <p className='pb-2 text-lg'>
              <span className='font-medium'>Cuidados especiales: </span>
              <span>{petData.pet.specialCare}</span>
            </p>
          )}
          <p className='pb-2 text-lg'>
            <span className='font-medium'>Descripción: </span>
            <span>{petData.pet.description}</span>
          </p>
          {userRole === 'adopter' && (
            <p className='pb-2 text-lg'>
              <span className='font-medium'>Refugio: </span>
              <span>{petData.pet.shelter.shelterName}</span>
            </p>
          )}
          <p className='pb-2 text-lg'>
            <span className='font-medium'>Estado: </span>
            <span>{handleTranslateStatus(petData.status)}</span>
          </p>
          {/*
          Se eliminó la parte "Solicitud enviada hace:" ya que no se tiene la fecha de creación de la solicitud
          */}
        </div>
      </div>
      {/*
      {userRole === "shelter" ?
        <div className='flex justify-around'>
          <Button className='text-2xl w-50'>
            Eliminar
          </Button>
          <Button className='text-2xl w-50'>
            Editar
          </Button>
          <Button className='text-2xl w-50'>
            {petData.pet.available ? 'Pausar' : 'Reanudar'}
          </Button>
        </div>
        :
        <Button className='text-2xl mx-auto w-60'>
          Adoptar
        </Button>
      } */}
    </div>
  );
};

export default AplicationDetail;

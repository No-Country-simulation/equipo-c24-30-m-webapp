import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import getTimeElapsed from '../../../utils/getTimeElapsed';
import petServices from '../../../services/petServices';

const PetDetails = () => {
  const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const petId = useParams().id;
  const [pet, setPet] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [changeError, setChangeError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleGetPet = useCallback(async () => {
    try {
      setFetchError(null);
      setIsLoading(true);
      const response = await petServices.getPet(petId);
      setPet(response.payload);
    } catch (error) {
      console.error('Error fetching pet:', error);
      setFetchError('No pudimos cargar la mascota. Tocá el botón para intentar de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    handleGetPet();
  }, [handleGetPet]);

  const handleChangePetAvailability = async () => {
    try {
      setChangeError(null);
      setIsLoading(true);
      const response = await petServices.updatePet(petId, {
        ...pet,
        available: !pet.available
      });
      setPet(response.payload);
    } catch (error) {
      console.error('Error updating pet:', error);
      setChangeError('No pudimos cambiar la disponibilidad de la mascota. Intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeletePet = async () => {
    try {
      setShowDeleteModal(false);
      setChangeError(null);
      setIsLoading(true);
      const response = await petServices.deletePet(petId);
      setSuccess(response.success);
      setTimeout(() => navigate('/pets'), 3000);
    } catch (error) {
      console.error('Error deleting pet:', error);
      setChangeError('No pudimos eliminar la mascota. Intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  const handleGoEdit = () => {
    navigate(`/pet/edit/${petId}`);
  }

  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>{pet?.name}</h1>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center h-150'>
          <div className='animate-spin rounded-full h-30 w-30 my-auto border-b-8 border-(--secondary)'></div>
        </div>
      ) : (
      fetchError ? (
        <>
        <div className="flex items-center justify-center max-w-3xl p-6 space-x-4 mx-auto my-10 rounded-md bg-red-100">
          <div className="flex items-center self-stretch justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
          </div>
          <span className='text-lg'>{fetchError}</span>
        </div>
        <Button 
          onClick={handleGetPet}
          className="mx-auto w-50 text-lg"
        >
          Reintentar
        </Button>
        </>
      ) : (
      <div className='py-10 grid lg:grid-cols-5 sm:grid-cols-1 gap-10'>
        {pet && (
          <>
            <div className='lg:col-span-2'>
              <div className='w-full aspect-square relative'>
                <img 
                  src={pet.photos[0]} 
                  alt={pet.name} 
                  className={`absolute inset-0 w-full h-full object-cover rounded-xl ${pet.available ? '' : 'grayscale'}`}
                />
              </div>
            </div>
            <div className='lg:col-span-3 flex flex-col justify-between py-2'>
              {!pet.available && (
                <div className='w-fit mx-auto py-1 px-3 border-4 border-(--secondary) rounded-xl'>
                  <p className='text-3xl font-normal text-center'>
                    PUBLICACIÓN PAUSADA
                  </p>
                  <p className='text-center text-gray-500 text-md'>No se mostrará a posibles adoptantes</p>
                </div>
              )}
              <p className='pb-2 text-xl'>
                <span className='font-medium'>Sexo: </span>
                <span>{pet.sex === 'male' ? 'macho' : (pet.sex === 'female' ? 'hembra' : '')}</span>
              </p>
              <p className='pb-2 text-xl'>
                <span className='font-medium'>Edad: </span>
                <span>
                  {pet.age.years > 0 ? `${pet.age.years} años` : 
                    (pet.age.months > 0 ? `${pet.age.months} meses` :
                      (pet.age.days > 0 ? `${pet.age.days} días` : ''))}
                </span>
              </p>
              <p className='pb-2 text-xl'>
                <span className='font-medium'>Tamaño: </span>
                <span>{pet.size}</span>
              </p>
              <p className='pb-2 text-xl'>
                <span className='font-medium'>Vacunación: </span>
                <span>{pet.vaccinated ? 'al día' : 'faltan vacunas'}</span>
              </p>
              <p className='pb-2 text-xl'>
                <span className='font-medium'>Castración: </span>
                <span>{pet.neutered ? (pet.sex === 'male' ? 'castrado' : 'castrada') : 'pendiente'}</span>
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
              {userRole === "adopter" && (
                <p className='pb-2 text-xl'>
                  <span className='font-medium'>Refugio: </span>
                  <span>{pet.shelterName}</span>
                </p>
              )}
              <p className='pb-2 text-xl'>
                <span className='font-medium'>Publicado hace: </span>
                <span>{getTimeElapsed(pet.createdAt)}</span>
              </p>
            </div>
            {success && (
              <div className="lg:col-span-5 sm:col-span-1 flex items-center justify-between gap-4 p-4 mx-auto rounded-lg bg-(--secondary-light)">
                <div className="flex items-center self-stretch justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className='text-xl'>La mascota se eliminó correctamente.</span>
              </div>
            )}
            {changeError && (
              <div className="col-span-full flex items-center justify-center max-w-3xl p-6 space-x-4 mx-auto rounded-md bg-red-100">
                <div className="flex items-center self-stretch justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className='text-lg'>{changeError}</span>
              </div>
            )}
            {userRole === "shelter" ?
              <div className='flex justify-around col-span-5'>
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  className='text-2xl w-50'>
                  Eliminar
                </Button>
                <Button
                  onClick={handleGoEdit}
                  className='text-2xl w-50'
                >
                  Editar
                </Button>
                <Button
                  onClick={handleChangePetAvailability}
                  className='text-2xl w-50'>
                  {pet.available ? 'Pausar' : 'Reanudar'}
                </Button>
              </div>
              :
              <Button className='text-2xl mx-auto w-60 col-span-5'>
                Adoptar
              </Button>
            }
            {showDeleteModal && (
              <Modal
                title="¿Eliminar mascota?"
                description="Esta acción no se puede deshacer. La mascota se eliminará de forma permanente. Si querés que la mascota deje de mostrarse de forma temporal, te recomendamos que pauses la publicación."
                buttonText="Eliminar"
                buttonAction={handleDeletePet}
                onClose={() => setShowDeleteModal(false)}
              />
            )}
          </>
        )}
      </div>
      ))}
    </div>
  )
}

export default PetDetails;
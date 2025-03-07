import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VerticalCard from '../../../components/Cards/VerticalCard';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import petServices from '../../../services/petServices';
import userServices from '../../../services/userServices';

const ShelterPets = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleGetPets = useCallback(async () => {
    try {
      setFetchError(null);
      setIsLoading(true);
      const response = await petServices.getPetsByShelter(user.id);
      setPets(response.payload);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setFetchError('No pudimos cargar tus mascotas. Tocá el botón para intentar de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

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

  const checkProfileCompletion = async () => {
    try {
      const response = await userServices.getUser(user.id, user.role);
      const userData = response.payload;
      
      const requiredFields = {
        shelterName: userData.shelterName,
        userName: userData.userName,
        email: userData.email,
        phone: userData.phone,
        shelterEmail: userData.shelterEmail,
        shelterPhone: userData.shelterPhone,
        address: userData.address && userData.address.street && userData.address.city && userData.address.province && userData.address.country
      };

      return Object.values(requiredFields).every(field => field);
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return false;
    }
  };

  const handleGoToPetPost = async () => {
    const isProfileComplete = await checkProfileCompletion();
    if (isProfileComplete) {
      navigate('/pets/post');
    } else {
      setShowProfileModal(true);
    }
  }

  const handleGoToProfile = () => {
    navigate('/profile');
  }

  const handleGoToPetDetails = (petId) => {
    navigate(`/pet/${petId}`);
  }

  const handleChangePetAvailability = async (pet) => {
    try {
      setUpdateError(null);
      setIsLoading(true);
      const response = await petServices.updatePet(pet.id, {
        ...pet,
        available: !pet.available
      });
      setPets(prevPets => prevPets.map(p => 
        p.id === pet.id ? response.payload : p
      ));
    } catch (error) {
      console.error('Error updating pet:', error);
      setUpdateError({
        message: 'No pudimos cambiar la disponibilidad de la mascota. Intentá de nuevo.',
        petId: pet.id
      });
      setTimeout(() => setUpdateError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoEdit = (petId) => {
    navigate(`/pet/edit/${petId}`);
  }

  return (
    <div className='pl-8 pr-8'>
      <div className='flex justify-between items-center'>
        <p>Estas son las mascotas que publicaste para dar en adopción.</p>
        <Button
          onClick={handleGoToPetPost}
          className='w-50 text-lg'
        >
          Nueva publicación
        </Button>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
          </div>
          <span className='text-lg'>{fetchError}</span>
        </div>
        <Button 
          onClick={handleGetPets}
          className="mx-auto w-50 text-lg"
        >
          Reintentar
        </Button>
        </>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8'>
          {pets.length === 0 ? (
            <div>
              <img src="/src/assets/images/hound.png" alt="Sin contenido" />
              <p className="text-gray-500 text-2xl text-center">Todavía no publicaste ninguna mascota.</p>
            </div>
          ) : (
            pets.map((pet) => (
              <div key={pet.id} className="relative">
                {updateError?.petId === pet.id && (
                  <div className="absolute inset-0 z-10">
                    <div className="bg-red-100 p-4 rounded-lg m-4">
                      <div className="flex items-center justify-between gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-15 h-15">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-md font-light">{updateError.message}</span>
                      </div>
                    </div>
                  </div>
                )}
                <VerticalCard
                  image={pet.photos[0]}
                  title={pet.name}
                  description={`Última actualización: ${formatDate(pet.updatedAt)}`} 
                  isPaused={!pet.available} 
                  onSee={() => handleGoToPetDetails(pet.id)}
                  onPause={() => handleChangePetAvailability(pet)}
                  onEdit={() => handleGoEdit(pet.id)}
                />
              </div>
            ))
          )}
        </div>
      ))}
      {showProfileModal && (
        <Modal
          title="Perfil incompleto"
          description="Para poder publicar mascotas en adopción, necesitás completar todos los datos de tu perfil primero."
          buttonText="Ir a mi perfil"
          buttonAction={handleGoToProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  )
}

export default ShelterPets;
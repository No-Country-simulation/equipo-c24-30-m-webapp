import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PetForm from '../../../components/Forms/PetForm';
import Modal from '../../../components/Modal/Modal';
import { useProfileValidation } from '../../../hooks/useProfileValidation';
import { useAdoptionFormValidation } from '../../../hooks/useAdoptionFormValidation';
import petServices from '../../../services/petServices';

const PetPost = () => {
  const userId = useSelector(state => state.user.id);
  const navigate = useNavigate();
  const { isValidating: isValidatingProfile, showProfileModal, setShowProfileModal, checkProfileCompletion } = useProfileValidation();
  const { isValidating: isValidatingForm, showFormModal, setShowFormModal, checkFormExists } = useAdoptionFormValidation();

  useEffect(() => {
    const validateProfile = async () => {
      const isComplete = await checkProfileCompletion();
      if (!isComplete) {
        setShowProfileModal(true);
        return;
      }
      const hasForm = await checkFormExists();
      if (!hasForm) {
        setShowFormModal(true);
      }
    };
    validateProfile();
  }, [checkProfileCompletion, setShowProfileModal, checkFormExists, setShowFormModal]);

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const handleGoToForm = () => {
    navigate('/adoption-form');
  };

  const initialData = {
    name: '',
    photos: [], 
    sex: 'female',
    age: {
      days: 0,
      months: 0,
      years: 0
    },
    type: 'dog',
    size: 'pequeño',
    neutered: false,
    vaccinated: false,
    available: true,
    specialCare: null,
    description: '',
    shelter: userId
  };

  const handleSubmit = async (formData) => {
    const response = await petServices.createPet(formData);
    return response;
  };

  if (isValidatingProfile || isValidatingForm) {
    return (
      <div className='flex items-center justify-center h-150'>
        <div className='animate-spin rounded-full h-30 w-30 my-auto border-b-8 border-(--secondary)'></div>
      </div>
    );
  }

  if (showProfileModal) {
    return (
      <Modal
        title="Perfil incompleto"
        description="Para poder publicar mascotas en adopción, primero debés completar todos los datos de tu perfil."
        buttonText="Ir a mi perfil"
        buttonAction={handleGoToProfile}
        onClose={handleGoToProfile}
      />
    );
  }

  if (showFormModal) {
    return (
      <Modal
        title="Formulario de adopción no encontrado"
        description="Para poder publicar mascotas en adopción, primero debés crear un formulario de adopción."
        buttonText="Crear formulario"
        buttonAction={handleGoToForm}
        onClose={handleGoToForm}
      />
    );
  }

  return (
    <PetForm
      initialData={initialData}
      onSubmit={handleSubmit}
      submitButtonText="Publicar"
      title="Publicar una mascota"
    />
  );
};

export default PetPost;
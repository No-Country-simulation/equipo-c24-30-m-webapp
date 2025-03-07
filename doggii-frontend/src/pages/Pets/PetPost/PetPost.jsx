import { useSelector } from 'react-redux';
import petServices from '../../../services/petServices';
import PetForm from '../../../components/Forms/PetForm';

const PetPost = () => {
  const userId = useSelector(state => state.user.id);

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
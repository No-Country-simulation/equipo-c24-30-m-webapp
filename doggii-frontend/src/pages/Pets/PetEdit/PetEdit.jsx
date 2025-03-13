import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import petServices from '../../../services/petServices';
import PetForm from '../../../components/Forms/PetForm';
import Button from '../../../components/Button';

const PetEdit = () => {
  const navigate = useNavigate();
  const petId = useParams().id;
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //
  const [fetchError, setFetchError] = useState(null);

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

  const handleSubmit = async (formData) => {
    const response = await petServices.updatePet(petId, formData);
    if (response.success) {
      setTimeout(() => navigate(`/pet/${petId}`), 3000);
    }
    return response;
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-150'>
        <div className='animate-spin rounded-full h-30 w-30 my-auto border-b-8 border-(--secondary)'></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div>
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
          className="mx-auto"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <PetForm
      initialData={pet}
      onSubmit={handleSubmit}
      submitButtonText="Guardar"
      title="Editar mascota"
      isEdit
    />
  );
};

export default PetEdit;
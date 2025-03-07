import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import uploadImage  from '../../../services/petImageService';
import petServices from '../../../services/petServices';
import Button from '../../../components/Button';

const PetEdit = () => {
  const navigate = useNavigate();

  const userId = useSelector(state => state.user.id);
  const petId = useParams().id;
  const [pet, setPet] = useState(null);
  
  const fileInputRef = useRef(null);
  const [requiresSpecialCare, setRequiresSpecialCare] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    description: false,
    photos: false,
    age: false
  });
  const [formData, setFormData] = useState({
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
  });

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

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name,
        photos: pet.photos,
        sex: pet.sex,
        age: {
          days: pet.age.days,
          months: pet.age.months,
          years: pet.age.years
        },
        type: pet.type,
        size: pet.size,
        neutered: pet.neutered,
        vaccinated: pet.vaccinated,
        available: pet.available,
        specialCare: pet.specialCare,
        description: pet.description,
        shelter: userId
      });
    }
  }, [pet, userId]);

  const checkValidationErrors = (data) => {
    const errors = {
      name: !data.name.trim(),
      description: !data.description.trim(),
      photos: data.photos.length === 0,
      age: data.age.days === 0 && data.age.months === 0 && data.age.years === 0
    };
    return errors;
  };

  const hasValidationErrors = (errors) => {
    return Object.values(errors).some(error => error);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name === 'neutered' || name === 'vaccinated') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'true'
      }));
    } else if (name === 'unit' || name === 'quantity') {
      const currentValue = formData.age.days || formData.age.months || formData.age.years || 0;
      
      const newQuantity = name === 'quantity' ? (parseInt(value) || 0) : currentValue;
      
      const newUnit = name === 'unit' ? value : (
        formData.age.days > 0 ? 'days' :
        formData.age.months > 0 ? 'months' :
        formData.age.years > 0 ? 'years' : 'days'
      );

      setFormData(prev => ({
        ...prev,
        age: {
          days: newUnit === 'days' ? newQuantity : 0,
          months: newUnit === 'months' ? newQuantity : 0,
          years: newUnit === 'years' ? newQuantity : 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBlur = (field) => {
    const errors = checkValidationErrors(formData);
    setValidationErrors(prev => ({
      ...prev,
      [field]: errors[field]
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      handleBlur('photos');
      return;
    }

    setIsUploading(true);
    
    try {
      const url = await uploadImage(file);

      setFormData(prev => ({
        ...prev,
        photos: [url] 
      }));

      setValidationErrors(prev => ({
        ...prev,
        photos: false
      }));
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al subir la imagen. Intentá de nuevo.');
      handleBlur('photos');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newValidationErrors = checkValidationErrors(formData);
    setValidationErrors(newValidationErrors);

    if (hasValidationErrors(newValidationErrors)) {
      setFormError('Por favor, completá todos los campos requeridos');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    setIsLoading(true);
    setFormError(null);
    setSuccess(false);

    try {
      const response = await petServices.updatePet(pet.id, formData);
      
      setSuccess(response.success);
      setTimeout(() => navigate(`/pet/${petId}`), 3000);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al actualizar la mascota. Intentá de nuevo.');
      setTimeout(() => setFormError(null), 3000);
    } finally {
      setIsLoading(false);
      setRequiresSpecialCare(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>Editar mascota</h1>
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
                onClick={handleGetPet}
                className="mx-auto w-50 text-lg"
              >
                Reintentar
              </Button>
            </>
          ) : (
            <section className='p-6 my-8 mx-10 xl:mx-40 rounded-md bg-(--secondary)'>
              <form
                noValidate
                onSubmit={handleSubmit}
                className='container relative'
              >
                {success && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-10 rounded-md'>
                    <div className='py-2 px-3 bg-(--accent) rounded-xl flex items-center gap-2'>
                      <div>    
                        <svg className='w-8 h-8 text-(--secondary-dark)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">
                            <circle fill="currentColor" cx="24" cy="24" r="22"/>
                            <path fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
                        </svg>
                        </div>
                      <p className='p-2 text-2xl'>
                        Tu mascota se actualizó correctamente.
                      </p>
                    </div>
                  </div>
                )}
                <fieldset className='p-6 rounded-md shadow-sm bg-(--accent)'>
                  <div className='flex flex-col gap-6 px-20'>
                    <div>
                      <label htmlFor='name' className='text-lg'>Nombre *</label>
                      <input
                        id='name'
                        name='name'
                        type='text'
                        value={formData.name}
                        onChange={handleFieldChange}
                        onBlur={() => handleBlur('name')}
                        className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                      />
                      {validationErrors.name && (
                        <p className='text-red-500 text-sm mt-1'>El nombre es obligatorio</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor='sex' className='text-lg'>Género *</label>
                      <select
                        id='sex'
                        name='sex'
                        value={formData.sex}
                        onChange={handleFieldChange}
                        className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                      >
                        <option value='female'>Hembra</option>
                        <option value='male'>Macho</option>
                      </select>
                    </div>
                    <div>
                      <p className='text-lg font-medium'>Edad *</p>
                      <div className='grid grid-cols-2 gap-4 pt-1'>
                          <input
                            id='quantity'
                            name='quantity'
                            type='number'
                            min='0'
                            placeholder='0'
                            value={formData.age.days || formData.age.months || formData.age.years || ''}
                            onChange={handleFieldChange}
                            onBlur={() => handleBlur('age')}
                            className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                          />
                          <select
                            id='unit'
                            name='unit'
                            value={
                              formData.age.days > 0 ? 'days' :
                              formData.age.months > 0 ? 'months' :
                              formData.age.years > 0 ? 'years' : 'days'
                            }
                            onChange={handleFieldChange}
                            className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                          >
                            <option value='days'>día(s)</option>
                            <option value='months'>mes(es)</option>
                            <option value='years'>año(s)</option>
                          </select>

                      </div>
                      {validationErrors.age && (
                        <p className='text-red-500 text-sm mt-1'>La edad es obligatoria</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor='size' className='text-lg font-medium'>Tamaño *</label>
                      <select
                        id='size'
                        name='size'
                        value={formData.size}
                        onChange={handleFieldChange}
                        className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                      >
                        <option value='pequeño'>Pequeño</option>
                        <option value='mediano'>Mediano</option>
                        <option value='grande'>Grande</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor='vaccinated' className='text-lg font-medium'>¿Tiene las vacunas al día? *</label>
                      <select
                        id='vaccinated'
                        name='vaccinated'
                        value={formData.vaccinated.toString()}
                        onChange={handleFieldChange}
                        className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                      >
                        <option value='true'>Sí</option>
                        <option value='false'>No</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor='neutered' className='text-lg font-medium'>¿Está castrada? *</label>
                      <select
                        id='neutered'
                        name='neutered'
                        value={formData.neutered.toString()}
                        onChange={handleFieldChange}
                        className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                      >
                        <option value='true'>Sí</option>
                        <option value='false'>No</option>
                      </select>
                    </div>
                    <div>
                      <div className='flex items-center pb-1'>
                        <label htmlFor='requires-care' className='text-lg'>¿Requiere algún cuidado especial?</label>
                        <input
                          type='checkbox'
                          name='requires-care'
                          id='requires-care'
                          className='ml-2 h-5 w-5 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)'
                          checked={requiresSpecialCare}
                          onChange={(e) => {
                            setRequiresSpecialCare(e.target.checked);
                            if (!e.target.checked) {
                              setFormData(prev => ({...prev, specialCare: null}));
                            }
                          }}
                        />
                      </div>
                      {requiresSpecialCare && (
                        <div>
                          <label htmlFor='specialCare' className='text-lg'>Cuidados especiales</label>
                          <input
                            id='specialCare'
                            name='specialCare'
                            type='text'
                            value={formData.specialCare || ''}
                            onChange={handleFieldChange}
                            className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor='description' className='text-lg'>Descripción *</label>
                      <textarea
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleFieldChange}
                        onBlur={() => handleBlur('description')}
                        className='w-full h-20 p-2 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                      />
                      {validationErrors.description && (
                        <p className='text-red-500 text-sm mt-1'>La descripción es obligatoria</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor='photo' className='text-lg'>Foto *</label>
                      <input
                        ref={fileInputRef}
                        id='photo'
                        name='photo'
                        type='file'
                        accept='image/png, image/jpeg'
                        className='w-full file:w-45 file:h-10 file:rounded-md file:bg-(--primary-light) file:font-normal font-light'
                        onChange={handleImageUpload}
                        onBlur={() => handleBlur('photos')}
                        disabled={isUploading}
                      />
                      {validationErrors.photos && !isUploading && (
                        <p className='text-red-500 text-sm mt-1'>La foto es obligatoria</p>
                      )}
                      {isUploading && (
                        <div className='animate-spin rounded-full h-10 w-10 mx-auto mt-8 border-b-8 border-(--secondary)'></div>
                      )}
                      {(formData.photos[0] && !isUploading) && (
                        <div className='mt-4'>
                          <img src={formData.photos[0]} alt='Preview' className='max-w-50 mx-auto rounded-xl' />
                        </div>
                      )}
                    </div>
                    <Button
                      type='submit'
                      disabled={isLoading || isUploading || hasValidationErrors(checkValidationErrors(formData))}
                      className={`mx-auto mt-6 w-50 text-xl ${(isLoading || isUploading || hasValidationErrors(checkValidationErrors(formData))) ? 'grayscale cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Guardando...' : 'Guardar'}
                    </Button>
                    {formError && (
                      <p className='text-red-500 mt-2 text-center'>
                        {formError}
                      </p>
                    )}
                  </div>
                </fieldset>
              </form>
            </section>
          )
        )
      }
    </div>
  )
}

export default PetEdit;
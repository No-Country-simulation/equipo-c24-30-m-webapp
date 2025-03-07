import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import uploadImage from '../../services/petImageService';
import Button from '../Button';

const PetForm = ({ 
  initialData, 
  onSubmit, 
  submitButtonText, 
  title,
  isEdit = false 
}) => {
  const userId = useSelector(state => state.user.id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [requiresSpecialCare, setRequiresSpecialCare] = useState(!!initialData?.specialCare);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    description: false,
    photos: false,
    age: false
  });

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    photos: initialData?.photos || [], 
    sex: initialData?.sex || 'female',
    age: initialData?.age || {
      days: 0,
      months: 0,
      years: 0
    },
    type: initialData?.type || 'dog',
    size: initialData?.size || 'pequeño',
    neutered: initialData?.neutered || false,
    vaccinated: initialData?.vaccinated || false,
    available: initialData?.available ?? true,
    specialCare: initialData?.specialCare || null,
    description: initialData?.description || '',
    shelter: userId
  });

  useEffect(() => {
    if (initialData?.specialCare) {
      setRequiresSpecialCare(true);
    }
  }, [initialData]);

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
      await onSubmit(formData);
      setSuccess(true);
      if (!isEdit) {
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Algo salió mal. Intentá de nuevo.');
      setTimeout(() => setFormError(null), 3000);
    } finally {
      setIsLoading(false);
      if (!isEdit) {
        setFormData({
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
        setRequiresSpecialCare(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>{title}</h1>
      </div>
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
                  {isEdit ? 'Tu mascota se actualizó correctamente.' : 'Tu mascota se publicó correctamente.'}
                </p>
              </div>
            </div>
          )}
          <fieldset className='p-6 rounded-md shadow-sm bg-(--accent)'>
            <div className='flex flex-col gap-6 px-20'>
              <h2 className='text-3xl text-center'>Datos de la mascota</h2>
              <div>
                <label htmlFor='name' className='text-lg'>Nombre *</label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleFieldChange}
                  onBlur={() => handleBlur('name')}
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
                />
                {validationErrors.name && (
                  <p className='text-red-500 text-sm mt-1'>El nombre es obligatorio</p>
                )}
              </div>
              <div>
                <label htmlFor='sex' className='text-lg'>Sexo *</label>
                <select
                  id='sex'
                  name='sex'
                  value={formData.sex}
                  onChange={handleFieldChange}
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
                >
                  <option value='female'>Hembra</option>
                  <option value='male'>Macho</option>
                </select>
              </div>
              <div>
                <p className='text-lg font-medium'>Edad *</p>
                <div className='grid grid-cols-2 gap-4 pt-1'>
                  <input
                    type='number'
                    name='quantity'
                    min='0'
                    value={formData.age.days || formData.age.months || formData.age.years || ''}
                    onChange={handleFieldChange}
                    onBlur={() => handleBlur('age')}
                    className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
                  />
                  <select
                    name='unit'
                    value={
                      formData.age.days > 0 ? 'days' :
                      formData.age.months > 0 ? 'months' :
                      formData.age.years > 0 ? 'years' : 'days'
                    }
                    onChange={handleFieldChange}
                    className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
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
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
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
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
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
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
                >
                  <option value='true'>Sí</option>
                  <option value='false'>No</option>
                </select>
              </div>
              <div>
                <div className='flex items-center pb-1'>
                  <label htmlFor='requires-care' className='text-lg'>¿Requiere algún cuidado especial?</label>
                  <input
                    id='requires-care'
                    type='checkbox'
                    checked={requiresSpecialCare}
                    onChange={(e) => {
                      setRequiresSpecialCare(e.target.checked);
                      if (!e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          specialCare: null
                        }));
                      }
                    }}
                    className='ml-4 h-5 w-5 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)'
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
                      className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
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
                  className='w-full rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light p-4'
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
                  type='file'
                  accept='image/*'
                  onBlur={() => handleBlur('photos')}
                  disabled={isUploading}
                  onChange={handleImageUpload}
                  className='w-full file:w-45 file:h-10 file:rounded-md file:bg-(--primary-light) file:font-normal font-light'
                />
                {validationErrors.photos && !isUploading && (
                  <p className='text-red-500 text-sm mt-1'>La foto es obligatoria</p>
                )}
                {isUploading && (
                  <div className='animate-spin rounded-full h-10 w-10 mx-auto mt-8 border-b-8 border-(--secondary)'></div>
                )}
                {(formData.photos[0] && !isUploading) && (
                  <div className='max-w-50 mx-auto rounded-xl'>
                    <img
                      src={formData.photos[0]}
                      alt='Preview'
                      className='w-40 h-40 object-cover rounded-md'
                    />
                  </div>
                )}
              </div>
              <Button
                type='submit'
                disabled={isLoading || isUploading || hasValidationErrors(checkValidationErrors(formData))}
                className={`mx-auto mt-6 w-50 text-xl ${(isLoading || isUploading || hasValidationErrors(checkValidationErrors(formData))) ? 'grayscale cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Guardando...' : submitButtonText}
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
    </div>
  );
};

export default PetForm;

PetForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isEdit: PropTypes.bool
};
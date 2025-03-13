import { useState, useRef, useEffect, useMemo } from 'react';
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
  const [hasChanges, setHasChanges] = useState(false);

  const initialFormData = useMemo (() => ({
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
    specialCare: initialData?.specialCare || '',
    description: initialData?.description || '',
    shelter: userId
  }), [initialData, userId]);

  const [formData, setFormData] = useState(initialFormData);

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

  const checkFormChanges = (newData, isSpecialCare = requiresSpecialCare) => {
    const simpleFields = ['name', 'sex', 'type', 'size', 'neutered', 'vaccinated', 'available', 'description'];
    const hasSimpleChanges = simpleFields.some(field => newData[field] !== initialFormData[field]);

    const hasAgeChanges = 
      newData.age.days !== initialFormData.age.days ||
      newData.age.months !== initialFormData.age.months ||
      newData.age.years !== initialFormData.age.years;

    const hasPhotoChanges = JSON.stringify(newData.photos) !== JSON.stringify(initialFormData.photos);

    const initialSpecialCare = initialFormData.specialCare || '';
    const newSpecialCare = isSpecialCare ? newData.specialCare : '';
    const hasSpecialCareChanges = newSpecialCare !== initialSpecialCare;

    return hasSimpleChanges || hasAgeChanges || hasPhotoChanges || hasSpecialCareChanges;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    let newFormData;
    if (name === 'neutered' || name === 'vaccinated') {
      newFormData = {
        ...formData,
        [name]: value === 'true'
      };
    } else if (name === 'unit' || name === 'quantity') {
      const currentValue = formData.age.days || formData.age.months || formData.age.years || 0;
      
      const newQuantity = name === 'quantity' ? (parseInt(value) || 0) : currentValue;
      
      const newUnit = name === 'unit' ? value : (
        formData.age.days > 0 ? 'days' :
        formData.age.months > 0 ? 'months' :
        formData.age.years > 0 ? 'years' : 'days'
      );

      newFormData = {
        ...formData,
        age: {
          days: newUnit === 'days' ? newQuantity : 0,
          months: newUnit === 'months' ? newQuantity : 0,
          years: newUnit === 'years' ? newQuantity : 0
        }
      };
    } else {
      newFormData = {
        ...formData,
        [name]: value
      };
    }

    setFormData(newFormData);
    setHasChanges(checkFormChanges(newFormData));
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

      const newFormData = {
        ...formData,
        photos: [url] 
      };

      setFormData(newFormData);
      setHasChanges(checkFormChanges(newFormData));
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

    if (!hasChanges) {
      setFormError('No hay cambios para guardar');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    setIsLoading(true);
    setFormError(null);
    setSuccess(false);

    try {
      const dataToSubmit = {
        ...formData,
        specialCare: requiresSpecialCare ? formData.specialCare : ''
      };

      await onSubmit(dataToSubmit);
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
        setFormData(initialFormData);
        setRequiresSpecialCare(false);
        setHasChanges(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <div className='p-8'>
      <div className='flex items-center gap-4'>
        <button onClick={handleGoBack} className='text-4xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-3xl'>{title}</h1>
      </div>
      <section className='p-6 my-6 mx-10 xl:mx-40 rounded-md bg-(--secondary)'>
        <form
          noValidate
          onSubmit={handleSubmit}
          className='container relative'
        >
          {success && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-10 rounded-md'>
              <div className='py-2 px-3 bg-(--accent) rounded-xl flex items-center gap-2'>
                <div>    
                  <svg className='w-7 h-7 text-(--secondary-dark)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">
                    <circle fill="currentColor" cx="24" cy="24" r="22"/>
                    <path fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
                  </svg>
                </div>
                <p className='p-2 text-xl'>
                  {isEdit ? 'Tu mascota se actualizó correctamente.' : 'Tu mascota se publicó correctamente.'}
                </p>
              </div>
            </div>
          )}
          <fieldset className='p-6 rounded-md shadow-sm bg-(--accent)'>
            <div className='flex flex-col gap-6 px-20'>
              <h2 className='text-2xl text-center'>Datos de la mascota</h2>
              <div>
                <label htmlFor='name'>Nombre *</label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleFieldChange}
                  onBlur={() => handleBlur('name')}
                  className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
                />
                {validationErrors.name && (
                  <p className='text-red-500 text-sm mt-1'>El nombre es obligatorio</p>
                )}
              </div>
              <div>
                <label htmlFor='sex'>Sexo *</label>
                <select
                  id='sex'
                  name='sex'
                  value={formData.sex}
                  onChange={handleFieldChange}
                  className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
                >
                  <option value='female'>Hembra</option>
                  <option value='male'>Macho</option>
                </select>
              </div>
              <div>
                <p className='font-medium'>Edad *</p>
                <div className='grid grid-cols-2 gap-4 pt-1'>
                  <input
                    type='number'
                    name='quantity'
                    min='0'
                    value={formData.age.days || formData.age.months || formData.age.years || ''}
                    onChange={handleFieldChange}
                    onBlur={() => handleBlur('age')}
                    className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
                  />
                  <select
                    name='unit'
                    value={
                      formData.age.days > 0 ? 'days' :
                      formData.age.months > 0 ? 'months' :
                      formData.age.years > 0 ? 'years' : 'days'
                    }
                    onChange={handleFieldChange}
                    className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
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
                <label htmlFor='size'>Tamaño *</label>
                <select
                  id='size'
                  name='size'
                  value={formData.size}
                  onChange={handleFieldChange}
                  className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
                >
                  <option value='pequeño'>Pequeño</option>
                  <option value='mediano'>Mediano</option>
                  <option value='grande'>Grande</option>
                </select>
              </div>
              <div>
                <label htmlFor='vaccinated'>¿Tiene las vacunas al día? *</label>
                <select
                  id='vaccinated'
                  name='vaccinated'
                  value={formData.vaccinated.toString()}
                  onChange={handleFieldChange}
                  className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
                >
                  <option value='true'>Sí</option>
                  <option value='false'>No</option>
                </select>
              </div>
              <div>
                <label htmlFor='neutered'>¿Está castrada? *</label>
                <select
                  id='neutered'
                  name='neutered'
                  value={formData.neutered.toString()}
                  onChange={handleFieldChange}
                  className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
                >
                  <option value='true'>Sí</option>
                  <option value='false'>No</option>
                </select>
              </div>
              <div>
                <div className='flex items-center pb-1'>
                  <label htmlFor='requires-care'>¿Requiere algún cuidado especial?</label>
                  <input
                    id='requires-care'
                    type='checkbox'
                    checked={requiresSpecialCare}
                    onChange={(e) => {
                      setRequiresSpecialCare(e.target.checked);
                      setHasChanges(checkFormChanges(formData, e.target.checked));
                    }}
                    className='ml-4 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)'
                  />
                </div>
                {requiresSpecialCare && (
                  <div>
                    <label htmlFor='specialCare'>Cuidados especiales</label>
                    <input
                      id='specialCare'
                      name='specialCare'
                      type='text'
                      value={formData.specialCare || ''}
                      onChange={handleFieldChange}
                      className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
                    />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor='description'>Descripción *</label>
                <textarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleFieldChange}
                  onBlur={() => handleBlur('description')}
                  className='w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light'
                />
                {validationErrors.description && (
                  <p className='text-red-500 text-sm mt-1'>La descripción es obligatoria</p>
                )}
              </div>
              <div>
                <label htmlFor='photo'>Foto *</label>
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
                  <div className='max-w-40 mx-auto rounded-xl mt-4'>
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
                disabled={isLoading || isUploading || hasValidationErrors(checkValidationErrors(formData)) || !hasChanges}
                className={`mx-auto text-lg ${(isLoading || isUploading || hasValidationErrors(checkValidationErrors(formData)) || !hasChanges) ? 'grayscale cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Guardando...' : submitButtonText}
              </Button>
              {formError && (
                <p className='text-red-500 text-center'>
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
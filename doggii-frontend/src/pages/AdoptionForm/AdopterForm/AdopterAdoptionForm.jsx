import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import petServices from '../../../services/petServices';
import formServices from '../../../services/formServices';
import applicationServices from '../../../services/applicationServices';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import { useProfileValidation } from '../../../hooks/useProfileValidation';

const AdopterAdoptionForm = () => {
  const navigate = useNavigate();
  const petId = useParams().id;
  const { checkProfileCompletion, showProfileModal, setShowProfileModal } = useProfileValidation();

  //Datos de la mascota, del formulario de adopción y respuestas del formulario
  const [pet, setPet] = useState(null);
  const [form, setForm] = useState(null);
  const [applicationFields, setApplicationFields] = useState([]);

  //Manejo de errores (carga de datos, envío de datos y validación de campos), procesamiento exitoso, carga y cambios
  const [fetchError, setFetchError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  //Obtener los datos de la mascota y el formulario del refugio
  const handleGetPetAndForm = useCallback(async () => {
    try {
      setFetchError(null);
      setIsLoading(true);

      const petData = await petServices.getPet(petId);
      setPet(petData.payload);

      const formData = await formServices.getAdoptionForm(petData.payload.shelter._id);
      setForm(formData.payload);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchError('No pudimos cargar los datos. Tocá el botón para intentar de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    const validateAndLoad = async () => {
      const isProfileComplete = await checkProfileCompletion();
      if (!isProfileComplete) {
        setShowProfileModal(true);
        return;
      }
      handleGetPetAndForm();
    };
    validateAndLoad();
  }, [handleGetPetAndForm, checkProfileCompletion, setShowProfileModal]);

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  //Volver a la sección anterior
  const handleGoBack = () => {
    navigate(-1);
  }

  //Validar los campos y devolver errores (si los hay)
  const checkValidationErrors = (fields) => {
    if (!form?.fields) return {};

    const errors = {};
    form.fields.forEach((field, index) => {
      const answer = fields.find(f => f.question === field.label)?.answer;

      if (['text', 'select'].includes(field.type)) {
        if (!answer || !answer.trim()) {
          errors[`field-${index}`] = true;
        }
      } else if (field.type === 'checkbox') {
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
          errors[`field-${index}`] = true;
        }
      }
    });
    return errors;
  };

  //Verificar si hay errores de validación activos
  const hasValidationErrors = (errors) => {
    return Object.values(errors).some(error => error);
  };

  //Gestionar los cambios en los campos y actualizar estados de cambio, errores de validación y respuestas del formulario
  const handleInputChange = (field, value, optionIndex = null) => {
    setHasChanges(true);

    const fieldIndex = form.fields.findIndex(f => f.label === field.label);
    setValidationErrors(prev => ({
      ...prev,
      [`field-${fieldIndex}`]: false
    }));

    setApplicationFields(prevFields => {
      const existingFieldIndex = prevFields.findIndex(f => f.question === field.label);
      
      let newAnswer;
      if (field.type === 'checkbox') {
        const prevAnswer = existingFieldIndex >= 0 ? prevFields[existingFieldIndex].answer : [];
        if (Array.isArray(prevAnswer)) {
          if (value) {
            newAnswer = [...prevAnswer, field.options[optionIndex]];
          } else {
            newAnswer = prevAnswer.filter(option => option !== field.options[optionIndex]);
          }
        } else {
          newAnswer = value ? [field.options[optionIndex]] : [];
        }
      } else {
        newAnswer = value;
      }

      const newFields = [...prevFields];
      const newField = {
        question: field.label,
        answer: newAnswer
      };

      if (existingFieldIndex >= 0) {
        newFields[existingFieldIndex] = newField;
      } else {
        newFields.push(newField);
      }

      return newFields;
    });
  };

  //Validar un campo específico cuando pierde el foco
  const handleBlur = (field) => {
    const errors = checkValidationErrors(applicationFields);
    setValidationErrors(prev => ({
      ...prev,
      [field]: errors[field] || false
    }));
  };

  //Procesar y enviar una solicitud de adopción con los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newValidationErrors = checkValidationErrors(applicationFields);
    setValidationErrors(newValidationErrors);

    if (hasValidationErrors(newValidationErrors)) {
      setPostError('Por favor, completá todos los campos requeridos');
      setTimeout(() => setPostError(null), 3000);
      return;
    }

    try {
      setIsLoading(true);
      setPostError(null);
      setSuccess(false);

      const formattedAnswers = applicationFields.map(field => ({
        question: field.question,
        answer: Array.isArray(field.answer) ? field.answer.join(', ') : field.answer
      }));

      const applicationData = {
        pet: petId,
        formAnswers: formattedAnswers
      };

      const response = await applicationServices.createApplication(applicationData);
      console.log(response);
      
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(`/adoption-request/${response.payload._id}`);
        }, 3000);
      }
    } catch (error) {
      console.error('Error creating application:', error);
      setPostError('No pudimos enviar tu solicitud. Intentá de nuevo.');
      setTimeout(() => setPostError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  //Renderizar el tipo de input correspondiente según el campo del formulario
  const handleInputType = (field, index) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            id={`question${index + 1}`}
            type='text'
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={() => handleBlur(`field-${index}`)}
            className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
          />
        );
      case 'checkbox':
        return (
          field.options.map((option, i) => (
            <div key={`checkbox-container-${index}-${i}`} className="flex items-center gap-2">
              <input
                id={`question${index + 1}-${i + 1}`}
                type='checkbox'
                onChange={(e) => handleInputChange(field, e.target.checked, i)}
                onBlur={() => handleBlur(`field-${index}`)}
                className='mr-2 h-4 w-4 rounded-md accent-(--primary) checked:bg-(--primary) checked:hover:bg-(--primary) focus:ring-(--primary)'
              />
              <label
                htmlFor={`question${index + 1}-${i + 1}`}
                className='font-light text-lg'
              >
                {option}
              </label>
            </div>
          ))
        );
      case 'select':
        return (
          <select
            id={`question${index + 1}`}
            className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 font-light pl-4 bg-(--secondary-light)'
            defaultValue=""
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={() => handleBlur(`field-${index}`)}
          >
            <option value="" disabled>Seleccioná una opción</option>
            {field.options.map((option, index) => (
              <option
                key={`option-${index}`}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            id={`question${index + 1}`}
            type='text'
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={() => handleBlur(`field-${index}`)}
            className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
          />
        );
    }
  }

  return (
    <div className="m-8">
      {showProfileModal && (
        <Modal
          title="Perfil incompleto"
          description="Para poder iniciar una solicitud de adopción, primero debés completar todos los datos de tu perfil."
          buttonText="Ir a mi perfil"
          buttonAction={handleGoToProfile}
          onClose={handleGoToProfile}
        />
      )}
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>Formulario de adopción {pet?.shelter?.shelterName ? `de ${pet.shelter.shelterName}` : ''}</h1>
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
          onClick={handleGetPetAndForm}
          className="mx-auto w-50 text-lg"
        >
          Reintentar
        </Button>
        </>
      ) : (
        <div>
          {form && (
            <section className='p-6 my-8 mx-auto max-w-7xl rounded-md bg-(--secondary)'>
              <form
                noValidate
                onSubmit={handleSubmit}
                className='container relative'
              >
                {success && (
                  <div className='absolute inset-0 p-30 flex items-start justify-center bg-black/10 backdrop-blur-xs z-10 rounded-md'>
                    <div className='py-2 px-3 bg-(--accent) rounded-xl flex items-center gap-2'>
                      <div>    
                        <svg className='w-8 h-8 text-(--secondary-dark)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">
                          <circle fill="currentColor" cx="24" cy="24" r="22"/>
                          <path fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
                        </svg>
                      </div>
                      <p className='p-2 text-2xl'>
                        El formulario se envió correctamente.
                      </p>
                    </div>
                  </div>
                )}
                <fieldset className='p-6 rounded-md shadow-sm bg-(--accent)'>
                  <div className='flex flex-col gap-8 px-20'>
                    {form.fields.map((field, index) => (
                      <div key={index} className='flex flex-col gap-1'>
                        <label
                          htmlFor={`question${index + 1}`}
                          className='text-xl'
                        >
                          {field.label}
                        </label>
                        {handleInputType(field, index)}
                        {validationErrors[`field-${index}`] && (
                          <p className='text-red-500 text-sm mt-1'>La respuesta no puede quedar vacía</p>
                        )}
                      </div>
                    ))}
                    <Button
                      type='submit'
                      disabled={isLoading || !hasChanges || hasValidationErrors(validationErrors)}
                      className={`mx-auto w-40 text-xl ${isLoading || !hasChanges|| hasValidationErrors(validationErrors) ? 'grayscale cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Enviando...' : 'Enviar'}
                    </Button>
                    {postError && (
                      <p className='text-red-500 mt-2 text-center'>
                        {postError}
                      </p>
                    )}
                  </div>
                </fieldset>
              </form>
            </section>
          )}
        </div>
      ))}
    </div>
  )
}

export default AdopterAdoptionForm;
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import petServices from '../../../services/petServices';
import formServices from '../../../services/formServices';
import Button from '../../../components/Button';

const AdopterAdoptionForm = () => {
  const navigate = useNavigate();

  const petId = useParams().id;
  const [pet, setPet] = useState(null);
  const [form, setForm] = useState(null);

  const [fetchError, setFetchError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetPetAndForm = useCallback(async () => {
    try {
      setFetchError(null);
      setIsLoading(true);

      const petData = await petServices.getPet(petId);
      setPet(petData.payload);

      const formData = await formServices.getAdoptionForm(petData.payload.shelter._id);
      setForm(formData.payload);
      console.log(formData.payload);

    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchError('No pudimos cargar los datos. Tocá el botón para intentar de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    handleGetPetAndForm();
  }, [handleGetPetAndForm]);

  const handleGoBack = () => {
    navigate(-1);
  }

  const handleInputType = (field, index, onChange) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            id={`question${index + 1}`}
            type='text'
            onChange={onChange}
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
                onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
          />
        );
    }
  }

  return (
    <div className="m-8">
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>Formulario de adopción {`de ${pet?.shelter.shelterName}`}</h1>
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
                      </div>
                    ))}
                    <Button
                      type='submit'
                      className={`mx-auto w-40 text-xl`}
                    >
                      {isLoading ? 'Enviando...' : 'Enviar'}
                    </Button>
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
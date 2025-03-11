import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import formServices from "../../../services/formServices";
import Button from "../../../components/Button";

const predefinedQuestions = [
  {
    id: 1,
    label: '¿Cuántas horas al día puede dedicar a su perro? Elija una opción.',
    type: 'select',
    options: ['Menos de 2 horas', 'De 2 a 4 horas', 'De 4 a 6 horas', 'Más de 6 horas'],
    required: true,
  },
  {
    id: 2,
    label: '¿En qué tipo de vivienda vive? Elija una opción.',
    type: 'select',
    options: ['Departamento pequeño', 'Departamento grande', 'Casa sin jardín', 'Casa con jardín'],
    required: true,
  },
  {
    id: 3,
    label: '¿Ha tenido perros u otras mascotas antes? Elija una opción.',
    type: 'select',
    options: ['Sí, he tenido mascotas', 'No, no he tenido mascotas'],
    required: true,
  },
  {
    id: 4,
    label: '¿Está preparado para asumir los costos asociados con el cuidado de una mascota, como los de alimentación, visitas veterinarias, medicamentos, etcétera? Elija una opción.',
    type: 'select',
    options: ['Sí, tengo un presupuesto para cubrir todos los gastos', 'Aún no he considerado estos costos, pero estoy dispuesto a aprender', 'No estoy seguro de poder cubrir todos los costos'],
    required: true,
  },
  {
    id: 5,
    label: '¿Está dispuesto a invertir tiempo en la educación de la mascota? Elija una opción.',
    type: 'select',
    options: ['Sí, estoy dispuesto a educarla', 'No sé cómo hacerlo, pero estoy dispuesto a aprender', 'No considero que sea necesario'],
    required: true,
  },
  {
    id: 6,
    label: '¿Cómo describiría su entorno familiar y de convivencia? ¿Hay niños, adultos mayores u otros animales en su hogar? Marque todas las opciones que apliquen.',
    type: 'checkbox',
    options: ['Hay niños', 'Hay adultos mayores', 'Hay otras mascotas'],
    required: true,
  },
  {
    id: 7,
    label: '¿Está dispuesto a cuidar de la mascota durante toda su vida, que podría ser de 10 a 15 años o más? Elija una opción.',
    type: 'select',
    options: ['Sí, me comprometo a cuidarla durante toda su vida', 'Estoy dispuesto a asumir el compromiso, pero no estoy seguro de todo lo que implica', 'No puedo prometer que pueda seguir cuidando de ella si mi situación cambia'],
    required: true,
  },
  {
    id: 8,
    label: '¿Está preparado para llevar a la mascota al veterinario o a otros lugares si es necesario? Elija una opción.',
    type: 'select',
    options: ['Sí, tengo un medio de transporte adecuado para la mascota', 'No cuento con un medio de transporte, pero puedo conseguirlo', 'No tengo la posibilidad de transportarla'],
    required: true,
  },
  {
    id: 9,
    label: '¿Está dispuesto a permitir visitas de seguimiento para asegurarse de que la mascota se adapte bien a su nuevo hogar? Elija una opción.',
    type: 'select',
    options: ['Sí, estoy dispuesto', 'No me siento cómodo con recibir visitas'],
    required: true,
  },
  {
    id: 10,
    label: '¿Por qué desea adoptar una mascota?',
    type: 'text',
    required: true,
  }
];

const ShelterAdoptionForm = () => {
  const userId = useSelector(state => state.user.id);

  //Preguntas predefinidas y preguntas personalizadas
  const [formFields, setFormFields] = useState([]);
  const [customQuestions, setCustomQuestions] = useState([]);

  //Para guardar si las preguntas personalizadas tienen cambios
  const [hasChanges, setHasChanges] = useState({});

  //Para mostrar mensajes de confirmación al guardar una pregunta personalizada
  const [savedQuestions, setSavedQuestions] = useState({});

  //Carga, errores y procesamiento exitoso
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  //ID del formulario (si el usuario está editando un formulario existente)
  const [formId, setFormId] = useState(null);

  //Guarda el estado inicial del formulario para verificar si hay cambios
  const [initialFormState, setInitialFormState] = useState(null);

  //Referencias para los input y los select de las preguntas personalizadas
  const inputRefs = useRef({});
  const selectRefs = useRef({});

  //Obtener el formulario del refugio (si ya existe)
  const handleGetForm = useCallback(async () => {
    try {
      setFetchError(null);
      setIsLoading(true);
      const response = await formServices.getAdoptionForm(userId);
      if (response.success) {
        const { _id, fields } = response.payload;
        setFormId(_id);

        const predefinedFields = [];
        const customFields = [];

        fields.forEach(field => {
          const predefinedQuestion = predefinedQuestions.find(question => question.label === field.label);
          
          if (predefinedQuestion) {
            predefinedFields.push(field);
          } else {
            customFields.push({
              ...field,
              id: field._id
            });
          }
        });

        setFormFields(predefinedFields);
        setCustomQuestions(customFields);

        setInitialFormState({
          predefinedFields: predefinedFields.map(field => field.label).sort(),
          customFields: customFields.map(field => ({
            label: field.label,
            type: field.type
          }))
        });
      }
    } catch (err) {
      console.error('Error al cargar el formulario:', err);
      if (err.status !== 404) {
        setFetchError('No pudimos cargar el formulario. Tocá el botón para intentar de nuevo');
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    handleGetForm();
  }, [handleGetForm]);

  // Compara el estado actual con el inicial para detectar cambios y habilitar el botón "Guardar formulario"
  const hasFormChanged = () => {
    const currentPredefinedFields = formFields.map(field => field.label).sort();
    const currentCustomFields = customQuestions
      .filter(question => question.label.trim() !== '')
      .map(field => ({
        label: field.label,
        type: field.type
      }));

    if (!initialFormState) {
      return currentPredefinedFields.length > 0 || currentCustomFields.length > 0;
    }

    const predefinedEqual = JSON.stringify(currentPredefinedFields) === 
      JSON.stringify(initialFormState.predefinedFields);

    const customEqual = JSON.stringify(currentCustomFields) === 
      JSON.stringify(initialFormState.customFields);

    return !predefinedEqual || !customEqual;
  };

  //Gestiona la selección de las preguntas predefinidas
  const handleCheckboxChange = (question, checked) => {
    if (checked) {
      const { label, type, options, required } = question;
      const newField = {
        label,
        type,
        required
      };

      if (type === 'select' || type === 'checkbox') {
        newField.options = options;
      }
      
      setFormFields(prev => [...prev, newField]);
    } else {
      setFormFields(prev => prev.filter(field => field.label !== question.label));
    }
  };

  //Agrega una nueva pregunta personalizada vacía
  const handleAddCustomQuestion = (e) => {
    e.preventDefault();
    setCustomQuestions(prev => [...prev, { 
      id: prev.length + 1,
      label: '',
      type: 'text',
      required: true
    }]);
  };

  //Guarda la pregunta personalizada
  const handleSaveCustomQuestion = (id, inputValue, selectValue) => {
    const newQuestion = {
      label: inputValue,
      type: selectValue,
      required: true
    };

    if (selectValue === 'select') {
      newQuestion.options = ['Sí', 'No', 'No aplica'];
    }

    setCustomQuestions(prev => prev.map(question => 
      question.id === id ? { 
        id,  
        ...newQuestion
      } : question
    ));
    setHasChanges(prev => ({...prev, [id]: false}));
    
    setSavedQuestions(prev => ({...prev, [id]: true}));
    setTimeout(() => {
      setSavedQuestions(prev => ({...prev, [id]: false}));
    }, 3000);
  };

  //Elimina la pregunta personalizada
  const handleRemoveCustomQuestion = (id) => {
    setCustomQuestions(prev => prev.filter(question => question.id !== id));
  };

  //Envía todo el formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    const formattedCustomQuestions = customQuestions
      .filter(question => question.label.trim() !== '')
      .map(question => {
        const questionCopy = { ...question };
        delete questionCopy.id;
        return questionCopy;
      });

    try {
      const formData = {
        "name": "Formulario de adopción",
        "fields": [...formFields, ...formattedCustomQuestions]
      };

      let response;
      if (formId) {
        response = await formServices.updateAdoptionForm(formData);
      } else {
        response = await formServices.createAdoptionForm(formData);
        if (response.success) {
          setFormId(response.payload.id);
        }
      }

      if (response.success) {
        setInitialFormState({
          predefinedFields: formFields.map(field => field.label).sort(),
          customFields: formattedCustomQuestions.map(field => ({
            label: field.label,
            type: field.type
          }))
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el formulario. Intentá de nuevo.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <div className="m-8">
      <h1>Formulario de adopción</h1>
      <p>En esta sección, podés definir las preguntas que querés incluir en el formulario que los adoptantes deben completar para solicitar la adopción de alguna de tus mascotas publicadas. En <strong>Preguntas predefinidas</strong>, podés marcar las preguntas que quieras incluir en el formulario. En <strong>Preguntas personalizadas</strong>, podés agregar tus propias preguntas.</p>
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
          onClick={handleGetForm}
          className="mx-auto w-50 text-lg"
        >
          Reintentar
        </Button>
        </>
      ) : (
      <form
        onSubmit={handleSubmit}
        className="container relative"
      >
        {success && (
          <div className='absolute inset-0 pt-30 flex items-start justify-center bg-black/10 backdrop-blur-xs z-10 rounded-md'>
            <div className='py-2 px-3 bg-(--accent) rounded-xl flex items-center gap-2'>
              <div>    
                <svg className='w-8 h-8 text-(--secondary-dark)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">
                  <circle fill="currentColor" cx="24" cy="24" r="22"/>
                  <path fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
                </svg>
              </div>
              <p className='p-2 text-2xl'>
                El formulario se guardó correctamente.
              </p>
            </div>
          </div>
        )}
        <fieldset>
          <div className="my-10">
            <h2 >Preguntas predefinidas</h2>
            <p className="mb-4">Marcá las preguntas que quieras incluir en el formulario de adopción.</p>
            <div className="flex flex-col gap-6">
              {predefinedQuestions.map((question, index) => (
                <div key={index} className="border-3 border-(--secondary) p-4 rounded-lg shadow-md">
                  <div className='flex items-center'>
                    <input
                      id={`predefinedQuestion${index + 1}`}
                      type='checkbox'
                      className='shrink-0 mr-2 h-4 w-4 rounded-md accent-(--primary) checked:bg-(--primary) checked:hover:bg-(--primary) focus:ring-(--primary)'
                      onChange={(e) => handleCheckboxChange(question, e.target.checked)}
                      checked={formFields.some(field => field.label === question.label)}
                      />
                    <label
                      htmlFor={`predefinedQuestion${index + 1}`}
                      className='text-xl font-light'
                    >
                      {`"${question.label}"`}
                    </label>
                  </div>
                  <div className='pt-2 flex gap-4'>
                    <p className='font-normal'>Opciones de respuesta:</p>
                      {question.options ? (
                        <ul className='list-disc pl-5 text-lg'>
                          {question.options.map((option, index) => (
                            <li
                              key={index}
                              className='text-lg font-light'
                            >
                              {`"${option}"`}
                            </li>
                          ))}
                        </ul>
                        )
                        :
                        <p className='text-lg font-light'>Texto libre</p>
                      }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="my-10">
            <h2>Preguntas personalizadas</h2>
            <p className="mb-4">Tocá el botón <strong>Nueva pregunta</strong> para agregar una pregunta personalizada. Podés agregar tantas como quieras.</p>
            <div>
              {customQuestions.map((question) => (
                <div key={question.id}>
                  <div className="flex items-end gap-4">
                    <div className="w-8/12">
                      <label htmlFor={`customQuestion-${question.id}`} className='text-lg font-medium'>Pregunta</label>
                      <input 
                        ref={el => inputRefs.current[question.id] = el}
                        id={`customQuestion-${question.id}`} 
                        type="text" 
                        placeholder="Escribí la pregunta" 
                        className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 font-light pl-4 bg-(--secondary-light)'
                        defaultValue={question.label}
                        onChange={() => setHasChanges(prev => ({...prev, [question.id]: true}))}
                      />
                    </div>
                    <div className="w-2/12">
                      <label htmlFor={`responseType-${question.id}`} className='text-lg font-medium'>Tipo de respuesta</label>
                      <select
                        ref={el => selectRefs.current[question.id] = el}
                        id={`responseType-${question.id}`}
                        name={`responseType-${question.id}`}
                        className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 font-light pl-4 bg-(--secondary-light)'
                        defaultValue={question.type}
                        onChange={() => setHasChanges(prev => ({...prev, [question.id]: true}))}
                      >
                        <option value='text'>Texto libre</option>
                        <option value='select'>Sí o no</option>
                      </select>
                    </div>
                    <div className="w-1/12">
                      <Button
                        className={`w-full h-10 bg-(--primary) ${!hasChanges[question.id] ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                        onClick={() => {
                          handleSaveCustomQuestion(question.id, inputRefs.current[question.id].value, selectRefs.current[question.id].value);
                        }}
                        type="button"
                        disabled={!hasChanges[question.id]}
                      >
                        Guardar
                      </Button>
                    </div>
                    <div className="w-1/12">
                      <Button
                        className="w-full h-10 bg-red-400"
                        onClick={() => handleRemoveCustomQuestion(question.id)}
                        type="button"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                  {savedQuestions[question.id] && (
                    <p className="text-green-600 text-md mt-2 text-center">
                      Pregunta guardada.
                    </p>
                  )}
                </div>
              ))}
              <Button 
                className="w-50 h-10 mt-6"
                onClick={handleAddCustomQuestion}
                type="button"
              >
                Nueva pregunta
              </Button>
            </div>
          </div>
          <Button 
            type="submit"
            disabled={isLoading || !hasFormChanged()}
            className={`w-60 h-12 mt-6 mx-auto text-lg ${(isLoading || !hasFormChanged()) ? 'grayscale cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Guardando...' : 'Guardar formulario'}
          </Button>
          {error && (
            <p className="text-red-500 mt-2 text-center col-span-full">
              {error}
            </p>
          )}
        </fieldset>
      </form>
      ))}
    </div>
  )
}

export default ShelterAdoptionForm;
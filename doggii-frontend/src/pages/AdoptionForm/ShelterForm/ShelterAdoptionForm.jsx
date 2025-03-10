import { useState, useRef } from "react";
import formServices from "../../../services/formServices";
import Button from "../../../components/Button";

const ShelterAdoptionForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [hasChanges, setHasChanges] = useState({});
  const [savedQuestions, setSavedQuestions] = useState({});  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef({});
  const selectRefs = useRef({});

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

  const handleAddCustomQuestion = (e) => {
    e.preventDefault();
    setCustomQuestions(prev => [...prev, { 
      id: prev.length + 1,
      label: '',
      type: 'text',
      required: true
    }]);
  };

  const handleSaveCustomQuestion = (id, inputValue, selectValue) => {
    const newQuestion = {
      label: inputValue,
      type: selectValue,
      required: true
    };

    if (selectValue === 'select') {
      newQuestion.options = ['Sí', 'No'];
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

  const handleRemoveCustomQuestion = (id) => {
    setCustomQuestions(prev => prev.filter(question => question.id !== id));
  };

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

        const response = await formServices.createAdoptionForm(formData);
        setSuccess(response.success);
        setTimeout(() => setSuccess(false), 3000);
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
      <form
        onSubmit={handleSubmit}
        className="container relative"
      >
        {success && (
          <div className='absolute inset-0 pb-10 flex items-end justify-center bg-black/10 backdrop-blur-xs z-10 rounded-md'>
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
            disabled={isLoading}
            className={`w-60 h-12 mt-6 mx-auto text-lg ${isLoading ? 'grayscale cursor-not-allowed' : ''}`}
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
    </div>
  )
}

export default ShelterAdoptionForm;
import { useState, useEffect } from "react";
import Button from "../../../components/Button";

const ShelterAdoptionForm = () => {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    console.log('formFields actualizado:', formFields);
  }, [formFields]);

  const handleCheckboxChange = (question, checked) => {
    if (checked) {
      const { label, type, options, required } = question;
      setFormFields(prev => [...prev, { label, type, options, required }]);
    } else {
      setFormFields(prev => prev.filter(field => field.label !== question.label));
    }
  };

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
  ]

  return(
    <div className="m-8">
      <h1>Formulario de adopción</h1>
      <p>En esta sección, podés definir las preguntas que querés incluir en el formulario que los adoptantes deben completar para solicitar la adopción de alguna de tus mascotas publicadas. En <strong>Preguntas predefinidas</strong>, podés marcar las preguntas que quieras incluir en el formulario. En <strong>Preguntas personalizadas</strong>, podés agregar tus propias preguntas. Por último, en <strong>Requisitos</strong>, podés escribir los requisitos obligatorios que el adoptante debe cumplir. Al completar el formulario, el adoptante deberá marcar que leyó y acepta los requisitos.</p>
      <form action="">
        <fieldset>
          <div className="my-10">
            <h2 >Preguntas predefinidas</h2>
            <p className="mb-4">Marcá las preguntas que quieras incluir en el formulario de adopción.</p>
            <div className="flex flex-col gap-6">
              {predefinedQuestions.map((question, index) => (
                <div key={index}>
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
            <h2 className="mb-4">Preguntas personalizadas</h2>
            <div>
              <div className="flex items-end gap-4">
                <div className="w-8/12">
                  <label htmlFor='custom-question' className='text-lg font-medium'>Pregunta</label>
                  <input id="custom-question" type="text" placeholder="Escribí la pregunta" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4"/>
                </div>
                <div className="w-3/12">
                    <label htmlFor='responseType' className='text-lg font-medium'>Tipo de respuesta</label>
                    <select
                      id='responseType'
                      name='responseType'
                      className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
                    >
                      <option value='text'>Texto libre</option>
                      <option value='select'>Sí o no</option>
                    </select>
                  </div>
                  <div className="w-1/12">
                    <Button
                      className="w-25 h-10 bg-red-400"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              <Button className=" w-50 h-10 mt-6">
                Nueva pregunta
              </Button>
            </div>
          </div>

          <div className="my-10">
            <h2 className="mt-6 mb-4">Requisitos</h2>
            <textarea name="custom-requirements" id="custom-requirements" placeholder="Escribí tus requisitos" className="w-full h-40 p-3 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"></textarea>
          </div>

          <Button className=" w-60 h-12 mt-6 mx-auto text-lg">
            GUARDAR
          </Button>
        </fieldset>
      </form>
    </div>
  )
}

export default ShelterAdoptionForm;
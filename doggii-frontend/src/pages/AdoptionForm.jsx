import Button from "../components/Button";

const AdoptionForm = () => {

  return(
    <div className="m-9">
      <h1 className="mb-4">Formulario de adopción</h1>
      <p>En esta sección, podés definir las preguntas que querés incluir en el formulario que los adoptantes deben completar para solicitar la adopción de alguna de tus mascotas publicadas. En <strong>Preguntas predefinidas</strong>, podés marcar las preguntas que quieras incluir en el formulario. En <strong>Preguntas personalizadas</strong>, podés agregar tus propias preguntas. Por último, en <strong>Requisitos</strong>, podés escribir los requisitos obligatorios que el adoptante debe cumplir. Al completar el formulario, el adoptante deberá marcar que leyó y acepta los requisitos.</p>
      <div className="my-10">
        <h2 className="mb-4">Preguntas predefinidas</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question1" id="predefined-question1" aria-label="Predefined question 1" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question1" className="text-md font-light">¿Cuántas horas al día puede dedicar a su perro?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question2" id="predefined-question2" aria-label="Predefined question 2" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question2" className="text-md font-light">¿En qué tipo de vivienda vive?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question3" id="predefined-question3" aria-label="Predefined question 3" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question3" className="text-md font-light">¿Ha tenido perros u otras mascotas antes?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question4" id="predefined-question4" aria-label="Predefined question 4" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question4" className="text-md font-light">¿Está preparado para asumir los costos asociados con el cuidado de un perro, como alimentación, visitas veterinarias, medicamentos, etcétera?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question5" id="predefined-question5" aria-label="Predefined question 5" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question5" className="text-md font-light">¿Está dispuesto a invertir tiempo en la educación y entrenamiento de su perro?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question6" id="predefined-question6" aria-label="Predefined question 6" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question6" className="text-md font-light">¿Como describiría su entorno familiar y de convivencia? ¿Hay otros niños, adultos mayores, u otros animales en su hogar?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question7" id="predefined-question7" aria-label="Predefined question 7" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question7" className="text-md font-light">¿Está dispuesto a cuidar de su perro durante toda su vida, que podría ser de 10-15 años o más?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question8" id="predefined-question8" aria-label="Predefined question 8" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question8" className="text-md font-light">¿Está preparado para llevar a su perro al veterinario o a otros lugares si es necesario?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question9" id="predefined-question9" aria-label="Predefined question 9" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question9" className="text-md font-light">¿Está dispuesto a permitir visitas de seguimiento para asegurarse de que su perro se adapte bien a su nuevo hogar?</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="predefined-question10" id="predefined-question10" aria-label="Predefined question 10" className="shrink-0 mr-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            <label htmlFor="predefined-question10" className="text-md font-light">¿Por qué desea adoptar un perro?</label>
          </div>
        </div>
      </div>

      <div className="my-10">
        <h2 className="mb-4">Preguntas personalizadas</h2>
        <div>
          <input id="custom-question" type="text" placeholder="Escribí la pregunta" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"/>
          <Button className=" w-50 h-10 mt-6">
            Agregar pregunta
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
    </div>
  )
}

export default AdoptionForm;
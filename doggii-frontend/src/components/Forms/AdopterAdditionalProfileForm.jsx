import {useState} from "react";
import Button from "../Button";

const AdopterAdditionalProfileForm = () => {
  const [otherPets, setOtherPets] = useState(false);
  const [children, setChildren] = useState(false);

  return (
    <section className="p-6 my-8 rounded-md bg-(--secondary)">
      <form noValidate="" action="" className="container flex flex-col mx-auto">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-(--accent)">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Datos del hogar</p>
            <p className="text-sm">Estos datos nos ayudan a mostrarte las mascotas más aptas para tu hogar.</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full flex items-center">
				      <label htmlFor="other-pets" className="text-md">¿Hay otras mascotas en el hogar?</label>
				      <input type="checkbox" name="other-pets" id="other-pets" aria-label="Other pets" className="ml-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" checked={otherPets} onChange={(e) => setOtherPets(e.target.checked)} />
            </div>
            {otherPets && (
              <>
                <div className="col-span-full md:col-span-1">
                  <label htmlFor="other-pets-number" className="text-sm">Cantidad</label>
                  <input id="other-pets-number" type="number" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
                </div>
                <div className="col-span-full md:col-span-4">
                  <label htmlFor="other-pets-type" className="text-sm">Especie</label>
                  <input id="other-pets-type" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
                </div>
                <Button className="col-span-full md:col-span-1 w-full h-10 mx-0 mt-6">
                  +
                </Button>
                </>
            )}
            <div className="col-span-full flex items-center">
				      <label htmlFor="children" className="text-md">¿Hay niños pequeños en el hogar?</label>
				      <input type="checkbox" name="children" id="children" aria-label="Children" className="ml-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" checked={children} onChange={(e) => setChildren(e.target.checked)} />
            </div>
            {children && (
              <div className="col-span-full">
                <label htmlFor="children-ages" className="text-sm">Edades</label>
                <input id="children-ages" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
              </div>
            )}
            <div className="col-span-full flex items-center">
				      <label htmlFor="enclosed" className="text-md">¿El hogar está cerrado para que los animales no se escapen?</label>
				      <input type="checkbox" name="enclosed" id="enclosed" aria-label="Enclosed space" className="ml-2 h-4 w-4 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)" />
            </div>
            <Button className="col-span-full mx-auto mt-6">
              Guardar
            </Button>
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export default AdopterAdditionalProfileForm;
import PropTypes from 'prop-types';
import Button from "../Button";

const BasicProfileForm = ({title, description, isShelter = false}) => {
  return (
    <section className="p-6 my-8 rounded-md bg-(--secondary)">
      <form noValidate="" action="" className="container flex flex-col mx-auto">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-(--accent)">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">{title}</p>
            <p className="text-sm">{description}</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          {isShelter ? 
            <div className="col-span-full">
              <label htmlFor="firstname" className="text-sm">Nombre</label>
              <input id="firstname" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"/>
            </div>
            :
            <>
              <div className="col-span-full md:col-span-3">
                <label htmlFor="firstname" className="text-sm">Nombre</label>
                <input id="firstname" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"/>
              </div>
              <div className="col-span-full md:col-span-3">
                <label htmlFor="lastname" className="text-sm">Apellido</label>
                <input id="lastname" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
              </div>
            </>
          }
            <div className="col-span-full lg:col-span-3">
              <label htmlFor="email" className="text-sm">Correo electrónico</label>
              <input id="email" type="email" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
            </div>
            <div className="col-span-full lg:col-span-3">
              <label htmlFor="phone" className="text-sm">Número de teléfono</label>
              <input id="phone" type="tel" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
            </div>
            <div className="col-span-full">
              <label htmlFor="address" className="text-sm">Dirección</label>
              <input id="address" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
            </div>
            <div className="col-span-full lg:col-span-2">
              <label htmlFor="city" className="text-sm">Ciudad</label>
              <input id="city" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
            </div>
            <div className="col-span-full lg:col-span-2">
              <label htmlFor="state" className="text-sm">Provincia/Estado</label>
              <input id="state" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
            </div>
            <div className="col-span-full lg:col-span-2">
              <label htmlFor="country" className="text-sm">País</label>
              <input id="country" type="text" placeholder="" className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300" />
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

export default BasicProfileForm;

BasicProfileForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isShelter: PropTypes.bool
}
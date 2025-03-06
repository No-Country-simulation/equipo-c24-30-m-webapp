import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

const PetPost = () => {
  const navigate = useNavigate();
  const [requiresSpecialCare, setRequiresSpecialCare] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>Publicar una mascota</h1>
      </div>
      <section className="p-6 my-8 mx-40 rounded-md bg-(--secondary)">
        <form
          noValidate
          //onSubmit={handleSubmit}
          className="container flex flex-col mx-auto"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-(--accent)">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium text-xl">Datos de la mascota</p>
              <p className="text-md">Para poder hacer una publicación, tenés que completar los siguientes datos de la mascota.</p>
            </div>
            <div className="grid grid-cols-6 gap-6 px-20 col-span-full lg:col-span-3">
              <div className="col-span-full">
                <label htmlFor="name" className="text-lg">Nombre</label>
                <input
                  id="name"
                  name='name'
                  type="text"
                  className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="sex" className="text-lg">Género</label>
                <select
                  id="sex"
                  name='sex'
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                >
                  <option value="female">Hembra</option>
                  <option value="male">Macho</option>
                </select>
              </div>
              <div className="col-span-full">
                <p className='text-lg font-medium'>Edad</p>
                <div className='grid grid-cols-2 gap-4 pt-1'>

                    <input
                      id="quantity"
                      name='quantity'
                      type="number"
                      placeholder='1'
                      className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
                    />
                    <select
                      id="unit"
                      name='unit'
                      className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                    >
                      <option value="days">días</option>
                      <option value="months">meses</option>
                      <option value="years">años</option>
                    </select>

                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="size" className="text-lg font-medium">Tamaño</label>
                <select
                  id="size"
                  name='size'
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                >
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="big">Grande</option>
                </select>
              </div>
              <div className="col-span-full">
                <label htmlFor="vaccinated" className="text-lg font-medium">¿Tiene las vacunas al día?</label>
                <select
                  id="vaccinated"
                  name='vaccinated'
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                >
                  <option value="yes">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="col-span-full">
                <label htmlFor="neutered" className="text-lg font-medium">¿Está castrada?</label>
                <select
                  id="neutered"
                  name='neutered'
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                >
                  <option value="yes">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className='col-span-full'>
                <div className="flex items-center pb-1">
                  <label htmlFor="requires-care" className="text-lg">¿Requiere algún cuidado especial?</label>
                  <input
                    type="checkbox"
                    name="requires-care"
                    id="requires-care"
                    className="ml-2 h-5 w-5 rounded-md focus:dark:ring-(--primary) focus:dark:border-(--primary) focus:ring-2 dark:accent-(--primary)"
                    checked={requiresSpecialCare}
                    onChange={(e) => setRequiresSpecialCare(e.target.checked)}
                  />
                </div>
                {requiresSpecialCare && (
                  <div className="col-span-full">
                    <label htmlFor="special-care" className="text-lg">Cuidados especiales</label>
                    <input
                      id="special-care"
                      name='special-care'
                      type="text"
                      className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
                    />
                  </div>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="text-lg">Descripción</label>
                <textarea
                  id="description"
                  name='description'
                  className="w-full h-20 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="photo" className="text-lg">Foto</label>
                <input
                  id="photo"
                  name='photo'
                  type="file"
                  accept="image/png, image/jpeg"
                  className="w-full file:w-45 file:h-10 file:rounded-md file:bg-(--primary-light) file:font-normal font-light"
                />
              </div>
              <Button
                className='col-span-full mx-auto mt-6 w-50 text-xl'
              >
                Publicar
              </Button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default PetPost;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import uploadImage  from '../../../services/petImageService';
import petServices from '../../../services/petServices';
import Button from '../../../components/Button';

const PetPost = () => {
  const userId = useSelector(state => state.user.id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    photos: [], 
    sex: 'female',
    age: {
      days: 0,
      months: 0,
      years: 0
    },
    type: 'dog',
    size: 'pequeño',
    neutered: false,
    vaccinated: false,
    available: true,
    specialCare: null,
    description: '',
    shelter: userId
  });
  const [requiresSpecialCare, setRequiresSpecialCare] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name === 'neutered' || name === 'vaccinated') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'true'
      }));
    } else if (name === 'unit' || name === 'quantity') {
      const currentValue = formData.age.days || formData.age.months || formData.age.years || 0;
      
      const newQuantity = name === 'quantity' ? (parseInt(value) || 0) : currentValue;
      
      const newUnit = name === 'unit' ? value : (
        formData.age.days > 0 ? 'days' :
        formData.age.months > 0 ? 'months' :
        formData.age.years > 0 ? 'years' : 'days'
      );

      setFormData(prev => ({
        ...prev,
        age: {
          days: newUnit === 'days' ? newQuantity : 0,
          months: newUnit === 'months' ? newQuantity : 0,
          years: newUnit === 'years' ? newQuantity : 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const url = await uploadImage(file);
      setFormData(prev => ({
        ...prev,
        photos: [url] 
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Error al subir la imagen. Intentá de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await petServices.createPet(formData);
      console.log(response);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al publicar la mascota. Intentá de nuevo.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>Publicar una mascota</h1>
      </div>
      <section className="p-6 my-8 mx-10 xl:mx-40 rounded-md bg-(--secondary)">
        <form
          noValidate
          onSubmit={handleSubmit}
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
                  onChange={handleFieldChange}
                  className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="sex" className="text-lg">Género</label>
                <select
                  id="sex"
                  name='sex'
                  value={formData.sex}
                  onChange={handleFieldChange}
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
                      value={formData.age.days || formData.age.months || formData.age.years || ''}
                      onChange={handleFieldChange}
                      className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
                    />
                    <select
                      id="unit"
                      name='unit'
                      value={
                        formData.age.days > 0 ? 'days' :
                        formData.age.months > 0 ? 'months' :
                        formData.age.years > 0 ? 'years' : 'days'
                      }
                      onChange={handleFieldChange}
                      className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                    >
                      <option value="days">día(s)</option>
                      <option value="months">mes(es)</option>
                      <option value="years">año(s)</option>
                    </select>

                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="size" className="text-lg font-medium">Tamaño</label>
                <select
                  id="size"
                  name='size'
                  value={formData.size}
                  onChange={handleFieldChange}
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                >
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
              <div className="col-span-full">
                <label htmlFor="vaccinated" className="text-lg font-medium">¿Tiene las vacunas al día?</label>
                <select
                  id="vaccinated"
                  name='vaccinated'
                  value={formData.vaccinated.toString()}
                  onChange={handleFieldChange}
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-span-full">
                <label htmlFor="neutered" className="text-lg font-medium">¿Está castrada?</label>
                <select
                  id="neutered"
                  name='neutered'
                  value={formData.neutered.toString()}
                  onChange={handleFieldChange}
                  className='w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300'
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
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
                    <label htmlFor="specialCare" className="text-lg">Cuidados especiales</label>
                    <input
                      id="specialCare"
                      name='specialCare'
                      type="text"
                      onChange={handleFieldChange}
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
                  onChange={handleFieldChange}
                  className="w-full h-20 p-2 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
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
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading &&
                <div className="animate-spin rounded-full h-10 w-10 mx-auto mt-8 border-b-8 border-(--secondary)"></div>
                }
                {(formData.photos[0] && !isUploading) && (
                  <div className="mt-4">
                    <img src={formData.photos[0]} alt="Preview" className="max-w-50 mx-auto rounded-xl" />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className={`col-span-full mx-auto mt-6 w-50 text-xl ${isLoading || isUploading ? 'grayscale cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Publicando...' : 'Publicar'}
              </Button>
              {error && (
                <p className="text-red-500 mt-2 text-center col-span-full">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 mt-2 text-center col-span-full">
                  ¡Tu mascota se ha publicado correctamente!
                </p>
              )}
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default PetPost;
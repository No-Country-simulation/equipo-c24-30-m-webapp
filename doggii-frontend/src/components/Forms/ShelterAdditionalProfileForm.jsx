import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/userSlice';
import userServices from '../../services/userServices';
import Button from "../Button";

const ShelterAdditionalProfileForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialFormData = useMemo(() => ({
    userName: user.userName || '',
    email: user.email || '',
    phone: user.phone || ''
  }), [user]);

  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const updateData = {
        userName: formData.userName,
        email: formData.email,
        phone: formData.phone,
      };

      const data = await userServices.updateUserProfile(user.id, user.role, updateData);

      dispatch(setUserInfo({
        ...data.payload,
        _id: user.id,
      }));
      
      setFormData(data.payload);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setHasChanges(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el perfil. Intentá de nuevo.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-6 my-8 rounded-md bg-(--secondary)">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="container flex flex-col mx-auto"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-(--accent)">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Datos del representante</p>
            <p className="text-sm">Estos son los datos del representante de la asociación.</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full">
              <label htmlFor="fullName" className="text-sm">Nombre completo</label>
              <input
                id="fullName"
                name='userName'
                type="text"
                value={formData.userName}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full lg:col-span-3">
              <label htmlFor="email" className="text-sm">Correo electrónico</label>
              <input
                id="email"
                name='email'
                type="email"
                value={formData.email}
                onChange={handleFieldChange}
                placeholder=""
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full lg:col-span-3">
              <label htmlFor="phone" className="text-sm">Número de teléfono</label>
              <input
                id="phone"
                name='phone'
                type="tel"
                value={formData.phone}
                onChange={handleFieldChange}
                placeholder=""
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <Button
              type="submit"
              disabled={!hasChanges || isLoading}
              className={`col-span-full mx-auto mt-6 ${!hasChanges || isLoading ? 'grayscale cursor-not-allowed' : ''}`}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
            {error && (
              <p className="text-red-500 mt-2 text-center col-span-full">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 mt-2 text-center col-span-full">
                ¡Perfil actualizado con éxito!
              </p>
            )}
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export default ShelterAdditionalProfileForm;
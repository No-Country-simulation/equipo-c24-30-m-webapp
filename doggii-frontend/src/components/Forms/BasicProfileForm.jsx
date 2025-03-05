import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/userSlice';
import userServices from '../../services/userServices';
import PropTypes from 'prop-types';
import Button from "../Button";

const BasicProfileForm = ({title, description}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialFormData = useMemo(() => ({
    userName: user.userName || '',
    shelterName: user.shelterName || '',
    email: user.email || '',
    phone: user.phone || '',
    address: {
      street: user.address?.street || '',
      city: user.address?.city || '',
      province: user.address?.province || '',
      country: user.address?.country || ''
    }
  }), [user]);

  const [formData, setFormData] = useState(initialFormData);

  const hasChanges = useMemo(() => {
    const compareObjects = (obj1, obj2) => {
      if (typeof obj1 !== 'object') return obj1 !== obj2;
      if (!obj1 || !obj2) return true;
      
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      
      if (keys1.length !== keys2.length) return true;
      
      return keys1.some(key => compareObjects(obj1[key], obj2[key]));
    };
    
    return compareObjects(initialFormData, formData);
  }, [initialFormData, formData]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
        address: {
          street: formData.address.street,
          city: formData.address.city,
          province: formData.address.province,
          country: formData.address.country
        }
      };

      const data = await userServices.updateUserProfile(user.id, user.role, updateData);

      dispatch(setUserInfo({
        ...data.payload,
        _id: user.id
      }));
      
      setFormData(data.payload);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
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
            <p className="font-medium">{title}</p>
            <p className="text-sm">{description}</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            {user.role === "shelter" ? (
              <div className="col-span-full">
                <label htmlFor="shelterName" className="text-sm">Nombre del refugio</label>
                <input
                  id="shelterName"
                  name="shelterName"
                  type="text"
                  value={formData.shelterName}
                  onChange={handleFieldChange}
                  className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
            ) : (
              <div className="col-span-full">
                <label htmlFor="fullName" className="text-sm">Nombre completo</label>
                <input
                  id="fullName"
                  name="userName"
                  type="text"
                  value={formData.userName}
                  onChange={handleFieldChange}
                  className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
            )}
            <div className="col-span-full lg:col-span-3">
              <label htmlFor="email" className="text-sm">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full lg:col-span-3">
              <label htmlFor="phone" className="text-sm">Número de teléfono</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="address" className="text-sm">Dirección</label>
              <input
                id="address"
                name="address.street"
                type="text"
                value={formData.address.street}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full lg:col-span-2">
              <label htmlFor="city" className="text-sm">Ciudad</label>
              <input
                id="city"
                name="address.city"
                type="text"
                value={formData.address.city}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full lg:col-span-2">
              <label htmlFor="state" className="text-sm">Provincia/Estado</label>
              <input
                id="state"
                name="address.province"
                type="text"
                value={formData.address.province}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <div className="col-span-full lg:col-span-2">
              <label htmlFor="country" className="text-sm">País</label>
              <input
                id="country"
                name="address.country"
                type="text"
                value={formData.address.country}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
            <Button
              type="submit"
              disabled={!hasChanges || isLoading}
              className={`col-span-full mx-auto mt-6 ${!hasChanges || isLoading ? "grayscale cursor-not-allowed" : ''}`}
            >
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
  );
};

export default BasicProfileForm;

BasicProfileForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isShelter: PropTypes.bool
};
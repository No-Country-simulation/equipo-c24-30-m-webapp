import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/userSlice';
import userServices from '../../services/userServices';
import PropTypes from 'prop-types';
import Button from "../Button";

const BasicProfileForm = ({title, description}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    phone: '',
    shelterPhone: '',
    email: '',
    shelterEmail: '',
    userName: '',
    shelterName: '',
    'address.street': '',
    'address.city': '',
    'address.province': '',
    'address.country': ''
  });

  const initialFormData = useMemo(() => ({
    userName: user.userName || '',
    email: user.email || '',
    phone: user.phone || '',
    address: {
      street: user.address?.street || '',
      city: user.address?.city || '',
      province: user.address?.province || '',
      country: user.address?.country || ''
    },
    shelterName: user.shelterName || '',
    shelterEmail: user.shelterEmail || '',
    shelterPhone: user.shelterPhone || ''
  }), [user]);

  const [formData, setFormData] = useState(initialFormData);

  const checkFormChanges = (newData) => {
    const simpleFields = ['userName', 'email', 'phone', 'shelterName', 'shelterEmail', 'shelterPhone'];
    const hasSimpleChanges = simpleFields.some(field => newData[field] !== initialFormData[field]);

    const addressFields = ['street', 'city', 'province', 'country'];
    const hasAddressChanges = addressFields.some(field => 
      newData.address[field] !== initialFormData.address[field]
    );

    return hasSimpleChanges || hasAddressChanges;
  };

  const validatePhone = (phone) => {
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return 'El número debe tener al menos 10 dígitos';
    }
    if (phoneDigits.length > 15) {
      return 'El número no debe exceder los 15 dígitos';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'El correo electrónico es obligatorio';
    }
    if (!emailRegex.test(email)) {
      return 'El correo electrónico no es válido';
    }
    return '';
  };

  const validateRequired = (value, fieldName) => {
    if (!value || value.trim() === '') {
      return `${fieldName} es obligatorio`;
    }
    return '';
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    let fieldError = '';

    if (name === 'phone' || name === 'shelterPhone') {
      fieldError = validatePhone(value);
    } else if (name === 'email' || name === 'shelterEmail') {
      fieldError = validateEmail(value);
    } else if (name === 'userName') {
      fieldError = validateRequired(value, 'Nombre completo');
    } else if (name === 'shelterName') {
      fieldError = validateRequired(value, 'Nombre del refugio');
    } else if (name.startsWith('address.')) {
      const fieldNames = {
        'address.street': 'Dirección',
        'address.city': 'Ciudad',
        'address.province': 'Provincia/Estado',
        'address.country': 'País'
      };
      fieldError = validateRequired(value, fieldNames[name]);
    }

    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));

    let newFormData;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      newFormData = {
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      };
    } else {
      newFormData = {
        ...formData,
        [name]: value
      };
    }
    
    setFormData(newFormData);
    setHasChanges(checkFormChanges(newFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let updateData = {
        userName: formData.userName,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          province: formData.address.province,
          country: formData.address.country
        }
      };

      if (user.role === "shelter") {
        updateData = {
          ...updateData,
          shelterName: formData.shelterName,
          shelterEmail: formData.shelterEmail,
          shelterPhone: formData.shelterPhone
        };
      } else {
        updateData = {
          ...updateData,
          email: formData.email,
          phone: formData.phone
        };
      }

      const data = await userServices.updateUserProfile(user.role, updateData);

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
                {validationErrors.shelterName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.shelterName}</p>
                )}
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
                {validationErrors.userName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.userName}</p>
                )}
              </div>
            )}
            <div className="col-span-full lg:col-span-3">
              <label htmlFor="email" className="text-sm">Correo electrónico</label>
              <input
                id="email"
                name={user.role === "shelter" ? "shelterEmail" : "email"}
                type="email"
                value={user.role === "shelter" ? formData.shelterEmail : formData.email}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
              {validationErrors[user.role === "shelter" ? "shelterEmail" : "email"] && (
                <p className="text-red-500 text-sm mt-1">{validationErrors[user.role === "shelter" ? "shelterEmail" : "email"]}</p>
              )}
            </div>
            <div className="col-span-full lg:col-span-3">
              <label htmlFor="phone" className="text-sm">Número de teléfono</label>
              <input
                id="phone"
                name={user.role === "shelter" ? "shelterPhone" : "phone"}
                type="tel"
                value={user.role === "shelter" ? formData.shelterPhone : formData.phone}
                onChange={handleFieldChange}
                className="w-full h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 focus:dark:ring-violet-600 dark:border-gray-300"
              />
              {validationErrors[user.role === "shelter" ? "shelterPhone" : "phone"] && (
                <p className="text-red-500 text-sm mt-1">{validationErrors[user.role === "shelter" ? "shelterPhone" : "phone"]}</p>
              )}
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
              {validationErrors['address.street'] && (
                <p className="text-red-500 text-sm mt-1">{validationErrors['address.street']}</p>
              )}
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
              {validationErrors['address.city'] && (
                <p className="text-red-500 text-sm mt-1">{validationErrors['address.city']}</p>
              )}
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
              {validationErrors['address.province'] && (
                <p className="text-red-500 text-sm mt-1">{validationErrors['address.province']}</p>
              )}
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
              {validationErrors['address.country'] && (
                <p className="text-red-500 text-sm mt-1">{validationErrors['address.country']}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={!hasChanges || isLoading || Object.values(validationErrors).some(error => error !== '')}
              className={`col-span-full mx-auto mt-6 ${!hasChanges || isLoading || Object.values(validationErrors).some(error => error !== '') ? "grayscale cursor-not-allowed" : ''}`}
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
  description: PropTypes.string
};
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
  const [validationErrors, setValidationErrors] = useState({
    phone: '',
    email: '',
    userName: ''
  });

  const initialFormData = useMemo(() => ({
    userName: user.userName || '',
    email: user.email || '',
    phone: user.phone || ''
  }), [user]);

  const [formData, setFormData] = useState(initialFormData);

  const checkFormChanges = (newData) => {
    const fields = ['userName', 'email', 'phone'];
    const hasChanged = fields.some(field => newData[field] !== initialFormData[field]);

    return hasChanged;
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

    if (name === 'phone') {
      fieldError = validatePhone(value);
    } else if (name === 'email') {
      fieldError = validateEmail(value);
    } else if (name === 'userName') {
      fieldError = validateRequired(value, 'Nombre completo');
    }

    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));

    const newFormData = {
        ...formData,
        [name]: value
      };
    
    setFormData(newFormData);
    setHasChanges(checkFormChanges(newFormData));
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
    <section className="p-6 my-6 rounded-md bg-(--secondary)">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="container flex flex-col mx-auto"
      >
        <fieldset className="grid grid-cols-4 gap-8 p-6 rounded-md shadow-sm bg-(--accent)">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="text-xl font-medium">Datos del representante</p>
            <p>Estos son los datos del representante de la asociación.</p>
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
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light"
              />
              {validationErrors.userName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.userName}</p>
              )}
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
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
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
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-dark) bg-(--secondary-ultralight) font-light"
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={!hasChanges || isLoading || Object.values(validationErrors).some(error => error !== '')}
              className={`col-span-full mx-auto mt-4 ${!hasChanges || isLoading || Object.values(validationErrors).some(error => error !== '') ? 'grayscale cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
            {error && (
              <p className="text-red-500 text-center col-span-full">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 text-center col-span-full">
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
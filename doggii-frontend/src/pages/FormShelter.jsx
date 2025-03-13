import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../redux/slices/authSlice";
import { setUserInfo } from "../redux/slices/userSlice";
import Button from "../components/Button";

const FormShelter = () => {
  const [formData, setFormData] = useState({
    shelterName: "",       // Nombre del refugio
    userName: "",          // Nombre del responsable
    email: "",             // Correo electrónico
    password: "",          // Contraseña
    confirmPassword: "",   // Repetir contraseña
    termsAccepted: false,  // Aceptación de términos y condiciones
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Limpiar el error asociado al campo que se está modificando
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Limpiar el mensaje de error para este campo
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.shelterName.trim()) newErrors.shelterName = "El nombre del refugio es obligatorio.";
    if (!formData.userName.trim()) newErrors.userName = "El nombre del responsable es obligatorio.";
    if (!formData.email.trim()) newErrors.email = "El correo electrónico es obligatorio.";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "Debes aceptar los términos y condiciones.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Validar el formulario antes de enviarlo
    if (!validateForm()) return;

    // Crear el objeto newUser con los datos del formulario
    const newUser = {
      userName: formData.userName,
      password: formData.password,
      email: formData.email,
      shelterName: formData.shelterName,
      admin: false,
      role: "Shelter",
    };

    try {
      // Registrar al usuario
      const registerResponse = await axios.post("http://localhost:8082/api/auth/register", newUser);
      
      if (registerResponse.data.success) {
        // Iniciar sesión automáticamente
        const loginResponse = await axios.post("http://localhost:8082/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const { token, user } = loginResponse.data.payload;

        if (token) {
          // Guardar el token en localStorage
          localStorage.setItem("accessToken", token);
          // Configurar el token en los headers de axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Actualizar el estado de Redux
          dispatch(setUserInfo(user));
          dispatch(loginSuccess(token));
          
          // Redirigir al dashboard
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error en el registro, intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url(/src/assets/images/login-background.jpeg)] bg-black/50 bg-opacity-10 bg-blend-multiply">
      <div className="max-w-xl min-w-md p-10 rounded-xl bg-(--accent) shadow-2xl">
        <button
          onClick={() => navigate("/options-forms")}
          className="text-(--secondary-dark) hover:text-(--secondary) text-base self-start"
        >
          ← Regresar
        </button>
        <img src="/src/assets/logo/inline-logo.png" alt="Logo" className="w-50 h-auto mx-auto mb-4"/>
        <h1 className="text-2xl font-bold mb-4 text-center">Registro para refugios</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: Nombre del refugio */}
          <div className='space-y-1'>
            <label htmlFor='shelterName' className='block text-sm font-medium'>
              Nombre del refugio
            </label>
            <input
              type="text"
              name="shelterName"
              placeholder="Nombre del refugio"
              value={formData.shelterName}
              onChange={handleChange}
              className="w-full px-3 py-2 text-base font-normal rounded-md border border-gray-300 focus:outline-none focus:ring-3 focus:ring-(--secondary-dark) focus:border-white"
            />
            {errors.shelterName && <p className="text-red-500 text-sm">{errors.shelterName}</p>}
          </div>

          {/* Campo: Nombre del responsable */}
          <div className='space-y-1'>
            <label htmlFor='userName' className='block text-sm font-medium'>
              Nombre del responsable
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Nombre del responsable"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-3 py-2 text-base font-normal rounded-md border border-gray-300 focus:outline-none focus:ring-3 focus:ring-(--secondary-dark) focus:border-white"
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
          </div>

          {/* Campo: Correo electrónico */}
          <div className='space-y-1'>
            <label htmlFor='email' className='block text-sm font-medium'>
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-base font-normal rounded-md border border-gray-300 focus:outline-none focus:ring-3 focus:ring-(--secondary-dark) focus:border-white"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Campo: Contraseña */}
          <div className='space-y-1'>
            <label htmlFor='password' className='block text-sm font-medium'>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-base font-normal rounded-md border border-gray-300 focus:outline-none focus:ring-3 focus:ring-(--secondary-dark) focus:border-white"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Campo: Repetir contraseña */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repetir contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 text-base font-normal rounded-md border border-gray-300 focus:outline-none focus:ring-3 focus:ring-(--secondary-dark) focus:border-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Campo: Aceptar términos y condiciones */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="shrink-0 rounded-md accent-(--primary) checked:bg-(--primary) checked:hover:bg-(--primary) focus:ring-(--primary)"
            />
            <label className="block font-medium">
              Al crear una cuenta aceptas los{" "}
              <a href="/terms" className="text-(--secondary-dark) hover:text-(--secondary) underline">
                Términos y condiciones
              </a>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
          )}

          {/* Botón de envío */}
          <Button
            type="submit"
            className="mx-auto text-base"
          >
            Crear cuenta
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormShelter;
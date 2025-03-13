import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../redux/slices/authSlice";
import { setUserInfo } from "../redux/slices/userSlice";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={() => navigate("/options-forms")}
          className="text-blue-500 mb-4"
        >
          ← Regresar
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Registro para refugios</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo: Nombre del refugio */}
          <div>
            <input
              type="text"
              name="shelterName"
              placeholder="Nombre del refugio"
              value={formData.shelterName}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.shelterName && <p className="text-red-500 text-sm">{errors.shelterName}</p>}
          </div>

          {/* Campo: Nombre del responsable */}
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Nombre del responsable"
              value={formData.userName}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
          </div>

          {/* Campo: Correo electrónico */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Campo: Contraseña */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 w-full rounded"
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
              className="border p-2 w-full rounded"
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
            />
            <label>
              Al crear una cuenta aceptas los{" "}
              <a href="/terms" className="text-blue-500 underline">
                Términos y condiciones
              </a>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormShelter;
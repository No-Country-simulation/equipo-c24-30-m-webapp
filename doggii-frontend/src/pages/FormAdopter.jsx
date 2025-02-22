import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../redux/slices/authSlice";

const FormAdopter = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
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
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "El nombre es obligatorio.";
    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio.";
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

    if (!validateForm()) return;

    const newUser = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      admin: false,
      userRole: "adopter",
    };

    try {
      const response = await axios.post("https://tu-api.com/register", newUser);
      dispatch(loginSuccess(response.data.user));
      navigate("/dashboard");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Registro para adoptar</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Nombre completo"
              value={formData.userName}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
          </div>
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
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded ${
              Object.keys(errors).length > 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={Object.keys(errors).length > 0}
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAdopter;

import { useNavigate } from "react-router-dom";

const OptionsForms = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => navigate("/login")}
          className="text-blue-500 mb-4"
        >
          ← Regresar
        </button>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        ¿Cómo quieres registrarte?
      </h1>
      <div className="flex gap-6">
        {/* Card Adopter */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-72 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
          onClick={() => navigate("/form-adopter")}
        >
          <h2 className="text-xl font-semibold text-center mb-2">Como adoptante</h2>
          <p className="text-gray-600 text-center">
            Soy una persona que quiere adoptar una mascota.
          </p>
        </div>

        {/* Card Shelter */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-72 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
          onClick={() => navigate("/form-shelter")}
        >
          <h2 className="text-xl font-semibold text-center mb-2">Como refugio</h2>
          <p className="text-gray-600 text-center">
            Soy el responsable de un refugio de animales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OptionsForms;

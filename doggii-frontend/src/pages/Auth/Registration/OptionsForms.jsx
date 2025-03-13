import { useNavigate } from "react-router-dom";

const OptionsForms = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[url(/src/assets/images/login-background.jpeg)] bg-black/50 bg-opacity-10 bg-blend-multiply">
      <div className='flex flex-col items-center justify-center max-w-2xl min-w-sm p-10 rounded-xl bg-(--accent) shadow-2xl'>
        <button
          onClick={() => navigate("/login")}
          className="text-(--secondary-dark) hover:text-(--secondary) text-base self-start"
        >
          ← Regresar
        </button>
        <img src="/src/assets/logo/inline-logo.png" alt="Logo" className="w-50 h-auto mx-auto mb-4"/>
        <h1 className="text-2xl font-bold mb-4">
          ¿Cómo querés registrarte?
        </h1>
        <div className="flex flex-col mx-auto md:flex-row gap-4">
          {/* Card Adopter */}
          <div
            className="bg-(--secondary-ultralight) p-3 rounded-lg shadow-lg w-3xs cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-(--secondary-light)"
            onClick={() => navigate("/form-adopter")}
          >
            <h2 className="text-lg font-semibold text-center mb-2">Como adoptante</h2>
            <p className="text-base font-light text-center">
              Soy una persona que quiere adoptar una mascota.
            </p>
          </div>

          {/* Card Shelter */}
          <div
            className="bg-(--secondary-ultralight) p-3 rounded-lg shadow-lg w-3xs cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-(--secondary-light)"
            onClick={() => navigate("/form-shelter")}
          >
            <h2 className="text-lg font-semibold text-center mb-2">Como refugio</h2>
            <p className="text-base font-light text-center">
              Soy el responsable de un refugio de animales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsForms;

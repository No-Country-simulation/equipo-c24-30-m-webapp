import { Link } from "react-router-dom";
import Button from "../Button";

const Benefits = () => {

  return (
    <section id="benefits" className="p-10 scroll-mt-65 lg:scroll-mt-25">
      <h2 className="text-4xl text-center font-medium mb-5 lg:text-5xl">
        Beneficios de adoptar
      </h2>
      <p className="mb-5 text-xl px-10 md:px-20">Adoptar salva vidas y le da a una mascota la oportunidad de tener un hogar lleno de amor. más adelante, más información</p>
      <Button 
        as={Link}
        to="/options-forms"
        className="mx-auto mt-6 text-lg shadow-xl h-12">
        Unite a nuestra comunidad
      </Button>
      <p className="text-center mt-3 text-gray-500">
        ¿Ya estás registrado?&nbsp;
        <Link
          to="/login"
          className="text-(--secondary-dark) font-medium"
        >
          Iniciá sesión.
        </Link>
      </p>
    </section>
  )
};

export default Benefits;
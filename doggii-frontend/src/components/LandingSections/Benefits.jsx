import { Link } from "react-router-dom";
import Button from "../Button";

const Benefits = () => {

  return (
    <section id="benefits" className="px-10 py-20 lg:px-20 scroll-mt-65 lg:scroll-mt-25">
      <h2 className="text-4xl text-center font-medium mb-5 lg:text-5xl">
        Beneficios de adoptar
      </h2>
      <p className="mb-5 text-xl text-center">Adoptar salva vidas y le da a una mascota la oportunidad de tener un hogar lleno de amor. más, ayuda a reducir la cantidad de animales en situación de calle y apoya el trabajo de los refugios. ¡Tu nuevo mejor amigo te está esperando!</p>
      <Button 
        as={Link}
        to="/options-forms"
        className="w-fit mx-auto mt-6 text-xl">
        Unite a nuestra comunidad
      </Button>
      <p className="text-center mt-3 text-lg text-gray-800">
        ¿Ya estás registrado?&nbsp;
        <Link
          to="/login"
          className="text-(--secondary-dark) font-medium hover:text-(--secondary)"
        >
          Iniciá sesión.
        </Link>
      </p>
    </section>
  )
};

export default Benefits;
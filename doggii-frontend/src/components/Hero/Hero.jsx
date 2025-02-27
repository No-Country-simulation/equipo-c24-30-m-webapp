import { Link } from "react-router-dom";
import Button from "../Button";

const Hero = () => {

  return (
    <section>
      <div className="w-full flex flex-col justify-center p-6 space-y-10 sm:p-12 lg:p-24 lg:flex-row lg:justify-between lg:space-y-0">
        <div className="flex flex-col justify-center text-center space-y-10 rounded-sm lg:max-w-2xl xl:max-w-3xl lg:text-left lg:space-y-20">
          <h1 className="text-5xl font-medium leading-none sm:text-6xl">
            Cada
            <span className="text-(--secondary-dark)"> mascota </span>
            <br />
            merece una
            <span className="text-(--secondary-dark)"> oportunidad</span>
          </h1>
          <Button 
            as={Link}
            to="/options-forms"
            className="w-35 h-12 mx-auto text-2xl"
          >
            Unite
          </Button>
        </div>
        <img src="src/assets/images/hero.jpg" alt="" className="max-w-xs mx-auto sm:max-w-sm xl:max-w-md rounded-xl shadow-xl object-cover object-center" />
      </div>
    </section>
  )
};

export default Hero;
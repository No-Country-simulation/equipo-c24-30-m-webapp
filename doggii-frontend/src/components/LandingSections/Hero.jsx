import { Link } from "react-router-dom";
import Button from "../Button";

const Hero = () => {

  return (
    <section className="w-full h-screen">
      <div className="h-full px-6 sm:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-3 place-items-center">
        <div className="col-span-2 space-y-15">
          <h1 className="text-5xl font-medium leading-none text-center sm:text-6xl lg:text-7xl lg:text-left">
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
        <div className="col-span-1">
          <div className="relative aspect-square bg-white shadow-2xl rotate-6 p-8 pb-24 max-w-[500px] w-full">
            <img 
              src="src/assets/images/hero.jpg" 
              alt="" 
              className="w-full h-full object-cover object-center"
            />
            <img 
              src="src/assets/images/thumbtack.png" 
              alt="" 
              className="absolute top-1 left-1/2 -translate-x-1/2 w-15"
            />
          </div>
        </div>
      </div>
    </section>
  )
};

export default Hero;
import { useState } from "react";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import Button from "../Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("accessToken") ? true : false;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-(--secondary-light) h-25">
      <div className="flex justify-between h-full w-full py-4 px-8">
        <img
          src="src/assets/logo/inline-logo-dark.png"
          alt="Doggii"
        />
        <ul className="items-center hidden space-x-3 lg:flex text-xl gap-4">
          <NavItems/>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {isLoggedIn ?
            <Button
              as={Link}
              to="/dashboard"
              className="w-45"
            >
              Ir a la plataforma
            </Button>
            :
            <Button
              as={Link}
              to="/login"
              className="w-35"
            >
              Iniciar sesión
            </Button>
          }
        </div>
        <button
          className="p-4 my-auto lg:hidden relative w-8 h-8 flex flex-col justify-center items-center"
          onClick={toggleMenu}
        >
          <div className={`w-8 h-0.5 bg-black absolute transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></div>
          <div className={`w-8 h-0.5 bg-black absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-8 h-0.5 bg-black absolute transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></div>
        </button>
      </div>

      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 flex justify-between items-center bg-(--secondary-light)' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <ul className="flex flex-col gap-2 p-4 text-lg">
          <NavItems />
        </ul>
          {isLoggedIn ?
            <Button
              as={Link}
              to="/dashboard"
              className="w-45 h-12 mr-8"
            >
              Ir a la plataforma
            </Button>
            :
            <Button
              as={Link}
              to="/login"
              className="w-35 h-12 mr-8"
            >
              Iniciar sesión
            </Button>
          }
      </div>
    </header>
  )
}

export default Navbar;
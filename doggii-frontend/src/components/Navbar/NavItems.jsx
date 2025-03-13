import { Link } from "react-router-dom";

const NavItems = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <li className="m-0">
        <Link 
          onClick={(e) => scrollToSection(e, 'how-it-works')} 
          className="flex items-center px-2 font-normal hover:border-b-4 hover:border-(--primary)" 
          to="#how-it-works"
        >
          Funcionamiento
        </Link>
      </li>
      <li className="m-0">
        <Link 
          onClick={(e) => scrollToSection(e, 'pets')} 
          className="flex items-center px-2 font-normal hover:border-b-4 hover:border-(--primary)" 
          to="#pets"
        >
          Mascotas
        </Link>
      </li>
      <li className="m-0">
        <Link 
          onClick={(e) => scrollToSection(e, 'testimonials')} 
          className="flex items-center px-2 font-normal hover:border-b-4 hover:border-(--primary)" 
          to="#testimonials"
        >
          Testimonios
        </Link>
      </li>
      <li className="m-0">
        <Link 
          onClick={(e) => scrollToSection(e, 'benefits')} 
          className="flex items-center px-2 font-normal hover:border-b-4 hover:border-(--primary)" 
          to="#benefits"
        >
          Beneficios
        </Link>
      </li>
    </>
  );
};

export default NavItems;
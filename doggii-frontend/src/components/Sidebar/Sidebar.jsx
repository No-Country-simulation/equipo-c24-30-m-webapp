import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="h-screen p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800 flex flex-col">
      <div className="p-2 space-x-4">
        <img src="src/assets/logo/inline-logo.png" alt="" className="w-full h-auto"/>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <ul className="pt-2 pb-2 space-y-1 text-sm">
          <li>
            <Link to="/" className="flex items-center p-2 space-x-3 rounded-md">
              <span>Inicio</span>
            </Link>
          </li>
          <li className="dark:bg-gray-100 dark:text-gray-900">
            <Link to="/" className="flex items-center p-2 space-x-3 rounded-md">
              <span>Tu perfil</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center p-2 space-x-3 rounded-md">
              <span>Mascotas</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center p-2 space-x-3 rounded-md">
              <span>Solicitudes</span>
            </Link>
          </li>
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
          <li>
            <Link to="/" className="flex items-center p-2 space-x-3 rounded-md">
              <span>Cerrar sesión</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;
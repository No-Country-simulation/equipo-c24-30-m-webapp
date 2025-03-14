import { Link, useLocation } from "react-router-dom";
import { getUserRole } from "../../services/userRoleSelectorMock";
import { navItems } from "./sidebarConfig.js";

const Sidebar = () => {
  const userRole = getUserRole();
  const currentNavItems = navItems[userRole];
  const location = useLocation();

  return (
    <div className="h-full p-3 space-y-2 dark:bg-gray-50 dark:text-gray-800 flex flex-col">
      <div className="p-2 space-x-4">
        <img src="src/assets/logo/inline-logo.png" alt="Doggii" className="w-full h-auto"/>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <ul className="pt-2 pb-2 space-y-1 text-lg font-light">
          {currentNavItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={`flex items-center p-2 space-x-3 rounded-md ${location.pathname === item.path ? 'bg-gray-200 font-medium' : null}`}>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-lg font-light">
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
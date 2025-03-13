import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { navItems } from "./sidebarConfig.js";
import useLogout from "../../hooks/useLogout.js";

const Sidebar = () => {
  const userRole = useSelector((state) => state.user.role);
  const currentNavItems = navItems[userRole];
  const location = useLocation();
  const handleLogout = useLogout();

  return (
    <div className="h-full p-3 space-y-2 bg-(--secondary-light) flex flex-col">
      <div className="p-2 space-x-4">
        <Link to="/">
          <img src="src/assets/logo/inline-logo-dark.png" alt="Doggii" className="w-4/5 mx-auto"/>
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-between">
      <ul className="pt-2 pb-2 space-y-1 text-lg font-light">
        {currentNavItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className={`flex items-center p-2 space-x-3 rounded-md ${location.pathname === item.path ? 'bg-(--secondary-dark) rounded-xl font-medium' : null}`}>
              <img src={item.icon} alt={item.name} />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
        <ul className="pt-4 pb-2 space-y-1 text-lg font-light">
          <li>
            <Link onClick={handleLogout} to="/" className="flex items-center p-2 space-x-3 rounded-md">
              <img src="src/assets/icons/log-out.png" alt="Cerrar sesión" />
              <span>Cerrar sesión</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;
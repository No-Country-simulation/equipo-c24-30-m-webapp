import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";

const PlatformLayout = () => {
  const userRole = useSelector((state) => state.user.role);

  // Si hay token pero aún no se guardó el rol, mostrar spinner
  if (!userRole && localStorage.getItem('accessToken')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-40 w-40 border-b-8 border-(--secondary)"></div>
      </div>
    );
  }
  
  // Si no hay token ni rol, redirigir a login
  if (!userRole && !localStorage.getItem('accessToken')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr]">
      <Sidebar className="row-span-1"/>
      <Outlet className="row-span-1"/>
    </div>
  )
}

export default PlatformLayout;
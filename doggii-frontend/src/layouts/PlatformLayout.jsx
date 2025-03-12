import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const PlatformLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr]">
      <Sidebar className="row-span-1"/>
      <Outlet className="row-span-1"/>
    </div>
  )
}

export default PlatformLayout;
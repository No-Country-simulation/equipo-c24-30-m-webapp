import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

const PlatformLayout = () => {

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] grid-rows-[1fr_auto]">
      <Sidebar className="row-span-1"/>
      <Outlet className="row-span-1"/>
      <Footer className="col-span-2"/>
    </div>
  )
}

export default PlatformLayout;
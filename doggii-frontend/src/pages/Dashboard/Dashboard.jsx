import AdopterDashboard from "./DashboardViews/AdopterDashboard";
import ShelterDashboard from "./DashboardViews/ShelterDashboard";
import AdminDashboard from "./DashboardViews/AdminDashboard";
import { getUserRole } from "../../test/userRoleSelectorMock";

const Dashboard = () => {
  const userRole = getUserRole();

  return (
    <div>
      <h1 className="m-9">¡Hola, NOMBRE!</h1>

      {userRole === "admin" ?
        <AdminDashboard />
        :
        (userRole === "adopter" ?
          <AdopterDashboard />
          :
          <ShelterDashboard />)
      }
    </div>
  )
}

export default Dashboard;
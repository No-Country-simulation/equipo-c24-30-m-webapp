import AdopterDashboard from "./DashboardViews/AdopterDashboard";
import ShelterDashboard from "./DashboardViews/ShelterDashboard";
import AdminDashboard from "./DashboardViews/AdminDashboard";

const Dashboard = () => {
  const userRole = "adopter";
  const admin = false;

  return (
    <div>
      <h1 className="m-9">¡Hola, NOMBRE!</h1>

      {admin ?
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
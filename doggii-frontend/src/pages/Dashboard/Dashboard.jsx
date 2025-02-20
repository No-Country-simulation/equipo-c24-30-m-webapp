import AdopterDashboard from "./DashboardViews/AdopterDashboard";
import ShelterDashboard from "./DashboardViews/ShelterDashboard";

const Dashboard = () => {
  const userRole = "shelter";

  return (
    <div>
      <h1 className="m-9">¡Hola, NOMBRE!</h1>

      {userRole === "adopter" ?
        <AdopterDashboard />
        :
        <ShelterDashboard />
      }
    </div>
  )
}

export default Dashboard;
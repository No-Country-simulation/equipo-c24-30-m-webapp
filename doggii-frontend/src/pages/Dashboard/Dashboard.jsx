import AdopterDashboard from "./DashboardViews/AdopterDashboard";
import ShelterDashboard from "./DashboardViews/ShelterDashboard";
import AdminDashboard from "./DashboardViews/AdminDashboard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  console.log(user)

  return (
    <div>
      <h1 className="m-9">¡Hola, {user.userName}!</h1>

      {user.role.toLowerCase() === "admin" ?
        <AdminDashboard />
        :
        (user.role.toLowerCase() === "adopter" ?
          <AdopterDashboard />
          :
          <ShelterDashboard />)
      }
    </div>
  )
}

export default Dashboard;
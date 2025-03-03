import AdopterDashboard from './DashboardViews/AdopterDashboard';
import ShelterDashboard from './DashboardViews/ShelterDashboard';
import AdminDashboard from './DashboardViews/AdminDashboard';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1 className='m-9'>¡Hola, {user.userName}!</h1>

      {user.role === 'admin' ?
        <AdminDashboard />
        : (user.role === 'adopter' ?
          <AdopterDashboard />
          : (user.role === 'shelter' ?
            <ShelterDashboard />
            : null)
          )
      }
    </div>
  )
}

export default Dashboard;
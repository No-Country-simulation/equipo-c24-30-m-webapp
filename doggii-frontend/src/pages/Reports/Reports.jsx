import AdopterReports from './ReportsViews/AdopterReports';
import ShelterReports from './ReportsViews/ShelterReports';
import AdminReports from './ReportsViews/AdminReports';
import { useSelector } from "react-redux";

const Reports = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1 className='m-9 mb-4'>Reportes</h1>

      {user.role === "admin" ?
        <AdminReports />
        : (user.role === 'adopter' ?
          <AdopterReports />
          : (user.role === 'shelter' ?
            <ShelterReports />
            : null)
          )
      }
    </div>
  )
}

export default Reports;
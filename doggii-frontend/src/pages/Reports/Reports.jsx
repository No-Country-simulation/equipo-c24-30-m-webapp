import AdopterReports from './ReportsViews/AdopterReports';
import ShelterReports from './ReportsViews/ShelterReports';
import AdminReports from './ReportsViews/AdminReports';
import { getUserRole } from "../../test/userRoleSelectorMock";

const Reports = () => {
  const userRole = getUserRole();

  return (
    <div>
      <h1 className='m-9 mb-4'>Reportes</h1>

      {userRole === "admin" ?
        <AdminReports />
        :
        (userRole === 'adopter' ?
          <AdopterReports />
          :
          <ShelterReports />)
      }
    </div>
  )
}

export default Reports;
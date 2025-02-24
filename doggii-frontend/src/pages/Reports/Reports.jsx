import AdopterReports from './ReportsViews/AdopterReports';
import ShelterReports from './ReportsViews/ShelterReports';
import AdminReports from './ReportsViews/AdminReports';

const Reports = () => {
  const userRole = 'adopter';
  const admin = false;

  return (
    <div>
      <h1 className='m-9 mb-4'>Reportes</h1>

      {admin ?
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
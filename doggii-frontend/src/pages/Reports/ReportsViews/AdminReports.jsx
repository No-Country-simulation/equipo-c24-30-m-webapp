import { useState } from 'react';
import ReportsTable from '../../../components/Tables/ReportsTable';
import reportsDataMock from '../../../test/reportsDataMock.json';
import Button from '../../../components/Button';

const AdminReports = () => {
  const [currentReportData, setCurrentReportData] = useState(reportsDataMock)
  const [search, setSearch] = useState('')

  const handleSearch = (searchValue) => {
    const searchTerm = searchValue.toLowerCase();
    const filteredData = reportsDataMock.filter((report) => 
      (report.id?.toLowerCase() || '').includes(searchTerm) ||
      (report.category?.toLowerCase() === 'fraud' ? 'fraude' 
        : report.category?.toLowerCase() === 'bug' ? 'mal funcionamiento' 
          : report.category?.toLowerCase() === 'misconduct' ? 'conducta inapropiada' 
            : '').includes(searchTerm) ||
      (report.url?.toLowerCase() || '').includes(searchTerm) ||
      (report.description?.toLowerCase() || '').includes(searchTerm) ||
      (report.userId?.toLowerCase() || '').includes(searchTerm) ||
      (report.createdAt?.toLowerCase() || '').includes(searchTerm) ||
      (report.status?.toLowerCase() === 'pending' ? 'pendiente'
        : report.status?.toLowerCase() === 'solved' ? 'resuelto' 
          : '').includes(searchTerm)
    )
    setCurrentReportData(filteredData);
  }

  const handleClearSearch = () => {
    setSearch('');
    setCurrentReportData(reportsDataMock);
  }

  return (
    <div className='px-8'>
      <p>En esta sección, podés ver todos los reportes de problemas que recibiste.</p>
      <div className='flex items-center space-x-4 mt-6'>
        <input
          id='search'
          type='text'
          placeholder='🔍  Buscar'
          className='w-60 h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
          value={search}
          onChange={(e) => {
              setSearch(e.target.value)
              if (e.target.value === '') {
                setCurrentReportData(reportsDataMock);
              } else {
                handleSearch(e.target.value);
              }
            }}
        />
        <Button 
          className='w-10 h-10'
          onClick={handleClearSearch}>
            X
        </Button>
      </div>
      <ReportsTable currentReportData={currentReportData}/>
    </div>
  )
}

export default AdminReports;
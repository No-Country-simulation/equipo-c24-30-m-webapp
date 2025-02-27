import PropTypes from 'prop-types';
import Button from "../Button";

const ReportsTable = ({ currentReportData }) => {

  return (
    <div className="container my-8 w-full min-w-6xl">
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="w-full p-6 text-left">
          <colgroup>
            <col className='w-1/9'/>
            <col className='w-1/9'/>
            <col className='w-2/9'/>
            <col className='w-3/9'/>
            <col className='w-1/9'/>
            <col className='w-1/9'/>
            <col className='w-1/9'/>
            <col className='w-1/9'/>
          </colgroup>
          <thead>
            <tr className="bg-(--secondary)">
              <th className="p-3 font-medium text-lg text-center">ID</th>
              <th className="p-3 font-medium text-lg text-center">Categoría</th>
              <th className="p-3 font-medium text-lg text-center">URL</th>
              <th className="p-3 font-medium text-lg text-center">Descripción</th>
              <th className="p-3 font-medium text-lg text-center">ID del usuario</th>
              <th className="p-3 font-medium text-lg text-center">Fecha</th>
              <th className="p-3 font-medium text-lg text-center">Estado</th>
              <th className="p-3 font-medium text-lg text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 text-center">
            {currentReportData.map((report) => (
              <tr key={report.id} className="border-b border-gray-300">
                <td className="px-3 py-2">
                  <p>{report.id}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{report.category === "fraud" 
                      ? "Fraude" 
                      : report.category === "bug" 
                        ? "Mal funcionamiento" 
                        : report.category === "misconduct" 
                          ? "Conducta inapropiada" 
                          : ""}</p>
                </td>
                <td className="px-3 py-2 break-all">
                  <p>{report.url ? report.url : "-"}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{report.description}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{report.userId}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{report.createdAt}</p>
                </td>
                <td className={`px-3 py-2 ${report.status === "solved" ? "text-green-500" : ""}`}>
                  <p>{report.status === "pending" ? "Pendiente" : report.status === "solved" ? "Resuelto" : ""}</p>
                </td>
                <td className="px-3 py-2">
                  {report.status === "pending" && (
                    <Button className="w-14 h-7 m-2 text-lg font-bold bg-green-300">✓</Button>
                  )}
                  <Button className="w-14 h-7 m-2 text-lg font-bold bg-red-400">✕</Button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportsTable;

ReportsTable.propTypes = {
  currentReportData: PropTypes.array
}
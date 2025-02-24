import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import userDataMock from "../../../test/userDataMock.json";

const AdminDashboard = () => {
  const userNumber = userDataMock.length;

  return (
    <div className="pl-8 pr-8">
      <p>Te damos la bienvenida al panel de administración. Acá, podés ver un resumen de la información importante de la aplicación.</p>
      <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-10 py-10 px-20 sm:px-10'>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col items-center'>
          <h2 className='mb-4'>Usuarios</h2>
          <p className=''>Hay {userNumber} usuarios registrados.</p>
          <Button as={Link} to='/usuarios' className='w-40 mt-8'>Ver todos</Button>
        </div>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col items-center'>
          <h2 className='mb-4'>Mascotas</h2>
          <p className=''>Hay 120 mascotas publicadas.</p>
          <Button as={Link} to='/mascotas' className='w-40 mt-8'>Ver todas</Button>
        </div>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col items-center'>
          <h2 className='mb-4'>Reportes</h2>
          <p className=''>Recibiste 5 reportes de problemas.</p>
          <Button as={Link} to='/reportes' className='w-40 mt-8'>Ver todos</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
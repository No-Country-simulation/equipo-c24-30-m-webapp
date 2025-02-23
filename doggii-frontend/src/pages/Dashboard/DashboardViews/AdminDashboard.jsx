import Button from "../../../components/Button";

const AdminDashboard = () => {

  return (
    <div className="pl-8 pr-8">
      <p>Te damos la bienvenida al panel de administración. Acá, podés ver un resumen de la información importante de la aplicación.</p>
      <div className='grid lg:grid-cols-2 md:grid-cols-1 place-items-center gap-20 py-10 px-20 sm:px-10'>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col items-center'>
          <h2 className='mb-4'>Adoptantes</h2>
          <p className=''>Hay 45 usuarios registrados.</p>
          <Button className='w-40 mt-8'>Ver todos</Button>
        </div>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col items-center'>
          <h2 className='mb-4'>Refugios</h2>
          <p className=''>Hay 58 refugios registrados.</p>
          <Button className='w-40 mt-8'>Ver todos</Button>
        </div>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col items-center'>
          <h2 className='mb-4'>Mascotas</h2>
          <p className=''>Hay 120 mascotas publicadas.</p>
          <Button className='w-40 mt-8'>Ver todas</Button>
        </div>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col items-center'>
          <h2 className='mb-4'>Reportes</h2>
          <p className=''>Recibiste 5 reportes de problemas.</p>
          <Button className='w-40 mt-8'>Ver todos</Button>
        </div>
      </div>
      
    </div>
  )
}

export default AdminDashboard;
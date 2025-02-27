import Button from '../../../components/Button';

const AdminReports = () => {

  return (
    <div className='px-8'>
      <p>En esta sección, podés ver todos los reportes de problemas que recibiste.</p>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 py-10'>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col gap-2'>
          <h2 className='mb-2 text-center'>ID del reporte</h2>
          <div>
            <h3 className='font-medium'>Tipo</h3>
            <p>Publicación fraudulenta</p>
          </div>
          <div>
            <h3 className='font-medium'>Hecho por</h3>
            <p>ID de usuario</p>
          </div>
          <div>
            <h3 className='font-medium'>Fecha</h3>
            <p>15/02/25</p>
          </div>
          <Button className='w-40 mt-4 mx-auto'>Gestionar</Button>
        </div>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col gap-2'>
          <h2 className='mb-2 text-center'>ID del reporte</h2>
          <div>
            <h3 className='font-medium'>Tipo</h3>
            <p>Publicación fraudulenta</p>
          </div>
          <div>
            <h3 className='font-medium'>Hecho por</h3>
            <p>ID de usuario</p>
          </div>
          <div>
            <h3 className='font-medium'>Fecha</h3>
            <p>15/02/25</p>
          </div>
          <Button className='w-40 mt-4 mx-auto'>Gestionar</Button>
        </div>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col gap-2'>
          <h2 className='mb-2 text-center'>ID del reporte</h2>
          <div>
            <h3 className='font-medium'>Tipo</h3>
            <p>Publicación fraudulenta</p>
          </div>
          <div>
            <h3 className='font-medium'>Hecho por</h3>
            <p>ID de usuario</p>
          </div>
          <div>
            <h3 className='font-medium'>Fecha</h3>
            <p>15/02/25</p>
          </div>
          <Button className='w-40 mt-4 mx-auto'>Gestionar</Button>
        </div>
        <div className='p-6 w-full rounded-md shadow-md dark:bg-gray-50 flex flex-col gap-2'>
          <h2 className='mb-2 text-center'>ID del reporte</h2>
          <div>
            <h3 className='font-medium'>Tipo</h3>
            <p>Publicación fraudulenta</p>
          </div>
          <div>
            <h3 className='font-medium'>Hecho por</h3>
            <p>ID de usuario</p>
          </div>
          <div>
            <h3 className='font-medium'>Fecha</h3>
            <p>15/02/25</p>
          </div>
          <Button className='w-40 mt-4 mx-auto'>Gestionar</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminReports;
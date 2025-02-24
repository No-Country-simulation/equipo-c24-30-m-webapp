import userDataMock from "../../test/userDataMock.json";
import Table from "../../components/Table";

const Users = () => {
  const currentUserData = userDataMock;

  return (
    <div className='p-8'>
      <h1 className="mb-4">Usuarios</h1>
      <p>En esta sección, podés ver todos los usuarios que se registraron en la plataforma.</p>
      
      <Table currentUserData={currentUserData} />
    </div>
  )
}

export default Users;
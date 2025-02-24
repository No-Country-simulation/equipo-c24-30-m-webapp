import {useState} from "react";
import userDataMock from "../../test/userDataMock.json";
import UsersTable from "../../components/Tables/UsersTable";
import Button from "../../components/Button";

const Users = () => {
  const [currentUserData, setCurrentUserData] = useState(userDataMock)
  const [search, setSearch] = useState('')

  const handleSearch = (searchValue) => {
    const searchTerm = searchValue.toLowerCase();
    const filteredData = userDataMock.filter((user) => 
      (user.userName?.toLowerCase() || '').includes(searchTerm) ||
      (user.email?.toLowerCase() || '').includes(searchTerm) ||
      (user.phone?.toLowerCase() || '').includes(searchTerm) ||
      (user.shelterName?.toLowerCase() || '').includes(searchTerm) ||
      (user.address?.street?.toLowerCase() || '').includes(searchTerm) ||
      (user.address?.city?.toLowerCase() || '').includes(searchTerm) ||
      (user.address?.province?.toLowerCase() || '').includes(searchTerm) ||
      (user.address?.country?.toLowerCase() || '').includes(searchTerm) ||
      (user.userRole?.toLowerCase() || '').includes(searchTerm)
    )
    setCurrentUserData(filteredData);
  }

  const handleClearSearch = () => {
    setSearch('');
    setCurrentUserData(userDataMock);
  }

  return (
    <div className='p-8'>
      <h1 className="mb-4">Usuarios</h1>
      <p>En esta sección, podés ver todos los usuarios que se registraron en la plataforma.</p>
      <div className="flex items-center space-x-4 mt-6">
        <input
          id='search'
          type='text'
          placeholder='🔍  Buscar'
          className='w-60 h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4'
          value={search}
          onChange={(e) => {
              setSearch(e.target.value)
              if (e.target.value === '') {
                setCurrentUserData(userDataMock);
              } else {
                handleSearch(e.target.value);
              }
            }}
        />
        <Button 
          className="w-10 h-10"
          onClick={handleClearSearch}>
            X
        </Button>
      </div>
      <UsersTable currentUserData={currentUserData} />
      <Button className="w-40 mx-auto">
        Agregar usuario
      </Button>
    </div>
  )
}

export default Users;
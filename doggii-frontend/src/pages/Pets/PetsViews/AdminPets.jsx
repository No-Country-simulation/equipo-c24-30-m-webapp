import {useState} from "react";
import PetsTable from '../../../components/Tables/PetsTable';
import petsDataMock from '../../../test/petsDataMock.json';
import Button from '../../../components/Button';

const AdminPets = () => {
  const [currentPetData, setCurrentPetData] = useState(petsDataMock)
  const [search, setSearch] = useState('')

  const handleSearch = (searchValue) => {
    const searchTerm = searchValue.toLowerCase();
    const filteredData = petsDataMock.filter((pet) => 
      (pet.id?.toLowerCase() || '').includes(searchTerm) ||
      (pet.name?.toLowerCase() || '').includes(searchTerm) ||
      (pet.sex?.toLowerCase() || '').includes(searchTerm) ||
      (pet.age?.days?.toString() + ' días' || '').includes(searchTerm) ||
      (pet.age?.months?.toString() + ' meses' || '').includes(searchTerm) ||
      (pet.age?.years?.toString() + ' años' || '').includes(searchTerm) ||
      (pet.size?.toLowerCase() || '').includes(searchTerm) ||
      (pet.neutered === true ? "Sí" : "No").includes(searchTerm) ||
      (pet.specialCare?.toLowerCase() || '').includes(searchTerm) ||
      (pet.shelterName?.toLowerCase() || '').includes(searchTerm)
    )
    setCurrentPetData(filteredData);
  }

  const handleClearSearch = () => {
    setSearch('');
    setCurrentPetData(petsDataMock);
  }

  return (
    <div className='pl-8 pr-8'>
      <p>Estas son todas las mascotas que se publicaron en la plataforma.</p>
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
                setCurrentPetData(petsDataMock);
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
      <PetsTable currentPetData={currentPetData}/>
    </div>
  )
}

export default AdminPets;
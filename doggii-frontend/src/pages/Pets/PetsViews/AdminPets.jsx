import PetsTable from '../../../components/Tables/PetsTable';
import petsDataMock from '../../../test/petsDataMock.json';

const AdminPets = () => {

  return (
    <div className='pl-8 pr-8'>
      <p>Estas son todas las mascotas que se publicaron en la plataforma.</p>
      <PetsTable currentPetData={petsDataMock}/>
    </div>
  )
}

export default AdminPets;
import AdopterPets from "./PetsViews/AdopterPets";
import ShelterPets from "./PetsViews/ShelterPets";
import AdminPets from "./PetsViews/AdminPets";
import { getUserRole } from "../../test/userRoleSelectorMock";

const Pets = () => {
  const userRole = getUserRole();

  return (
    <div>
      <h1 className="m-9 mb-4">Mascotas</h1>

      {userRole === "admin" ?
        <AdminPets />
        :
        (userRole === "adopter" ?
          <AdopterPets />
          :
          <ShelterPets />)
      }
    </div>
  )
}

export default Pets;
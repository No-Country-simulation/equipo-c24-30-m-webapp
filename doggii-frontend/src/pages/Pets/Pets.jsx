import AdopterPets from "./PetsViews/AdopterPets";
import ShelterPets from "./PetsViews/ShelterPets";
import AdminPets from "./PetsViews/AdminPets";

const Pets = () => {
  const userRole = "adopter";
  const admin = false;

  return (
    <div>
      <h1 className="m-9 mb-4">Mascotas</h1>

      {admin ?
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
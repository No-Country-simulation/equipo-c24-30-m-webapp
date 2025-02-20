import AdopterPets from "./PetsViews/AdopterPets";
import ShelterPets from "./PetsViews/ShelterPets";

const Pets = () => {
  const userRole = "adopter";

  return (
    <div>
      <h1 className="m-9 mb-4">Mascotas</h1>

      {userRole === "adopter" ?
        <AdopterPets />
        :
        <ShelterPets />
      }
    </div>
  )
}

export default Pets;
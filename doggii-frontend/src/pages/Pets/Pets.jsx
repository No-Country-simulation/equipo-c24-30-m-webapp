import AdopterPets from "./PetsViews/AdopterPets";
import ShelterPets from "./PetsViews/ShelterPets";
import AdminPets from "./PetsViews/AdminPets";
import { useSelector } from "react-redux";

const Pets = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="m-9 mb-4">Mascotas</h1>

      {user.role === "admin" ?
        <AdminPets />
        : (user.role === "adopter" ?
          <AdopterPets />
          : (user.role === "shelter" ?
            <ShelterPets />
            : null)
          )
      }
    </div>
  )
}

export default Pets;
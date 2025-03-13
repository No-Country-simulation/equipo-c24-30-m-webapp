import AdminProfile from "./ProfileViews/AdminProfile";
import AdopterProfile from "./ProfileViews/AdopterProfile";
import ShelterProfile from "./ProfileViews/ShelterProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="m-8 mb-4 text-3xl">Tu perfil</h1>

      {user.role === "admin" ?
        <AdminProfile />
        : (user.role === "adopter" ?
          <AdopterProfile />
          : (user.role === "shelter" ?
            <ShelterProfile />
            : null)
          )
      }
    </div>
  )
}

export default Profile;
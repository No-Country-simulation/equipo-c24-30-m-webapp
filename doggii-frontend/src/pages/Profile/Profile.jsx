import AdminProfile from "./ProfileViews/AdminProfile";
import AdopterProfile from "./ProfileViews/AdopterProfile";
import ShelterProfile from "./ProfileViews/ShelterProfile";
import { getUserRole } from "../../test/userRoleSelectorMock";

const Profile = () => {
  const userRole = getUserRole();

  return (
    <div>
      <h1 className="m-9">Tu perfil</h1>

      {userRole === "admin" ?
        <AdminProfile />
        :
        (userRole === "adopter" ?
          <AdopterProfile />
          :
          <ShelterProfile />)
      }
    </div>
  )
}

export default Profile;
import AdopterProfile from "./ProfileViews/AdopterProfile";
import ShelterProfile from "./ProfileViews/ShelterProfile";

const Profile = () => {
  const userRole = "adopter";

  return (
    <div>
      <h1 className="m-9">Tu perfil</h1>

      {userRole === "adopter" ?
        <AdopterProfile />
        :
        <ShelterProfile />
      }
    </div>
  )
}

export default Profile;
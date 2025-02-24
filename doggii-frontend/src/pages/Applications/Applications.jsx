import AdopterApplications from "./ApplicationViews/AdopterApplications";
import ShelterApplications from "./ApplicationViews/ShelterApplications";
import { getUserRole } from "../../services/userRoleSelectorMock";

const Applications = () => {
  const userRole = getUserRole();

  return (
    <div>
      <h1 className="m-9 mb-4">Solicitudes de adopción</h1>

      {userRole === "adopter" ?
        <AdopterApplications />
        :
        <ShelterApplications />
      }
    </div>
  )
}

export default Applications;
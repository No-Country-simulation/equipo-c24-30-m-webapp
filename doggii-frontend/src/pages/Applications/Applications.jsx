import AdopterApplications from "./ApplicationViews/AdopterApplications";
import ShelterApplications from "./ApplicationViews/ShelterApplications";
import { useSelector } from "react-redux";

const Applications = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="m-9 mb-4">Solicitudes de adopción</h1>

      {user.role === "adopter" ?
        <AdopterApplications />
        : (user.role === "shelter" ?
          <ShelterApplications />
          : null)
      }
    </div>
  )
}

export default Applications;
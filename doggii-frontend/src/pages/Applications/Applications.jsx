import AdopterApplications from "./ApplicationViews/AdopterApplications";
import ShelterApplications from "./ApplicationViews/ShelterApplications";

const Applications = () => {
  const userRole = "adopter";

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
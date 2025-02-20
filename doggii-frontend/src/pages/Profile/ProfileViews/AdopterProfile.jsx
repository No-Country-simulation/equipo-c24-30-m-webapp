import BasicProfileForm from "../../../components/Forms/BasicProfileForm";
import AdopterAdditionalProfileForm from "../../../components/Forms/AdopterAdditionalProfileForm";

const AdopterProfile = () => {

  return(
    <div className="pl-8 pr-8">
      <p>Estos son tus datos personales. Recordá que, para poder iniciar una solicitud de adopción, los datos tienen que estar completados.</p>
      <BasicProfileForm />
      <AdopterAdditionalProfileForm />
    </div>
  )
}

export default AdopterProfile;
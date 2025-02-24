import BasicProfileForm from "../../../components/Forms/BasicProfileForm";
import AdopterAdditionalProfileForm from "../../../components/Forms/AdopterAdditionalProfileForm";

const AdopterProfile = () => {

  return(
    <div className="pl-8 pr-8">
      <p>Estos son tus datos personales. Recordá que, para poder iniciar una solicitud de adopción, los datos tienen que estar completados.</p>
      <BasicProfileForm title='Datos personales' description='Estos son los datos básicos que debés completar para poder iniciar una solicitud de adopción.'/>
      <AdopterAdditionalProfileForm />
    </div>
  )
}

export default AdopterProfile;
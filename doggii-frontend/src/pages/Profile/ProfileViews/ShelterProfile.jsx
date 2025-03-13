import BasicProfileForm from "../../../components/Forms/BasicProfileForm";
import ShelterAdditionalProfileForm from "../../../components/Forms/ShelterAdditionalProfileForm";

const ShelterProfile = () => {

  return(
    <div className="px-8">
      <p className='text-lg'>Estos son los datos de tu asociación y su representante. Recordá que, para poder dar mascotas en adopción, los datos tienen que estar completos.</p>
      <BasicProfileForm title='Datos de la asociación' description='Estos son los datos básicos que debés completar para poder publicar mascotas en adopción.'/>
      <ShelterAdditionalProfileForm />
    </div>
  )
}

export default ShelterProfile;
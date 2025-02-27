import BasicProfileForm from "../../../components/Forms/BasicProfileForm";

const AdminProfile = () => {

  return(
    <div className="pl-8 pr-8">
      <p>Estos son tus datos personales. Podés modificarlos en cualquier momento.</p>
      <BasicProfileForm title='Datos personales' description='Asegurate de que tus datos sean correctos y estén actualizados.'/>
    </div>
  )
}

export default AdminProfile;
import HorizontalCard from '../../../components/Cards/HorizontalCard';

const ShelterDashboard = () => {

  return (
    <div className='pl-8 pr-8'>
    <p>En esta sección, podés ver un resumen de la información importante de tu cuenta.</p>
    <h2 className='pt-8 pb-4 text-center'>Solicitudes que recibiste</h2>
    <div className='flex justify-around gap-4'>
      <HorizontalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' subtitle='Estado' text='en revisión' isShelter={true}/>
      <HorizontalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' subtitle='Estado' text='aprobada' isShelter={true}/>
    </div>
  </div>
  )
}

export default ShelterDashboard;
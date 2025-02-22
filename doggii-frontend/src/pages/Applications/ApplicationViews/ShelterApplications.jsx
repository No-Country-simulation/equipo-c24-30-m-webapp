import HorizontalCard from '../../../components/Cards/HorizontalCard';

const ShelterApplications = () => {

  return (
    <div className='pl-8 pr-8'>
      <p>Consultá todas las solicitudes de adopción que recibiste y gestionalas.</p>
      <div className='flex flex-wrap justify-center gap-6 py-8'>
        <HorizontalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' subtitle='Estado' text='en revisión' isShelter={true}/>
        <HorizontalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' subtitle='Estado' text='aprobada' isShelter={true}/>
        <HorizontalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' subtitle='Estado' text='en revisión' isShelter={true}/>
        <HorizontalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' subtitle='Estado' text='aprobada' isShelter={true}/>
        <HorizontalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' subtitle='Estado' text='en revisión' isShelter={true}/>
        <HorizontalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' subtitle='Estado' text='aprobada' isShelter={true}/>
        <HorizontalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' subtitle='Estado' text='en revisión' isShelter={true}/>
        <HorizontalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' subtitle='Estado' text='aprobada' isShelter={true}/>
      </div>
    </div>
  )
}

export default ShelterApplications;
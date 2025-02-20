import VerticalCard from '../../../components/Cards/VerticalCard';
import Button from '../../../components/Button';

const ShelterPets = () => {

  return (
    <div className='pl-8 pr-8'>
      <div className='flex justify-between items-center'>
        <p>Estas son las mascotas que publicaste para dar en adopción.</p>
        <Button className='w-50'>
          Nueva publicación
        </Button>
      </div>
      <div className='flex flex-wrap justify-center gap-6 py-8'>
        <VerticalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
        <VerticalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
        <VerticalCard image='https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Mia' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
        <VerticalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
        <VerticalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
        <VerticalCard image='https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Mia' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
        <VerticalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
        <VerticalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
        <VerticalCard image='https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Mia' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' isShelter={true}/>
      </div>
    </div>
  )
}

export default ShelterPets;
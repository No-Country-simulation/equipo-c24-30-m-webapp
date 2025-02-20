import VerticalCard from '../../../components/Cards/VerticalCard';
import Button from '../../../components/Button';

const AdopterPets = () => {

  return (
    <div className='pl-8 pr-8'>
      <p>En esta sección, podés ver las mascotas que están en adopción.</p>
      <input id='search-location' type='text' placeholder='Ciudad' className='w-60 h-10 rounded-md focus:ring focus:ring-opacity-75 bg-(--secondary-light) font-light pl-4 mt-6 focus:dark:ring-violet-600 dark:border-gray-300'/>
      <div className='flex flex-wrap justify-center gap-6 pt-8'>
        <VerticalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
        <VerticalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
        <VerticalCard image='https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Mia' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
        <VerticalCard image='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Rufus' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
        <VerticalCard image='https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Toby' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
        <VerticalCard image='https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' title='Mia' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
      </div>
      <Button className='m-auto my-8 text-xl'>
        Ver todos
      </Button>
    </div>
  )
}

export default AdopterPets;
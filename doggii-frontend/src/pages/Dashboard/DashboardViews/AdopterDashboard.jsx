import Card from '../../../components/Card';
import Button from '../../../components/Button';

const AdopterDashboard = () => {

  return (
    <div className="pl-8 pr-8">
      <p>En esta sección, podés ver un resumen de la información importante de tu cuenta.</p>
      <h2 className='pt-8 pb-4 text-center'>Estos peluditos buscan hogar</h2>
      <div className='flex justify-between gap-4'>
        <Card image="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Rufus" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
        <Card image="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Toby" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
        <Card image="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Mia" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
      </div>
      <Button className='m-auto mt-8 text-xl'>
        Ver todos
      </Button>
    </div>
  )
}

export default AdopterDashboard;
import { useState } from 'react';
import HorizontalCard from '../../../components/Cards/HorizontalCard'
import applicationsDataMock from '../../../test/applicationsDataMock.json'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom';

const AdopterApplications = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [applications, setApplications] = useState(applicationsDataMock.slice(0, visibleItems));
  const navigate = useNavigate();

  const handleSeeMore = () => {
    const newVisibleItems = visibleItems + 6;
    setVisibleItems(newVisibleItems);
    setApplications(applicationsDataMock.slice(0, newVisibleItems));
  }

    const handleGoToApplicationDetails = (id) => {
    navigate(`/pet/${id}`);
  }

  return (
    <div className='pl-8 pr-8'>
      <p>Consultá todas las solicitudes de adopción que iniciaste y sus estados.</p>
      <div className='flex flex-wrap justify-center gap-6 pt-8'>
         {applications.map((application, index) => (
                  <HorizontalCard key={index} id={application.id} subtitle='Estado' text={application.status} image={application.photo} title={application.petName} description={`Refugio: ${application.shelterName}`} onSee={() => handleGoToApplicationDetails(application.id)}/>
          ))}
      </div>
      {visibleItems < applications.length && (
        <Button
          className='m-auto mt-8 text-xl'
          onClick={handleSeeMore}
        >
          Ver más
        </Button>
      )}
    </div>
  )
}

export default AdopterApplications;
import PropTypes from 'prop-types';
import Button from '../Button';

const VerticalCardLanding = ({image, title, description}) => {

  return (
    <div className='max-w-xs min-w-3xs rounded-xl shadow-xl dark:bg-gray-50'>
      <div className='relative'>
        <img src={image} alt={title} className='object-cover object-center w-full rounded-t-xl h-80 dark:bg-gray-500' />
      </div>
      <div className='flex justify-between rounded-xl p-4 bg-(--accent)'>
        <div className='space-y-1'>
          <h2 className='text-xl'>{title}</h2>
          <p>{description}</p>
        </div>
        <Button className='h-10'>
          Ver más
        </Button>
      </div>
    </div>
  )
}

export default VerticalCardLanding;

VerticalCardLanding.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isShelter: PropTypes.bool
};
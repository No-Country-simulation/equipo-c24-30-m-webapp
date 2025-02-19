import PropTypes from 'prop-types';
import Button from './Button';

const Card = ({image, title, description}) => {

  return (
    <div className='max-w-xs min-w-3xs rounded-md shadow-md dark:bg-gray-50'>
      <img src={image} alt='' className='object-cover object-center w-full rounded-t-md h-62 dark:bg-gray-500' />
      <div className='flex flex-col justify-between p-6 space-y-8'>
        <div className='space-y-2'>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Button className='w-40 m-auto bg-(--secondary)'>
          Ver más
        </Button>
      </div>
    </div>
  )
}

export default Card;

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
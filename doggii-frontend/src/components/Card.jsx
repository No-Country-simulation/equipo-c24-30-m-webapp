import PropTypes from 'prop-types';

const Card = ({image, title, description}) => {

  return (
    <div className='max-w-xs rounded-md shadow-md dark:bg-gray-50'>
      <img src={image} alt='' className='object-cover object-center w-full rounded-t-md h-62 dark:bg-gray-500' />
      <div className='flex flex-col justify-between p-6 space-y-8'>
        <div className='space-y-2'>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button type='button' className='flex items-center justify-center w-full p-3 font-normal tracking-wide rounded-md bg-(--primary)'>Ver más</button>
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
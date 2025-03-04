import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button';

const VerticalCard = ({image, title, description, onClick}) => {
  const userRole = useSelector((state) => state.user.role);

  return (
    <div className='max-w-xs min-w-3xs rounded-md shadow-md dark:bg-gray-50'>
      <div className='relative'>
        <img src={image} alt='' className='object-cover object-center w-full rounded-t-md h-62 dark:bg-gray-500' />
        {userRole === "shelter" && (
          <div className='absolute top-2 right-2'>
            <svg width='35' height='35' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M14.6066 3.5C14.7392 3.5 14.8664 3.55268 14.9602 3.64645L17.7886 6.47487C17.9838 6.67014 17.9838 6.98672 17.7886 7.18198L8.59619 16.3744C8.53337 16.4372 8.45495 16.4821 8.369 16.5046L4.54057 17.5046C4.36883 17.5494 4.18617 17.4999 4.06066 17.3744C3.93514 17.2489 3.88558 17.0662 3.93044 16.8945L4.93044 13.066C4.95289 12.9801 4.99784 12.9017 5.06066 12.8388L14.253 3.64645C14.3468 3.55268 14.474 3.5 14.6066 3.5Z' fill='black'/>
              <path d='M4 19.25C3.58579 19.25 3.25 19.5858 3.25 20C3.25 20.4142 3.58579 20.75 4 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20C19.75 19.5858 19.4142 19.25 19 19.25H4Z' fill='black'/>
            </svg>
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between p-6 space-y-8'>
        <div className='space-y-2'>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className='flex'>
          {userRole === "shelter" && (
            <Button
              className='w-30 m-auto text-lg bg-(--secondary)'
              onClick={onClick}
            >
              Pausar
            </Button>
          )}
          <Button
            className='w-30 m-auto text-xl bg-(--secondary)'
            onClick={onClick}
          >
            Ver
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VerticalCard;

VerticalCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
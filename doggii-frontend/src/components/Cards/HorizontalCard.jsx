import PropTypes from 'prop-types';
import Button from '../Button';

const HorizontalCard = ({image, title, subtitle, text}) => {
  return (
    <div className="w-md rounded-md shadow-md bg-gray-100">
      <div className="flex flex-row">
        <img src={image} alt="" className="w-20 h-20 m-4 object-cover rounded-full dark:bg-gray-500"/>
        <div className="flex flex-col justify-center flex-1 p-4">
          <h3>{title}</h3>
          <p className="my-4">
            <span className="font-medium">{subtitle}:&nbsp;</span>
            <span>{text}</span>
            </p>
        </div>
      </div>
      <Button className='w-40 mx-auto mb-6 bg-(--secondary)'>
        Gestionar
      </Button>
    </div>
  )
}

export default HorizontalCard;

HorizontalCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}
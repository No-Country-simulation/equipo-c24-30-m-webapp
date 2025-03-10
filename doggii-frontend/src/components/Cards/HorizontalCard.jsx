import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button';

const HorizontalCard = ({image, title, subtitle1, subtitle2, text1, text2, onSee}) => {
  const userRole = useSelector(state => state.user.role);

  return (
    <div className="w-100 mx-auto rounded-md shadow-md bg-gray-100">
      <div className="flex flex-row">
        <img src={image} alt="" className="w-20 h-20 m-4 object-cover rounded-full dark:bg-gray-500"/>
        <div className="flex flex-col justify-center flex-1 gap-4 p-4">
          <h3 className='text-2xl'>{title}</h3>
          <p >
            <span className="font-medium">{subtitle1}:&nbsp;</span>
            <span>{text1}</span>
          </p>
          <p >
            <span className="font-medium">{subtitle2}:&nbsp;</span>
            <span>{text2}</span>
          </p>
        </div>
      </div>

      {userRole === 'shelter' ?
        <Button onClick={onSee} className='w-40 mx-auto mb-4 bg-(--secondary) cursor-pointer'>
          Gestionar
        </Button>
        :
        <Button onClick={onSee}  className='w-40 mx-auto mb-4 bg-(--secondary) cursor-pointer'>
          Ver más
        </Button>
      }
    </div>
  )
}

export default HorizontalCard;

HorizontalCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle1: PropTypes.string.isRequired,
  subtitle2: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  onSee: PropTypes.func.isRequired
}
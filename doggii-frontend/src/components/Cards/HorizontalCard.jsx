import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button';

const HorizontalCard = ({image, title, subtitle1, subtitle2, text1, text2, onSee}) => {
  const userRole = useSelector(state => state.user.role);

  return (
    <div className="w-100 mx-auto rounded-xl shadow-xl bg-(--accent-dark) p-6">
      <div className="flex items-center justify-around gap-4">
        <img src={image} alt="" className="w-20 h-40 object-cover rounded-full bg-gray-500"/>
        <div className="flex flex-col justify-center gap-2">
          <h3 className='text-2xl mb-1'>{title}</h3>
          <p >
            <span className="font-medium">{subtitle1}:&nbsp;</span>
            <span>{text1}</span>
          </p>
          <p >
            <span className="font-medium">{subtitle2}:&nbsp;</span>
            <span>{text2}</span>
          </p>
          {userRole === 'shelter' ?
            <Button onClick={onSee} className='mx-auto mt-4 btn-secondary cursor-pointer'>
              Gestionar
            </Button>
            :
            <Button onClick={onSee}  className='mx-auto mt-4 btn-secondary cursor-pointer'>
              Ver más
            </Button>
          }
        </div>
      </div>
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
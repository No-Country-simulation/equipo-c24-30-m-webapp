import PropTypes from 'prop-types';

const HorizontalCardLanding = ({image, title, text}) => {
  return (
    <div className="w-120 rounded-xl shadow-xl bg-(--secondary-light)">
      <div className='w-full relative'>
        <img src={image} alt={title} className="w-full h-70 object-cover object-center rounded-t-xl"/>
        <h3 className="absolute top-15 right-5 p-4 text-3xl text-right text-(--accent)">
          {title.split(' ').map((word, index, array) => (
            <span key={index}>
              {word}
              {index !== array.length - 1 && <br />}
            </span>
          ))}
        </h3>
      </div>
      <p className="p-6 text-md text-justify">{text}</p>
    </div>
  )
}

export default HorizontalCardLanding;

HorizontalCardLanding.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
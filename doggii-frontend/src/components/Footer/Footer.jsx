import PropTypes from "prop-types";

const Footer = ({className}) => {

  return (
    <div className={`bg-gray-100 p-4 ${className}`}>FOOTER</div>
  )
}

export default Footer;

Footer.propTypes = {
  className: PropTypes.string
}
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick = () => {}, 
  className = '',
  as: Component = 'button',
  ...props
}) => {
  return (
    <Component 
      className={`flex items-center justify-center px-6 py-2 rounded-[50px] cursor-pointer transition-all duration-200 btn-primary ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  as: PropTypes.elementType
};

export default Button;
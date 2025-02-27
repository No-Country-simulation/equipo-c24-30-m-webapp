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
      className={`flex items-center justify-center w-2xs p-3 font-medium tracking-wide rounded-md bg-(--primary) ${className}`}
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
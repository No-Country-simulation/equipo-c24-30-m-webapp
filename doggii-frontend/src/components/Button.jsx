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
      className={`
        flex items-center justify-center
        px-10 py-4
        text-lg
        bg-[#FFDC64]
        border-2 border-[#E6C65A]
        rounded-[50px]
        cursor-pointer
        transition-all duration-200
        shadow-[inset_4px_4px_10px_#C7A74A,inset_-4px_-4px_10px_#fdf9d4]
        hover:shadow-[inset_2px_2px_5px_#C7A74A,inset_-2px_-2px_5px_#fdf9d4,2px_2px_5px_#C7A74A,-2px_-2px_5px_#fdf9d4]
        focus:shadow-[inset_2px_2px_5px_#C7A74A,inset_-2px_-2px_5px_#fdf9d4,2px_2px_5px_#C7A74A,-2px_-2px_5px_#fdf9d4]
        focus:outline-none
        ${className}
      `}
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
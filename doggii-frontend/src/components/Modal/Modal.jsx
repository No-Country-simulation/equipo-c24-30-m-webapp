import PropTypes from "prop-types";
import Button from "../Button";

const Modal = ({title, description, buttonText, onClose, buttonAction}) => {

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-opacity-95 backdrop-blur-md z-40 flex items-center justify-center">
        <div className="relative flex flex-col items-center max-w-lg gap-6 p-6 rounded-xl shadow-xl sm:py-8 sm:px-12 bg-(--accent) z-50">
          <button 
            className="absolute top-3 right-3 hover:text-(--secondary-dark)"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
              <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
            </svg>
          </button>
          <h2 className="text-3xl font-normal">{title}</h2>
          <p className="flex-1 text-center text-lg ">{description}</p>
          <Button
            onClick={buttonAction}
            className="w-50 text-lg"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </>
  )
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
  onClose: PropTypes.func.isRequired
}
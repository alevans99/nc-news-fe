import loadingSpinner from '../images/spinner.png';
import './styles/ErrorMessage.css';

const ErrorMessage = ({
  children,
  isVisible,
  errorText = 'There Has Been an Unexpected Error',
}) => {
  return (
    <div className='ErrorMessage'>
      {isVisible ? (
        <div className='error-container'>
          <img
            className='error-image'
            src={loadingSpinner}
            alt='website logo'
          ></img>
          <h2 className='error-text'>{errorText}</h2>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
export default ErrorMessage;

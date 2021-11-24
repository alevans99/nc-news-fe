import loadingSpinner from '../images/spinner.png';
import './styles/Loading.css';

const Loading = ({ children, isLoading, loadingText = 'Loading' }) => {
  return (
    <div className='Loading'>
      {isLoading ? (
        <div className='loading-container'>
          <img
            className='loading-spinner'
            src={loadingSpinner}
            alt='spinning arrow'
          ></img>
          <h2 className='loading-text'>{loadingText}</h2>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
export default Loading;

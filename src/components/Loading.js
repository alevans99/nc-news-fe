import loadingSpinner from '../images/spinner.png';
import './styles/Loading.css';

const Loading = ({ children, isLoading }) => {
  return (
    <div className='Loading'>
      {isLoading ? (
        <div className='loading-container'>
          <img className='loading-spinner' src={loadingSpinner}></img>
          <h2 className='loading-text'>Loading</h2>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
export default Loading;

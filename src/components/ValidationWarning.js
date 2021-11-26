import './styles/ValidationWarning.css';

const ValidationWarning = ({
  isVisible,
  warningText = 'There was a problem with what you entered',
}) => {
  return (
    <div className='ValidationWarning'>
      {isVisible ? (
        <div className='warning-container'>
          <h3 className='warning-text'>{warningText}</h3>
        </div>
      ) : null}
    </div>
  );
};
export default ValidationWarning;

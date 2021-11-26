import './styles/CollapsableContainer.css';

const Collapsable = ({ children, isVisible }) => {
  return <div className='Collapsable'>{isVisible ? children : null}</div>;
};
export default Collapsable;

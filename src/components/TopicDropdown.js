import { capitaliseString } from '../utils/utils';
import './styles/TopicDropdown.css';

const TopicDropdown = ({
  isVisible,
  currentTopic,
  setCurrentTopic,
  allTopics,
}) => {
  const updateTopic = (topic) => {
    setCurrentTopic(topic);
  };

  return (
    <div className='TopicDropdown'>
      {isVisible ? (
        <div className='topic-dropdown-container'>
          <button
            className='topic-dropdown-button'
            value='all'
            onClick={(e) => {
              updateTopic(e.target.value);
            }}
          >
            All Categories
          </button>
          {allTopics.map((topic) => {
            return (
              <button
                key={topic.slug}
                className='topic-dropdown-button'
                value={topic.slug}
                onClick={(e) => {
                  updateTopic(e.target.value);
                }}
              >
                {capitaliseString(topic.slug)}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
export default TopicDropdown;

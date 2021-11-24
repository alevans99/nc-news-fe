import { capitaliseString } from '../utils/utils';
import './styles/TopicDropdown.css';
import { Link } from 'react-router-dom';

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
          <Link className='topic-dropdown-link' to={`/topics/all/articles`}>
            <button
              className='topic-dropdown-button'
              value='all'
              onClick={(e) => {
                updateTopic(e.target.value);
              }}
            >
              All Categories
            </button>
          </Link>
          {allTopics.map((topic) => {
            return (
              <Link
                key={topic.slug}
                className='topic-dropdown-link'
                to={`/topics/${topic.slug}/articles`}
              >
                <button
                  className='topic-dropdown-button'
                  value={topic.slug}
                  onClick={(e) => {
                    updateTopic(e.target.value);
                  }}
                >
                  {capitaliseString(topic.slug)}
                </button>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
export default TopicDropdown;

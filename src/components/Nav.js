import './styles/Nav.css';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { capitaliseString } from '../utils/utils';
import TopicDropdown from './TopicDropdown';

function Nav({ currentTopic, setCurrentTopic, allTopics }) {
  const { currentUser } = useContext(UserContext);
  const [topicDropdownVisibility, setTopicDropdownVisibility] = useState(false);

  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setTopicDropdownVisibility((previous) => {
      return !previous;
    });
  };

  useEffect(() => {
    const checkClickLocation = (e) => {
      if (dropdownRef.current && topicDropdownVisibility) {
        if (!dropdownRef.current.contains(e.target)) {
          setTopicDropdownVisibility(false);
        }
      }
    };

    document.addEventListener('mousedown', checkClickLocation);

    return () => {
      document.removeEventListener('mousedown', checkClickLocation);
    };
  }, [topicDropdownVisibility]);

  useEffect(() => {
    setTopicDropdownVisibility(false);
  }, [currentTopic]);

  return (
    <div className={`Nav`}>
      <h1 className='nav-title'>NC News</h1>
      <div className='nav-topic-container' ref={dropdownRef}>
        <button
          className='nav-topic'
          onClick={(e) => {
            toggleDropdown();
          }}
        >
          {currentTopic === 'all'
            ? 'All Topics'
            : capitaliseString(currentTopic)}
        </button>

        <TopicDropdown
          isVisible={topicDropdownVisibility}
          currentTopic={currentTopic}
          setCurrentTopic={setCurrentTopic}
          allTopics={allTopics}
        ></TopicDropdown>
      </div>

      <div className='nav-profile-container'>
        <h3 className='nav-user'>{`Logged in as ${currentUser.username}`}</h3>
        <Link
          className='nav-user-profile-link'
          to={`/users/${currentUser.username}`}
        >
          <h3 className='nav-user-profile-text'>{`Visit Profile`}</h3>
        </Link>
      </div>
    </div>
  );
}

export default Nav;

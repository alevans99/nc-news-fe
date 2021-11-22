import './styles/Nav.css';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

function Nav({}) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className={`Nav`}>
      <h1 className='nav-title'>NC News</h1>

      <h2 className='nav-topic'>All Articles</h2>

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

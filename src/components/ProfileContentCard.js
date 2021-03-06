import './styles/ProfileContentCard.css';
import { Link } from 'react-router-dom';
import { dateFormatter } from '../utils/utils';

function ProfileContentCard({ content }) {
  const { votes, text, link, date, author } = content;
  return (
    <div className={`ProfileContentCard`}>
      <div className='profile-card-vote-container'>
        <h4 className='profile-card-vote-title'>{`Votes`}</h4>

        <h3 className='profile-card-vote-count'>{`${votes}`}</h3>
      </div>
      <Link className='profile-card-link' to={`${link}`}>
        <h2 className='profile-card-text'>{text}</h2>
      </Link>

      <h3 className='profile-card-author'>{`Posted by ${author} ${dateFormatter(
        date
      )}`}</h3>
    </div>
  );
}

export default ProfileContentCard;

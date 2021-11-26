import './styles/UserProfile.css';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import {
  getArticles,
  getCommentsByUsername,
  postNewComment,
} from '../utils/api';
import Collapsable from './Collapsable';
import { UserContext } from '../contexts/UserContext';
import CommentCard from './CommentCard';
import Loading from './Loading';
import ArticleCard from './ArticleCard';
import ProfileContentCard from './ProfileContentCard';

function UserProfile({}) {
  const { currentUser } = useContext(UserContext);
  const [userCommentVotes, setUserCommentVotes] = useState(0);
  const [userArticleVotes, setUserArticleVotes] = useState(0);
  const [userContent, setUserContent] = useState([]);
  const [userContentTotal, setUserContentTotal] = useState(0);
  const [userArticles, setUserArticles] = useState([]);
  const [userArticlesTotal, setUserArticlesTotal] = useState(0);
  const [userComments, setUserComments] = useState([]);
  const [userCommentsTotal, setUserCommentsTotal] = useState(0);
  const [displayChoice, setDisplayChoice] = useState('Comments');
  const [cardsLoading, setCardsLoading] = useState(true);
  const [pageQuery, setPageQuery] = useState(1);

  useEffect(() => {
    setCardsLoading(true);
    if (displayChoice === 'Comments') {
      getCommentsByUsername(currentUser.username, pageQuery)
        .then((comments) => {
          const contentObjects = comments.comments.map((comment) => {
            return {
              id: comment.comment_id,
              author: comment.author,
              text: comment.body,
              votes: comment.votes,
              date: comment.created_at,
              link: `/articles/${comment.article_id}`,
            };
          });
          setUserContent(contentObjects);
          setUserContentTotal(comments.total_count);
          console.log('got user comments', comments.comments);
          console.log('got user comments total', comments.total_count);

          setCardsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCardsLoading(false);
        });
    } else {
      console.log('Articles requested');
    }
  }, [displayChoice]);

  const displaySelectedCards = () => {
    if (displayChoice === 'Comments') {
      return userComments.map((comment) => {
        <CommentCard comment={comment}></CommentCard>;
      });
    } else {
      return userArticles.map((article) => {
        <ArticleCard article={article}></ArticleCard>;
      });
    }
  };

  return (
    <div className={`UserProfile`}>
      <div className='user-profile-user-details-container'>
        <h2 className='user-profile-username-title'>{currentUser.username}</h2>
        <div className='user-profile-votes-container'>
          <h3 className='user-profile-user-comment-votes'>
            {userCommentVotes}
          </h3>
          <h3 className='user-profile-user-article-votes'>
            {userArticleVotes}
          </h3>
        </div>
        <select
          value={displayChoice}
          className='user-profile-display-select'
          onChange={(e) => {
            setDisplayChoice(e.target.value);
          }}
        >
          <option value='Comments'>Comments</option>
          <option value='Articles'>Articles</option>
        </select>
        <Loading isLoading={cardsLoading}>
          <div className='user-profile-cards-body'>
            <div className='user-profile-cards-container'>
              {userContent.map((content) => {
                return (
                  <ProfileContentCard content={content}></ProfileContentCard>
                );
              })}
            </div>
          </div>
        </Loading>
      </div>
    </div>
  );
}

export default UserProfile;

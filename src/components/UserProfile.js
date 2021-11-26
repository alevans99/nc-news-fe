import './styles/UserProfile.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import {
  deleteArticle,
  deleteComment,
  getArticlesByUsername,
  getCommentsByUsername,
  getUserByUsername,
} from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';
import ProfileContentCard from './ProfileContentCard';
import ErrorMessage from './ErrorMessage';

function UserProfile({}) {
  const { currentUser } = useContext(UserContext);
  const [userProfileInformation, setUserProfileInformation] = useState({});
  const [userContent, setUserContent] = useState([]);
  const [userContentTotal, setUserContentTotal] = useState(0);
  const [displayChoice, setDisplayChoice] = useState('Comments');
  const [cardsLoading, setCardsLoading] = useState(true);
  const [pageQuery, setPageQuery] = useState(1);
  const [cardsRemoved, setCardsRemoved] = useState(0);
  const [profileError, setProfileError] = useState(false);
  const [profileErrorText, setProfileErrorText] = useState(
    'There was an unexpected error'
  );

  const { username } = useParams();

  const handleDelete = (id) => {
    if (displayChoice === 'Comments') {
      deleteComment(id)
        .then((result) => {
          setCardsRemoved((previousState) => {
            return previousState + 1;
          });

          setUserContent((previousContent) => {
            const filteredContent = previousContent.filter((item) => {
              return Number(item.id) !== Number(id);
            });

            return filteredContent;
          });
        })
        .catch((err) => {
          setProfileErrorText(
            'There was an error when trying to delete your comment, please reload the page to try again.'
          );
          setProfileError(true);
        });
    } else {
      deleteArticle(id)
        .then((result) => {
          setCardsRemoved((previousState) => {
            return previousState + 1;
          });

          setUserContent((previousContent) => {
            const filteredContent = previousContent.filter((item) => {
              return Number(item.id) !== Number(id);
            });

            return filteredContent;
          });
        })
        .catch((err) => {
          setProfileErrorText(
            'There was an error when trying to delete your article, please reload the page to try again.'
          );
          setProfileError(true);
        });
    }
  };

  useEffect(() => {
    getUserByUsername(username)
      .then((result) => {
        setUserProfileInformation(result);
      })
      .catch((err) => {
        setProfileErrorText("We couldn't find the user you requested");
        setProfileError(true);
      });
  }, [username]);

  useEffect(() => {
    setCardsLoading(true);
    if (displayChoice === 'Comments') {
      getCommentsByUsername(username, pageQuery)
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

          setCardsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCardsLoading(false);
        });
    } else {
      getArticlesByUsername(username, pageQuery)
        .then((articles) => {
          const contentObjects = articles.articles.map((article) => {
            return {
              id: article.article_id,
              author: article.author,
              text: article.title,
              votes: article.votes,
              date: article.created_at,
              link: `/articles/${article.article_id}`,
            };
          });
          setUserContent(contentObjects);
          setUserContentTotal(articles.total_count);

          setCardsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCardsLoading(false);
        });
    }
  }, [displayChoice, username]);

  return (
    <div className={`UserProfile`}>
      <ErrorMessage isVisible={profileError} errorText={profileErrorText}>
        <div className='user-profile-user-details-body'>
          <div className='user-profile-user-details-container'>
            <h2 className='user-profile-username-title'>{username}</h2>
            <img
              className='user-profile-image'
              src={userProfileInformation.avatar_url}
              alt='user-profile-avatar'
            ></img>
          </div>
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
                return username === currentUser.username ? (
                  <div
                    key={content.id}
                    className='user-profile-individual-card-container'
                  >
                    <ProfileContentCard content={content}></ProfileContentCard>
                    <button
                      className='user-profile-card-delete-button'
                      value={content.id}
                      onClick={(e) => {
                        handleDelete(e.target.value);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <ProfileContentCard
                    key={content.id}
                    content={content}
                  ></ProfileContentCard>
                );
              })}
            </div>
          </div>
        </Loading>
      </ErrorMessage>
    </div>
  );
}

export default UserProfile;

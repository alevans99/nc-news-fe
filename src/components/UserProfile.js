import './styles/UserProfile.css';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import {
  deleteComment,
  getArticles,
  getArticlesByUsername,
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
  const [cardsRemoved, setCardsRemoved] = useState(0);

  //   setNewCommentsAdded((previousTotal) => {
  //     return previousTotal + 1;
  //   });
  //   setAllComments((previousComments) => {
  //     return [comment, ...previousComments];
  //   });
  // })

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
            console.log(filteredContent);
            return filteredContent;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
  }, [displayChoice]);

  return (
    <div className={`UserProfile`}>
      <div className='user-profile-user-details-body'>
        <div className='user-profile-user-details-container'>
          <h2 className='user-profile-username-title'>{username}</h2>
          <img className='user-profile-image'></img>
          <div className='user-profile-votes-container'>
            <h3 className='user-profile-user-comment-votes'>
              {userCommentVotes}
            </h3>
            <h3 className='user-profile-user-article-votes'>
              {userArticleVotes}
            </h3>
          </div>
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
    </div>
  );
}

export default UserProfile;

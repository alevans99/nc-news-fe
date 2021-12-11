import './styles/ArticleCard.css';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import incArrow from '../images/up-arrow.png';
import decArrow from '../images/down-arrow.png';
import { patchArticleVotes } from '../utils/api';
import { UserContext } from '../contexts/UserContext';

function ArticleCard({ article }) {
  const [articleVotes, setArticleVotes] = useState(article.votes);
  const { userArticleVotes, setUserArticleVotes } = useContext(UserContext);
  const [incButtonSelected, setIncButtonSelected] = useState(false);
  const [decButtonSelected, setDecButtonSelected] = useState(false);

  const updateUserArticleVotes = (changeInVotes) => {
    setUserArticleVotes((previousObject) => {
      const newObject = { ...previousObject };
      newObject[article.article_id] = changeInVotes;
      return newObject;
    });
  };

  const checkUserVote = (idToCheck, valueToCheck) => {
    return userArticleVotes[idToCheck] === valueToCheck;
  };

  const changeVote = (voteChange) => {
    let amountToChange = 0;

    //If the user has voted before and chosen the same - remove the vote and remove value from
    //object
    if (userArticleVotes[article.article_id] !== undefined) {
      //Chosen the same

      if (userArticleVotes[article.article_id] === voteChange) {
        if (voteChange === -1) {
          amountToChange = 1;
        } else {
          amountToChange = -1;
        }

        //Remove from object
        updateUserArticleVotes(undefined);
      } else {
        //If the user has voted before and chosen a different one, add or remove 2 and update the object

        if (voteChange === -1) {
          amountToChange = -2;
        } else {
          amountToChange = 2;
        }
        updateUserArticleVotes(voteChange);
      }
    } else {
      //If the user hasn't voted before, just update it based on the value given and update the object.

      amountToChange = voteChange;

      updateUserArticleVotes(voteChange);
    }

    setArticleVotes((previousVotes) => {
      return previousVotes + amountToChange;
    });

    patchArticleVotes(article.article_id, amountToChange)
      .then((result) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    setIncButtonSelected(userArticleVotes[article.article_id] === 1);
    setDecButtonSelected(userArticleVotes[article.article_id] === -1);
  }, [articleVotes, article.article_id]);

  return (
    <div className={`ArticleCard`}>
      <div className='article-card-vote-container'>
        <button
          className={`article-card-inc-vote-button ac-vote-button ${
            incButtonSelected ? 'inc-selected' : ''
          }`}
          onClick={() => {
            changeVote(1);
          }}
        >
          <img
            className='article-card-inc-arrow ac-button-image'
            src={incArrow}
            alt='up arrow'
          ></img>
        </button>
        <h3 className='article-card-vote-count'>{`${articleVotes}`}</h3>

        <button
          className={`article-card-dec-vote-button ac-vote-button ${
            decButtonSelected ? 'dec-selected' : ''
          }`}
          onClick={() => {
            changeVote(-1);
          }}
        >
          <img
            className='article-card-dec-arrow ac-button-image'
            src={decArrow}
            alt='down arrow'
          ></img>
        </button>
      </div>
      <Link
        className='article-card-link'
        to={`/articles/${article.article_id}`}
      >
        <h2 className='article-card-title'>{article.title}</h2>
      </Link>
      <h3 className='article-card-author'>
        {`Posted by `}
        <Link
          to={`/users/${article.author}`}
          className='article-card-author-link'
        >{`${article.author} `}</Link>
        {`in`}{' '}
        <Link
          to={`/topics/${article.topic}/articles`}
          className='article-card-topic-link'
        >{`${article.topic}`}</Link>
      </h3>
      {/* <button className='article-card-read-button'>Read Article</button> */}
      <h3 className='article-card-comments-count'>
        {`${article.comment_count}${
          article.comment_count === 1 ? ' Comment' : ' Comments'
        }`}
      </h3>
    </div>
  );
}

export default ArticleCard;

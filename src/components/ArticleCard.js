import './styles/ArticleCard.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import incArrow from '../images/up-arrow.png';
import decArrow from '../images/down-arrow.png';
import { patchArticleVotes } from '../utils/api';

function ArticleCard({ article }) {
  const [articleVotes, setArticleVotes] = useState(article.votes);

  const changeVote = (voteChange) => {
    setArticleVotes((previousVotes) => {
      return previousVotes + voteChange;
    });

    patchArticleVotes(article.article_id, voteChange)
      .then((result) => {})
      .catch((err) => {});
  };

  return (
    <div className={`ArticleCard`}>
      <div className='article-card-vote-container'>
        <button
          className='article-card-inc-vote-button ac-vote-button'
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
          className='article-card-dec-vote-button ac-vote-button'
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
      <h3 className='article-card-author'>{`Posted by ${article.author} in ${article.topic}`}</h3>
      {/* <button className='article-card-read-button'>Read Article</button> */}
      <h3 className='article-card-comments-count'>
        {`${article.comment_count} Comments`}
      </h3>
    </div>
  );
}

export default ArticleCard;

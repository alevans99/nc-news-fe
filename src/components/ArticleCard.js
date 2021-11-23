import './styles/ArticleCard.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import incArrow from '../images/up-arrow.png';
import decArrow from '../images/down-arrow.png';

function ArticleCard({ article }) {
  return (
    <div className={`ArticleCard`}>
      <div className='article-card-vote-container'>
        <button className='article-card-inc-vote-button ac-vote-button'>
          <img
            className='article-card-inc-arrow ac-button-image'
            src={incArrow}
          ></img>
        </button>
        <h3 className='article-card-vote-count'>{`${article.votes}`}</h3>

        <button className='article-card-dec-vote-button ac-vote-button'>
          <img
            className='article-card-dec-arrow ac-button-image'
            src={decArrow}
          ></img>
        </button>
      </div>
      <h2 className='article-card-title'>{article.title}</h2>
      <h3 className='article-card-author'>{`Posted by ${article.author} in ${article.topic}`}</h3>
      {/* <button className='article-card-read-button'>Read Article</button> */}
      <h3 className='article-card-comments-count'>
        {`${article.comment_count} Comments`}
      </h3>
    </div>
  );
}

export default ArticleCard;

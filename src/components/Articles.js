import './styles/Articles.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import ArticleCard from './ArticleCard';

function Articles({}) {
  const [currentTopic, setCurrentTopic] = useState('all');
  const [allArticles, setAllArticles] = useState([]);

  console.log(allArticles);
  useEffect(() => {
    getArticles()
      .then((articles) => {
        setAllArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`Articles`}>
      <div className='articles-container'>
        {allArticles.map((article) => {
          return <ArticleCard article={article}></ArticleCard>;
        })}
      </div>
    </div>
  );
}

export default Articles;

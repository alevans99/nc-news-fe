import './styles/Articles.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import ArticleCard from './ArticleCard';
import Loading from './Loading';

function Articles({}) {
  const [currentTopic, setCurrentTopic] = useState('all');
  const [allArticles, setAllArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    setArticlesLoading(true);
    getArticles()
      .then((articles) => {
        setAllArticles(articles);
        setArticlesLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArticlesLoading(false);
      });
  }, []);

  return (
    <div className={`Articles`}>
      <Loading isLoading={articlesLoading}>
        <div className='articles-body'>
          <div className='articles-container'>
            {allArticles.map((article) => {
              return <ArticleCard article={article}></ArticleCard>;
            })}
          </div>
        </div>
      </Loading>
    </div>
  );
}

export default Articles;

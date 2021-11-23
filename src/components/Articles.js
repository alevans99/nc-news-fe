import './styles/Articles.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import ArticlesMenu from './ArticlesMenu';

function Articles({ allTopics, currentTopic, setCurrentTopic }) {
  const [allArticles, setAllArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    setArticlesLoading(true);
    getArticles(currentTopic)
      .then((articles) => {
        setAllArticles(articles);
        setArticlesLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArticlesLoading(false);
      });
  }, [currentTopic]);

  return (
    <div className={`Articles`}>
      <Loading isLoading={articlesLoading}>
        <ArticlesMenu
          allTopics={allTopics}
          currentTopic={currentTopic}
          setCurrentTopic={setCurrentTopic}
        ></ArticlesMenu>
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

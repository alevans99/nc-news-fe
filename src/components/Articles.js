import './styles/Articles.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import ArticlesMenu from './ArticlesMenu';

function Articles({ allTopics, currentTopic, setCurrentTopic }) {
  const [sortQuery, setSortQuery] = useState('created_at');
  const [allArticles, setAllArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const { topic } = useParams();
  console.log(sortQuery, 'sorted');
  //Checks is the URL provides a parametric for topic on first render
  useEffect(() => {
    if (topic !== undefined) {
      setCurrentTopic(topic);
    }
  }, []);

  useEffect(() => {
    setArticlesLoading(true);
    getArticles(currentTopic, sortQuery)
      .then((articles) => {
        setAllArticles(articles);
        setArticlesLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArticlesLoading(false);
      });
  }, [currentTopic, sortQuery]);

  return (
    <div className={`Articles`}>
      <Loading isLoading={articlesLoading}>
        <ArticlesMenu
          sortQuery={sortQuery}
          setSortQuery={setSortQuery}
        ></ArticlesMenu>
        <div className='articles-body'>
          <div className='articles-container'>
            {allArticles.map((article) => {
              return (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                ></ArticleCard>
              );
            })}
          </div>
        </div>
      </Loading>
    </div>
  );
}

export default Articles;

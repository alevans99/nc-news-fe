import './styles/Article.css';
import { UserContext } from '../contexts/UserContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleById } from '../utils/api';
import Loading from './Loading';
import { dateFormatter } from '../utils/utils';

function Article({}) {
  const [currentArticle, setCurrentArticle] = useState({});
  const [articleLoading, setArticleLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    setArticleLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setCurrentArticle(article);
        setArticleLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArticleLoading(false);
      });
  }, []);

  return (
    <div className={`Article`}>
      <Loading isLoading={articleLoading}>
        <div className='article-body-container'>
          <div className='article-detail-container'>
            <h2 className='article-detail-title'>{currentArticle.title}</h2>
            <h3 className='article-detail-information'>{`Posted by ${currentArticle.author} in ${currentArticle.topic}`}</h3>
            <h3 className='article-detail-date'>{`${dateFormatter(
              currentArticle.created_at
            )}`}</h3>
            <p className='article-detail-text'>{currentArticle.body}</p>
          </div>
        </div>
      </Loading>
    </div>
  );
}

export default Article;
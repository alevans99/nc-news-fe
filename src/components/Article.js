import './styles/Article.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleById } from '../utils/api';
import Loading from './Loading';
import { dateFormatter } from '../utils/utils';
import Comments from './Comments';
import ErrorMessage from './ErrorMessage';

function Article() {
  const [currentArticle, setCurrentArticle] = useState({});
  const [articleLoading, setArticleLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [articleError, setArticleError] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setArticleLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setCurrentArticle(article);
        setArticleLoading(false);
        setArticleError(false);
      })
      .catch((err) => {
        setArticleError(true);
        setArticleLoading(false);
      });
  }, [article_id]);

  return (
    <div className={`Article`}>
      <ErrorMessage
        isVisible={articleError}
        errorText={
          'We were unable to find this article sorry. Please choose a different article'
        }
      >
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

        <div className='comments-body-container'>
          <div className='comments-detail-container'>
            <Comments
              articleId={article_id}
              setCommentsLoading={setCommentsLoading}
              commentsLoading={commentsLoading}
            ></Comments>
          </div>
        </div>
      </ErrorMessage>
    </div>
  );
}

export default Article;

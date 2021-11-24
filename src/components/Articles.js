import './styles/Articles.css';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import ArticlesMenu from './ArticlesMenu';
import ArticlesPager from './ArticlesPager';

function Articles({ allTopics, currentTopic, setCurrentTopic }) {
  const [sortQuery, setSortQuery] = useState('created_at');
  const [pageQuery, setPageQuery] = useState('1');
  const [allArticles, setAllArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const { topic } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageRequested = params.get('p');

  //Checks is the URL provides a parametric for topic on first render
  useEffect(() => {
    if (topic !== undefined) {
      setCurrentTopic(topic);
    }
    if (pageRequested != null) {
      setPageQuery(pageRequested);
    } else {
      setPageQuery('1');
    }
  }, [pageRequested]);

  useEffect(() => {
    setArticlesLoading(true);
    getArticles(currentTopic, sortQuery, pageQuery)
      .then((articles) => {
        setAllArticles(articles.articles);
        setTotalArticles(articles.total_count);
        setArticlesLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArticlesLoading(false);
      });
  }, [currentTopic, sortQuery, pageQuery]);

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
          <ArticlesPager
            totalArticles={totalArticles}
            pageQuery={pageQuery}
            setPageQuery={setPageQuery}
            currentTopic={currentTopic}
          ></ArticlesPager>
        </div>
      </Loading>
    </div>
  );
}

export default Articles;

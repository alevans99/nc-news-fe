import { Link } from 'react-router-dom';
import './styles/ArticlesPager.css';

function ArticlesPager({
  totalArticles,
  pageQuery,
  setPageQuery,
  currentTopic,
}) {
  const numberOfPages = Math.ceil(totalArticles / 10);
  const pageArray = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageArray.push(`${i}`);
  }

  return (
    <div className={`ArticlesPager`}>
      {pageArray.map((page) => {
        return (
          <Link
            to={`/topics/${currentTopic}/articles?p=${page}`}
            key={page}
            className={`articles-pager-page-link ${
              pageQuery === page ? `page-link-selected` : ''
            }`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}

export default ArticlesPager;

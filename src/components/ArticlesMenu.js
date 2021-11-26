import { Link } from 'react-router-dom';
import './styles/ArticlesMenu.css';

function ArticlesMenu({ sortQuery, setSortQuery }) {
  return (
    <div className={`ArticlesMenu`}>
      <div className='articles-menu-items-container'>
        <select
          value={sortQuery}
          className='articles-menu-sort-select'
          onChange={(e) => {
            setSortQuery(e.target.value);
          }}
        >
          <option value='created_at'>Newest</option>
          <option value='comment_count'>Comments</option>
          <option value='votes'>Votes</option>
        </select>
        <Link className='articles-menu-post-new-button' to={`/articles/new`}>
          Post a New Article
        </Link>
      </div>
    </div>
  );
}

export default ArticlesMenu;

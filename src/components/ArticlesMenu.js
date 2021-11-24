import './styles/ArticlesMenu.css';

function ArticlesMenu({ sortQuery, setSortQuery }) {
  return (
    <div className={`ArticlesMenu`}>
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
    </div>
  );
}

export default ArticlesMenu;

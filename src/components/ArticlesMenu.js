import './styles/ArticlesMenu.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ArticlesMenu({ allTopics, currentTopic, setCurrentTopic }) {
  return (
    <div className={`ArticlesMenu`}>
      <select
        className='articles-menu-topic-select'
        onChange={(e) => {
          const topic = e.target.value;
          setSelectedTopic(topic);
        }}
      >
        <option value=''>All Topics</option>
        {allTopics.map((topic) => {
          return (
            <option key={topic.slug} value={category.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default ArticlesMenu;

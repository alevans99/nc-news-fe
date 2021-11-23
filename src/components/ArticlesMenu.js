import './styles/ArticlesMenu.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { capitaliseString } from '../utils/utils';

function ArticlesMenu({ allTopics, currentTopic, setCurrentTopic }) {
  console.log('current topic is ', currentTopic);
  return (
    <div className={`ArticlesMenu`}>
      <select
        value={currentTopic}
        className='articles-menu-topic-select'
        onChange={(e) => {
          const topic = e.target.value;
          setCurrentTopic(topic);
        }}
      >
        <option value='all'>All Topics</option>
        {allTopics.map((topic) => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {capitaliseString(topic.slug)}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default ArticlesMenu;

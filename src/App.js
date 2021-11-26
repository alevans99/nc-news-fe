import './App.css';
import { UserContext } from './contexts/UserContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import { useEffect, useState } from 'react';
import { getTopics } from './utils/api';
import Articles from './components/Articles';
import Article from './components/Article';
import NewArticle from './components/NewArticle';

function App() {
  const [allTopics, setAllTopics] = useState([]);
  const [currentUser, setCurrentUser] = useState({ username: 'jessjelly' });
  const [currentTopic, setCurrentTopic] = useState('all');

  //Maintain list of all topics
  useEffect(() => {
    getTopics()
      .then((topics) => {
        setAllTopics(topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className='App'>
          <Nav
            currentTopic={currentTopic}
            setCurrentTopic={setCurrentTopic}
            allTopics={allTopics}
          ></Nav>
          <Routes>
            <Route
              path='/'
              element={<Navigate replace to='/topics/all/articles' />}
            />
            <Route
              path='/articles/new'
              element={
                <NewArticle
                  allTopics={allTopics}
                  setAllTopics={setAllTopics}
                  currentTopic={currentTopic}
                ></NewArticle>
              }
            ></Route>

            <Route
              path='/articles/:article_id'
              element={<Article></Article>}
            ></Route>
            <Route
              path='/topics/:topic/articles'
              element={
                <Articles
                  allTopics={allTopics}
                  currentTopic={currentTopic}
                  setCurrentTopic={setCurrentTopic}
                ></Articles>
              }
            ></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { UserContext } from './componenets/contexts/UserContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getTopics } from './utils/api';

function App() {
  const [allTopics, setAllTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState('all');
  const [currentUser, setCurrentUser] = useState({ username: 'jessjelly' });

  //Maintain list of all topics
  useEffect(() => {
    getTopics().then((topics) => {
      setAllTopics(topics);
    });
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className='App'>
          <header className='App-header'></header>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

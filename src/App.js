import './App.css';
import { UserContext } from './contexts/UserContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import { useEffect, useState } from 'react';
import { getTopics } from './utils/api';
import Articles from './components/Articles';

function App() {
  const [allTopics, setAllTopics] = useState([]);
  const [currentUser, setCurrentUser] = useState({ username: 'jessjelly' });

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
          <Nav></Nav>
          <Routes>
            <Route path='/' element={<Navigate replace to='/articles' />} />
            <Route path='/articles' element={<Articles></Articles>}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

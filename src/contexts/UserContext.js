import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ username: 'jessjelly' });
  const [userCommentVotes, setUserCommentVotes] = useState({});
  const [userArticleVotes, setUserArticleVotes] = useState({});

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userCommentVotes,
        setUserCommentVotes,
        userArticleVotes,
        setUserArticleVotes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

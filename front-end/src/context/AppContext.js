import { createContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const AppContext = createContext();

function AppContextProvider({ children }) {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );

  const loginUser = (token, user) => {
    setAuthToken(token);
    setUser(user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const contextData = {
    authToken,
    setAuthToken,
    loginUser,
    logoutUser,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };

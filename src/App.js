import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import './styles/App.css';

import Navbare from './components/UI/navnar/Navbare';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    localStorage.getItem('auth') && setIsAuth(true)

    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <Router>
        <Navbare />
        <AppRouter />
      </Router>
    </AuthContext.Provider >

  );
}

export default App;

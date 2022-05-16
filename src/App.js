import React from 'react';
import './styles/App.css';


import Navbare from './components/UI/navnar/Navbare';
import AppRouter from './components/AppRouter';

import {
  BrowserRouter as Router
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbare />
      <AppRouter />
    </Router>
  );
}

export default App;

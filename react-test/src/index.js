import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import route
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/Home';
import LogInPage from './pages/LogIn';

ReactDOM.render((
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
), document.getElementById('root'));

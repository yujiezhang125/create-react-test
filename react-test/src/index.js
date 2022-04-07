import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
// import route
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/Home';
import LogInPage from './pages/LogIn';
import MapDisplayPage from './pages/MapDisplay';

ReactDOM.render((
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<LogInPage />} />
        <Route path='mapdisplay' element={<MapDisplayPage />} />
      </Routes>
    </BrowserRouter>
), document.getElementById('root'));

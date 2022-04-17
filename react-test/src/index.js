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
import DeclarePage from './pages/DeclarePage';

ReactDOM.render((
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<LogInPage />} />
        <Route path='mapdisplay' element={<MapDisplayPage />} />
        <Route path={'declarepage/:itemID'} element={<DeclarePage />} />
      </Routes>
    </BrowserRouter>
), document.getElementById('root'));

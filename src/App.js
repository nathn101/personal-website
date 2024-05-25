import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
// import Navbar from './components/navbar';
// import Home from './pages/homepage';
import Navbar from './components/navbar v2';
import Home from './pages/homepage v2';
import './App.scss';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </>   
  );
}

export default App;

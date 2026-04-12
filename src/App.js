import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;

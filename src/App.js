import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeV3 from './pages/homepage v3';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeV3 />} />
    </Routes>
  );
}

export default App;

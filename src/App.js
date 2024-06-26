import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
// import Navbar from './components/navbar';
// import Home from './pages/homepage';
import Navbar from './components/navbar v2';
import Home from './pages/homepage v2';
import './App.scss';

function App() {

  const [isProject, setIsProject] = useState(true);
  const [isAbout, setIsAbout] = useState(false);
  const [isConnect, setIsConnect] = useState(false);

  return (
    <>
      <Navbar setIsProject={setIsProject} setIsAbout={setIsAbout} setIsConnect={setIsConnect}/>
      <Routes>
        <Route exact path="/" element={<Home isProject={isProject} setIsProject={setIsProject} isAbout={isAbout} setIsAbout={setIsAbout} isConnect={isConnect} setIsConnect={setIsConnect}/>} />
      </Routes>
    </>   
  );
}

export default App;

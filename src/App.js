import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar v2';
import Home from './pages/homepage v2';
import './App.scss';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

function App() {
  const [isProject, setIsProject] = useState(true);
  const [isAbout, setIsAbout] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const vantaRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x0bf7ff,
      backgroundColor: 0x26363b,
      points: 10.00, // Reduce points for optimization
      spacing: 25.00, // Increase spacing for optimization
      mouseEase: 0.2, // Slow down mouse movement
      touchEase: 0.2, // Slow down touch movement
      THREE: THREE
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  useEffect(() => {
    // Update the height of the VANTA.NET effect dynamically
    if (vantaRef.current) {
      vantaRef.current.style.minHeight = '100vh';
      if (location.hash === '#about' || location.hash === '#connect') {
        vantaRef.current.style.minHeight = '100vh';
      }
    }
  }, [location]);

  return (
    <div ref={vantaRef} style={{ position: 'relative', minheight: '100vh' }}>
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar setIsProject={setIsProject} setIsAbout={setIsAbout} setIsConnect={setIsConnect}/>
        <Routes>
          <Route exact path="/" element={<Home isProject={isProject} setIsProject={setIsProject} isAbout={isAbout} setIsAbout={setIsAbout} isConnect={isConnect} setIsConnect={setIsConnect}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

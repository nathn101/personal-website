import React from 'react';
import './navbar v2.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPencil, faCode } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo/logo-no-bg.png';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';

const Navbarv2 = ({ setIsProject, setIsAbout, setIsConnect }) => {
  const handleLinkClick = (section) => {
    setIsProject(section === 'home');
    setIsAbout(section === 'about');
    setIsConnect(section === 'connect');
    window.location.hash = `#${section}`;
  };

  return (
    <nav className="navbar">
      <a className="home-link" href="/" onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        handleLinkClick('home');
      }}>
        <img src={Logo} alt='NC' />
      </a>
      <div className="links">
        <div className="link-and-icon">
          <a className="link" href="#home" onClick={() => handleLinkClick('home')}>Home</a>
        </div>
        <div className="link-and-icon">
          <a className="link" href="#about" onClick={() => handleLinkClick('about')}>About</a>
        </div>
        <div className="link-and-icon">
          <a className="link" href="#connect" onClick={() => handleLinkClick('connect')}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbarv2;
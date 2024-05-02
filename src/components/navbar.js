import React from 'react';
import './navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPencil, faCode } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo/logo1.png';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';

const Navbar = () => {
    return (
        <nav className="navbar">
            <a className="home-link" href="/" onClick = {(e) => {
                e.preventDefault();
                window.scrollTo({top: 0, behavior: 'smooth'});
            }}><img src={Logo} alt='NC'/></a>
            <div className="links">
                <div className="link-and-icon">
                    {/* <FontAwesomeIcon icon={faHome} className='icon'/> */}
                    <a className="link" href="#home">Home</a>
                </div>
                <div className="link-and-icon">
                    {/* <FontAwesomeIcon icon={faUser} className='icon'/> */}
                    <a className="link" href="#about">About</a>
                </div>
                <div className="link-and-icon">
                    {/* <FontAwesomeIcon icon={faCode} className='icon'/> */}
                    <a className="link" href="#experience">Experience</a>
                </div>
                <div className="link-and-icon">
                    {/* <FontAwesomeIcon icon={faPen} className='icon'/> */}
                    <a className="link" href="#projects">Projects</a>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
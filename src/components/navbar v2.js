import React from 'react';
import './navbar v2.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPencil, faCode } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo/logo1.png';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';

const Navbarv2 = ({setIsProject, setIsAbout, setIsConnect}) => {
    return (
        <nav className="navbar">
            <a className="home-link" href="/" onClick = {(e) => {
                e.preventDefault();
                window.scrollTo({top: 0, behavior: 'smooth'});
            }}><img src={Logo} alt='NC'/></a>
            <div className="links">
                <div className="link-and-icon">
                    <a className="link" href="#home" onClick={()=>{setIsProject(true);setIsAbout(false);setIsConnect(false);}}>Home</a>
                </div>
                <div className="link-and-icon">
                    <a className="link" href="#about" onClick={()=>{setIsProject(false);setIsAbout(true);setIsConnect(false);}}>About</a>
                </div>
                <div className="link-and-icon">
                    <a className="link" href="#connect" onClick={()=>{setIsProject(false);setIsAbout(false);setIsConnect(true);}}>Contact</a>
                </div>
            </div>
        </nav>
    );
}
export default Navbarv2;
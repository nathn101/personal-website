import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { TypeAnimation } from 'react-type-animation';
import { preloadImages } from '../utils.js';
import { Card1 } from '../components/card.js';
import { Splitting } from 'splitting';

import './homepage.scss';
const Home = () => {

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('about-details')) {
                        entry.target.classList.add('about-details-animation');
                    } else if (entry.target.classList.contains('about-pics')) {
                        entry.target.classList.add('about-pics-animation');
                    }
                    return;
                }
                if (entry.target.classList.contains('about-details-animation')) {
                    entry.target.classList.remove('about-details-animation');
                } else if (entry.target.classList.contains('about-pics-animation')) {
                    entry.target.classList.remove('about-pics-animation');
                }
            });
        });
        observer.observe(document.querySelector('.about-details'));
        observer.observe(document.querySelector('.grid, .about-pics'));
    });

    useEffect(() => {

        let cardsArr = [];

        [...document.querySelectorAll('.card:not(.card--empty)')].forEach(card => {
        let gridEffect = card.closest('.grid').getAttribute('data-effect');

        if (gridEffect === 'hover-1') {
            cardsArr.push(new Card1(card));
        } else {
            console.warn('Unknown data-effect', gridEffect);
        }
        });

        preloadImages('.card__img'). then(() => document.body.classList.remove('loading'));

    })
    
    return (
        <div id="home" className="home">
            <head>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Spectral"></link>
                <title>Nathan's Website</title>
            </head>
            <div className="hero">
                <div className="hero-text">
                    <h1>Hi, I'm {" "}
                    <TypeAnimation 
                    sequence={[
                        "Nathan!", 1500,
                        "a Software Developer", 1500,
                        "an ML Engineer", 1500,
                        "a Data Scientist", 1500,
                    ]}
                    wrapper="span"
                    cursor={true}
                    speed={250}
                    deletionSpeed={175}
                    repeat={Infinity}/></h1>
                    <h2>Computer Science and Finance Student @ University of Waterloo</h2>
                </div>
            </div>

            <div id="about" className="container">
                <div className="about">
                    <div className="about-details">
                        <h1>About Me</h1>
                        <ul>
                            <li><h3>I am a second year student studying Computing and Financial Management at the University of Waterloo.</h3></li>
                            <li><h3>I am currently working as a Data Analyst as part of the Corporate Analytics and Special Projects team at the Privy Council Office - a division of the Federal Government of Canada.</h3></li>
                            <li><h3>I am interested in machine learning, data science, and web development.</h3></li>
                            <li><h3>In my spare time, I enjoy playing badminton, chess, listening to music and playing the guitar.</h3></li>
                        </ul>
                    </div>
                    <div className="about-pics">
                        <img src={require('../assets/imgs/uw_logo.jpg')}></img>
                        <img src={require('../assets/imgs/pco_logo.jpg')}></img>
                    </div>
                </div>
            </div>

            <div id="projects" className="container">
                <div className="projects">
                    <h1>Here are some of the projects I've worked on!</h1>
                    <p>Scroll down to see more</p>
                    <img src={ require('../assets/imgs/downArrowIcon.png')}></img>
                    <div className="grid" data-effect="hover-1">
                        <div className="card card--alt">
                            <div className="card__img" style={{backgroundImage: `url(${require('../assets/imgs/stock-market.jpg')})`}}></div>
                            <div className="card__box card__box--a">
                                <span className="word card__box-number splitting" data-word="01">
                                    <span className="char" data-char="0">0</span>
                                    <span className="char" data-char="1">1</span>
                                </span>
                                <span className="words chars card__box-tags splitting project-name">
                                    <span className="word splitting" data-word="Python">
                                        <span className="char" data-char="P">P</span>
                                        <span className="char" data-char="y">y</span>
                                        <span className="char" data-char="t">t</span>
                                        <span className="char" data-char="h">h</span>
                                        <span className="char" data-char="o">o</span>
                                        <span className="char" data-char="n">n</span>
                                    </span>
                                    <span className="whitespace"> </span>
                                    <span className="word splitting" data-word="Roboadvisor">
                                        <span className="char" data-char="R">R</span>
                                        <span className="char" data-char="o">o</span>
                                        <span className="char" data-char="b">b</span>
                                        <span className="char" data-char="o">o</span>
                                        <span className="char" data-char="a">a</span>
                                        <span className="char" data-char="d">d</span>
                                        <span className="char" data-char="v">v</span>
                                        <span className="char" data-char="i">i</span>
                                        <span className="char" data-char="s">s</span>
                                        <span className="char" data-char="o">o</span>
                                        <span className="char" data-char="r">r</span>
                                    </span>
                                </span>
                            </div>
                            <div className="card__box card__box--d project-description">
                                <p>A roboadvisor that generates an optimized portfolio from a given list of stocks for a low risk-tolerant client</p>
                            </div>  
                        </div>
                        <div className="card card--alt">
                            <div className="card__img" style={{backgroundImage: `url(${require('../assets/imgs/spotify-website.png')})`}}></div>
                            <div className="card__box card__box--a">
                                <span className="word card__box-number splitting" data-word="02">
                                    <span className="char" data-char="0">0</span>
                                    <span className="char" data-char="2">2</span>
                                </span>
                                <span className="words chars card__box-tags splitting project-name" data-word="Spotify Matchmaker">
                                    <span className="word splitting" data-word="Spotify">
                                        <span className="char" data-char="S">S</span>
                                        <span className="char" data-char="p">p</span>
                                        <span className="char" data-char="o">o</span>
                                        <span className="char" data-char="t">t</span>
                                        <span className="char" data-char="i">i</span>
                                        <span className="char" data-char="f">f</span>
                                        <span className="char" data-char="y">y</span>
                                    </span>
                                    <span className="whitespace"> </span>
                                    <span className="word splitting" data-word="Matchmaker">
                                        <span className="char" data-char="M">M</span>
                                        <span className="char" data-char="a">a</span>
                                        <span className="char" data-char="t">t</span>
                                        <span className="char" data-char="c">c</span>
                                        <span className="char" data-char="h">h</span>
                                        <span className="char" data-char="m">m</span>
                                        <span className="char" data-char="a">a</span>
                                        <span className="char" data-char="k">k</span>
                                        <span className="char" data-char="e">e</span>
                                        <span className="char" data-char="r">r</span>
                                    </span>
                                </span>
                            </div>
                            <div className="card__box card__box--d project-description">
                                <p>A matchmaking app that connects users based on their musical profiles and interests</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="connect">
                <div className="connect-details">
                    <h1>Let's Connect!</h1>
                    <h3>Feel free to reach out to me on any one of these platforms!</h3>
                </div>
                <div className="connect-pics">
                    <a href='https://www.linkedin.com/in/nc101/'>
                        <img src={require('../assets/imgs/linkedin_logo.png')}></img>
                    </a>
                    <a href='https://github.com/nathn101'>
                        <img src={require('../assets/imgs/github_logo.png')}></img>
                    </a>
                    <a href='https://www.instagram.com/nathn0_0/'>
                        <img src={require('../assets/imgs/instagram_logo.png')}></img>
                    </a>
                    <a href='https://open.spotify.com/user/22i32facrqjg2lfp2ehn4bc7i?si=20aa642f9e5c45f1'>
                        <img src={require('../assets/imgs/spotify_logo.png')}></img>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { preloadImages } from '../utils.js';
import { Card1 } from '../components/card.js';
import { Splitting } from 'splitting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaPython, FaHtml5, FaCss3Alt, FaReact, FaJs, FaGithub, FaLinkedin, FaDiscord, FaSpotify, FaFile } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { SiJupyter, SiPandas, SiNumpy, SiScikitlearn, SiGooglecloud } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { IoOpenOutline } from "react-icons/io5";
import ReactTooltip from 'react-tooltip';


import './homepage v2.scss';
const Homev2 = () => {

    useEffect(() => {

        let cardsArr = [];
        
        [...document.querySelectorAll('.card')].forEach(card => {

        let gridEffect = card.closest('.grid').getAttribute('data-effect');

        if (gridEffect === 'hover-1') {
            cardsArr.push(new Card1(card));
        } else {
            console.warn('Unknown data-effect', gridEffect);
        }
        });

        preloadImages('.card__img');

    });
    
    return (
        <div id="home" className="home">
            <div className="hero">
                <div className="hero-text">
                    <h2>Hi, I'm Nathan<br/></h2>
                    <h1>{" "}
                    <TypeAnimation 
                    sequence={[
                        "a Software Developer", 1500,
                        "an ML Engineer", 1500,
                        "a Data Scientist", 1500,
                    ]}
                    wrapper="span"
                    cursor={true}
                    speed={250}
                    deletionSpeed={175}
                    repeat={Infinity}/></h1>
                    <h3>Computer Science and Finance Student <br/> @ University of Waterloo</h3>
                </div>
                <div className="hero-links">
                    <span className="hero-link">
                        <FaGithub/>
                        <a href="https://github.com/nathn101" target="_blank" rel="noopener noreferrer">Github</a>
                        <span class="arrow first">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                        <span class="arrow second">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                        <span class="arrow third">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                    </span>
                    <span className="hero-link">
                        <FaLinkedin/>
                        <a href="https://www.linkedin.com/in/nc101/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <span class="arrow first">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                        <span class="arrow second">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                        <span class="arrow third">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                    </span>
                    <span className="hero-link">
                        <FaFile/>
                        <a href="https://drive.google.com/file/d/1dfIiR90f-bbYxgaJNmNZoFg8_SUaW8IE/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
                        <span class="arrow first">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                        <span class="arrow second">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                        <span class="arrow third">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                        </span>
                    </span>
                </div>
                {/* <div className="hero-img">
                    <img src={require('../assets/imgs/headshot.jpg')}></img>
                </div> */}
            </div>
            
            {/* <div id="experience" className="container">
                <div className="experience">
                    <h1>Experience</h1>
                    <div className="experience-details">
                        <div className="work-header">
                            <h2>Privy Council Office</h2>
                            <hr/>
                            <h4>Jan 2024 - Apr 2024</h4>
                        </div>
                        <div className="work-role"><h3>Data Analyst</h3></div>
                        <div className="work-details">
                            <ul>
                                <li><p>Leveraged Tableau and PowerBI to update, refine, and compose interactive tailored dashboards for detailed meta-analysis of cross-functional organization metrics for Employment Equity, Security and Intelligence, and Foreign and Defence Policy.</p></li>
                                <li><p>Engineered automated workflows using Tableau prep, Power Automate, and Python scripts and conducted stringent reviews to actively enhance efficiencies, lowering overhead costs.</p></li>
                                <li><p>Spearheaded the migration of on-premises data to an Azure data lakehouse to take advantage of cost savings, improve scalability and security, and enable advanced analytics including machine learning.</p></li>
                            </ul>
                        </div>
                        <div className="work-header">
                            <h2>Microsoft</h2>
                            <hr/>
                            <h4>May 2023 - Aug 2023</h4>
                        </div>
                        <div className="work-role"><h3>Azure Artifical Intelligence for Financial Advising</h3></div>
                        <div className="work-details">
                            <ul>
                                <li><p>Prototyped an intuitive and interactive financial advising chatbot with Azure AI services, to help open up investment options to the 77% of Canadians that own investments.</p></li>
                                <li><p>Outlined machine learning and NLP pipelines with Azure Language Studio and Azure Bot Service to allow the chatbot to comprehensively answer general or specific questions about investments.</p></li>
                                <li><p>Preprocessed and validated data from various sources to ensure the chatbot provides accurate responses.</p></li>
                            </ul>
                        </div>
                    </div>
                    <a href="https://drive.google.com/file/d/1VFCrwBYR7gYGkXkRjBRwZPQRys0t_ph9/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                        <button className="btn-shine">
                            <span>Resume</span>
                        </button>
                    </a>
                </div>
            </div> */}

            <div id="projects" className="container">
                <div className="projects">
                    <h1>My Projects</h1>
                    <hr></hr>
                    <div className="grid" data-effect="hover-1">
                        <div className="project">
                            <div className="card card--alt">
                                <div className="card__img" style={{backgroundImage: `url(${require('../assets/imgs/stock-market.jpg')})`}}></div>
                                <div className="card__box card__box--a">
                                    <span className="card__box-number">01</span>
                                    <span className="card__box-tags project-name">Python Roboadvisor</span>
                                </div>
                                <div className="card__box card__box--d">
                                    <span className="card__box-category project-description">
                                        A roboadvisor that generates an optimized portfolio from a given list of stocks for clients with low-risk tolerance
                                        <span></span>
                                    </span>
                                </div>
                            </div>
                            <div className="project-brief">
                                <h1>Portfolio Generator</h1>
                                <div className="project-brief-tech">
                                    <div className="project-brief-tech-python">
                                        <FaPython />
                                        <span>Python</span>
                                    </div>
                                    <div className="project-brief-tech-jupyter">
                                        <SiJupyter />
                                        <span>Jupyter</span>
                                    </div>
                                    <div className="project-brief-tech-pandas">
                                        <SiPandas />
                                        <span>Pandas</span>
                                    </div>
                                    <div className="project-brief-tech-numpy">
                                        <SiNumpy />
                                        <span>Numpy</span>
                                    </div>
                                </div>
                                <span><a href="https://github.com/nathn101/Python-Roboadvisor" target="_blank" rel="noopener noreferrer" className="open-icon"><IoOpenOutline /></a></span>
                            </div>
                        </div>
                        <div className="project">
                            <div className="card card--alt">
                                <div className="card__img" style={{backgroundImage: `url(${require('../assets/imgs/ml-churney.jpeg')})`}}></div>
                                <div className="card__box card__box--a">
                                    <span className="card__box-number">04</span>
                                    <span className="card__box-tags project-name">Our ML Churney</span>
                                </div>
                                <div className="card__box card__box--d">
                                    <span className="card__box-category project-description">
                                        A custom prediction model for Infinite Investment Systems which predicts whether or not customers will churn
                                    </span>
                                </div>
                            </div>
                            <div className="project-brief">
                                <h1>Churn Prediction</h1>
                                <div className="project-brief-tech">
                                    <div className="project-brief-tech-python">
                                        <FaPython />
                                        <span>Python</span>
                                    </div>
                                    <div className="project-brief-tech-jupyter">
                                        <SiJupyter />
                                        <span>Jupyter</span>
                                    </div>
                                    <div className="project-brief-tech-pandas">
                                        <SiPandas />
                                        <span>Pandas</span>
                                    </div>
                                    <div className="project-brief-tech-numpy">
                                        <SiNumpy />
                                        <span>Numpy</span>
                                    </div>
                                    <div className="project-brief-tech-scikit">
                                        <SiScikitlearn />
                                        <span>Scikit-learn</span>
                                    </div>
                                </div>
                                <span><a href="https://github.com/nathn101/DSC-Datathon" target="_blank" rel="noopener noreferrer" className="open-icon"><IoOpenOutline /></a></span>
                            </div>
                        </div>
                        <div className="project">
                            <div className="card card--alt">
                                <div className="card__img" style={{backgroundImage: `url(${require('../assets/imgs/spotify-website.png')})`}}></div>
                                <div className="card__box card__box--a">
                                    <span className="card__box-number">02</span>
                                    <span className="card__box-tags project-name">Spotify Matchmaker</span>
                                </div>
                                <div className="card__box card__box--d">
                                    <span className="card__box-category project-description">
                                        A matchmaking application that uses machine learning to match people based on their Spotify listening profiles
                                    </span>
                                </div>
                            </div>
                            <div className="project-brief">
                                <h1>Music Matchmaker</h1>
                                <div className="project-brief-tech">
                                    <div className="project-brief-tech-html">
                                        <FaHtml5 />
                                        <span>HTML</span>
                                    </div>
                                    <div className="project-brief-tech-css">
                                        <FaCss3Alt />
                                        <span>CSS</span>
                                    </div>
                                    <div className="project-brief-tech-js">
                                        <FaJs />
                                        <span>JavaScript</span>
                                    </div>
                                    <div className="project-brief-tech-react">
                                        <FaReact />
                                        <span>React</span>
                                    </div>
                                    <div className="project-brief-tech-python">
                                        <FaPython />
                                        <span>Python</span>
                                    </div>
                                    <div className="project-brief-tech-pandas">
                                        <SiPandas />
                                        <span>Pandas</span>
                                    </div>
                                    <div className="project-brief-tech-numpy">
                                        <SiNumpy />
                                        <span>Numpy</span>
                                    </div>
                                    <div className="project-brief-tech-scikit">
                                        <SiScikitlearn />
                                        <span>Scikit-learn</span>
                                    </div>
                                </div>
                                <span><a href="https://github.com/nathn101/spot-match" target="_blank" rel="noopener noreferrer" className="open-icon"><IoOpenOutline /></a></span>
                            </div>
                        </div>
                        <div className="project">
                            <div className="card card--alt">
                                <div className="card__img" style={{backgroundImage: `url(${require('../assets/imgs/notes.png')})`}}></div>
                                <div className="card__box card__box--a">
                                    <span className="card__box-number">03</span>
                                    <span className="card__box-tags project-name">Tag-Team</span>
                                </div>
                                <div className="card__box card__box--d">
                                    <span className="card__box-category project-description">
                                        A note-sharing application that allows users to scan documents and easily share them among a group of people
                                    </span>
                                </div>
                            </div>
                            <div className="project-brief">
                                <h1>Note-Sharing</h1>
                                <div className="project-brief-tech">
                                    <div className="project-brief-tech-html">
                                        <FaHtml5 />
                                        <span>HTML</span>
                                    </div>
                                    <div className="project-brief-tech-css">
                                        <FaCss3Alt />
                                        <span>CSS</span>
                                    </div>
                                    <div className="project-brief-tech-js">
                                        <FaJs />
                                        <span>JavaScript</span>
                                    </div>
                                    <div className="project-brief-tech-react">
                                        <FaReact />
                                        <span>React</span>
                                    </div>
                                    <div className="project-brief-tech-googlecloud">
                                        <SiGooglecloud />
                                        <span>Google Cloud</span>
                                    </div>
                                    <div className="project-brief-tech-openai">
                                        <RiOpenaiFill />
                                        <span>OpenAI</span>
                                    </div>
                                </div>
                                <span><a href="https://github.com/nathn101/ml-note-app" target="_blank" rel="noopener noreferrer" className="open-icon"><IoOpenOutline /></a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div id="about" className="container">
                <div className="about">
                    <div className="about-details">
                        <h1>About Me</h1>
                        <ul>
                            <li><p>I am a second year student studying Computing and Financial Management at the University of Waterloo. A double major in Computer Science and Financial Management. With a passion for leveraging technology to drive financial innovation, I bring a unique blend of academic excellence and practical experience to the table.</p></li>
                            <li><p>I am currently working as a Data Analyst as part of the Corporate Analytics and Special Projects team at the Privy Council Office - a department of the Federal Government of Canada.</p></li>
                            <li><p>Driven by a keen interest in machine learning, data science, and web development, I am particularly drawn to the dynamic field of fintech. Recognizing the transformative potential of technology in reshaping financial services, I am eager to contribute my skills and knowledge towards driving innovation in this rapidly evolving sector.</p></li>
                            <li><p>Outside of work and academics, I enjoy playing badminton, chess, listening to music and playing the guitar.</p></li>
                        </ul>
                    </div>
                    <div className="about-pics">
                        <img src={require('../assets/imgs/uw_logo.jpg')}></img>
                        <img src={require('../assets/imgs/pco_logo.jpg')}></img>
                    </div>
                    <div className="about-socials">
                        <a href='https://www.linkedin.com/in/nc101/' target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href='https://github.com/nathn101' target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href='https://www.instagram.com/nathn0_0/' target="_blank" rel="noopener noreferrer">
                            <FaSquareInstagram />
                        </a>
                        <a href='https://open.spotify.com/user/22i32facrqjg2lfp2ehn4bc7i?si=20aa642f9e5c45f1' target="_blank" rel="noopener noreferrer">
                            <FaSpotify />
                        </a>
                    </div>
                </div>
            </div> */}
            
            <div id="connect" className="connect">
                <h1>Contact</h1>
                <div className="connect-details">
                    <h2>Let's connect!</h2>
                    <h3>For any questions or if you want to just chat, please feel free to contact me!</h3>
                    <h3>Discord: _nathn_</h3>
                    <button onClick={() => window.location="mailto:n4chu@uwaterloo.ca"} className="connect-details-btn">
                        Send email
                    </button>
                </div>
            </div>
            <div className="footer">
                <h3>NC © 2024</h3>
            </div>
        </div>
    );
};

export default Homev2;
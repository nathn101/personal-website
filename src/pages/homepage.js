import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { preloadImages } from '../utils.js';
import { Card1 } from '../components/card.js';
import { Splitting } from 'splitting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaPython, FaHtml5, FaCss3Alt, FaReact, FaJs } from "react-icons/fa";
import { SiJupyter, SiPandas, SiNumpy, SiScikitlearn, SiGooglecloud } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import ReactTooltip from 'react-tooltip';


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
                    <h1>Hi, I'm <br/>{" "}
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
                    <h2>Computer Science and Finance Student <br/> @ University of Waterloo</h2>
                </div>
                <div className="hero-img">
                    <img src={require('../assets/imgs/headshot.jpg')}></img>
                </div>
            </div>

            <div id="about" className="container">
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
                </div>
            </div>
            
            <div id="experience" className="container">
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
                        <div className="work-role"><h3>Azure Artifical Intelligence for Fiancial Advising</h3></div>
                        <div className="work-details">
                            <ul>
                                <li><p>Prototyped an intuitive and interactive financial advising chatbot with Azure AI services, to help open up investment options to the 77% of Canadians that own investments.</p></li>
                                <li><p>Outlined machine learning and NLP pipelines with Azure Language Studio and Azure Bot Service to allow the chatbot to comprehensively answer general or specific questions about investments.</p></li>
                                <li><p>Preprocessed and validated data from various sources to ensure the chatbot provides accurate responses.</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="projects" className="container">
                <div className="projects">
                    <h1>Here are some of the projects I've worked on!</h1>
                    <p>Scroll down to see more</p>
                    <img src={ require('../assets/imgs/downArrowIcon.png')}></img>
                    <div className="grid" data-effect="hover-1">
                        <div className="project">
                            <a href="https://github.com/nathn101/Python-Roboadvisor">
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
                            </a>
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
                            </div>
                        </div>
                        <div className="project">
                            <a href="https://github.com/nathn101/spot-match">
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
                            </a>
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
                                </div>
                            </div>
                        </div>
                        <div className="project">
                            <a href="https://github.com/nathn101/ml-note-app">
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
                            </a>
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
                            </div>
                        </div>
                        <div className="project">
                            <a href="https://github.com/nathn101/DSC-Datathon">
                                <div className="card card--alt">
                                    <div className="card__img" style={{backgroundImage: `url(${require('../assets/imgs/ml-churney.jpeg')})`}}></div>
                                    <div className="card__box card__box--a">
                                        <span className="card__box-number">04</span>
                                        <span className="card__box-tags project-name">Our ML Churney</span>
                                    </div>
                                    <div className="card__box card__box--d">
                                        <span className="card__box-category project-description">
                                            A custom prediction model for Infinite Investment Systems which predicts whether or not customers will churn or not churn
                                        </span>
                                    </div>
                                </div>
                            </a>
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
            <div className="footer">
                <h3>© 2024 ✍️ Designed and 💻Built by Nathan Chu 😎</h3>
            </div>
        </div>
    );
};

export default Home;
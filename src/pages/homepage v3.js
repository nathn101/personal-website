import { useEffect, useRef, useState } from "react";
import "./homepage v3.scss";
import Logo from '../assets/logo/logo-no-bg.png';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaFile, FaSpotify } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const HomeV3 = () => {
  const canvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState("projects");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let planes = [];
    let stars = [];
    const planeCount = 10;
    const planeSpeed = 4;
    const starCount = 180;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    class Star {
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = Math.random() * 1.2 + 0.3;
        this.baseAlpha = Math.random() * 0.5 + 0.3;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.7 ? '#0ff7e8' : '#ffffff';
        this.vx = (Math.random() - 0.5) * 0.03;
        this.vy = (Math.random() - 0.5) * 0.03;
      }
      update() {
        this.twinklePhase += this.twinkleSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.twinklePhase) * 0.3;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }

    class Plane {
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        const angle = Math.random() * 2 * Math.PI;
        this.vx = Math.cos(angle) * planeSpeed;
        this.vy = Math.sin(angle) * planeSpeed;
        this.size = 18;
        this.angle = Math.atan2(this.vy, this.vx);
        this.trail = [];
        this.maxTrailLength = 15;
        this.trailSpacing = 12;
        this.lastTrailPoint = { x: this.x, y: this.y };
      }

      drawPlane() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.fillStyle = "#00ffff";
        ctx.ellipse(-this.size * 0.4, -this.size * 0.2, this.size * 0.3, this.size * 0.15, 35 * Math.PI / 180, 0, Math.PI * 2);
        ctx.ellipse(-this.size * 0.4, this.size * 0.2, this.size * 0.3, this.size * 0.15, -35 * Math.PI / 180, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
      }

      drawTrail() {
        if (this.trail.length < 1) return;
        
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const trailOffset = this.size * 0.7;

        for (let idx = this.trail.length - 1; idx >= 0; idx--) {
          const i = this.trail.length - 4 - idx;
          const opacity = ((idx + 1) / this.trail.length) * 0.7;
          const base = this.trail[idx];
          const coneWidth = (i / this.trail.length) * this.size * 1.2 + 2;
          const digits = Math.floor(3 + (i / this.trail.length) * 2);
          const angle = (base.angle !== undefined ? base.angle : this.angle) + Math.PI / 2;
          const offsetX = base.x - Math.cos(base.angle !== undefined ? base.angle : this.angle) * trailOffset;
          const offsetY = base.y - Math.sin(base.angle !== undefined ? base.angle : this.angle) * trailOffset;
          for (let j = 0; j < digits; j++) {
            const spread = coneWidth * (j / (digits - 1) - 0.5);
            const randOffset = (Math.random() - 0.5) * coneWidth * 0.3;
            const x = offsetX + Math.cos(angle) * (spread + randOffset);
            const y = offsetY + Math.sin(angle) * (spread + randOffset);
            const binary = Math.random() > 0.5 ? "1" : "0";
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fillText(binary, x, y);
          }
        }
      }

      update() {
        const curveStrength = 0.1;
        const angleChange = (Math.random() - 0.5) * curveStrength;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const currentAngle = Math.atan2(this.vy, this.vx);
        const newAngle = currentAngle + angleChange;
        this.vx = Math.cos(newAngle) * speed;
        this.vy = Math.sin(newAngle) * speed;

        this.x += this.vx;
        this.y += this.vy;

        let teleported = false;
        if (this.x < 0) {
          this.x = canvasWidth;
          teleported = true;
        } else if (this.x > canvasWidth) {
          this.x = 0;
          teleported = true;
        }
        if (this.y < 0) {
          this.y = canvasHeight;
          teleported = true;
        } else if (this.y > canvasHeight) {
          this.y = 0;
          teleported = true;
        }

        this.angle = Math.atan2(this.vy, this.vx);

        if (teleported) {
          this.lastTrailPoint = { x: this.x, y: this.y };
        }

        const distanceFromLastPoint = Math.sqrt(
          Math.pow(this.x - this.lastTrailPoint.x, 2) +
          Math.pow(this.y - this.lastTrailPoint.y, 2)
        );

        if (distanceFromLastPoint >= this.trailSpacing) {
          this.trail.push({ x: this.x, y: this.y, angle: this.angle });
          this.lastTrailPoint = { x: this.x, y: this.y };
          if (this.trail.length > this.maxTrailLength) {
        this.trail.shift();
          }
        }
      }

      draw() {
        this.drawTrail();
        this.drawPlane();
      }
    }

    function setCanvasSize() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    function createPlanes() {
      planes = [];
      for (let i = 0; i < planeCount; i++) {
        planes.push(new Plane());
      }
    }
    function createStars() {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    }

    setCanvasSize();
    createPlanes();
    createStars();

    let frameCount = 0;
    const frameSkip = 3;
    function animate() {
      animationId = requestAnimationFrame(animate);
      if (frameCount % frameSkip === 0) {
        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, '#101820');
        gradient.addColorStop(1, '#1a2427');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        // Draw stars
        stars.forEach((star) => {
          star.update();
          star.draw();
        });
        // Draw planes
        planes.forEach((plane) => {
          plane.update();
          plane.draw();
        });
      }
      frameCount++;
    }
    animate();

    function handleResize() {
      setCanvasSize();
      createPlanes();
      createStars();
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const renderContent = () => {
    return (
      <div id="#" className="hero-container">
        <section className="hero">
          <h1>Hey, I'm Nathan 👋</h1>
          <h2>
            <TypeAnimation 
              sequence={["a Software Developer", 2000, "an ML Engineer", 2000, "a Data Scientist", 2000]}
              wrapper="span"
              cursor={true}
              speed={300}
              deletionSpeed={200}
              repeat={Infinity}
            />
          </h2>
          <p>Computer Science and Finance Student @ University of Waterloo</p>
        </section>
        <div className="social-links">
          <a href="https://github.com/nathn101" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} /> Github
          </a>
          <a href="https://www.linkedin.com/in/nc101/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} /> LinkedIn
          </a>
          <a href="https://drive.google.com/file/d/1dfIiR90f-bbYxgaJNmNZoFg8_SUaW8IE/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <FaFile size={30} /> Resume
          </a>
        </div>
      </div>
    );
  };

  const ProjectSection = () => {
    return (
      <section className="projects" id="projects">
        <h2 className="section-header">My Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-content">
              <h3>Spotify Matchmaker</h3>
              <div className="tech-tags">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Machine Learning</span>
                <span className="tech-tag">Web Dev</span>
              </div>
              <p>A matchmaking application that uses machine learning to match people based on their Spotify listening profiles</p>
              <div className="project-links">
                <a href="https://github.com/nathn101/InSync" target="_blank" rel="noopener noreferrer">Source Code</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-content">
              <h3>WOKE</h3>
              <div className="tech-tags">
                <span className="tech-tag">AI</span>
                <span className="tech-tag">Web Dev</span>
                <span className="tech-tag">Computer Vision</span>
              </div>
              <p>A secure video-calling service equipped with AI capabililties to detect instances of deepfake impersonation</p>
              <div className="project-links">
                <a href="https://github.com/nathn101/genesis" target="_blank" rel="noopener noreferrer">Source Code</a>
                <a href="https://devpost.com/software/woke-ocjzmr" target="_blank" rel="noopener noreferrer">Devpost</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-content">
              <h3>Python Roboadvisor</h3>
              <div className="tech-tags">
                <span className="tech-tag">Financial Modelling</span>
                <span className="tech-tag">Data Engineering</span>
                <span className="tech-tag">Data Visualization</span>
              </div>
              <p>A roboadvisor that generates an optimized portfolio from a given list of stocks for clients with low-risk tolerance</p>
              <div className="project-links">
                <a href="https://github.com/nathn101/Python-Roboadvisor" target="_blank" rel="noopener noreferrer">Source Code</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-content">
              <h3>Our ML Churney</h3>
              <div className="tech-tags">
                <span className="tech-tag">Machine Learning</span>
                <span className="tech-tag">Data Engineering</span>
                <span className="tech-tag">Data Visualization</span>
              </div>
              <p>A custom prediction model for Infinite Investment Systems which predicts whether or not customers will churn</p>
              <div className="project-links">
                <a href="https://github.com/nathn101/DSC-Datathon" target="_blank" rel="noopener noreferrer">Source Code</a>
                <a href="https://devpost.com/software/our-ml-churney" target="_blank" rel="noopener noreferrer">Devpost</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-content">
              <h3>Tag-Team</h3>
              <div className="tech-tags">
                <span className="tech-tag">Web Dev</span>
                <span className="tech-tag">NLP</span>
                <span className="tech-tag">Computer Vision</span>
              </div>
              <p>A note-sharing application that allows users to scan documents and easily share them among a group of people</p>
              <div className="project-links">
                <a href="https://github.com/nathn101/DSC-Datathon" target="_blank" rel="noopener noreferrer">Source Code</a>
                <a href="https://devpost.com/software/our-ml-churney" target="_blank" rel="noopener noreferrer">Devpost</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-content">
              <h3>Chess</h3>
              <div className="tech-tags">
                <span className="tech-tag">C++</span>
                <span className="tech-tag">Game Dev</span>
                <span className="tech-tag">OOP</span>
              </div>
              <p>A chess game developed using C++ that incorporates object-oriented programming principles.</p>
            </div>
          </div>
          <div className="project-card">
            <div className="project-content">
              <h3>WLP4 Compiler and Assembler</h3>
              <div className="tech-tags">
                <span className="tech-tag">C</span>
                <span className="tech-tag">Compiler Design</span>
                <span className="tech-tag">Assembler</span>
              </div>
              <p>A compiler and assembler for a custom assembly language, WLP4, developed in C. This project involved parsing, semantic analysis, and code generation.</p>
            </div>
          </div>
          <div className="project-card">
            <div className="project-content">
              <h3>Portfolio Website</h3>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">Web Dev</span>
              </div>
              <p>This portfolio website is built using React and Next.js, showcasing my projects and skills.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const WorkTimeline = () => {
    return (
      <div className="experience-timeline">
        <h3>Work Experience</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h4>Software Engineer</h4>
                <span className="timeline-date">May 2025 - August 2025</span>
              </div>
              <div className="timeline-company">Jamlabs Data Science</div>
              <div className="tech-tags">
                <span className="tech-tag">AWS</span>
                <span className="tech-tag">Terraform</span>
                <span className="tech-tag">HTML</span>
                <span className="tech-tag">CSS</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">Java</span>
                <span className="tech-tag">React</span>
              </div>
              <p>
              Developed a financial RAG chatbot application, focusing on cloud infrastructure using AWS and Terraform. Implemented responsive design with HTML, CSS, and JavaScript, enhancing user experience. Engineered automated workflows with Github Actions, improving deployment efficiency. Collaborated with a team of developers to deliver high-quality software solutions.     
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h4>Quantitative Developer</h4>
                <span className="timeline-date">September 2024 - December 2024</span>
              </div>
              <div className="timeline-company">Global X ETFs</div>
              <div className="tech-tags">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">SQL</span>
                <span className="tech-tag">Bloomberg</span>
              </div>
              <p>
              Enhanced a portfolio management system by improving data validation and reducing errors. Automated task scheduling to streamline daily operations and boost efficiency. Improved trading processes by implementing automation, leading to better execution and reliability.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h4>Technical Data Analyst</h4>
                <span className="timeline-date">January 2024 - April 2024</span>
              </div>
              <div className="timeline-company">Privy Council Office</div>
              <div className="tech-tags">
                <span className="tech-tag">Data Analysis</span>
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Tableau</span>
                <span className="tech-tag">PowerBI</span>
              </div>
              <p>
              Utilized data visualization tools to create interactive dashboards for analyzing organizational metrics. Automated workflows to enhance efficiency and reduce costs. Led the migration of large-scale data to a cloud-based infrastructure, improving scalability, security, and analytical capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AboutSection = () => {
    return (
      <section className="about" id="about">
      <h2 className="section-header">About Me</h2>
      <div className="about-grid">
        <div className="about-card">
        <h3>Background</h3>
        <div className="tech-tags">
          <span className="tech-tag">University of Waterloo</span>
          <span className="tech-tag">Computer Science</span>
          <span className="tech-tag">Finance</span>
        </div>
        <p>
          I'm a passionate software developer with a strong foundation in computer science and finance. 
          Currently studying at the University of Waterloo for Computing and Financial Management, I balance academic excellence with practical 
          project development.
        </p>
        </div>
    
        <div className="about-card">
        <h3>Technical Skills</h3>
        <div className="skills-container">
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>Python</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>C++</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>C</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>JavaScript</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>React</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>Next.js</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>HTML5</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>CSS3</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>Tailwind</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>Git</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>Docker</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" style={{height:'30px', width:'30px'}}/>
            <span>Terraform</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" style={{height:'30px', width:'30px'}}/>
          <span>AWS</span>
          </div>
          <div className="skill-item">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>Azure</span>
          </div>
          <div className="skill-item">  
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" style={{height:'30px', width:'30px'}}/>
          <span>Blender</span>
          </div>
        </div>
        </div>
    
        <div className="about-card">
        <h3>Experience</h3>
        <div className="tech-tags">
          <span className="tech-tag">Software Development</span>
          <span className="tech-tag">Machine Learning</span>
          <span className="tech-tag">Data Science</span>
        </div>
        <p>
          My experience spans across multiple domains including machine learning, web development, 
          and financial modeling. I'm particularly interested in AI applications and building 
          data-driven solutions that solve real-world problems.
        </p>
        </div>
    
        <div className="about-card">
        <h3>Interests</h3>
        <div className="tech-tags">
          <span className="tech-tag">Financial Tech</span>
          <span className="tech-tag">AI</span>
        </div>
        <p>
          Beyond coding, I'm passionate about exploring the intersection of technology and finance. 
          Outside of work and academics, I enjoy playing badminton, chess, listening to music and playing the guitar.
        </p>
        </div>
      </div>

      {WorkTimeline()}
      </section>
    );
  };

  const ContactSection = () => {
    return (
      <section className="contact" id="contact">
        <h2 className="section-header">Contact Me</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Get In Touch!</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              For any questions or if you want to chat, please feel free to contact me through Discord: @_nathn_ or by email!
            </p>
            
            <div className="contact-methods">
              <a href="mailto:nathan.ch.chu@gmail.com" className="contact-method">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>nathan.ch.chu@gmail.com</span>
              </a>
              
              <a href="https://www.linkedin.com/in/nc101/" target="_blank" rel="noopener noreferrer" className="contact-method">
                <FaLinkedin size={30} />
                <span>nathn101</span>
              </a>
              
              <a href="https://github.com/nathn101" target="_blank" rel="noopener noreferrer" className="contact-method">
                <FaGithub size={30} />
                <span>nathn101</span>
              </a>

              <a href='https://www.instagram.com/nathn0_0/' target="_blank" rel="noopener noreferrer" className="contact-method">
                <FaSquareInstagram size={30}/>
                <span>nathn0_0</span>
              </a>

              <a href='https://open.spotify.com/user/22i32facrqjg2lfp2ehn4bc7i?si=20aa642f9e5c45f1' target="_blank" rel="noopener noreferrer" className="contact-method">
                <FaSpotify size={30}/>
                <span>Spotify</span>
              </a>
            </div>
          </div>
  
          <div className="contact-card">
            <h3>Send a Message</h3>
            <form className="contact-form" action="https://formspree.io/f/xqapdwqg" method="POST">
              <div className="form-group">
                <input type="text" name="name"placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    );
  };

  const handleStateChange = () => {
    switch(activeSection) {
      case "projects":
        return ProjectSection();
      case "about":
        return AboutSection();
      case "contact":
        return ContactSection();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} id="network-canvas"></canvas>
      <header className="navbar">
        <a href="#" className="logo">
          <div className="logo-symbol"><img src={Logo} alt="NC"></img></div>
        </a>
        <nav>
          <ul>
            <li><a href="#projects" onClick={() => setActiveSection("projects")}>Projects</a></li>
            <li><a href="#about" onClick={() => setActiveSection("about")}>About</a></li>
            <li><a href="#contact" onClick={() => setActiveSection("contact")}>Contact</a></li>
          </ul>
        </nav>
      </header>
      {renderContent()}
      {handleStateChange()}
      <footer style={{ textAlign: 'center', color: '#0ff7e8', padding: '15px'}}>
        <p>&copy; 2025 NC</p>
      </footer>
    </div>
  );
};

export default HomeV3;
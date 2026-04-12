import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars, Text, Center, OrbitControls } from "@react-three/drei";
import "./homepage.scss";
import Logo from '../assets/logo/logo-no-bg.png';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaFile, FaSpotify } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

function EarthModel() {
  // Load the model from public
  const { scene } = useGLTF("/3d/low_poly_earth.glb");
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Instead of virtual offset, use native window scroll
    const scrollY = window.scrollY;
    // Map the scroll so that at 1.5 viewport heights, the animation is 100% complete
    const maxScroll = window.innerHeight * 1.5;
    let offset = scrollY / maxScroll;
    if (offset > 1) offset = 1;
    if (offset < 0) offset = 0;

    // Slowly spin into view
    const baseRotationY = state.clock.elapsedTime * 0.05;
    const baseRotationX = offset * Math.PI * 0.5;

    ref.current.rotation.x = baseRotationX;
    ref.current.rotation.y = baseRotationY;
  });

  return (
    <group ref={ref}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function OrbitingPlane({ radius, speed, angleOffset, color, tilt }) {
  const { scene } = useGLTF("/3d/low_poly_plane.glb");
  const clonedScene = require('react').useMemo(() => scene.clone(), [scene]);
  const planeRef = useRef();

  const [trail, setTrail] = useState([]);
  const lastEmit = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + angleOffset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    // Flat orbit path (tilt is handled by the parent group)
    const y = 0;

    if (planeRef.current) {
      planeRef.current.position.set(x, y, z);

      // Handle orientation strictly in local 2D circular space
      // Face the mathematical tangent of the circle (Forward)
      planeRef.current.rotation.y = -t;

      // Roll the plane 90 degrees so its belly points inwards towards the (0,0,0) center
      planeRef.current.rotation.z = -Math.PI / 2;
    }

    // Emit trail periodically
    if (clock.elapsedTime - lastEmit.current > 0.15) {
      lastEmit.current = clock.elapsedTime;

      // Calculate a point backward along the orbit arc
      const trailOffset = 0.2; // Radians back from the center
      const t_back = t - trailOffset;
      const trailX = Math.cos(t_back) * radius;
      const trailZ = Math.sin(t_back) * radius;

      setTrail(prev => {
        const newTrail = [...prev, {
          id: Math.random(),
          pos: [trailX, y, trailZ],
          char: Math.random() > 0.5 ? '1' : '0',
          time: clock.elapsedTime
        }];
        return newTrail.filter(p => clock.elapsedTime - p.time < 1.5);
      });
    }
  });

  return (
    <group rotation={tilt || [0, 0, 0]}>
      <group ref={planeRef}>
        <primitive object={clonedScene} scale={0.6} rotation={[0, 0, 0]} />
      </group>
      {/* Binary Trail */}
      {trail.map((p, i) => {
        const opacity = Math.max(0, i / trail.length); // fades out towards end of queue
        return (
          <Text
            key={p.id}
            position={p.pos}
            color={color || "#0ff7e8"}
            fontSize={0.06}
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
          >
            {p.char}
          </Text>
        )
      })}
    </group>
  );
}

function AnimatedWorld() {
  const groupRef = useRef();
  const controlsRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 1.5;
    let offset = scrollY / maxScroll;
    if (offset > 1) offset = 1;
    if (offset < 0) offset = 0;

    // Scale transformation
    const baseScale = 1.4; // Zoomed in a bit more at top
    const targetScale = baseScale + offset * 0.8; // Ends at 2.5
    groupRef.current.scale.setScalar(targetScale);

    // Position Transformation
    if (offset < 0.2) {
      groupRef.current.position.y = -3.5 + (offset * 12.5); // Starts at -3.5 instead of -5, pushes up to -1
    } else {
      groupRef.current.position.y = -1;
    }
    // Set fixed depth
    groupRef.current.position.z = -2;

    if (controlsRef.current) {
      controlsRef.current.target.copy(groupRef.current.position);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <EarthModel />
        <OrbitingPlane radius={1.5} speed={0.8} angleOffset={0} color="#0ff7e8" tilt={[Math.PI / 8, 0, Math.PI / 6]} />
        <OrbitingPlane radius={1.6} speed={0.6} angleOffset={Math.PI} color="#2035f0ff" tilt={[-Math.PI / 6, 0, -Math.PI / 8]} />
        <OrbitingPlane radius={1.4} speed={0.7} angleOffset={Math.PI} color="#20f0b5ff" tilt={[-Math.PI / 6, 0, -Math.PI / 8]} />
      </group>
      {!isMobile && (
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          domElement={document.body}
        />
      )}
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0ff7e8" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a020f0" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Suspense fallback={null}>
        <AnimatedWorld />
      </Suspense>
    </>
  );
}

const Homepage = () => {
  const renderContent = () => {
    return (
      <div className="hero-container">
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
          {/* Project 1 */}
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
          {/* Project 2 */}
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
          {/* Project 3 */}
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
          {/* Project 4 */}
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
          {/* Project 5 */}
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
          {/* Project 6 */}
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
          {/* Project 7 */}
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
          {/* Project 8 */}
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
                <img alt="Python" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>Python</span>
              </div>
              <div className="skill-item">
                <img alt="C++" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>C++</span>
              </div>
              <div className="skill-item">
                <img alt="C" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>C</span>
              </div>
              <div className="skill-item">
                <img alt="JavaScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>JavaScript</span>
              </div>
              <div className="skill-item">
                <img alt="React" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>React</span>
              </div>
              <div className="skill-item">
                <img alt="Next.js" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>Next.js</span>
              </div>
              <div className="skill-item">
                <img alt="HTML5" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>HTML5</span>
              </div>
              <div className="skill-item">
                <img alt="CSS3" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>CSS3</span>
              </div>
              <div className="skill-item">
                <img alt="Tailwind" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>Tailwind</span>
              </div>
              <div className="skill-item">
                <img alt="Git" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>Git</span>
              </div>
              <div className="skill-item">
                <img alt="Docker" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>Docker</span>
              </div>
              <div className="skill-item">
                <img alt="Terraform" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>Terraform</span>
              </div>
              <div className="skill-item">
                <img alt="AWS" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" style={{ height: '30px', width: '30px' }} />
                <span>AWS</span>
              </div>
              <div className="skill-item">
                <img alt="Azure" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" style={{ height: '30px', width: '30px' }} />
                <span>Azure</span>
              </div>
              <div className="skill-item">
                <img alt="Blender" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" style={{ height: '30px', width: '30px' }} />
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
                <FaSquareInstagram size={30} />
                <span>nathn0_0</span>
              </a>

              <a href='https://open.spotify.com/user/22i32facrqjg2lfp2ehn4bc7i?si=20aa642f9e5c45f1' target="_blank" rel="noopener noreferrer" className="contact-method">
                <FaSpotify size={30} />
                <span>Spotify</span>
              </a>
            </div>
          </div>

          <div className="contact-card">
            <h3>Send a Message</h3>
            <form className="contact-form" action="https://formspree.io/f/xqapdwqg" method="POST">
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
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

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        // Native window scrolling to the element minus the navbar height
        const top = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="homepage-wrapper">
      {/* 3D Background Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#0a0a0f", zIndex: 0 }}
      >
        <Scene />
      </Canvas>

      {/* HTML Overlay Content */}
      <div className="content-overlay" style={{ position: "relative", zIndex: 10 }}>
        <header className="navbar">
          <a href="#top" className="logo-symbol" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="logo-symbol"><img src={Logo} alt="NC"></img></div>
          </a>
          <nav>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            </ul>
          </nav>
        </header>

        <div className="scroll-sections">
          {renderContent()}

          <div className="padded-section">
            {AboutSection()}
          </div>

          <div className="padded-section">
            {ProjectSection()}
          </div>

          <div className="padded-section">
            {ContactSection()}
          </div>
        </div>

        <footer style={{ textAlign: 'center', color: '#0ff7e8', padding: '15px' }}>
          <p>&copy; 2025 NC</p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
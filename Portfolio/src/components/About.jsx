import { useEffect, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import './About.css';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              I'm a passionate full-stack developer with a love for creating
              innovative solutions and beautiful user experiences. With expertise
              in modern web technologies, I bring ideas to life through clean code
              and thoughtful design.
            </p>
            <p className="about-description">
              My journey in tech started with curiosity and has evolved into a
              career focused on building scalable applications and solving complex
              problems. I believe in continuous learning and staying updated with
              the latest industry trends.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>3+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-wrapper">
              <div className="image-placeholder">
                <FiUser style={{ fontSize: '8rem', opacity: 0.3 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

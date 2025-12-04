import { useEffect, useRef } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import './Projects.css';

const Projects = () => {
  const projectsRef = useRef(null);

  const projects = [
    {
      title: 'ALberto Watch Company',
      description: "A Single Page Application website for a watch company that sells watches and offers maintenance services.",
      tech: ['React', 'JavaScript', 'HTML', 'CSS'],
      image: '🕰️',
      link: 'https://subtle-marigold-dc2d26.netlify.app/',
      githublink: 'https://github.com/osayemii/my_rough_works/tree/master/Alberto_Watch_Company'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      tech: ['React', 'Firebase', 'JavaScript'],
      image: '📋',
      link: 'https://fantastic-axolotl-962bd2.netlify.app/',
      githublink: 'https://github.com/osayemii/my_rough_works/tree/master/Task_Management'
    },
    {
      title: 'Wayby Classic Furniture',
      description: 'A furniture company website that showcases their products and allow users to view the products and their details.',
      tech: ['React', 'Vite', 'JavaScript'],
      image: '🪑',
      link: 'https://animated-gingersnap-93d8fd.netlify.app/',
      githublink: 'https://github.com/osayemii/Semester1/tree/main/REACT/Wayby'
    },
    {
      title: 'Weather App',
      description: 'Real-time weather application with location-based forecasts and beautiful UI design.',
      tech: ['React', 'API Integration', 'CSS'],
      image: '🌤️',
      link: 'https://weather-apllication.vercel.app/',
      githublink: 'https://github.com/osayemii/my_rough_works/tree/master/Weather-App'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and live background.',
      tech: ['React', 'Vite', 'CSS'],
      image: '💼',
      link: '#',
      githublink: 'https://github.com/osayemii/my_rough_works/tree/master/Portfolio'
    },
    {
      title: 'Chat Application',
      description: 'A real-time chat application with multiple rooms, file sharing, and emoji support. This project is still in development.',
      tech: ['React', 'Socket.io', 'Node.js'],
      image: '💬',
      link: '#',
      githublink: 'https://github.com/osayemii/my_rough_works/tree/master/Chat-Application'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      projectCards.forEach((card) => observer.observe(card));
    }

    return () => {
      if (projectsRef.current) {
        const projectCards = projectsRef.current.querySelectorAll('.project-card');
        projectCards.forEach((card) => observer.unobserve(card));
      }
    };
  }, []);

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image">
                <div className="project-icon">{project.image}</div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    <FiExternalLink /> Live Demo
                  </a>
                  <a href={project.githublink} className="project-link" target="_blank" rel="noopener noreferrer">
                    <FiGithub /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

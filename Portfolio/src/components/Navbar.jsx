import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-text">Osayemi Daniel</span>
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
              className={activeSection === 'hero' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
              className={activeSection === 'skills' ? 'active' : ''}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className={activeSection === 'projects' ? 'active' : ''}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className={activeSection === 'contact' ? 'active' : ''}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

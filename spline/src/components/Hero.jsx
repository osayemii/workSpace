import { useEffect, useRef, useState } from 'react';
import '@splinetool/viewer';
import './Hero.css';

const Hero = () => {
  const viewRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [splineError, setSplineError] = useState(null);

  useEffect(() => {
    const viewer = viewRef.current;

    if (!viewer) {
      console.error('Spline viewer element not found');
      return;
    }

    const handleLoad = () => {
      console.log('✅ Spline loaded successfully');
      setIsLoaded(true);
      setSplineError(null);
      
      // Wait a bit for application to be ready
      setTimeout(() => {
        const application = viewer.application;
        console.log('Application:', application);
        
        if (application) {
          // Animate objects on load
          if (application.scene) {
            const scene = application.scene;
            console.log('Scene loaded:', scene);
            
            // List all objects in the scene
            const allObjects = [];
            scene.traverse((object) => {
              if (object.name) {
                allObjects.push(object.name);
                console.log(`Object found: ${object.name}`, object);
              }
              
              if (object.name === 'Group') {
                console.log('Group object found:', object);
                // Add initial animation
                object.rotation.y = 0;
              }
            });
            console.log('All objects in scene:', allObjects);
          }
          
          // Add mouse interaction
          viewer.addEventListener('mouseDown', (event) => {
            console.log('Mouse down on Spline viewer:', event);
            if (event.target) {
              console.log('Clicked object:', event.target.name);
            }
          });
        } else {
          console.warn('Application not available yet');
        }
      }, 500);
    };

    const handleError = (error) => {
      console.error('Spline viewer error:', error);
      setSplineError('Failed to load 3D scene');
    };

    // Listen for load event
    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('error', handleError);

    // Check if already loaded
    if (viewer.application) {
      handleLoad();
    }

    // Cleanup
    return () => {
      if (viewer) {
        viewer.removeEventListener('load', handleLoad);
        viewer.removeEventListener('error', handleError);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-3d-container">
        <spline-viewer 
          ref={viewRef} 
          url="https://prod.spline.design/fN34dRQ8JUwwMe1d/scene.splinecode"
          className="spline-viewer"
        />
        {!isLoaded && !splineError && (
          <div className="loading-overlay">
            <div className="loader"></div>
            <p>Loading 3D Experience...</p>
          </div>
        )}
        {splineError && (
          <div className="loading-overlay">
            <p style={{ color: '#ff6b6b' }}>{splineError}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Check console for details
            </p>
          </div>
        )}
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="gradient-text">Immersive 3D</span>
            <br />
            Experiences
          </h1>
          <p className="hero-subtitle">
            Explore the future of web design with interactive 3D graphics
            powered by cutting-edge technology
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('portfolio')}
            >
              View Portfolio
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
          <p>Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;


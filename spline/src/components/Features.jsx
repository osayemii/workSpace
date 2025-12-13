import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Interactive 3D',
      description: 'Engage users with immersive 3D experiences that respond to interactions'
    },
    {
      icon: '✨',
      title: 'Smooth Animations',
      description: 'Fluid animations and transitions that enhance user experience'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Perfect experience across all devices and screen sizes'
    },
    {
      icon: '⚡',
      title: 'High Performance',
      description: 'Optimized rendering for fast load times and smooth interactions'
    },
    {
      icon: '🎨',
      title: 'Custom Design',
      description: 'Tailored 3D models and scenes to match your brand identity'
    },
    {
      icon: '🔧',
      title: 'Easy Integration',
      description: 'Simple integration with React and modern web frameworks'
    }
  ];

  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Features</h2>
          <p className="section-subtitle">
            Powerful capabilities to create stunning 3D web experiences
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;



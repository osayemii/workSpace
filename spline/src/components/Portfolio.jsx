import './Portfolio.css';

const Portfolio = () => {
  const projects = [
    {
      title: '3D Product Showcase',
      description: 'Interactive product visualization',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop'
    },
    {
      title: 'Architectural Visualization',
      description: 'Immersive building tours',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop'
    },
    {
      title: 'Gaming Interface',
      description: 'Dynamic game UI elements',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop'
    },
    {
      title: 'Virtual Gallery',
      description: '3D art exhibition space',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'
    },
    {
      title: 'Interactive Dashboard',
      description: 'Data visualization in 3D',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    },
    {
      title: 'E-commerce Experience',
      description: '3D shopping interface',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
    }
  ];

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Portfolio</h2>
          <p className="section-subtitle">
            Explore our latest 3D projects and creative solutions
          </p>
        </div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-item">
              <div className="portfolio-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600/667eea/ffffff?text=' + project.title;
                  }}
                />
                <div className="portfolio-overlay">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <button className="portfolio-btn">View Project</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;



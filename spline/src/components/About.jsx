import './About.css';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Our 3D Studio</h2>
          <p className="section-subtitle">
            Creating immersive digital experiences that push the boundaries of web design
          </p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>Innovation Meets Design</h3>
            <p>
              We specialize in creating stunning 3D web experiences that captivate audiences
              and deliver exceptional user engagement. Our team combines cutting-edge technology
              with creative vision to bring your ideas to life.
            </p>
            <p>
              Using advanced 3D rendering and interactive design, we transform static websites
              into dynamic, immersive experiences that leave lasting impressions.
            </p>
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Team Members</div>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="visual-card">
              <div className="card-icon">🎨</div>
              <h4>Creative Design</h4>
              <p>Unique and innovative design solutions</p>
            </div>
            <div className="visual-card">
              <div className="card-icon">⚡</div>
              <h4>High Performance</h4>
              <p>Optimized for speed and efficiency</p>
            </div>
            <div className="visual-card">
              <div className="card-icon">🚀</div>
              <h4>Modern Technology</h4>
              <p>Latest tools and frameworks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;



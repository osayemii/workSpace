import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="container">
          <h1 className="hero-title">Transform Your Body, Transform Your Life</h1>
          <p className="hero-subtitle">
            Join thousands of fitness enthusiasts who have achieved their goals with our proven workout plans and premium equipment
          </p>
          <div className="hero-buttons">
            <a href="#workouts" className="btn btn-primary">Explore Workouts</a>
            <a href="#equipment" className="btn btn-secondary">Shop Equipment</a>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img 
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop" 
          alt="Fitness Hero"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1920x1080/ff6b35/ffffff?text=Fitness+Training';
          }}
        />
      </div>
    </section>
  );
};

export default Hero;




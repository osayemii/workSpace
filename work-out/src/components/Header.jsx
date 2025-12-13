import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <h2>FitZone</h2>
          </div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#workouts" onClick={(e) => { e.preventDefault(); scrollToSection('workouts'); }}>Workouts</a></li>
            <li><a href="#equipment" onClick={(e) => { e.preventDefault(); scrollToSection('equipment'); }}>Equipment</a></li>
            <li><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>Reviews</a></li>
          </ul>
          <button className="cart-btn" onClick={onCartClick}>
            <span>🛒</span>
            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;




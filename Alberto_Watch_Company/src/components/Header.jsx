import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import './Header.css';

export default function Header() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('home');
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    const count = localStorage.getItem('visitorsCount') || 1123;
    const newCount = parseInt(count) + 1;
    localStorage.setItem('visitorsCount', newCount);
    setVisitorCount(newCount);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveNavItem(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  //Block scroll if Mobile menu is opened
  useEffect(() => {
    const shouldBlockScroll = isMobileOpen;
    document.body.style.overflow = shouldBlockScroll ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, [isMobileOpen]);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Technology', id: 'technology' },
    { name: 'Store Locator', id: 'store-locator' },
    { name: 'Support', id: 'support' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'About Us', id: 'about-us' },
    { name: 'Contact Us', id: 'contact-us' },
    { name: 'Sitemap', id: 'site-map' },
  ];

  return (
    <header className="header">
      <div className={`container ${isMobileOpen ? 'nav-open' : ''}`}>

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        <div className="wrapper">
          {/* Mobile menu icon */}
          <span
            className="mobile-icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? '✕' : '☰'}
          </span>

          {/* Navigation menu */}
          <nav className={`nav ${isMobileOpen ? 'nav-open' : ''}`}>
            <ul>
              {navItems.map((item) => (
                <li
                  key={item.name}
                  >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={activeNavItem === item.id ? 'active' : ''}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visitor's count display*/}
          <div className="visitor">
            Visitors: <strong>{visitorCount.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}
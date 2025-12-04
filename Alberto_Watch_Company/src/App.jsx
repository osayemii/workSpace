import Header from './components/Header';
import Ticker from './components/Ticker';
import Home from './pages/Home';
import Products from './pages/Products';
import Technology from './pages/Technology';
import StoreLocator from './pages/StoreLocator';
import Support from './pages/Support';
import About from './pages/About';
import Contact from './pages/Contact';
import GalleryPage from './pages/GalleryPage';
import Sitemap from './pages/Sitemap';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <section id="home" className="section">
          <Home />
        </section>
        <section id="products" className="section">
          <Products />
        </section>
        <section id="technology" className="section">
          <Technology />
        </section>
        <section id="store-locator" className="section">
          <StoreLocator />
        </section>
        <section id="support" className="section">
          <Support />
        </section>
        <section id="gallery" className="section">
          <GalleryPage />
        </section>
        <section id="about-us" className="section">
          <About />
        </section>
        <section id="contact-us" className="section">
          <Contact />
        </section>
        <section id="site-map" className="section">
          <Sitemap />
        </section>
      </main>
      <Ticker />
    </div>
  );
}
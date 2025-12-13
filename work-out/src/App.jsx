import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkoutPlans from './components/WorkoutPlans';
import Equipment from './components/Equipment';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <WorkoutPlans />
                <Equipment />
                <Reviews />
              </>
            } />
          </Routes>
          <Footer />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

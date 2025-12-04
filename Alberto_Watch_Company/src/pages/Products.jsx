import { useState } from 'react';
import Modal from '../components/Modal';
import { watches, allWatches } from '../data/watches';
import './Products.css';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['all', ...Object.keys(watches)];
  const displayed = selectedCategory === 'all' ? allWatches : watches[selectedCategory];

  return (
    <div className="products">
      <div className="products-container">
        <h1 className='products-h1'>Our Watches</h1>
        <p className='products-p'>Explore our collection of watches: carefully selected pieces that combine reliable movements, durable materials, and thoughtful design.</p>
        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid">
          {displayed.map((product) => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <img src={product.img} alt={product.name} />
              <div className="price-name">
                <p>{product.name}</p>
                <span>{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </div>
    </div>
  );
}
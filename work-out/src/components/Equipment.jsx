import { useCart } from '../context/CartContext';
import './Equipment.css';

const Equipment = () => {
  const { addToCart } = useCart();

  const equipment = [
    {
      id: 1,
      name: 'Adjustable Dumbbells',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop',
      description: 'Professional grade adjustable dumbbells set',
      rating: 4.8,
      reviews: 234
    },
    {
      id: 2,
      name: 'Yoga Mat Premium',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
      description: 'Extra thick non-slip yoga mat',
      rating: 4.9,
      reviews: 189
    },
    {
      id: 3,
      name: 'Resistance Bands Set',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      description: '5-piece resistance bands with handles',
      rating: 4.7,
      reviews: 312
    },
    {
      id: 4,
      name: 'Kettlebell Set',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
      description: '3-piece cast iron kettlebell set',
      rating: 4.6,
      reviews: 156
    },
    {
      id: 5,
      name: 'Foam Roller',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=600&fit=crop',
      description: 'High-density foam roller for recovery',
      rating: 4.8,
      reviews: 278
    },
    {
      id: 6,
      name: 'Pull-Up Bar',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
      description: 'Doorway pull-up bar with multiple grips',
      rating: 4.5,
      reviews: 201
    },
    {
      id: 7,
      name: 'Jump Rope Pro',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      description: 'Weighted jump rope with adjustable length',
      rating: 4.7,
      reviews: 145
    },
    {
      id: 8,
      name: 'Exercise Bench',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop',
      description: 'Adjustable workout bench with padding',
      rating: 4.9,
      reviews: 98
    }
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    // Show a brief notification
    const notification = document.createElement('div');
    notification.textContent = `${item.name} added to cart!`;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  return (
    <section id="equipment" className="section equipment">
      <div className="container">
        <h2 className="section-title">Premium Equipment</h2>
        <p className="section-description">
          Shop our collection of high-quality fitness equipment for your home gym
        </p>
        <div className="equipment-grid">
          {equipment.map((item) => (
            <div key={item.id} className="equipment-card card">
              <div className="equipment-image">
                <img 
                  src={item.image} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/004e89/ffffff?text=' + item.name;
                  }}
                />
                <div className="equipment-rating">
                  <span>⭐ {item.rating}</span>
                  <span className="reviews-count">({item.reviews})</span>
                </div>
              </div>
              <div className="equipment-content">
                <h3>{item.name}</h3>
                <p className="equipment-description">{item.description}</p>
                <div className="equipment-footer">
                  <span className="equipment-price">${item.price.toFixed(2)}</span>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipment;




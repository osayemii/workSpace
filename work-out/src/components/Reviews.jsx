import { useState } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      text: 'The Beginner Plan was exactly what I needed! I lost 15 pounds in 4 weeks and feel stronger than ever. The video tutorials made it so easy to follow along.',
      plan: 'Beginner Plan'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      text: 'Amazing equipment quality! The adjustable dumbbells are perfect for my home gym. Great value for money and they feel very sturdy.',
      equipment: 'Adjustable Dumbbells'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 5,
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      text: 'The Yoga & Flexibility plan transformed my daily routine. I feel more flexible and relaxed. The meditation guides are a bonus!',
      plan: 'Yoga & Flexibility'
    },
    {
      id: 4,
      name: 'David Thompson',
      rating: 4,
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      text: 'The Advanced Plan pushed me to my limits in the best way. The 1-on-1 coaching sessions were incredibly helpful. Highly recommend!',
      plan: 'Advanced Plan'
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      rating: 5,
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      text: 'Love my new yoga mat! It\'s thick, non-slip, and perfect for all my workouts. Best purchase I\'ve made for my home gym.',
      equipment: 'Yoga Mat Premium'
    },
    {
      id: 6,
      name: 'James Wilson',
      rating: 5,
      date: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      text: 'The Cardio Blast plan got me in the best shape of my life. The HIIT workouts are intense but so effective. Lost 20 pounds!',
      plan: 'Cardio Blast'
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: '',
    type: 'plan'
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.text) {
      alert('Thank you for your review! It will be published after moderation.');
      setNewReview({ name: '', rating: 5, text: '', type: 'plan' });
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section id="reviews" className="section reviews">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-description">
          Read real reviews from our satisfied customers who have transformed their fitness journey
        </p>
        
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card card">
              <div className="review-header">
                <div className="reviewer-info">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="reviewer-avatar"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60/004e89/ffffff?text=' + review.name.charAt(0);
                    }}
                  />
                  <div>
                    <h4>{review.name}</h4>
                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="review-rating">{renderStars(review.rating)}</div>
              </div>
              <p className="review-text">{review.text}</p>
              {review.plan && (
                <span className="review-tag">Plan: {review.plan}</span>
              )}
              {review.equipment && (
                <span className="review-tag">Equipment: {review.equipment}</span>
              )}
            </div>
          ))}
        </div>

        <div className="add-review-section">
          <h3>Share Your Experience</h3>
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Write your review..."
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                rows="4"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reviews;




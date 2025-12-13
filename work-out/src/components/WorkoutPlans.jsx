import { useState } from 'react';
import './WorkoutPlans.css';

const WorkoutPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: 'Beginner Plan',
      duration: '4 Weeks',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      description: 'Perfect for those just starting their fitness journey',
      features: ['4-week structured program', 'Video tutorials', 'Nutrition guide', 'Progress tracking']
    },
    {
      id: 2,
      name: 'Intermediate Plan',
      duration: '8 Weeks',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
      description: 'Take your fitness to the next level',
      features: ['8-week advanced program', 'Personal trainer tips', 'Meal plans', 'Community support']
    },
    {
      id: 3,
      name: 'Advanced Plan',
      duration: '12 Weeks',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=600&fit=crop',
      description: 'Elite training for serious athletes',
      features: ['12-week elite program', '1-on-1 coaching sessions', 'Custom meal plans', 'Performance analytics']
    },
    {
      id: 4,
      name: 'Yoga & Flexibility',
      duration: '6 Weeks',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
      description: 'Improve flexibility and mental wellness',
      features: ['Daily yoga sessions', 'Meditation guides', 'Flexibility tracking', 'Stress relief techniques']
    },
    {
      id: 5,
      name: 'Cardio Blast',
      duration: '4 Weeks',
      price: 44.99,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
      description: 'High-intensity cardio workouts',
      features: ['HIIT workouts', 'Cardio challenges', 'Heart rate monitoring', 'Calorie burn tracking']
    },
    {
      id: 6,
      name: 'Strength Builder',
      duration: '10 Weeks',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop',
      description: 'Build muscle and increase strength',
      features: ['Progressive overload', 'Form corrections', 'Strength benchmarks', 'Recovery protocols']
    }
  ];

  const handleOrder = (plan) => {
    setSelectedPlan(plan);
    alert(`Order placed for ${plan.name}! Total: $${plan.price.toFixed(2)}\n\nThank you for your order!`);
  };

  return (
    <section id="workouts" className="section workout-plans">
      <div className="container">
        <h2 className="section-title">Workout Plans</h2>
        <p className="section-description">
          Choose from our expertly designed workout plans tailored to your fitness level and goals
        </p>
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.id} className="plan-card card">
              <div className="plan-image">
                <img 
                  src={plan.image} 
                  alt={plan.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/ff6b35/ffffff?text=' + plan.name;
                  }}
                />
                <div className="plan-badge">{plan.duration}</div>
              </div>
              <div className="plan-content">
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
                <div className="plan-footer">
                  <span className="plan-price">${plan.price.toFixed(2)}</span>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleOrder(plan)}
                  >
                    Order Now
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

export default WorkoutPlans;




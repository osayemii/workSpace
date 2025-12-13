# FitZone - Workout Website

A full-featured workout website built with Vite + React, featuring workout plans, equipment shopping, reviews, and order management.

## Features

- 🏋️ **Workout Plans Section**: Browse and order from 6 different workout plans with images
- 🛒 **Equipment Shopping**: Add fitness equipment to cart with full shopping cart functionality
- ⭐ **Reviews Section**: View customer reviews and submit your own
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 📱 **Mobile Responsive**: Works perfectly on all devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd work-out
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
work-out/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header with cart
│   │   ├── Hero.jsx            # Hero section with background image
│   │   ├── WorkoutPlans.jsx    # Workout plans with ordering
│   │   ├── Equipment.jsx       # Equipment/products with cart
│   │   ├── Reviews.jsx         # Customer reviews section
│   │   ├── Cart.jsx            # Shopping cart sidebar
│   │   └── Footer.jsx          # Footer component
│   ├── context/
│   │   └── CartContext.jsx     # Cart state management
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── public/                     # Static assets
└── package.json
```

## Features Breakdown

### Workout Plans
- 6 different workout plans (Beginner, Intermediate, Advanced, Yoga, Cardio, Strength)
- Each plan includes:
  - High-quality image
  - Duration and pricing
  - Feature list
  - Order functionality

### Equipment Shopping
- 8 different fitness equipment items
- Shopping cart with:
  - Add/remove items
  - Quantity management
  - Price calculation
  - Checkout functionality

### Reviews
- Display customer reviews with ratings
- Submit new reviews
- Star ratings system
- User avatars and dates

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Navigation
- **CSS3** - Styling with custom properties

## Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #ff6b35;
  --secondary-color: #004e89;
  /* ... */
}
```

### Images
Replace placeholder images in components with your own:
- Hero section: `src/components/Hero.jsx`
- Workout plans: `src/components/WorkoutPlans.jsx`
- Equipment: `src/components/Equipment.jsx`

## License

MIT

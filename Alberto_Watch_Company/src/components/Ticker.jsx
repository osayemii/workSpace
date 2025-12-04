import { useState, useEffect } from 'react';

export default function Ticker() {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          setLocation(`${data.city}, ${data.countryName}`);
        },
        () => setLocation('Location denied')
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  return (
    <div style={styles.ticker}>
      <div style={styles.marquee}>
        <span>
          🕒 {time.toLocaleString()} | 📍 {location} | 
          Welcome to Alberto Watch Company – Luxury Timepieces Since 1985
        </span>
      </div>
    </div>
  );
}

const styles = {
  ticker: { position: 'sticky', background: '#d4af37', color: '#1a1a1a', padding: '10px 0', overflow: 'hidden', fontSize: '0.9rem' },
  marquee: { whiteSpace: 'nowrap', animation: 'marquee 20s linear infinite' },
};

const keyframes = `
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`;
const styleSheet = document.createElement('style');
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);
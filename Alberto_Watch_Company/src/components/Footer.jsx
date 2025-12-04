import { useState, useEffect } from 'react';

function Footer() {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation(`Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`),
        () => setLocation('Location access denied')
      );
    } else {
      setLocation('Geolocation not supported');
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer">
      <marquee behavior="scroll" direction="left">
        {dateTime} | Location: {location}
      </marquee>
    </footer>
  );
}

export default Footer;
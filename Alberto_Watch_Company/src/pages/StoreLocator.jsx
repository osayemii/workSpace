import { useState, useEffect } from 'react';

const stores = [
  { id: 1, name: "Manhattan Flagship", address: "123 Luxury Ave, New York, NY 10001", phone: "(212) 555-0101", hours: "Mon–Sat: 10AM–8PM" },
  { id: 2, name: "Beverly Hills", address: "456 Rodeo Dr, Beverly Hills, CA 90210", phone: "(310) 555-0202", hours: "Mon–Sun: 11AM–7PM" },
  { id: 3, name: "Miami Design District", address: "789 NE 39th St, Miami, FL 33137", phone: "(305) 555-0303", hours: "Tue–Sat: 10AM–6PM" }
];

export default function StoreLocator() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation(`Lat: ${pos.coords.latitude.toFixed(2)}, Lon: ${pos.coords.longitude.toFixed(2)}`),
        () => setUserLocation("Location access denied")
      );
    }
  }, []);

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.heading}>Find a Store Near You</h1>
      {userLocation && <p style={styles.location}>Your Location: {userLocation}</p>}

      <div style={styles.grid}>
        {stores.map(store => (
          <div key={store.id} style={styles.storeCard}>
            <h3>{store.name}</h3>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Phone:</strong> {store.phone}</p>
            <p><strong>Hours:</strong> {store.hours}</p>
            <button style={styles.btn}>Get Directions</button>
          </div>
        ))}
      </div>

      <div style={styles.mapPlaceholder}>
        <p style={{ textAlign: 'center', color: '#777' }}>Interactive Map Coming Soon (Google Maps Integration)</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '60px 0' },
  heading: { textAlign: 'center', marginBottom: '15px' },
  location: { textAlign: 'center', color: '#d4af37', fontWeight: 'bold', marginBottom: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '40px' },
  storeCard: { background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' },
  btn: { marginTop: '15px', background: '#1a1a1a', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  mapPlaceholder: { height: '400px', background: '#eee', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};
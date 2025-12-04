export default function Technology() {
  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.heading}>Our Watch Technology</h1>
      <p style={styles.intro}>
        At Alberto Watch Company, we blend tradition with innovation. Explore the cutting-edge technologies behind our timepieces.
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Eco-Drive Solar Power</h3>
          <p>Never change a battery again. Citizen's Eco-Drive converts any light into energy, powering watches for months in the dark.</p>
        </div>
        <div style={styles.card}>
          <h3>Automatic Mechanical Movement</h3>
          <p>Powered by the motion of your wrist. No batteries. Precision Swiss or Japanese automatic calibers.</p>
        </div>
        <div style={styles.card}>
          <h3>Smart Connectivity</h3>
          <p>Bluetooth sync, heart rate, notifications, and GPS — luxury meets modern functionality.</p>
        </div>
        <div style={styles.card}>
          <h3>Sapphire Crystal</h3>
          <p>Virtually scratch-proof. Used in all luxury models for ultimate durability and clarity.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '60px 0', maxWidth: '1000px', margin: '0 auto' },
  heading: { textAlign: 'center', marginBottom: '20px', fontSize: '2.5rem' },
  intro: { textAlign: 'center', fontSize: '1.1rem', marginBottom: '40px', color: '#555' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' },
  card: {
    background: '#fff',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    textAlign: 'center',
    transition: '0.3s',
    ':hover': { transform: 'translateY(-8px)', boxShadow: '0 15px 30px rgba(0,0,0,0.12)' }
  }
};
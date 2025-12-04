const images = Array.from({ length: 12 }, (_, i) => `/images/gallery${i+1}.jpg`);

export default function Gallery() {
  return (
    <div style={{ padding: '40px 0', background: '#fff' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Our Gallery</h2>
        <div style={styles.grid}>
          {images.map((src, i) => (
            <img key={i} src={src} alt={`Gallery ${i+1}`} style={styles.img} onClick={() => alert('Lightbox coming soon!')} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' },
  img: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', cursor: 'pointer', transition: '0.3s', ':hover': { transform: 'scale(1.05)' } }
};
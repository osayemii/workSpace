import { useState } from 'react';

const galleryImages = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery${i + 1}.jpg`,
  caption: `Luxury Timepiece Exhibit #${i + 1}`
}));

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.heading}>Photo Gallery</h1>
        <p style={styles.sub}>Explore our collection, craftsmanship, and store ambiance.</p>

        <div style={styles.grid}>
          {galleryImages.map(img => (
            <div
              key={img.id}
              style={styles.item}
              onClick={() => setSelectedImg(img)}
            >
              <img src={img.src} alt={img.caption} style={styles.thumb} />
              <div style={styles.overlay}>
                <span>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedImg && (
          <div style={styles.lightbox} onClick={() => setSelectedImg(null)}>
            <img src={selectedImg.src} alt={selectedImg.caption} style={styles.fullImg} />
            <p style={styles.caption}>{selectedImg.caption}</p>
            <button style={styles.closeBtn} onClick={() => setSelectedImg(null)}>×</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '60px 0', background: '#f8f9fa' },
  heading: { textAlign: 'center', marginBottom: '10px' },
  sub: { textAlign: 'center', color: '#666', marginBottom: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
  item: { position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  thumb: { width: '100%', height: '200px', objectFit: 'cover', transition: '0.3s' },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '15px', textAlign: 'center', transform: 'translateY(100%)', transition: '0.3s' },
  itemHover: { '&:hover $thumb': { transform: 'scale(1.1)' }, '&:hover $overlay': { transform: 'translateY(0)' } },
  lightbox: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '20px' },
  fullImg: { maxWidth: '90%', maxHeight: '70vh', borderRadius: '10px', boxShadow: '0 0 30px rgba(255,255,255,0.3)' },
  caption: { color: '#fff', marginTop: '15px', fontSize: '1.1rem' },
  closeBtn: { position: 'absolute', top: '20px', right: '30px', fontSize: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }
};
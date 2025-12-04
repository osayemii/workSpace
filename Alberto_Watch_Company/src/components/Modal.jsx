export default function Modal({ product, onClose }) {
  if (!product) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.close} onClick={onClose}>×</button>
        <img src={product.img} alt={product.name} style={styles.img} />
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> {product.price}</p>
        <p>{product.desc}</p>
        <button style={styles.btn}>Inquire Now</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 },
  modal: { background: '#fff', padding: '30px', borderRadius: '15px', maxWidth: '500px', width: '90%', position: 'relative', animation: 'fadeIn 0.3s' },
  close: { position: 'absolute', top: '10px', right: '15px', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' },
  img: { width: '100%', borderRadius: '10px', marginBottom: '15px' },
  btn: { background: '#d4af37', color: '#1a1a1a', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }
};
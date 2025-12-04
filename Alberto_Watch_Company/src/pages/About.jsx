export default function About() {
  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.heading}>About Alberto Watch Company</h1>
      
      <section style={styles.section}>
        <h2>Our Legacy</h2>
        <p>
          Founded in <strong>1985</strong> by master watchmaker <em>Alberto Moretti</em> in Milan, Italy, 
          our journey began with a passion for precision and timeless design. Today, we are proud to 
          serve collectors and enthusiasts worldwide from our flagship stores in New York, Los Angeles, and Miami.
        </p>
      </section>

      <section style={styles.section}>
        <h2>What We Offer</h2>
        <ul style={styles.list}>
          <li>Full-service watch repair & restoration</li>
          <li>Authenticity appraisal for vintage pieces</li>
          <li>Curated selection of new luxury watches</li>
          <li>Trade-in and consignment services</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>Contact Information</h2>
        <div style={styles.contact}>
          <p><strong>Email:</strong> <a href="mailto:info@albertowatches.com" style={styles.link}>info@albertowatches.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+15551234567" style={styles.link}>+1 (555) 123-4567</a></p>
          <p><strong>Address:</strong> 123 Luxury Ave, New York, NY 10001</p>
          <p><strong>Hours:</strong> Mon–Sat: 10AM–8PM | Sun: 12PM–6PM</p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: { padding: '60px 0', lineHeight: '1.8' },
  heading: { textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' },
  section: { marginBottom: '40px', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
  list: { marginLeft: '20px', marginTop: '15px', fontSize: '1.1rem' },
  contact: { background: '#f8f9fa', padding: '20px', borderRadius: '10px', fontSize: '1.1rem' },
  link: { color: '#d4af37', textDecoration: 'none' }
};
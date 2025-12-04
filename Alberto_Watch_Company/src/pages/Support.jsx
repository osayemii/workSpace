export default function Support() {
  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.heading}>Customer Support</h1>

      <div style={styles.section}>
        <h2>Warranty & Repairs</h2>
        <p>All watches come with a <strong>2-year international warranty</strong>. Bring your watch and proof of purchase to any Alberto store for free inspection.</p>
        <ul style={styles.list}>
          <li>Battery replacement: Free within 1 year</li>
          <li>Band adjustment: Complimentary</li>
          <li>Polishing & cleaning: $50–$150</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2>Price List</h2>
        <table style={styles.table}>
          <thead>
            <tr><th>Service</th><th>Price</th></tr>
          </thead>
          <tbody>
            <tr><td>Full Service (Mechanical)</td><td>$250–$800</td></tr>
            <tr><td>Quartz Movement Replacement</td><td>$150</td></tr>
            <tr><td>Crystal Replacement</td><td>$80–$300</td></tr>
            <tr><td>Authenticity Appraisal</td><td>$100</td></tr>
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h2>FAQs</h2>
        <details style={styles.faq}>
          <summary>How do I authenticate my Rolex?</summary>
          <p>Visit any Alberto store with serial number and papers. We provide free initial inspection.</p>
        </details>
        <details style={styles.faq}>
          <summary>Do you buy pre-owned watches?</summary>
          <p>Yes! We offer trade-in and cash for luxury brands in good condition.</p>
        </details>
      </div>

      <div style={styles.contactBox}>
        <p><strong>Need Help?</strong> Call <a href="tel:+15551234567" style={{ color: '#d4af37' }}>+1 (555) 123-4567</a> or email <a href="mailto:support@albertowatches.com" style={{ color: '#d4af37' }}>support@albertowatches.com</a></p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '60px 0', lineHeight: '1.7' },
  heading: { textAlign: 'center', marginBottom: '40px' },
  section: { marginBottom: '40px', background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
  list: { marginLeft: '20px', marginTop: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
  tableTh: { textAlign: 'left', padding: '12px', background: '#f8f9fa', borderBottom: '2px solid #ddd' },
  tableTd: { padding: '12px', borderBottom: '1px solid #eee' },
  faq: { marginBottom: '15px', cursor: 'pointer' },
  contactBox: { textAlign: 'center', padding: '25px', background: '#1a1a1a', color: '#fff', borderRadius: '15px' }
};

// Apply table styles
const tableStyle = document.createElement('style');
tableStyle.innerText = `
  table th, table td { padding: 12px; }
  table th { background: #f8f9fa; text-align: left; border-bottom: 2px solid #ddd; }
  table td { border-bottom: 1px solid #eee; }
`;
document.head.appendChild(tableStyle);
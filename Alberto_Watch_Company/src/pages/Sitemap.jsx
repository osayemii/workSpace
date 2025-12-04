export default function Sitemap() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Vintage Collection", path: "/products" },
    { name: "Luxury Collection", path: "/products" },
    { name: "Smart Watches", path: "/products" },
    { name: "Technology", path: "/technology" },
    { name: "Store Locator", path: "/store-locator" },
    { name: "Support & Services", path: "/support" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Sitemap", path: "/sitemap" }
  ];

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.heading}>Sitemap</h1>
      <ul style={styles.list}>
        {links.map((link, i) => (
          <li key={i} style={styles.item}>
            <a href={link.path} style={styles.link}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <p style={styles.footer}>
        © 2025 Alberto Watch Company. All rights reserved. | 
        <a href="/contact-us" style={{ color: '#d4af37', marginLeft: '5px' }}>Contact</a>
      </p>
    </div>
  );
}

const styles = {
  container: { padding: '60px 0', textAlign: 'center' },
  heading: { marginBottom: '40px', fontSize: '2.2rem' },
  list: { listStyle: 'none', maxWidth: '600px', margin: '0 auto' },
  item: { margin: '12px 0', fontSize: '1.1rem' },
  link: { color: '#1a1a1a', textDecoration: 'none', padding: '8px 0', display: 'block', borderBottom: '1px dashed #ddd', transition: '0.3s' },
  linkHover: { color: '#d4af37' },
  footer: { marginTop: '50px', color: '#777', fontSize: '0.9rem' }
};
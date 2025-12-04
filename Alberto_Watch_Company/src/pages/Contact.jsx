export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Your message has been sent.");
    };

    return (
        <div className="container">
            <h1>Get in Touch</h1>

            <div>
                <div>
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Your Name" required/>
                        <input type="email" placeholder="Your Email" required />
                        <input type="text" placeholder="Subject" required/>
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>

                <div>
                    <h2>Visit or Call Us</h2>
                    <p><strong>Address:</strong> 123 Luxury Ave, New York, NY 10001</p>
                    <p><strong>Phone:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@albertowatches.com">info@albertowatches.com</a></p>
                    <p><strong>Hours:</strong> Mon–Sat: 10AM–8PM</p>

                    <div>
                        <p>Map Placeholder (Google Maps Integration Coming Soon)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
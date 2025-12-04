export const watches = {
    vintage: [
        { id: 1, name: "Vintage Rolex Submariner", price: "$12,500", img: "/images/vintage1.avif", desc: "1960s classic diver's watch." },
        { id: 2, name: "Gold Leather Chronograph", price: "$8,900", img: "/images/vintage2.jpeg", desc: "Elegant wristwatch with a brown leather strap and gold-toned dial featuring multiple subdials and refined detailing." },
        { id: 7, name: "Classic Omega Seamaster", price: "$10,200", img: "/images/vintage3.jpg", desc: "Timeless design with a stainless steel case and black leather strap." },
        { id: 8, name: "Retro Tag Heuer Carrera", price: "$9,750", img: "/images/vintage4.jpeg", desc: "Iconic chronograph with a silver dial and brown leather strap." },
        { id: 9, name: "Antique Patek Philippe Calatrava", price: "$15,300", img: "/images/vintage5.jpeg", desc: "Sophisticated design with a white dial and black leather strap." }
    ],
    luxury: [
        { id: 3, name: "Two-Tone Biden Chronograph", price: "$38,000", img: "/images/luxury1.jpeg", desc: "Sleek design with blue-tinted dial and black strap." },
        { id: 4, name: "Black Chronograph Watch", price: "$65,000", img: "/images/luxury2.jpeg", desc: "Sleek design with blue-tinted dial and black strap." },
        { id: 10, name: "Diamond-Encrusted Audemars Piguet", price: "$120,000", img: "/images/luxury3.jpeg", desc: "Lavish timepiece adorned with diamonds and a platinum case." },,
        { id: 11, name: "Rose Gold Vacheron Constantin", price: "$95,000", img: "/images/luxury4.jpeg", desc: "Exquisite rose gold watch with intricate detailing and a brown leather strap." },
        { id: 12, name: "Platinum Jaeger-LeCoultre Reverso", price: "$110,000", img: "/images/luxury5.jpeg", desc: "Sophisticated platinum watch with a reversible case and black leather strap." }
    ],
    smart: [
        { id: 5, name: "Black Smartwatch", price: "$650", img: "/images/smart1.jpeg", desc: "Rectangular touchscreen with time, date, and battery display." },
        { id: 6, name: "Red Dial Smartwatch", price: "$899", img: "/images/smart2.jpeg", desc: "Sleek rectangular smartwatch with a black band and analog-style red gradient display." },
        { id: 13, name: "Fitness Tracker Pro", price: "$299", img: "/images/smart3.jpeg", desc: "Advanced fitness tracker with heart rate monitoring and GPS." },
        { id: 14, name: "Luxury Smartwatch Edition", price: "$1,200", img: "/images/smart4.jpeg", desc: "Premium smartwatch with a stainless steel case and leather strap." },
        { id: 15, name: "Outdoor Adventure Smartwatch", price: "$450", img: "/images/smart5.jpeg", desc: "Rugged smartwatch designed for outdoor activities with GPS and weather tracking." }
    ]
};

export const allWatches = Object.values(watches).flat();
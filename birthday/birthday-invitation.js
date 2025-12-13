// Create golden confetti
function createGoldConfetti() {
    const confettiCount = 30;
    const colors = ['#ffd700', '#d4af37', '#ffed4e', '#b8860b'];

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'gold-confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 6 + 4) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = (Math.random() * 4 + 6) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 10000);
        }, i * 200);
    }
}

// Create static snow dots scattered across card background
function createStaticSnow() {
    const card = document.querySelector('.invitation-card');
    const snowCount = 100;
    const sizes = ['small', '', 'large'];

    for (let i = 0; i < snowCount; i++) {
        const snow = document.createElement('div');
        snow.className = 'snow-particle';
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        if (size) snow.classList.add(size);
        snow.style.left = Math.random() * 100 + '%';
        snow.style.top = Math.random() * 100 + '%';
        snow.style.opacity = Math.random() * 0.5 + 0.3;
        card.appendChild(snow);
    }
}

// Create golden sparkles on card
function createSparkles() {
    const card = document.querySelector('.invitation-card');
    const sparkleCount = 15;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'golden-sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        card.appendChild(sparkle);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    createGoldConfetti();
    createStaticSnow();
    createSparkles();
    
    // Continuous confetti
    setInterval(() => {
        createGoldConfetti();
    }, 4000);

    // Add subtle mouse move effect
    const card = document.querySelector('.invitation-card');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 5;
        const y = (e.clientY / window.innerHeight - 0.5) * 5;
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale(1)`;
    });

    document.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
});


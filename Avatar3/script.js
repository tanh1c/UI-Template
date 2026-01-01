document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Intersection Observer for Cinematic Reveal
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Particle Background Logic (Depth Particles)
    const atmosphere = document.querySelector('.atmosphere');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;

        // Random drift animation
        const duration = 15 + Math.random() * 20;
        particle.style.animation = `drift ${duration}s linear infinite`;

        atmosphere.appendChild(particle);
    }

    // Add Drift Animation via JS (to keep styles clean)
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes drift {
            from { transform: translate(0, 0); }
            to { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); }
        }
    `;
    document.head.appendChild(styleSheet);

    // 3D Tilt Effect for Character Card
    const hyperCard = document.querySelector('.hyper-3d');
    if (hyperCard) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            hyperCard.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-20px)`;
        });
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Parallax Effect for Hero Image
    const heroImg = document.querySelector('header img');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroImg) {
            heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.4}px)`;
        }
    });

    // Random Bioluminescent "Echoes" in Console
    const avatarQuotes = [
        "> LINKING_WITH_EYWA...",
        "> NAVI_RECOGNITION: DETECTED",
        "> SCANNING_ASH_REALMS...",
        "> BIOLUME_LEVEL: 98.4%",
        "> PANDORA_CONNECTION: STABLE"
    ];

    setInterval(() => {
        const quote = avatarQuotes[Math.floor(Math.random() * avatarQuotes.length)];
        console.log(`%c ${quote}`, "color: #00ffc3; font-weight: bold; font-family: 'Cinzel', serif;");
    }, 8000);
});

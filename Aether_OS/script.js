document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Scroll Reveal Intersection Observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Spatial Parallax Effect
    // Higher intensity for the hero image to simulate z-depth
    const heroLayer = document.querySelector('.floating-layer');
    const heroContainer = document.querySelector('.hero-container');

    if (heroContainer && heroLayer) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;

            // Apply rotation and translation for depth
            heroLayer.style.transform = `rotateX(${y}deg) rotateY(${-x}deg) translateZ(40px)`;

            // Move sub-elements at different speeds (Parallax)
            const bubbles = document.querySelectorAll('.spatial-glass.p-4');
            bubbles.forEach((bubble, index) => {
                const intensity = (index + 1) * 20;
                bubble.style.transform = `translateX(${x * 0.5}px) translateY(${y * 0.5}px)`;
            });
        });
    }

    // Navbar Scroll Transition
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-2');
            nav.querySelector('.spatial-glass').classList.add('bg-black/80', 'py-2');
            nav.classList.remove('py-6');
        } else {
            nav.classList.add('py-6');
            nav.querySelector('.spatial-glass').classList.remove('bg-black/80', 'py-2');
            nav.classList.remove('py-2');
        }
    });

    // Simple Animation for Stats in Vision Section
    const stats = document.querySelectorAll('#vision .text-3xl');
    let animated = false;

    const animateStats = () => {
        if (animated) return;
        stats.forEach(stat => {
            const finalValue = stat.innerText;
            if (finalValue === '∞') return;

            const target = parseInt(finalValue);
            let start = 0;
            const duration = 1500;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const current = Math.floor(progress * target);
                stat.innerText = current + (finalValue.includes('ms') ? 'ms' : (finalValue.includes('+') ? '+' : ''));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    stat.innerText = finalValue;
                }
            };
            window.requestAnimationFrame(step);
        });
        animated = true;
    };

    // Observer for stats section
    const visionSection = document.getElementById('vision');
    if (visionSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
            }
        }, { threshold: 0.5 });
        statsObserver.observe(visionSection);
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

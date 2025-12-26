/* KFC Interactive Core */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.querySelector('.counter')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(c => animateCounter(c));
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll, .reveal-up').forEach(el => {
        revealObserver.observe(el);
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero 3D Tilt Effect
    const heroSection = document.getElementById('hero');
    const heroImg = document.querySelector('.hero-img');

    if (heroSection && heroImg) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const rotateX = (clientY - innerHeight / 2) / innerHeight * 20;
            const rotateY = (clientX - innerWidth / 2) / innerWidth * 20;

            heroImg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroImg.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }

    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        requestAnimationFrame(() => {
            cursor.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
            cursorDot.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
        });
    });

    const interactables = document.querySelectorAll('a, button, .group');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('scale-150', 'bg-brand-red/10', 'border-brand-red');
            cursorDot.classList.add('scale-0');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('scale-150', 'bg-brand-red/10', 'border-brand-red');
            cursorDot.classList.remove('scale-0');
        });
    });

    // Magnetic Buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
        });
    });

    // Counter Animation
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOutQuart * target);

            el.textContent = value.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(update);
    }

    // Simple Marquee Optimization (optional, as CSS does most)
    console.log("KFC: Finger Lickin' Good Logic Initialized.");
});

/* architecture-europe-script.js */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Custom Cursor Movement
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover Expansion for Cursor
    const interactiveElements = document.querySelectorAll('a, button, .group, .cursor-expand');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
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

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // Navbar Scroll Performance
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/90', 'backdrop-blur-xl', 'py-4', 'shadow-2xl', 'shadow-black/5');
            navbar.classList.remove('py-8', 'bg-transparent');
        } else {
            navbar.classList.remove('bg-white/90', 'backdrop-blur-xl', 'py-4', 'shadow-2xl', 'shadow-black/5');
            navbar.classList.add('py-8', 'bg-transparent');
        }
    });

    // Subtle Hero Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.getElementById('hero-img');
        if (heroImg) {
            heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.1}px)`;
        }
    });

    // Smooth Scroll Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('MAISON D\'ESPACE: Architectural Integrity Online.');
});

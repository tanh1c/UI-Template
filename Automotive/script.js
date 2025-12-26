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
            navbar.classList.add('bg-veloce-base/80', 'backdrop-blur-xl', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.remove('py-6', 'bg-transparent');
        } else {
            navbar.classList.remove('bg-veloce-base/80', 'backdrop-blur-xl', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.add('py-6', 'bg-transparent');
        }
    });

    // Subtle Hero Image Parallax (Tilt Effect)
    const heroSection = document.querySelector('section');
    const heroImg = document.getElementById('hero-img');

    if (heroSection && heroImg) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX - innerWidth / 2) / innerWidth * 20;
            const moveY = (clientY - innerHeight / 2) / innerHeight * 20;

            heroImg.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
    }

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

    // Inventory Navigation (Mock)
    console.log('VELOCE LUXE Interface: Online. Systems nominal.');
});

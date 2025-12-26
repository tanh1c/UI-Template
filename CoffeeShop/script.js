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
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/80', 'backdrop-blur-xl', 'py-4', 'shadow-2xl', 'shadow-siren-deep/5');
            navbar.classList.remove('py-6', 'bg-transparent');
        } else {
            navbar.classList.remove('bg-white/80', 'backdrop-blur-xl', 'py-4', 'shadow-2xl', 'shadow-siren-deep/5');
            navbar.classList.add('py-6', 'bg-transparent');
        }
    });

    // Subtle Mouse-Move Depth for Hero Image
    const heroSection = document.querySelector('section');
    const heroImg = document.getElementById('hero-img');

    if (heroSection && heroImg) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX - innerWidth / 2) / innerWidth * 15;
            const moveY = (clientY - innerHeight / 2) / innerHeight * 15;

            heroImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
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

    console.log('Siren & Bean Digital Experience: Online. Enjoy your brew.');
});

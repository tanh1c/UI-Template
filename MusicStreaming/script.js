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

    // Apply reveal to all sections and cards
    document.querySelectorAll('section, .group, .reveal-on-scroll').forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // Navbar Scroll Performance
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('bg-sonix-base/80', 'backdrop-blur-xl', 'py-4', 'border-b', 'border-white/5');
            nav.classList.remove('py-6', 'bg-transparent');
        } else {
            nav.classList.remove('bg-sonix-base/80', 'backdrop-blur-xl', 'py-4', 'border-b', 'border-white/5');
            nav.classList.add('py-6', 'bg-transparent');
        }
    });

    // Hero Parallax on Scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.animate-float img');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
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

    // Dynamic Sound Wave Mouse Tracker
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        // Logic for subtle background blob movement could go here
    });

    // Log Launch Status
    console.log('SONIX Interface: Online. Enjoy the fidelity.');
});

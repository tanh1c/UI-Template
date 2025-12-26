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

    // Apply reveal to elements
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // Navbar Scroll Performance
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('bg-lfc-dark/90', 'backdrop-blur-xl', 'py-4', 'border-b', 'border-white/5');
            nav.classList.remove('py-6', 'bg-transparent', 'top-12');
            nav.classList.add('top-0');
        } else {
            nav.classList.remove('bg-lfc-dark/90', 'backdrop-blur-xl', 'py-4', 'border-b', 'border-white/5', 'top-0');
            nav.classList.add('py-6', 'bg-transparent', 'top-12');
        }
    });

    // Parallax Effect for Hero Elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroText = document.querySelector('h1');
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
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

    // Match Countdown Logic (Mock)
    const countdownEl = document.querySelector('.animate-slide-left p.text-center');
    if (countdownEl) {
        // You could add dynamic countdown logic here
        console.log('Match countdown active: 28.12.2025');
    }

    console.log('LFC Digital Experience: Online. YOU\'LL NEVER WALK ALONE.');
});

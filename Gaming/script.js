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
                revealObserver.unobserve(entry.target); // Only reveal once
            }
        });
    }, observerOptions);

    // Dynamic selection of elements to reveal
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-4');
            nav.classList.remove('py-2'); // If using padding, adjust here
            nav.classList.add('bg-valo-dark');
        } else {
            nav.classList.remove('py-4');
            nav.classList.remove('bg-valo-dark');
        }
    });

    // Custom Button Feedback (Brutal Design)
    const brutalButtons = document.querySelectorAll('.brutal-shadow');
    brutalButtons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.classList.add('translate-x-1', 'translate-y-1', 'shadow-none');
        });
        btn.addEventListener('mouseup', () => {
            btn.classList.remove('translate-x-1', 'translate-y-1', 'shadow-none');
        });
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('translate-x-1', 'translate-y-1', 'shadow-none');
        });
    });

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 84;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Parallax for Hero
    const heroImage = document.querySelector('header img');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
        }
    });
});

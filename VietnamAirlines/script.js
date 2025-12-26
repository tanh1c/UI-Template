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

    // Navbar Scroll Performance & Color Transition
    const navbar = document.getElementById('navbar');
    const navLinks = navbar.querySelectorAll('.nav-link, span');
    const menuBtn = navbar.querySelector('button');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-xl', 'py-4', 'shadow-2xl', 'shadow-vna-teal/5');
            navbar.classList.remove('py-6', 'bg-transparent');

            // Adjust brand text color
            navbar.querySelector('span').classList.remove('text-white');
            navbar.querySelector('span').classList.add('text-vna-teal');

            // Adjust links color
            navbar.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-vna-teal');
            });

            if (menuBtn) menuBtn.classList.replace('text-white', 'text-vna-teal');
        } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-xl', 'py-4', 'shadow-2xl', 'shadow-vna-teal/5');
            navbar.classList.add('py-6', 'bg-transparent');

            // Revert brand text color
            navbar.querySelector('span').classList.add('text-white');
            navbar.querySelector('span').classList.remove('text-vna-teal');

            // Revert links color
            navbar.querySelectorAll('.nav-link').forEach(link => {
                link.classList.add('text-white');
                link.classList.remove('text-vna-teal');
            });

            if (menuBtn) menuBtn.classList.replace('text-vna-teal', 'text-white');
        }
    });

    // Subtle Hero Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.getElementById('hero-img');
        if (heroImg) {
            heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
        }
    });

    // Booking Widget Tab Logic (Simple Toggle)
    const tripTypeLabels = document.querySelectorAll('#booking label');
    tripTypeLabels.forEach(label => {
        label.addEventListener('click', () => {
            tripTypeLabels.forEach(l => {
                l.classList.add('opacity-50');
                l.classList.remove('text-vna-teal');
                l.querySelector('div').classList.remove('border-vna-teal');
                l.querySelector('div').innerHTML = '';
            });
            label.classList.remove('opacity-50');
            label.classList.add('text-vna-teal');
            label.querySelector('div').classList.add('border-vna-teal');
            label.querySelector('div').innerHTML = '<div class="w-2 h-2 bg-vna-teal rounded-full"></div>';
        });
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

    console.log('Vietnam Airlines Digital Experience: Online. Reach Further.');
});

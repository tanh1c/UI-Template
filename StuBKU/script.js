/* StuBKU Interactive Logic */

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
                if (entry.target.classList.contains('counter-stat')) {
                    animateCounter(entry.target);
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll, .reveal-up, .counter-stat').forEach(el => {
        revealObserver.observe(el);
    });

    // Navbar Scroll Performance & Scroll Progress
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.querySelector('div').classList.remove('bg-white/70');
            navbar.querySelector('div').classList.add('bg-white/95', 'shadow-2xl');
        } else {
            navbar.classList.remove('scrolled');
            navbar.querySelector('div').classList.add('bg-white/70');
            navbar.querySelector('div').classList.remove('bg-white/95', 'shadow-2xl');
        }
    });

    // Hero Image 3D Mouse Parallax
    const heroSection = document.querySelector('.hero-image-container');
    const heroImg = document.querySelector('.hero-img');

    if (heroSection && heroImg) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            heroImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroImg.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // Counter Animation Logic
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = startValue + (target - startValue) * easeOutQuart;

            if (el.getAttribute('data-is-float') === 'true') {
                el.textContent = current.toFixed(1);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = el.getAttribute('data-suffix') ?
                    el.toLocaleString() + el.getAttribute('data-suffix') :
                    el.textContent + (el.getAttribute('data-target-suffix') || '');
            }
        }
        requestAnimationFrame(update);
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

    // Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        // Use requestAnimationFrame for smoother cursor movement
        requestAnimationFrame(() => {
            cursor.style.left = clientX + 'px';
            cursor.style.top = clientY + 'px';
            cursor.style.transform = `translate(-50%, -50%)`;

            cursorDot.style.left = clientX + 'px';
            cursorDot.style.top = clientY + 'px';
            cursorDot.style.transform = `translate(-50%, -50%)`;
        });
    });

    const interactiveElements = document.querySelectorAll('a, button, .group, .magnetic');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('scale-150', 'bg-stu-primary/10', 'border-stu-primary');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('scale-150', 'bg-stu-primary/10', 'border-stu-primary');
        });
    });

    // Feature Cards 3D Tilt
    const cards = document.querySelectorAll('.group.reveal-on-scroll');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    console.log('StuBKU: Premium Educational Intelligence Initialized.');
});

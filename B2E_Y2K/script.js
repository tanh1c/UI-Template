document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Custom Star Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Randomly rotate the star slightly as it moves
            const moveRotation = (e.clientX + e.clientY) / 10;
            cursor.style.transform = `translate(-50%, -50%) rotate(${moveRotation}deg)`;
        });

        // Interactive elements hover
        const interactives = document.querySelectorAll('button, a, i, .group');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.background = '#FF00F5'; // Switch to pink on hover
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.background = '#CCFF00'; // Back to lime
            });
        });
    }

    // Scroll Reveal Intersection Observer
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

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Parallax Effect for Hero Tech Elements
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const techElements = document.querySelectorAll('.animate-float');

        techElements.forEach((el, index) => {
            const speed = (index + 1) * 0.2;
            el.style.transform = `translateY(${scrolled * speed * -1}px)`;
        });

        // Navbar scroll effect
        const nav = document.querySelector('nav');
        if (scrolled > 50) {
            nav.style.height = '60px';
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.height = '80px';
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // Simulated "Connecting" sequence
    const connectBtn = document.querySelector('nav button');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const originalText = connectBtn.innerText;
            connectBtn.innerText = 'INITIALIZING...';
            connectBtn.style.backgroundColor = '#FF00F5';
            connectBtn.style.color = '#FFFFFF';

            setTimeout(() => {
                connectBtn.innerText = 'LINKED // OK';
                connectBtn.style.backgroundColor = '#00F0FF';
                connectBtn.style.color = '#0A0A0A';
            }, 1500);
        });
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Intersection Observer for Reveal Animations (Brutal Style)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to sections
    document.querySelectorAll('section, .group').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        revealObserver.observe(el);
    });

    // Smooth scroll for nav links
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

    // Live Clock Update
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        setInterval(() => {
            const now = new Date();
            clockElement.innerText = now.toLocaleTimeString('en-US', { hour12: false });
        }, 1000);
    }

    // Button push feedback (Manual trigger for those without CSS active state)
    document.querySelectorAll('.brutal-shadow').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translate(4px, 4px)';
            btn.style.boxShadow = '0px 0px 0px 0px #000';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.boxShadow = '8px 8px 0px 0px #000';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.boxShadow = '8px 8px 0px 0px #000';
        });
    });
});

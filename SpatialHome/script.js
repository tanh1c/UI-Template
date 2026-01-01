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

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 120; // Account for floating nav
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Spatial Lighting Effect (Shimmer follows cursor on specific elements)
    const glassPanels = document.querySelectorAll('.glass-panel');

    glassPanels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update custom property for shimmer position if needed, 
            // or use a pseudo-element logic
            const shimmer = panel.querySelector('::after'); // Note: Cannot easily modify pseudo from JS directly
            // Approach: Use a real div for shimmer if deep interaction needed, 
            // but for now, the pure CSS shimmer + focus is clean.
        });
    });

    // Floating Navbar Scroll Effect
    const mainNav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.style.transform = 'translateX(-50%) translateY(10px) scale(0.95)';
            mainNav.style.background = 'rgba(255, 255, 255, 0.05)';
        } else {
            mainNav.style.transform = 'translateX(-50%) translateY(0) scale(1)';
            mainNav.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });

    // Background Mesh Movement
    const mesh = document.querySelector('.mesh-gradient');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        mesh.style.transform = `translate(${x}px, ${y}px)`;
    });
});

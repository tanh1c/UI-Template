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

    // Button Click "Skeuomorphic Feedback"
    // We can simulate a tactile click with a slight delay or sound log
    const glossyButtons = document.querySelectorAll('.sk-btn-glossy');
    glossyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Visual feedback handled by CSS :active
            console.log('> VITAL_COMMAND: ' + btn.innerText.toUpperCase() + '_EXECUTED');
        });
    });

    // Device "Mock" Heartbeat Animation for stats cards
    // This adds extra life to the "tactile" feel
    const bpCard = document.querySelector('[data-lucide="activity"]');
    if (bpCard) {
        setInterval(() => {
            bpCard.parentElement.classList.add('scale-110');
            setTimeout(() => {
                bpCard.parentElement.classList.remove('scale-110');
            }, 100);
        }, 1000); // 60 BPM average
    }

    // Smooth scroll for internal links with offset for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 160; // Approximate height with padding
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Random console messages for "System Diagnostics"
    const healthMessages = [
        "> VITAL_NODE_01: SYNC_COMPLETE",
        "> SENSOR_CALIBRATION: 99.9%",
        "> ENCRYPTION_LAYER_SECURED",
        "> ANALYSIS_PROTOCOL_ACTIVE"
    ];

    setInterval(() => {
        const msg = healthMessages[Math.floor(Math.random() * healthMessages.length)];
        // console.log(`%c ${msg}`, "color: #0A84FF; font-weight: bold; font-family: monospace;");
    }, 5000);
});

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

    // Terminal Input Feedback
    const terminalInput = document.querySelector('input');
    if (terminalInput) {
        terminalInput.addEventListener('focus', () => {
            terminalInput.parentElement.classList.add('border-pixel-green');
            terminalInput.parentElement.classList.remove('border-pixel-bg');
        });
        terminalInput.addEventListener('blur', () => {
            terminalInput.parentElement.classList.add('border-pixel-bg');
            terminalInput.parentElement.classList.remove('border-pixel-green');
        });
    }

    // Button Click "Stepped" Simulation
    // Visualized already by the .pixel-btn CSS logic, but we can add sound or console logs for fun
    document.querySelectorAll('.pixel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('> PROTOCOL_INIT_' + btn.innerText.replace(' ', '_').toUpperCase());
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
                const navHeight = 120;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Random Console "Glitches" for the Void theme
    const glitches = [
        "> LINKING NODE_404...",
        "> PACKET_LOSS_DETECTOR: 0.0%",
        "> VOID_PROTOCOL_V8_ENABLED",
        "> ENCRYPTING_PIXELS..."
    ];

    setInterval(() => {
        const randomGlitch = glitches[Math.floor(Math.random() * glitches.length)];
        // console.log(randomGlitch);
    }, 5000);
});

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

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Random Console "Data Processing" Messages
    const vaporQuotes = [
        "> LINKING TO RETRO_BUFFER...",
        "> SCANNING AESTHETICS...",
        "> SIGNAL_LOSS: 0.05%",
        "> LOADING DREAMS.EXE",
        "> NOSTALGIA_LEVEL: CRITICAL"
    ];

    setInterval(() => {
        const quote = vaporQuotes[Math.floor(Math.random() * vaporQuotes.length)];
        // Add subtle console log for the vibe
        console.log(`%c ${quote}`, "color: #FF71CE; font-family: monospace;");
    }, 4000);

    // Tracklist Play Simulation (Visual Only)
    const tracks = document.querySelectorAll('.group');
    const playerTitle = document.querySelector('h4.text-vp-cyan');

    tracks.forEach(track => {
        track.addEventListener('click', () => {
            const trackName = track.querySelector('span.font-bold').innerText;
            playerTitle.innerText = `NOW PLAYING: ${trackName}`;
            playerTitle.style.color = '#FF71CE'; // Change to pink when playing

            setTimeout(() => {
                playerTitle.style.color = '#01CDFE'; // Back to cyan
            }, 500);
        });
    });

    // Parallax Scrolling for Background Shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const floatingElements = document.querySelectorAll('.floating');

        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 0.1;
            el.style.transform = `translateY(${scrolled * speed * -1}px)`;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    const inkFlash = document.getElementById('inkFlash');
    const refreshBtn = document.getElementById('refreshBtn');

    // Function to simulate E-Ink refresh
    const triggerRefresh = () => {
        inkFlash.classList.add('active');
        setTimeout(() => {
            inkFlash.classList.remove('active');
            // Re-reveal elements slightly staggered
            document.querySelectorAll('.reveal').forEach((el, i) => {
                el.classList.remove('active');
                setTimeout(() => el.classList.add('active'), i * 50);
            });
        }, 150);
    };

    // Initial Flash on load
    triggerRefresh();

    // Refresh on button click
    refreshBtn.addEventListener('click', triggerRefresh);

    // E-Ink Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Instead of a smooth fade, use a sharp "pop" with steps
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Smooth scroll with a slight delay to mimic slow refresh
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                // Trigger flash before scrolling
                triggerRefresh();
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 150);
            }
        });
    });

    // Random console messages for "Ink Processing"
    const newsQuotes = [
        "> COMPILING DAILY DISPATCH...",
        "> DITHERING ASSETS...",
        "> PENETRATING THE FOG...",
        "> PRINTING THE FUTURE...",
        "> PAPER STATUS: OPTIMAL"
    ];

    setInterval(() => {
        const quote = newsQuotes[Math.floor(Math.random() * newsQuotes.length)];
        console.log(`%c ${quote}`, "color: #121212; font-family: 'Inter', sans-serif; font-weight: bold;");
    }, 6000);
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Intersection Observer for Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Small delay to ensure the 'invisible' state is locked before the pop
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Smooth scroll for nav links with offset for sticky nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);

            if (target) {
                const navHeight = 100; // Offset for sticky nav + spacing
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
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
});

// Project Data for Modal
const projects = {
    1: {
        title: "Neon Void Protocol",
        label: "Experimental UI",
        body: "A radical approach to high-frequency trading dashboards. We threw away all conventional 'safe' UI patterns and built something based on pure peripheral awareness and high-contrast recognition. Results: 40% faster decision making, 100% more style.",
        link: "#"
    },
    2: {
        title: "Acid Reality Engine",
        label: "Shader Perf",
        body: "Building a platform where artists could collaborate in a shared glitched reality. Using custom WebGL shaders and heavy brutalist containers to house delicate generative art. The contrast is the feature.",
        link: "#"
    },
    3: {
        title: "Glitch UI Kit",
        label: "Open Source",
        body: "The world's most aggressive UI kit. For when you need a landing page that screams authority and technical depth. Over 5,000 downloads and used by at least 12 people who really like shadows.",
        link: "#"
    }
};

function openProject(id) {
    const modal = document.getElementById('projectModal');
    const data = projects[id];

    if (!data) return;

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalLabel').innerText = data.label;
    document.getElementById('modalBody').innerHTML = `<p>${data.body}</p>`;
    document.getElementById('modalLink').href = data.link;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop scrolling
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Close modal on click outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) closeModal();
});

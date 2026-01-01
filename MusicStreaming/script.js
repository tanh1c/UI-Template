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

    // Chaos Button Feedback
    const chaosButtons = document.querySelectorAll('.chaos-shadow, .chaos-shadow-pink, .chaos-shadow-blue, .chaos-shadow-yellow');
    chaosButtons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translate(6px, 6px)';
            btn.style.boxShadow = 'none';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
            btn.style.boxShadow = '';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.boxShadow = '';
        });
    });

    // Sticker Interactions
    document.querySelectorAll('.sticker').forEach(sticker => {
        sticker.addEventListener('mouseenter', () => {
            const randomRotation = (Math.random() - 0.5) * 40;
            sticker.style.transform = `scale(1.1) rotate(${randomRotation}deg)`;
        });
        sticker.addEventListener('mouseleave', () => {
            sticker.style.transform = '';
        });
    });

    // --- MUSIC PLAYER LOGIC ---
    let isPlaying = false;
    let currentTrackId = 1;
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const playerProgress = document.getElementById('playerProgress');
    const playerKnob = document.getElementById('playerKnob');
    const playerTrack = document.getElementById('playerTrack');
    const playerArtist = document.getElementById('playerArtist');
    const playerArt = document.getElementById('playerArt');

    // Play/Pause Toggle
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        updatePlayerUI();
    });

    function updatePlayerUI() {
        if (isPlaying) {
            playIcon.setAttribute('data-lucide', 'pause');
            document.querySelectorAll('.eq-active').forEach(eq => eq.style.display = 'flex');
        } else {
            playIcon.setAttribute('data-lucide', 'play');
            document.querySelectorAll('.eq-active').forEach(eq => eq.style.display = 'none');
        }
        lucide.createIcons(); // Refresh icons
    }

    // Track Selection
    document.querySelectorAll('.track-item').forEach(item => {
        item.addEventListener('click', () => {
            // Remove active state from all
            document.querySelectorAll('.track-item').forEach(t => t.classList.remove('active'));
            // Add to current
            item.classList.add('active');

            // Update Player Data
            const id = item.dataset.track;
            const name = item.dataset.name;
            const artist = item.dataset.artist;
            const artBg = item.querySelector('.w-full.h-full').classList[1]; // Get bg-chaos-pink etc.

            playerTrack.innerText = name;
            playerArtist.innerText = artist;
            playerArt.className = `w-full h-full ${artBg}`;

            isPlaying = true;
            updatePlayerUI();
            resetProgress();
        });
    });

    // Progress Simulation
    let progress = 45;
    setInterval(() => {
        if (isPlaying) {
            progress += 0.2;
            if (progress > 100) progress = 0;
            playerProgress.style.width = `${progress}%`;
            playerKnob.style.left = `${progress}%`;
        }
    }, 100);

    function resetProgress() {
        progress = 0;
        playerProgress.style.width = '0%';
        playerKnob.style.left = '0%';
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 120;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});

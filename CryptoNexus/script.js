document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Scroll Reveal Logic
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Run at start

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simulated Live Price Update
    const priceElements = document.querySelectorAll('.text-mint, .text-red-500');
    setInterval(() => {
        priceElements.forEach(el => {
            if (Math.random() > 0.7) {
                const currentText = el.innerText;
                const matches = currentText.match(/\d+\.\d+/);
                if (matches) {
                    const price = parseFloat(matches[0]);
                    const change = (Math.random() - 0.5) * 5;
                    const newPrice = (price + change).toFixed(2);
                    el.innerHTML = el.innerHTML.replace(matches[0], newPrice);
                }
            }
        });
    }, 3000);

    // Navbar Scroll Transition
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('py-2', 'bg-obsidian/95');
            nav.classList.remove('py-4', 'bg-obsidian/80');
        } else {
            nav.classList.remove('py-2', 'bg-obsidian/95');
            nav.classList.add('py-4', 'bg-obsidian/80');
        }
    });
});

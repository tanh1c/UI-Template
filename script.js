document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    const hubContainer = document.getElementById('hubContainer');

    // The master list of projects in the workspace (Adjusted paths for Root)
    const projects = [
        { id: "01", name: "UI Style Museum", folder: "UI_Style_Museum", tag: "Gallery / Education", image: "ui_museum.png" },
        { id: "02", name: "KFC Ultimate", folder: "KFC_Ultimate", tag: "E-Commerce / Food", image: "KFC_Ultimate/kfc_hero_bucket.png" },
        { id: "03", name: "Vietnam Airlines", folder: "VietnamAirlines", tag: "Service / Travel", image: "VietnamAirlines/hero.png" },
        { id: "04", name: "StuBKU Landing", folder: "StuBKU", tag: "Education / Portfolio", image: "StuBKU/hero.png" },
        { id: "05", name: "NeoBrutalism", folder: "NeoBrutalismPortfolio", tag: "Portfolio / Art", image: "NeoBrutalismPortfolio/portrait.png" },
        { id: "06", name: "SaaS Platform", folder: "SaaS", tag: "Business / Dashboard", image: "SaaS/nexgen_analytics_hero.png" },
        { id: "07", name: "Cinema Hub", folder: "Cinema", tag: "Entertainment / Media", image: "Cinema/hero.png" },
        { id: "08", name: "AI Chatbot UI", folder: "AIChatbot", tag: "AI / Interaction", image: "AIChatbot/hero.png" },
        { id: "09", name: "Gaming Portal", folder: "Gaming", tag: "Gaming / Community", image: "Gaming/hero.png" },
        { id: "10", name: "Coffee Shop", folder: "CoffeeShop", tag: "Branding / Retail", image: "CoffeeShop/hero.png" },
        { id: "11", name: "Music Streaming", folder: "MusicStreaming", tag: "App / Media", image: "MusicStreaming/hero.png" },
        { id: "12", name: "Luxury Brand", folder: "LuxuryBrand", tag: "High-End / Fashion", image: "LuxuryBrand/hero.png" },
        { id: "13", name: "Automotive XP", folder: "Automotive", tag: "Luxury / Showroom", image: "Automotive/hero.png" },
        { id: "14", name: "Architecture", folder: "ArchitectureEurope", tag: "Design / Showcase", image: "ArchitectureEurope/hero.png" },
        { id: "15", name: "Marketing Agency", folder: "MarketingAgency", tag: "Agency / B2B", image: "MarketingAgency/hero.png" },
        { id: "16", name: "Liverpool FC", folder: "LiverpoolFC", tag: "Sports / Fanbase", image: "LiverpoolFC/hero.png" },
        { id: "17", name: "Luxury XP", folder: "Luxury", tag: "Elegance / Brand", image: "Luxury/hero.png" },
        { id: "18", name: "MediCare+", folder: "MediCare_Plus", tag: "Healthcare / App", image: "MediCare_Plus/hero.png" },
        { id: "19", name: "CryptoNexus", folder: "CryptoNexus", tag: "Fintech / Crypto", image: "CryptoNexus/hero.png" },
        { id: "20", name: "NeoBank Elite", folder: "NeoBank_Elite", tag: "Elite / Finance", image: "NeoBank_Elite/hero.png" },
        { id: "21", name: "Aether OS", folder: "Aether_OS", tag: "Spatial / OS", image: "Aether_OS/hero.png" }
    ];

    // Render projects
    projects.forEach(project => {
        const card = document.createElement('a');
        card.href = `${project.folder}/index.html`;
        card.className = 'project-card';
        card.innerHTML = `
            <div class="card-preview">
                <img src="${project.image}" alt="${project.name}">
            </div>
            <div class="card-content">
                <div class="card-glow"></div>
                <div class="card-num">${project.id}</div>
                <div class="card-tag">${project.tag}</div>
                <h2 class="card-title">${project.name}</h2>
                <div style="margin-top: 15px; display: flex; align-items: center; gap: 10px; font-size: 0.8rem; color: var(--nexus-accent);">
                    <span>EXPLORE NODE</span>
                    <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                </div>
            </div>
        `;
        hubContainer.appendChild(card);
    });

    // Re-run lucide for newly added elements
    lucide.createIcons();

    // Custom Cursor Logic
    const cursor = document.querySelector('.nexus-cursor');
    const dot = document.querySelector('.cursor-dot');

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });

    // Cursor hover effects on cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursor.style.width = '80px';
            cursor.style.height = '80px';
            cursor.style.background = 'rgba(0, 242, 255, 0.1)';
        });
        card.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'transparent';
        });
    });

    // Subtle parallax effect on grid based on mouse
    const grid = document.querySelector('.nexus-bg-grid');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        grid.style.transform = `translate(${x}px, ${y}px)`;
    });
});

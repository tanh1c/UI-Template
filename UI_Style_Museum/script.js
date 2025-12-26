/* UI Style Museum - Interaction & Dynamic Generation */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    const mainGrid = document.getElementById('mainGrid');

    // Complete list of all design styles from the CSV (STT 5 - 58)
    const additionalStyles = [
        /* General Styles */
        { name: "3D & Hyperrealism", desc: "Depth, realistic textures, spatial navigation, and tactile detail.", code: ".hyper-3d {\n  transform: translateZ(50px);\n  box-shadow: \n    0 20px 50px rgba(0,0,0,0.3),\n    0 0 0 1px rgba(255,255,255,0.1);\n  filter: drop-shadow(0 10px 10px #000);\n}", preview: '<div class="style-3d-hyper"><div class="cube-demo"></div></div>' },
        { name: "Vibrant & Block-based", desc: "Bold, energetic, high contrast blocks and duotone shapes.", code: ".vibrant-block {\n  background: #39FF14;\n  border: 4px solid #000;\n  padding: 2.5rem;\n  font-weight: 800;\n  box-shadow: 12px 12px 0px #BF00FF;\n}", preview: '<div class="style-vibrant"><div class="vibrant-circle"></div></div>' },
        { name: "Dark Mode (OLED)", desc: "Deep black backgrounds with high contrast neon accents for OLED.", code: ".oled-theme {\n  background: #000000;\n  color: #fff;\n  border: 1px solid #121212;\n  text-shadow: 0 0 8px rgba(255,255,255,0.5);\n}", preview: '<div class="style-oled"><div class="oled-glow"></div></div>' },
        { name: "Accessible & Ethical", desc: "WCAG AAA compliant with clear focus states and high contrast.", code: ".wcag-aaa {\n  outline: 4px solid #3b82f6;\n  outline-offset: 4px;\n  font-size: 1.125rem;\n  line-height: 1.6;\n  color: #0f172a;\n}", preview: '<div class="style-accessible"><div class="acc-bar w-full"></div><div class="acc-bar w-2/3"></div><div class="acc-bar w-1/2"></div></div>' },
        { name: "Retro-Futurism", desc: "80s aesthetic, neon glow, and CRT scanlines mixed with futuristic tech.", code: ".crt-screen {\n  background: #1a1a2e;\n  position: relative;\n}\n.crt::before {\n  content: '';\n  background: linear-gradient(\n    rgba(18, 16, 16, 0) 50%, \n    rgba(0, 0, 0, 0.25) 50%\n  );\n  background-size: 100% 4px;\n}", preview: '<div class="style-vaporwave"><div class="vapor-sun"></div></div>' }, // Reusing vaporwave sun for retro-future
        { name: "Flat Design", desc: "2D minimalist approach with no shadows and simple bold shapes.", code: ".flat-ui {\n  background: #2196F3;\n  border: none;\n  border-radius: 4px;\n  box-shadow: none;\n  transition: brightness 0.2s;\n}", preview: '<div class="style-flat"><div class="flat-square"></div></div>' },
        { name: "Skeuomorphism", desc: "Realistic material textures like leather, wood, and glass.", code: ".skeuo-surface {\n  background: linear-gradient(180deg, #f0f0f0 0%, #d1d1d1 100%);\n  border-top: 1px solid #fff;\n  border-bottom: 2px solid #888;\n  box-shadow: inset 0 1px 0 #fff;\n}", preview: '<div class="style-skeuo"><div class="skeuo-btn-demo">CLICK</div></div>' },
        { name: "Liquid Glass", desc: "Flowing iridescent glass with chromatic aberration and fluid motion.", code: ".liquid-glass {\n  backdrop-filter: blur(20px) saturate(180%);\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  animation: morph 8s infinite;\n}", preview: '<div class="style-aurora"><div class="aurora-blob"></div></div>' },
        { name: "Motion-Driven", desc: "Animation-heavy UX with microinteractions and parallax layers.", code: ".motion-driven {\n  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);\n  will-change: transform, opacity;\n  animation: entrance 1s ease-out;\n}", preview: '<div class="style-aurora" style="background: #111"><div class="aurora-blob" style="width: 100px; height: 100px;"></div></div>' },
        { name: "Micro-interactions", desc: "Small, tactile feedback animations triggered by user gestures.", code: ".micro-action {\n  transform: scale(0.95);\n  background: #22C55E;\n  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);\n}", preview: '<div class="style-neumorphism"><div class="neumo-btn" style="width: 60px; height: 60px;"><i data-lucide="hand-tap" class="w-6 h-6"></i></div></div>' },
        { name: "Inclusive Design", desc: "Universal accessibility focusing on color-blind friendly patterns.", code: ".inclusive-ui {\n  background-image: repeating-linear-gradient(\n    45deg, \n    transparent, \n    transparent 10px, \n    rgba(0,0,0,0.05) 10px\n  );\n}", preview: '<div class="style-accessible" style="background: #eee"><div class="acc-bar" style="background:#000"></div></div>' },
        { name: "Zero Interface", desc: "Minimal visible UI focusing on voice, gestures, and AI prediction.", code: ".zero-ui {\n  display: contents;\n  visibility: hidden;\n  /* Interface revealed via context or voice */\n}", preview: '<div class="flex items-center justify-center w-full h-full bg-black"><i data-lucide="mic" class="w-12 h-12 text-blue-500 animate-pulse"></i></div>' },
        { name: "Soft UI Evolution", desc: "Hybrid of Neumorphism and Flat Design with improved accessibility.", code: ".soft-modern {\n  background: #F9FAFB;\n  box-shadow: \n    0 10px 25px -5px rgba(0,0,0,0.1), \n    0 8px 10px -6px rgba(0,0,0,0.1);\n}", preview: '<div class="style-claymorphism" style="background: #f0f0f0"><div class="clay-btn" style="padding: 10px 20px;">SOFT</div></div>' },

        /* Landing Page Styles */
        { name: "Hero-Centric Design", desc: "Large hero sections with compelling typography and high-contrast CTAs.", code: ".hero-centric {\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  background-size: cover;\n  padding: 10vw;\n}", preview: '<div class="flex flex-col items-center justify-center bg-black w-full h-full"><div class="h-4 w-32 bg-white/20 mb-2"></div><div class="h-10 w-48 bg-blue-600"></div></div>' },
        { name: "Conversion-Optimized", desc: "Single CTA focus, high trust signals, and minimalist lead generation.", code: ".conversion-btn {\n  width: 100%;\n  background: #E4002B;\n  box-shadow: 0 4px 14px rgba(228,0,43,0.39);\n}", preview: '<div class="flex items-center justify-center bg-gray-900 w-full h-full"><div class="bg-red-600 px-6 py-2 font-bold">BUY NOW</div></div>' },
        { name: "Feature-Rich Showcase", desc: "Grid-based benefit cards with interactive problem-solution pairs.", code: ".feature-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 2rem;\n  perspective: 1000px;\n}", preview: '<div class="style-bento"><div class="bento-item"></div><div class="bento-item"></div></div>' },
        { name: "Social Proof-Focused", desc: "Testimonials, client logos, and ratings integrated as core visuals.", code: ".social-proof-card {\n  border-left: 4px solid #10b981;\n  background: #f0fdf4;\n  padding: 1.5rem;\n}", preview: '<div class="p-6 bg-white text-black w-full h-full flex flex-col justify-center"><div class="flex gap-1 mb-2"><i data-lucide="star" class="w-3 h-3 fill-yellow-400"></i><i data-lucide="star" class="w-3 h-3 fill-yellow-400"></i><i data-lucide="star" class="w-3 h-3 fill-yellow-400"></i></div><div class="h-2 w-full bg-gray-200"></div></div>' },
        { name: "Interactive Product Demo", desc: "Embedded mockups and step-by-step interactive walkthroughs.", code: ".demo-hotspot {\n  position: absolute;\n  width: 20px; height: 20px;\n  background: #6366f1;\n  animation: pulse 2s infinite;\n}", preview: '<div class="bg-blue-100 w-full h-full p-4 flex items-center justify-center"><div class="w-40 h-24 bg-white border-2 border-blue-500 relative"><div class="absolute top-2 left-2 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div></div></div>' },

        /* BI / Analytics Styles */
        { name: "Data-Dense Dashboard", desc: "Space-efficient layouts with high information density and KPI cards.", code: ".data-dense {\n  grid-template-areas: 'kpi kpi kpi kpi' 'chart chart table table';\n  gap: 8px;\n  font-size: 12px;\n}", preview: '<div class="bg-gray-950 p-2 w-full h-full grid grid-cols-2 grid-rows-2 gap-1"><div class="bg-gray-800"></div><div class="bg-gray-800"></div><div class="bg-gray-800"></div><div class="bg-gray-800"></div></div>' },
        { name: "Real-Time Monitoring", desc: "Streaming data visualizations with active status indicators.", code: ".status-pulse {\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  background: #22c55e;\n  box-shadow: 0 0 0 rgba(34,197,94,0.4);\n}", preview: '<div class="style-oled"><div class="oled-glow" style="background: #22c55e; box-shadow: 0 0 15px #22c55e;"></div></div>' },
        { name: "Executive Summary", desc: "High-level metrics and decision-maker dashboards with trend indicators.", code: ".kpi-trend-up {\n  color: #22c55e;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n}", preview: '<div class="bg-white p-4 w-full h-full flex flex-col justify-center text-black font-bold text-2xl">84% <span class="text-xs text-green-500">▲ 12%</span></div>' },

        /* Experimental & Modern */
        { name: "Organic Biophilic", desc: "Nature-inspired shapes and earthy tones focused on sustainability.", code: ".biophilic-curve {\n  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;\n  background: #065f46;\n  transition: border-radius 1s;\n}", preview: '<div class="style-biomimetic"></div>' },
        { name: "AI-Native UI", desc: "Conversational interfaces with streaming text and agentic context.", code: ".ai-stream {\n  background: linear-gradient(90deg, #6366f1, #a855f7);\n  -webkit-background-clip: text;\n  color: transparent;\n}", preview: '<div class="style-ai"><div class="ai-orb"></div></div>' },
        { name: "Memphis Design", desc: "80s geometric postmodern chaos with squiggles and triangles.", code: ".memphis-pattern {\n  background-color: #ff71ce;\n  background-image: radial-gradient(#05ffa1 2px, transparent 2px);\n  background-size: 20px 20px;\n}", preview: '<div class="style-memphis-demo"><div class="memphis-shape top-4 left-4 rounded-full"></div><div class="memphis-shape bottom-4 right-4 bg-yellow-300"></div></div>' },
        { name: "Dimensional Layering", desc: "Card stacking and elevation with distinct spatial z-index depth.", code: ".layered-depth {\n  transform: perspective(1000px) translate3d(0, 0, 100px);\n  z-index: 50;\n}", preview: '<div class="flex items-center justify-center bg-gray-900 w-full h-full perspective-500"><div class="w-32 h-32 bg-white/10 border border-white/20 transform rotateX(45deg) translateZ(50px)"></div></div>' },
        { name: "Exaggerated Minimalism", desc: "Massive typography and negative space with absolute restraint.", code: ".ultra-minimal {\n  font-size: clamp(4rem, 15vw, 12rem);\n  font-weight: 900;\n  letter-spacing: -0.05em;\n}", preview: '<div class="style-minimalism" style="font-size: 80px; font-weight: 900; background: #eee">X</div>' },
        { name: "Kinetic Typography", desc: "Text-in-motion with morphing letters and scroll-triggered type.", code: ".kinetic-text {\n  animation: marquee 20s linear infinite;\n  white-space: nowrap;\n}", preview: '<div class="bg-black flex items-center overflow-hidden w-full h-full h1 font-black text-4xl text-white italic">MOTION MOTION MOTION</div>' },
        { name: "Parallax Storytelling", desc: "Immersive scroll-driven narrative with layered depth effects.", code: ".parallax-layer {\n  transform: translateY(var(--scroll-offset));\n  will-change: transform;\n}", preview: '<div class="bg-indigo-900 w-full h-full relative overflow-hidden"><div class="absolute top-1/4 left-1/4 w-40 h-40 bg-indigo-500/30 blur-xl"></div><div class="absolute top-1/2 left-1/2 w-20 h-20 bg-indigo-400/50 rounded-full"></div></div>' },
        { name: "Swiss Modernism 2.0", desc: "Rational grid systems with Helvetica and mathematical spacing.", code: ".swiss-grid {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 1.5rem;\n  font-family: 'Helvetica', sans-serif;\n}", preview: '<div class="style-swiss"><div class="swiss-box"></div><div class="swiss-box"></div><div class="swiss-box"></div><div class="swiss-box" style="background:#ff0000"></div></div>' },
        { name: "HUD / Sci-Fi FUI", desc: "Technical wireframes and holographic data displays for sci-fi interfaces.", code: ".fui-hud {\n  border: 1px solid rgba(0, 255, 255, 0.4);\n  background: rgba(0,0,0,0.8);\n  box-shadow: inset 0 0 15px rgba(0,255,255,0.2);\n}", preview: '<div class="style-cyberpunk"><div class="w-32 h-32 border border-blue-400/30 rounded-full flex items-center justify-center relative"><div class="absolute w-full h-[1px] bg-blue-400/30"></div><div class="w-20 h-20 border-2 border-blue-400"></div></div></div>' },
        { name: "Pixel Art (Retro)", desc: "Blocky, nostalgic 8-bit arcade aesthetics with dithered textures.", code: ".pixel-border {\n  box-shadow: \n    0 -4px #000, 0 4px #000, \n    -4px 0 #000, 4px 0 #000;\n}", preview: '<div class="style-pixelart"><div class="pixel-box" style="width: 60px; height: 60px; background: #4cc9f0;"></div></div>' },
        { name: "Gen Z Chaos", desc: "Maximalist Internet culture with stickers, collages, and ironic clutter.", code: ".chaos-collage {\n  transform: rotate(-15deg);\n  filter: contrast(150%) hue-rotate(45deg);\n}", preview: '<div class="style-chaos"><div class="sticker top-4 left-4">VIBES</div><div class="sticker bottom-4 right-4 bg-blue-300">WOW</div></div>' },
        { name: "Biomimetic Organic", desc: "Physics-based generative growth and life-like cellular morphing.", code: ".organic-svg {\n  filter: url('#liquid-blur');\n  fill: #00ff41;\n}", preview: '<div class="style-biomimetic"><div class="bio-cell"></div></div>' }
    ];

    let currentExhibit = 15; // Starting index for dynamic exhibits

    additionalStyles.forEach((style, index) => {
        const card = document.createElement('div');
        card.className = 'exhibit-card reveal-on-scroll';
        card.style.transitionDelay = `${(index % 3) * 0.1}s`;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="exhibit-preview bg-neutral-900 group">
                        ${style.preview || `<div class="text-[10px] uppercase tracking-[5px] text-neutral-500 group-hover:text-blue-500 transition-colors">Exhibit ${currentExhibit}</div>`}
                        <div class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                    </div>
                    <div class="exhibit-info">
                        <div class="exhibit-title">${style.name}</div>
                        <div class="exhibit-desc">${style.desc}</div>
                    </div>
                </div>
                <div class="card-back">
                    <h4>Style Documentation</h4>
                    <div class="code-snippet">${style.code || '/* Design rules coming soon */'}</div>
                </div>
            </div>
        `;
        currentExhibit++; // Increment for next card
        mainGrid.appendChild(card);
    });

    // Flip logic
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.exhibit-card');
        if (card) {
            card.classList.toggle('is-flipped');
        }
    });

    // Reveal on scroll observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.exhibit-card').forEach(card => {
        card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        observer.observe(card);
    });

    console.log('UI Style Museum: Curator Initialized with 58 exhibits.');
});



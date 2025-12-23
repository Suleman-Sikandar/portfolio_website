const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const particlesContainer = document.getElementById('particles');
const THEME_KEY = 'portfolio-theme';

function setTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
}

function toggleTheme() {
    const isLight = document.body.classList.contains('light-theme');
    setTheme(isLight ? 'dark' : 'light');
}

function toggleMenu() {
    menu.classList.toggle('active');
}

function closeMenu() {
    menu.classList.remove('active');
}

function handleMenuToggleKey(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
    }
}

function createParticles() {
    if (!particlesContainer) return;
    const total = 60;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 15}s`;
        fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createParticles();

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('keyup', handleMenuToggleKey);
    }

    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    const contactForm = document.querySelector('.contact-form');
    const statusEl = document.getElementById('contact-status');
    if (contactForm && statusEl) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();

            const subject = encodeURIComponent('Portfolio Inquiry');
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            // Open the user's email client with the filled draft
            window.location.href = `mailto:sulemanmaitla17@gmail.com?subject=${subject}&body=${body}`;

            // Show quick contact follow-ups
            statusEl.innerHTML = `
                Thanks for reaching out! Your email draft is ready to send.<br />
                You can also message me directly on
                <a href="https://www.linkedin.com/in/suleman-sikandar-94100529a" target="_blank" rel="noopener noreferrer">LinkedIn</a>,
                <a href="https://x.com/SulemanMaitla1" target="_blank" rel="noopener noreferrer">Twitter</a>,
                <a href="https://github.com/Suleman-Sikandar" target="_blank" rel="noopener noreferrer">GitHub</a>,
                or <a href="https://www.fiverr.com/s/6YZ3d7R" target="_blank" rel="noopener noreferrer">Fiverr</a>.
            `;
            statusEl.classList.add('show');
            contactForm.reset();
        });
    }
});

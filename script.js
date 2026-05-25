/* ============================================================
   NAVIGATION — scroll border + mobile toggle
============================================================ */
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
}, { passive: true });

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   SMOOTH SCROLL (accounts for fixed navbar height)
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = navbar.offsetHeight + 8;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
});

/* ============================================================
   ACTIVE NAV LINK on scroll
============================================================ */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#navLinks a[href^="#"]');

function updateActiveLink() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 60;
    let current = '';

    sections.forEach(section => {
        if (section.offsetTop <= scrollPos) current = section.id;
    });

    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

/* ============================================================
   SCROLL-TRIGGERED FADE-UP ANIMATIONS
============================================================ */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
);

// Elements to animate — stagger siblings within the same parent
const animatables = document.querySelectorAll(
    '.section-header, .about-text, .stat-card, .timeline-item, ' +
    '.skill-group, .project-card, .edu-card, .contact-card'
);

animatables.forEach((el, i) => {
    el.classList.add('fade-up');
    // Lightweight stagger: delay siblings (mod 4 keeps it subtle)
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
});

/* ============================================================
   MOBILE MENU — close on outside click
============================================================ */
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
    }
});

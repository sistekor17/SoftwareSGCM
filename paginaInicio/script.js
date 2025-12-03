// Botón hamburguesa: controla visibilidad del menú en móvil
const toggle = document.querySelector('.header__nav-toggle');
const menu = document.getElementById('navMenu');
if (toggle && menu) {
    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('header__nav-list--open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

// Fade-in en scroll: mejora percepción de calidad sin bloquear contenido
const io = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// Scroll suave: accesibilidad y orientación del usuario
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === "#" || !document.querySelector(id)) return;
        e.preventDefault();
        const y = document.querySelector(id).getBoundingClientRect().top + window.scrollY - (document.querySelector('.header').offsetHeight + 16);
        window.scrollTo({ top: y, behavior: 'smooth' });
    });
});

// Contadores del hero: refuerzan confianza. Solo números visibles se animan
const counters = document.querySelectorAll('.hero__stat-number');
const co = new IntersectionObserver((entries) => {
    entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target; const target = el.textContent; const n = parseInt(target.replace(/\D/g, '')); const s = target.replace(/\d/g, '');
        if (isNaN(n)) return; let cur = 0; const steps = 50; const inc = n / steps; const step = 2000 / steps;
        const t = setInterval(() => { cur += inc; if (cur >= n) { cur = n; clearInterval(t); } el.textContent = Math.floor(cur) + s; }, step);
        co.unobserve(el);
    });
}, { threshold: 0.5 });
counters.forEach(c => co.observe(c));

// Acciones demo: simulan flujos sin backend
function callEmergency() { if (confirm('¿Contactar emergencias?')) location.href = 'tel:+542214535999'; }
document.querySelectorAll('.header__nav-link--emergency, .card--emergency .card__btn')
    .forEach(b => b.addEventListener('click', e => { e.preventDefault(); callEmergency(); }));
document.querySelectorAll('.card--appointments .card__btn')
    .forEach(b => b.addEventListener('click', e => { e.preventDefault(); alert('Redirigiendo a Turnos...'); }));
document.querySelectorAll('.card--portal .card__btn')
    .forEach(b => b.addEventListener('click', e => { e.preventDefault(); alert('Redirigiendo al Portal del Paciente...'); }));

// Efecto visual de header al hacer scroll: legibilidad sobre fondos complejos
window.addEventListener('scroll', () => {
    const h = document.querySelector('.header');
    const sc = window.scrollY > 100;
    h.style.backgroundColor = sc ? 'rgba(255,255,255,.95)' : '#fff';
    h.style.backdropFilter = sc ? 'blur(10px)' : 'none';
});
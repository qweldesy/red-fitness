/* Rэd Fitness & Wellness — демо-макет: интерактив */
(() => {
  'use strict';

  const header = document.getElementById('header');
  const menu = document.getElementById('menu');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');
  const yearEl = document.getElementById('year');
  const heroImg = document.getElementById('heroAthlete');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Шапка: фон при скролле + лёгкий параллакс атлета */
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
    if (!reduceMotion && heroImg) {
      heroImg.style.transform = `translate(-50%, ${window.scrollY * 0.08}px)`;
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Полноэкранное меню */
  const openMenu = () => {
    if (!menu) return;
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove('open');
    document.body.style.overflow = '';
  };
  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menu) menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* Демо-ссылки (вход и т.п. — без бэкенда) */
  document.querySelectorAll('[data-demo]').forEach((a) => {
    a.addEventListener('click', (e) => e.preventDefault());
  });

  /* Появление блоков при скролле */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* Демо-форма: без сервера, только визуальный отклик */
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = form.querySelector('.form-fields');
      const success = form.querySelector('.form-success');
      if (fields) fields.hidden = true;
      if (success) success.classList.add('show');
    });
  }

  /* Год в подвале */
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

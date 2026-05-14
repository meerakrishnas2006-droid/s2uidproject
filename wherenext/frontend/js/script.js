// script.js – Home page animations, navbar, slideshow, FAQ
document.addEventListener('DOMContentLoaded', () => {
  syncNav();

  // ── Navbar scroll ──────────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── Mobile menu ────────────────────────────────────────────────────────
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = navMenu.classList.contains('open') ? 'ri-close-line' : 'ri-menu-line';
    });
  }

  // ── Hero Video Slideshow ───────────────────────────────────────────────
  const videos = [
    document.getElementById('heroVideo0'),
    document.getElementById('heroVideo1'),
    document.getElementById('heroVideo2')
  ].filter(Boolean);

  const indicators = [
    document.getElementById('ind0'),
    document.getElementById('ind1'),
    document.getElementById('ind2')
  ].filter(Boolean);

  let currentSlide = 0;
  let slideTimer;

  function goToSlide(idx) {
    videos.forEach((v, i) => v.classList.toggle('hero-video-active', i === idx));
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === idx));
    if (videos[idx]) { videos[idx].currentTime = 0; videos[idx].play().catch(() => {}); }
    currentSlide = idx;
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => goToSlide((currentSlide + 1) % videos.length), 8000);
  }

  window.goToSlide = goToSlide;
  if (videos.length) { videos[0].play().catch(() => {}); slideTimer = setTimeout(() => goToSlide(1), 8000); }

  // ── GSAP Animations ────────────────────────────────────────────────────
  const gsap = window.gsap;
  const ST   = window.ScrollTrigger;
  if (gsap && ST) {
    gsap.registerPlugin(ST);

    // Hero entrance
    gsap.from('.hero-content > *', { y: 60, opacity: 0, duration: 1.1, stagger: 0.13, ease: 'power3.out', delay: 0.3 });
    gsap.from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.8, delay: 1.4 });

    // Scroll reveals
    document.querySelectorAll('[data-reveal]').forEach(el => {
      gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    document.querySelectorAll('[data-stagger]').forEach(c => {
      gsap.from(c.children, { y: 50, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 82%' } });
    });

    // Stat counters
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.count) || 0;
      const suffix = el.dataset.suffix || '';
      ST.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => {
        gsap.to({ v: 0 }, { v: target, duration: 2.2, ease: 'power2.out', onUpdate: function () {
          el.textContent = Math.floor(this.targets()[0].v) + suffix;
        }});
      }});
    });

    // 3D tilt on dest cards
    document.querySelectorAll('.dest-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        gsap.to(card, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 8, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8, transformPerspective: 800, duration: 0.4 });
      });
      card.addEventListener('mouseleave', () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' }));
    });
  }

  // ── Swiper Testimonials ────────────────────────────────────────────────
  if (window.Swiper) {
    new window.Swiper('.testimonials-swiper', {
      slidesPerView: 1, spaceBetween: 20, loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }

  // ── FAQ accordion ──────────────────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasOpen) item.classList.add('active');
    });
  });
});

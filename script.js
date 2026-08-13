document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const html = document.documentElement;

  // ── DARK / LIGHT TOGGLE ──
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ── HINDI / ENGLISH TOGGLE ──
  const langBtn = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  let currentLang = 'en';

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    html.setAttribute('data-lang', currentLang);
    langLabel.textContent = currentLang === 'en' ? 'हि' : 'EN';

    document.querySelectorAll('[data-en][data-hi]').forEach(el => {
      const text = el.getAttribute(currentLang === 'en' ? 'data-en' : 'data-hi');
      if (text) {
        if (el.tagName === 'A' || el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'H2' || el.tagName === 'H3') {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });
    if (window.lucide) lucide.createIcons();
  });

  // ── FLOATING NAVBAR SCROLL & ACTIVE SECTION HIGHLIGHT ──
  const navPills = document.querySelectorAll('.nav-pill');
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    let scrollY = window.scrollY;
    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 150;
      const sectionId = sec.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navPills.forEach(pill => {
          pill.classList.remove('active');
          if (pill.getAttribute('href') === `#${sectionId}`) {
            pill.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── ANIMATED COUNTERS ──
  let counterDone = false;
  const counters = document.querySelectorAll('.stat-n');
  const animateCounters = () => {
    if (counterDone) return;
    counterDone = true;
    counters.forEach(c => {
      const target = +c.dataset.target;
      const start = performance.now();
      const dur = 1600;
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        c.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };
  const statsEl = document.querySelector('.stats');
  if (statsEl) {
    new IntersectionObserver(([e]) => { if (e.isIntersecting) animateCounters(); }, { threshold: 0.4 }).observe(statsEl);
  }

  // ── SCROLL REVEAL ──
  const revEls = document.querySelectorAll(
    '.about-body, .about-info, .hl-card, .pill, .pj, .tl-item, .toolkit-card, .lg-item, .ct-card'
  );
  revEls.forEach(el => el.classList.add('reveal'));
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 50);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  revEls.forEach(el => revObs.observe(el));

  // ── CONTACT FORM MAILTO HANDLER ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cfName').value;
      const email = document.getElementById('cfEmail').value;
      const reason = document.getElementById('cfReason').value;
      const message = document.getElementById('cfMsg').value;

      const subject = encodeURIComponent(`[Portfolio Inquiry] ${reason} - ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nReason: ${reason}\n\nMessage:\n${message}`);

      window.location.href = `mailto:rahulkota0101@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});

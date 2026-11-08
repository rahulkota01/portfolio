document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const html = document.documentElement;

  // ── DARK / LIGHT TOGGLE ──
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);

  themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const next = currentTheme === 'dark' ? 'light' : 'dark';
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
        if (el.tagName === 'A' || el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'BUTTON') {
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

  // ── MOBILE SIDEBAR DRAWER ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const drawerClose = document.getElementById('drawerClose');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  const openDrawer = () => {
    if (navLinks) navLinks.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (navLinks) navLinks.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });
  }

  // ── CERTIFICATIONS ACADEMIC EXPANDER ──
  const toggleCertsBtn = document.getElementById('toggleCertsBtn');
  const moreCertsWrapper = document.getElementById('moreCertsWrapper');
  const toggleCertsTxt = document.getElementById('toggleCertsTxt');
  const certsChevron = document.getElementById('certsChevron');

  if (toggleCertsBtn && moreCertsWrapper) {
    toggleCertsBtn.addEventListener('click', () => {
      const isCollapsed = moreCertsWrapper.classList.contains('collapsed');
      const isHi = document.documentElement.getAttribute('lang') === 'hi';
      
      if (isCollapsed) {
        moreCertsWrapper.classList.remove('collapsed');
        moreCertsWrapper.classList.add('expanded');
        if (toggleCertsTxt) {
          toggleCertsTxt.textContent = isHi ? 'संक्षिप्त सूचकांक दिखाएं (कम करें)' : 'Collapse Academic Credentials Index';
        }
        if (certsChevron) certsChevron.style.transform = 'rotate(180deg)';
      } else {
        moreCertsWrapper.classList.remove('expanded');
        moreCertsWrapper.classList.add('collapsed');
        if (toggleCertsTxt) {
          toggleCertsTxt.textContent = isHi ? 'पूर्ण शैक्षणिक रिकॉर्ड देखें (7 और)' : 'Explore Complete Academic Credentials (7 More)';
        }
        if (certsChevron) certsChevron.style.transform = 'rotate(0deg)';
      }
    });
  }

  // ── FULL-SCREEN SUBPAGE SYSTEM ("IN-PAGE BOOK VIEW") ──
  const subpages = {
    memberships: document.getElementById('subpage-memberships'),
    insights: document.getElementById('subpage-insights'),
    skills: document.getElementById('subpage-skills')
  };

  let activeSubpageId = null;

  const openSubpage = (subpageId, pushState = true) => {
    const targetSubpage = subpages[subpageId];
    if (!targetSubpage) return;

    // Close any currently active subpage
    if (activeSubpageId && subpages[activeSubpageId]) {
      subpages[activeSubpageId].classList.remove('active');
      subpages[activeSubpageId].setAttribute('aria-hidden', 'true');
    }

    activeSubpageId = subpageId;
    targetSubpage.classList.add('active');
    targetSubpage.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Reset scroll to top
    const scrollBody = targetSubpage.querySelector('.subpage-scroll-body');
    if (scrollBody) scrollBody.scrollTop = 0;

    // Ensure all reveal elements inside subpage are instantly visible
    targetSubpage.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

    // Refresh icons inside subpage if needed
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    if (pushState) {
      history.pushState({ subpage: subpageId }, '', `#${subpageId}`);
    }
  };

  const closeSubpage = (popState = false) => {
    if (!activeSubpageId) return;

    const currentSubpage = subpages[activeSubpageId];
    if (currentSubpage) {
      currentSubpage.classList.remove('active');
      currentSubpage.setAttribute('aria-hidden', 'true');
    }

    activeSubpageId = null;
    document.body.style.overflow = '';

    if (!popState && window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }
  };

  // Nav pills & Mobile drawer clicks
  document.querySelectorAll('.subpage-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const subpage = link.getAttribute('data-subpage');
      if (subpage) {
        openSubpage(subpage);
        if (typeof closeDrawer === 'function') closeDrawer();
      }
    });
  });

  // Gateway cards & buttons on home page
  document.querySelectorAll('[data-open-subpage]').forEach(el => {
    el.addEventListener('click', (e) => {
      const subpage = el.getAttribute('data-open-subpage');
      if (subpage) openSubpage(subpage);
    });
  });

  // Back buttons and close icons inside subpages
  document.querySelectorAll('[data-close-subpage]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSubpage();
    });
  });

  // Handle browser back / forward buttons (popstate)
  window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.replace('#', '');
    if (subpages[hash]) {
      openSubpage(hash, false);
    } else {
      closeSubpage(true);
    }
  });

  // Check initial URL hash on page load
  const initialHash = window.location.hash.replace('#', '');
  if (subpages[initialHash]) {
    openSubpage(initialHash, false);
  }

  // ── GOATED LEVEL HIGHLIGHTS SHOWCASE (90% COVERAGE & AMBIENT AURA) ──
  const hlSlides = document.querySelectorAll('.hl-slide');
  const hlSlidesTrack = document.getElementById('hlSlidesTrack');
  const hlPrevBtn = document.getElementById('hlPrevBtn');
  const hlNextBtn = document.getElementById('hlNextBtn');
  const hlCurrentNum = document.getElementById('hlCurrentNum');
  const hlAmbientGlow = document.getElementById('hlAmbientGlow');
  const hlThumbBtns = document.querySelectorAll('.hl-thumb-btn');
  const hlProgressFill = document.getElementById('hlProgressFill');
  const hlShowcaseContainer = document.getElementById('hlShowcaseContainer');

  let currentHlSlide = 0;
  let progressInterval = null;
  let progressVal = 0;
  const SLIDE_DURATION = 3500; // 3.5s per slide

  const auraMap = ['gold', 'blue', 'teal', 'amber', 'purple'];

  const updateSlideUI = (index) => {
    currentHlSlide = (index + hlSlides.length) % hlSlides.length;

    // Track movement
    if (hlSlidesTrack) {
      hlSlidesTrack.style.transform = `translateX(-${currentHlSlide * 100}%)`;
    }

    // Active number counter
    if (hlCurrentNum) {
      hlCurrentNum.textContent = String(currentHlSlide + 1).padStart(2, '0');
    }

    // Dynamic ambient aura
    if (hlAmbientGlow) {
      const aura = hlSlides[currentHlSlide]?.getAttribute('data-theme-color') || auraMap[currentHlSlide] || 'gold';
      hlAmbientGlow.setAttribute('data-aura', aura);
    }

    // Thumbnail strip active state
    hlThumbBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === currentHlSlide);
    });

    // Reset progress fill
    progressVal = 0;
    if (hlProgressFill) hlProgressFill.style.width = '0%';
  };

  const nextHlSlide = () => updateSlideUI(currentHlSlide + 1);
  const prevHlSlide = () => updateSlideUI(currentHlSlide - 1);

  if (hlNextBtn) {
    hlNextBtn.addEventListener('click', () => {
      nextHlSlide();
      resetHlTimer();
    });
  }

  if (hlPrevBtn) {
    hlPrevBtn.addEventListener('click', () => {
      prevHlSlide();
      resetHlTimer();
    });
  }

  // Thumbnail buttons click
  hlThumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const slideIdx = parseInt(btn.getAttribute('data-jump-slide'), 10);
      if (!isNaN(slideIdx)) {
        updateSlideUI(slideIdx);
        resetHlTimer();
      }
    });
  });

  // Smooth Hairline Progress Bar & Auto-play Timer
  const startHlTimer = () => {
    stopHlTimer();
    const stepMs = 50;
    const stepIncrement = (stepMs / SLIDE_DURATION) * 100;

    progressInterval = setInterval(() => {
      progressVal += stepIncrement;
      if (hlProgressFill) {
        hlProgressFill.style.width = `${Math.min(progressVal, 100)}%`;
      }
      if (progressVal >= 100) {
        nextHlSlide();
        progressVal = 0;
      }
    }, stepMs);
  };

  const stopHlTimer = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  };

  const resetHlTimer = () => {
    stopHlTimer();
    progressVal = 0;
    if (hlProgressFill) hlProgressFill.style.width = '0%';
    startHlTimer();
  };

  if (hlSlides.length > 0 && hlSlidesTrack) {
    updateSlideUI(0);
    startHlTimer();

    // Pause on hover or touch
    if (hlShowcaseContainer) {
      hlShowcaseContainer.addEventListener('mouseenter', stopHlTimer);
      hlShowcaseContainer.addEventListener('mouseleave', startHlTimer);
      hlShowcaseContainer.addEventListener('touchstart', stopHlTimer, { passive: true });
      hlShowcaseContainer.addEventListener('touchend', startHlTimer, { passive: true });
    }

    // Keyboard navigation (left/right arrow keys)
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'ArrowRight') {
        nextHlSlide();
        resetHlTimer();
      } else if (e.key === 'ArrowLeft') {
        prevHlSlide();
        resetHlTimer();
      }
    });
  }

  // ── HIGHLIGHTS LIGHTBOX MODAL ──
  const hlLightboxModal = document.getElementById('hlLightboxModal');
  const hlLightboxImg = document.getElementById('hlLightboxImg');
  const hlLightboxCaption = document.getElementById('hlLightboxCaption');
  const hlLightboxClose = document.getElementById('hlLightboxClose');
  const hlLightboxBackdrop = document.getElementById('hlLightboxBackdrop');

  const openLightbox = (src, caption) => {
    if (!hlLightboxModal || !hlLightboxImg) return;
    hlLightboxImg.src = src;
    if (hlLightboxCaption) hlLightboxCaption.textContent = caption || '';
    hlLightboxModal.classList.add('active');
    hlLightboxModal.setAttribute('aria-hidden', 'false');
    stopHlTimer();
  };

  const closeLightbox = () => {
    if (!hlLightboxModal) return;
    hlLightboxModal.classList.remove('active');
    hlLightboxModal.setAttribute('aria-hidden', 'true');
    startHlTimer();
  };

  if (hlLightboxClose) hlLightboxClose.addEventListener('click', closeLightbox);
  if (hlLightboxBackdrop) hlLightboxBackdrop.addEventListener('click', closeLightbox);

  document.querySelectorAll('[data-lightbox-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-lightbox-trigger');
      const caption = btn.getAttribute('data-caption');
      openLightbox(src, caption);
    });
  });

  document.querySelectorAll('.hl-full-img').forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      const caption = img.getAttribute('alt');
      openLightbox(src, caption);
    });
  });

  // Global Escape key handler for subpages and lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (activeSubpageId) closeSubpage();
      if (hlLightboxModal && hlLightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    }
  });

  // ── REAL-TIME LEGITIMATE VISITOR TRACKER (DAILY MIDNIGHT RESET & GLOBAL TOTAL) ──
  const visitorTotalEl = document.getElementById('visitorCount');
  const visitorTodayEl = document.getElementById('visitorCountToday');
  const visitorNavEl = document.getElementById('visitorCountNav');

  if (visitorTotalEl || visitorTodayEl || visitorNavEl) {
    const getTodayKey = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    };

    const parseVisitorCount = (svgText) => {
      if (!svgText) return null;
      const match = svgText.match(/VISITORS:\s*([\d,]+)/i) || svgText.match(/font-weight="bold">\s*([\d,]+)/i);
      if (match && match[1]) {
        return parseInt(match[1].replace(/,/g, ''), 10);
      }
      return null;
    };

    const animateCounter = (el, targetVal, duration = 800) => {
      if (!el || targetVal === null || targetVal === undefined) return;
      const startVal = Math.max(0, targetVal > 15 ? targetVal - 15 : 0);
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startVal + (targetVal - startVal) * ease);
        el.textContent = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = targetVal.toLocaleString();
        }
      };
      requestAnimationFrame(step);
    };

    const loadRealVisitorCounts = () => {
      const todayKey = getTodayKey();
      const lastRecordedDate = localStorage.getItem('rk_visit_date');
      const isNewDay = lastRecordedDate !== todayKey;

      if (isNewDay) {
        localStorage.setItem('rk_visit_date', todayKey);
        localStorage.setItem('rk_today_count', '0');
      }

      // Check session to avoid duplicate count spamming on quick refreshes
      const sessionRecorded = sessionStorage.getItem('rk_session_recorded_' + todayKey);

      // Endpoints for real counts
      const totalUrl = 'https://api.visitorbadge.io/api/visitors?path=rahulkota01.github.io%2Fportfolio';
      const dailyUrl = `https://api.visitorbadge.io/api/visitors?path=rahulkota_daily_${todayKey}`;

      if (!sessionRecorded) {
        // Record new legitimate visit for both total and today
        Promise.allSettled([
          fetch(totalUrl).then(res => res.text()),
          fetch(dailyUrl).then(res => res.text())
        ]).then(([totalResult, dailyResult]) => {
          let totalCount = null;
          let todayCount = null;

          if (totalResult.status === 'fulfilled') {
            totalCount = parseVisitorCount(totalResult.value);
            if (totalCount !== null) {
              localStorage.setItem('rk_total_count', totalCount.toString());
              sessionStorage.setItem('rk_session_total', totalCount.toString());
            }
          }

          if (dailyResult.status === 'fulfilled') {
            todayCount = parseVisitorCount(dailyResult.value);
            if (todayCount !== null) {
              localStorage.setItem('rk_today_count', todayCount.toString());
              sessionStorage.setItem('rk_session_today', todayCount.toString());
            }
          }

          sessionStorage.setItem('rk_session_recorded_' + todayKey, 'true');

          const finalTotal = totalCount !== null ? totalCount : parseInt(localStorage.getItem('rk_total_count') || '0', 10);
          const finalToday = todayCount !== null ? todayCount : parseInt(localStorage.getItem('rk_today_count') || '0', 10);

          if (visitorTotalEl) animateCounter(visitorTotalEl, finalTotal);
          if (visitorNavEl) animateCounter(visitorNavEl, finalTotal);
          if (visitorTodayEl) animateCounter(visitorTodayEl, finalToday);
        }).catch(() => {
          applyFallbackCounts(todayKey);
        });
      } else {
        // Already recorded this session: use session/cached counts to keep it legit and fast
        const cachedTotal = parseInt(sessionStorage.getItem('rk_session_total') || localStorage.getItem('rk_total_count') || '0', 10);
        const cachedToday = parseInt(sessionStorage.getItem('rk_session_today') || localStorage.getItem('rk_today_count') || '0', 10);

        if (visitorTotalEl) animateCounter(visitorTotalEl, cachedTotal);
        if (visitorNavEl) animateCounter(visitorNavEl, cachedTotal);
        if (visitorTodayEl) animateCounter(visitorTodayEl, cachedToday);
      }
    };

    const applyFallbackCounts = (todayKey) => {
      const storedDate = localStorage.getItem('rk_visit_date');
      const fallbackTotal = parseInt(localStorage.getItem('rk_total_count') || '0', 10);
      const fallbackToday = storedDate === todayKey ? parseInt(localStorage.getItem('rk_today_count') || '0', 10) : 0;

      if (visitorTotalEl) animateCounter(visitorTotalEl, fallbackTotal);
      if (visitorNavEl) animateCounter(visitorNavEl, fallbackTotal);
      if (visitorTodayEl) animateCounter(visitorTodayEl, fallbackToday);
    };

    // Automated Midnight Reset Timer (resets daily counter to 0 at midnight local time)
    const scheduleMidnightReset = () => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
      const msUntilMidnight = Math.max(1000, nextMidnight.getTime() - now.getTime());

      setTimeout(() => {
        const newTodayKey = getTodayKey();
        localStorage.setItem('rk_visit_date', newTodayKey);
        localStorage.setItem('rk_today_count', '0');
        sessionStorage.removeItem('rk_session_today');

        // Immediately show 0 for the fresh day
        if (visitorTodayEl) visitorTodayEl.textContent = '0';

        // Re-load counts for the fresh day
        loadRealVisitorCounts();

        // Recursively schedule next midnight
        scheduleMidnightReset();
      }, msUntilMidnight);
    };

    // Initialize visitor tracker and midnight reset timer
    loadRealVisitorCounts();
    scheduleMidnightReset();
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
    '.about-body, .about-info, .hl-card, .pill, .pj, .tl-item, .toolkit-card, .lg-item, .ct-card, .insight-card'
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

  // ── RESEARCH & INSIGHTS ARTICLE MODAL HANDLER ──
  const ARTICLES = {
    'article-1': {
      category: 'RESEARCH EXPERIENCE',
      title: 'My First Exposure to Cancer Research: Understanding the Biology Behind TNBC',
      tag: 'IIT (BHU) · Cancer Research',
      imgSrc: './assets/article1_cancer_research.png',
      content: `
        <div class="article-body-text">
          <p>My first meaningful exposure to biomedical research came through exploratory literature-based work around <strong>miRNA-incorporated nanocarrier delivery for Triple-Negative Breast Cancer (TNBC)</strong> under the generous guidance of a PhD scholar at the Indian Institute of Technology (BHU) Varanasi.</p>
          <p>Coming from a Pharm.D background, I was initially trained to evaluate cancer through the lens of pharmacology, clinical guidelines, and chemotherapy dosing regimens. However, this guided mentorship introduced me to an entirely different dimension of the disease: not merely asking what therapy to administer, but investigating <strong>why cancer cells behave aggressively, how molecular dysregulation drives malignancy, and how therapeutic resistance arises</strong>.</p>
          
          <h3>Encountering the Complexity of TNBC</h3>
          <p>Triple-Negative Breast Cancer is notoriously aggressive because it lacks expression of estrogen receptors (ER), progesterone receptors (PR), and human epidermal growth factor receptor 2 (HER2). Without these molecular targets, standard endocrine and anti-HER2 therapies are ineffective, leaving cytotoxic chemotherapy as the primary systemic option and highlighting the severe clinical need for mechanism-targeted approaches.</p>
          <p>This challenge brought me directly to the intersection of cancer genetics, post-transcriptional regulation, and targeted drug delivery.</p>
          <p>During this guided exploratory work, I focused on <strong>microRNAs (miRNAs)</strong>—short, non-coding RNA molecules that modulate post-transcriptional gene expression. In normal physiology, miRNAs maintain delicate cellular homeostasis. In cancer, their dysregulation can act as a catalyst for oncogenesis, repressing tumour-suppressor genes or unleashing downstream oncogenic signaling cascades such as PI3K/Akt/mTOR and MAPK/ERK.</p>

          <h3>From Molecular Target to Delivery Challenge</h3>
          <p>Examining the literature on miRNA restoration or inhibition quickly revealed the dual nature of therapeutic development. Identifying a candidate miRNA that influences oncogenic pathways is a vital first step, but the biological barriers within the human body are formidable:</p>
          <ul>
            <li>Unmodified naked RNAs suffer rapid enzymatic degradation by circulating ribonucleases (RNases).</li>
            <li>Their negative charge and molecular size impede efficient cellular membrane translocation.</li>
            <li>Systemic clearance by the reticuloendothelial system reduces tumour accumulation.</li>
          </ul>
          <p>This is where exploring nanocarrier platforms—including lipid nanoparticles and polymeric nanostructures—deepened my appreciation for translational cancer biology. I examined how carrier engineering, encapsulation efficiency, and surface functionalisation must navigate physiological barriers to reach malignant tissue.</p>

          <h3>A Critical Realisation: Biology Must Lead</h3>
          <p>It is important to emphasize that this was literature-based exploratory research and guided academic mentorship rather than independent wet-lab experimental investigation. Yet, it profoundly reshaped how I approach scientific inquiry.</p>
          <p>I realized that designing a nanocarrier or evaluating an in silico model is secondary to truly understanding the <strong>underlying biological mechanism</strong>. Why does a specific pathway become dysregulated in certain tumour subtypes? How does the cellular microenvironment influence uptake and resistance? Why do tumour cells adapt so rapidly to molecular interventions?</p>
          <p>These mechanistic questions solidified my conviction that my long-term future belongs in molecular oncology and cancer cell biology.</p>
          
          <h3>Looking Forward</h3>
          <p>This experience did not give me all the answers. Instead, it introduced me to a much larger scientific question: <strong>how do molecular changes alter the behaviour of cancer cells, and how can we investigate those changes experimentally?</strong></p>
        </div>
      `
    },
    'article-2': {
      category: 'SCIENTIFIC PERSPECTIVE',
      title: 'From Computational Curiosity to Cancer Biology: Understanding What I Actually Want to Investigate',
      tag: 'Scientific Perspective · Research Direction',
      imgSrc: './assets/article2_computational_biology.png',
      content: `
        <div class="article-body-text">
          <p>For a significant period during my early research exploration, I became deeply fascinated by <strong>computational biology, structural biology, bioinformatics, and AI/ML tools</strong>.</p>
          <p>To an undergraduate student with limited immediate access to a dedicated molecular biology wet lab, computational tools offered an exhilarating gateway. With Python, R, open-source bioinformatics packages, and public genomic repositories such as GEO and TCGA, I could analyze gene expression, examine protein-ligand interactions, and explore molecular networks directly from my laptop.</p>
          <p>These tools felt empowering, elegant, and intellectually satisfying. They allowed me to construct my own Streamlit application for clinical dosages, re-analyze public TNBC microarray datasets, and map complex miRNA–mRNA regulatory networks.</p>

          <h3>The Turning Point: When Predictions Demand Biological Reality</h3>
          <p>However, as I spent more time working through computational pipelines and examining public datasets, a deeper realization took hold.</p>
          <p>An algorithm can cluster thousands of genes. A docking script can output binding energy scores. A network visualization can link hundreds of nodes. But <strong>in silico models and computational predictions are only ever as good as our biological understanding of the disease itself</strong>.</p>
          <p>Every time I generated a list of predicted hub genes or pathway interactions, my mind did not dwell on the mathematical matrix or the code efficiency. My curiosity kept returning insistently to the living biological reality behind the numbers:</p>
          <ul>
            <li><strong>Why do cancer cells metastasise?</strong> What physical and biochemical signals prompt a sedentary epithelial cell to undergo epithelial-to-mesenchymal transition (EMT) and colonize distant organs?</li>
            <li><strong>What genetic alterations truly drive progression?</strong> Which mutations are drivers versus passengers, and how do they remodel cellular pathways?</li>
            <li><strong>How do cancer cells remodel their local microenvironment?</strong> How do stromal cells, immune infiltration, and extracellular matrix stiffness dictate aggressive phenotypes?</li>
            <li><strong>Why do tumours develop resistance?</strong> How do cancer cell populations evolve under therapeutic pressure to evade targeted therapies?</li>
          </ul>

          <h3>Repositioning Computation as a Supportive Tool</h3>
          <p>I realized that while computational biology is an invaluable modern methodology, it is <strong>not my ultimate research destination</strong>. My central passion is not algorithm development, nor is it sitting permanently behind a screen predicting hypothetical interactions.</p>
          <p>My genuine curiosity lies in the living cell—the molecular oncology and experimental cell biology that explain how malignant phenotypes arise, persist, and spread.</p>
          <p>Computational biology and bioinformatics will always remain vital components of my scientific toolkit. Modern cancer research is inherently multi-omic, and having the ability to parse RNA-seq data, inspect structural models, and write analytical scripts will make me a far more effective biologist. But computation must serve the biology, not replace it.</p>

          <h3>My Chosen Path</h3>
          <p>Computation gave me a way to explore science when I had limited lab access. But biology is what actually keeps me up at night. I don't want to just model cancer on a screen; I want to understand its living biology and investigate it through rigorous experimental research.</p>
        </div>
      `
    },
    'article-3': {
      category: 'ACADEMIC JOURNEY',
      title: 'From a Pharm.D Classroom to a Research Laboratory: Finding My Scientific Direction',
      tag: 'Academic Journey · Classroom to Lab',
      imgSrc: './assets/article3_classroom_to_lab.jpg',
      content: `
        <div class="article-body-text">
          <p>The transition from a professional healthcare degree like the Doctor of Pharmacy (Pharm.D) to fundamental scientific research is often seen as unusual. Yet, for me, it has been the most natural and necessary evolution of my academic life.</p>
          <p>Pharmacy education is rigorous and comprehensive. Over my first three years at QIS College of Pharmacy, I have engaged deeply with human anatomy, physiology, medicinal chemistry, clinical pharmacology, pharmacokinetics, and pharmacotherapeutics. This curriculum provides an extraordinary foundation: it teaches you how drugs interact with physiological systems, how disease alters bodily function, and how therapeutic interventions impact patient outcomes.</p>

          <h3>The Limitations of Textbook Certainty</h3>
          <p>However, the nature of classroom education is centered around existing consensus. Textbooks present disease as an established set of diagnostic criteria and treatment algorithms. You learn: <em>for stage IV cancer, administer regimen X; if recurrence occurs, switch to regimen Y</em>.</p>
          <p>In the classroom, you are trained to identify the right answer from existing knowledge.</p>
          <p>Yet as I studied advanced pharmacology, I found myself troubled by the questions the textbooks could not answer:</p>
          <ul>
            <li>Why does an oncology patient initially respond dramatically to targeted kinase inhibitors, only to experience aggressive disease recurrence months later?</li>
            <li>What molecular alterations enable a primary tumour cell to survive in circulation and successfully establish a metastatic colony in bone or brain parenchyma?</li>
            <li>Why do identical histological tumours harbour vastly different responses to immune checkpoint blockade?</li>
          </ul>
          <p>These questions cannot be answered by clinical dosage calculators or therapeutic guidelines. They demand <strong>fundamental mechanistic investigation at the laboratory bench</strong>.</p>

          <h3>Experiencing the Research Environment Firsthand</h3>
          <p>My desire to understand science at its source motivated me to seek exposure to premier academic research laboratories. During my internship at the Department of Chemistry at NIT Warangal under Prof. P.V. Srilakshmi, I experienced the daily rigor of a dedicated research facility:</p>
          <p>I observed the discipline of organic synthesis, gained hands-on familiarity with laboratory protocols, and experienced the environment of central instrumentation facilities—including X-ray diffraction (XRD), scanning electron microscopy (SEM), and spectroscopic instrumentation. Similarly, my interactions with doctoral researchers at IIT (BHU) gave me insight into how hypotheses are formulated, tested, challenged, and refined.</p>
          <p>In those environments, I realized what research truly is: it is the systematic process of working at the frontier of what is known, where confidence does not come from knowing the answer, but from having the methodological rigor to test a hypothesis honestly.</p>

          <h3>Bridging Clinical Relevance with Molecular Investigation</h3>
          <p>Rather than leaving pharmacy behind, I carry its greatest strength with me: an acute awareness of clinical reality and disease impact. When I examine a cancer cell line or an oncogenic signaling pathway, I never view it as an abstract biological puzzle. I see it as the biological reality of a malignant disease that directly claims human lives.</p>
          <p>This realization defined my scientific direction: bridging clinical perspective with experimental cancer biology to uncover the molecular drivers that can eventually inform better therapeutic approaches.</p>
        </div>
      `
    },
    'article-4': {
      category: 'RESEARCH DIRECTION',
      title: 'Why I Am Moving Towards Experimental Cancer Biology',
      tag: 'Experimental Cancer Biology · Ground Truth',
      imgSrc: './assets/article4_biophysics.png',
      content: `
        <div class="article-body-text">
          <p>Every emerging researcher must eventually confront an essential question: <em>where do you intend to make your contribution?</em></p>
          <p>After navigating pharmacy education, exploring computational tools, and absorbing research literature, my answer is clear, deliberate, and unambiguous: <strong>I am committing myself to experimental cancer biology and molecular oncology</strong>.</p>
          <p>Cancer is not an abstract concept or a static computational network. It is a living, evolving, heterogeneous, and extraordinarily dynamic biological phenomenon. While computational analyses and clinical observations provide essential frameworks, the <strong>ground truth of cancer biology is revealed at the laboratory bench</strong>.</p>

          <h3>The Indispensable Value of Experimental Investigation</h3>
          <p>To truly understand cancer progression and metastasis, experimental investigation is irreplaceable:</p>
          <ul>
            <li><strong>Cell Culture & In Vitro Models:</strong> Investigating cellular phenotypic shifts, migration assays, invasion chambers, and 3D spheroid cultures to directly visualize how cancer cells breach basement membranes.</li>
            <li><strong>Molecular & Biochemical Assays:</strong> Western blotting, quantitative real-time PCR, immunoprecipitation, and enzyme assays to track signaling pathway activation and protein-protein interactions.</li>
            <li><strong>Functional Genomics:</strong> Utilizing siRNA knockdown, shRNA screens, and CRISPR-based perturbation to test whether candidate genes are functionally necessary or sufficient to drive malignancy.</li>
            <li><strong>Mechanistic Validation:</strong> Directly proving causation rather than merely observing computational correlation.</li>
          </ul>
          <p>These techniques form the core of molecular oncology. Experiencing the physical reality of biology—the precision of cell maintenance, the meticulousness of assay design, and the discipline of experimental control—is the training I actively seek.</p>

          <h3>Academic Honesty: Where I Stand Today</h3>
          <p>It is vital to state clearly what I am and what I am not. I am not an established cancer investigator, nor do I claim to have already mastered advanced wet-lab experimental methodologies. I am currently a third-year undergraduate Pharm.D student building my academic foundation.</p>
          <p>What I possess is a deep, mature, and focused commitment to this discipline. I am actively preparing for national competitive examinations including GATE (Life Sciences & Biotechnology) to qualify for premier postgraduate and doctoral research programs. I have spent my undergraduate years studying oncology literature, understanding molecular pathways, earning peer review credentials through Elsevier, and contributing scholarly service as an invited reviewer for JMIR.</p>

          <h3>My Long-Term Vision</h3>
          <p>My aspiration is to enter a rigorous research laboratory dedicated to experimental cancer biology for advanced postgraduate and doctoral training. I want to contribute directly to uncovering the molecular mechanisms governing cancer progression, tumour-stroma interactions, and metastatic dissemination.</p>
          <p>I know the path will be demanding, requiring years of disciplined training at the bench, dealing with negative results, refining protocols, and pushing against the unknown. That challenge is precisely why I have chosen it.</p>
          <p>I look forward to building my scientific foundation, learning from experienced investigators, and dedicating my career to understanding cancer through molecular and cellular biology.</p>
        </div>
      `
    }
  };

  const articleModal = document.getElementById('articleModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalScrollBody = document.getElementById('modalScrollBody');

  const openArticle = (id) => {
    const data = ARTICLES[id];
    if (!data || !articleModal || !modalScrollBody) return;

    modalScrollBody.innerHTML = `
      <div class="modal-article-container">
        <span class="modal-article-category">${data.category}</span>
        <h2 class="modal-article-title">${data.title}</h2>
        <div class="modal-article-hero-box">
          <div class="insight-img-placeholder i1" style="z-index:1;">
            <span class="placeholder-tag">${data.tag}</span>
          </div>
          <img src="${data.imgSrc}" alt="${data.title}" class="modal-article-hero-img" style="position:relative; z-index:2;" onerror="this.style.display='none'"/>
        </div>
        ${data.content}
      </div>
    `;
    modalScrollBody.scrollTop = 0;
    articleModal.classList.add('open');
    articleModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeArticle = () => {
    if (!articleModal) return;
    articleModal.classList.remove('open');
    articleModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-article-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-article-id');
      openArticle(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeArticle);
  if (articleModal) {
    articleModal.addEventListener('click', (e) => {
      if (e.target === articleModal) closeArticle();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && articleModal && articleModal.classList.contains('open')) {
      closeArticle();
    }
  });

  // ── MOBILE TOGGLE BUTTONS (sync with main toggles) ──
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const langToggleMobile = document.getElementById('langToggleMobile');
  const langLabelMobile = document.getElementById('langLabelMobile');
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
      document.getElementById('themeToggle').click();
    });
  }
  if (langToggleMobile) {
    langToggleMobile.addEventListener('click', () => {
      document.getElementById('langToggle').click();
      // Sync label
      if (langLabelMobile) {
        setTimeout(() => {
          langLabelMobile.textContent = document.getElementById('langLabel').textContent;
        }, 50);
      }
    });
  }
});
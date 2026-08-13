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
      title: 'My First Experience in Cancer Research',
      tag: 'IIT (BHU) · Cancer Research',
      imgSrc: './assets/article1_iitbhu_research.jpg',
      content: `
        <div class="article-body-text">
          <p>My first meaningful exposure to biomedical research came through my work around <strong>miRNA-incorporated nanocarrier delivery for Triple-Negative Breast Cancer (TNBC)</strong> at IIT (BHU).</p>
          <p>Coming from a Pharm.D background, I was familiar with cancer from the perspective of pharmacology, therapeutics, and patient care. Research introduced me to a different way of looking at the same disease: not only asking which treatment can be used, but asking <strong>why a treatment may work, what prevents it from working, and how we can design better approaches</strong>.</p>
          
          <h3>Understanding the problem</h3>
          <p>Triple-Negative Breast Cancer is a particularly challenging subtype because it lacks three commonly targeted receptors—estrogen receptor, progesterone receptor, and HER2. This limits the availability of some established targeted treatment strategies and makes the search for alternative therapeutic approaches particularly important.</p>
          <p>My work brought me to the intersection of cancer biology, molecular regulation, and drug delivery.</p>
          <p>One of the concepts I explored was <strong>microRNA, or miRNA</strong>. These small non-coding RNA molecules can regulate gene expression and influence important cellular processes. Because abnormal gene regulation is closely associated with cancer biology, miRNAs have attracted considerable interest as potential therapeutic tools and biomarkers.</p>
          <p>But identifying a promising molecule is only one part of developing a therapy.</p>
          <p>The next question is much harder:</p>
          <p><strong>How do we actually deliver it to the right cells in a stable and effective way?</strong></p>

          <h3>Why nanocarriers?</h3>
          <p>This is where nanocarrier-based delivery becomes interesting.</p>
          <p>Therapeutic RNA molecules can face significant challenges, including instability, degradation, inefficient cellular uptake, and difficulty reaching the intended biological target. Nanocarriers are being investigated as a way to help address some of these delivery barriers.</p>
          <p>Exploring the literature around miRNA-incorporated nanocarriers made me appreciate how interdisciplinary biomedical research can become.</p>
          <p>A single therapeutic idea can involve:</p>
          <p><strong>molecular biology → cancer biology → nanotechnology → drug delivery → pharmacology → therapeutic evaluation.</strong></p>
          <p>That was one of the most valuable things I took away from the experience.</p>

          <h3>What research changed for me</h3>
          <p>Before experiencing research, I often thought of scientific knowledge as something that already existed and needed to be learned.</p>
          <p>Research showed me the other side.</p>
          <p>There are questions for which the answer is not yet known. There are approaches that appear promising but still have limitations. There are conflicting findings in the literature. And even an attractive therapeutic concept can encounter major challenges before it becomes clinically useful.</p>
          <p>That changed the way I read scientific literature.</p>
          <p>Instead of simply asking, <em>"What does this paper say?"</em>, I began to think about questions such as:</p>
          <ul>
            <li><strong>What problem is this study actually trying to solve?</strong></li>
            <li><strong>Why was this approach chosen?</strong></li>
            <li><strong>What are its limitations?</strong></li>
            <li><strong>What would need to happen before an idea like this could become a practical therapy?</strong></li>
          </ul>
          <p>Those questions made research feel much more real to me.</p>

          <h3>Beyond the first project</h3>
          <p>My exposure to cancer research also made me realize that I am drawn toward problems that cannot be confined to a single discipline.</p>
          <p>A question about cancer can quickly lead into molecular biology. A question about a molecular target can lead into structural biology. A therapeutic strategy can lead into drug delivery, computation, or materials science.</p>
          <p>That interdisciplinary nature is one of the reasons my interests have gradually expanded toward <strong>computational biology, structural biology, bioinformatics, and AI/ML approaches in biomedical research</strong>.</p>
          <p>My first research experience did not give me all the answers.</p>
          <p>It gave me something more useful:</p>
          <p><strong>better questions to ask.</strong></p>
          <p>And that, for me, was the beginning of my journey toward becoming a researcher.</p>
        </div>
      `
    },
    'article-2': {
      category: 'SCIENTIFIC PERSPECTIVE',
      title: "Why I'm Interested in Computational Biology",
      tag: 'Computational Biology & AI/ML',
      imgSrc: './assets/article2_computational_biology.jpg',
      content: `
        <div class="article-body-text">
          <p>I am currently pursuing a Pharm.D, so at first glance, <strong>computational biology</strong> may seem like a direction quite different from my academic background.</p>
          <p>For me, however, the connection became clearer through research.</p>
          <p>Pharmacy introduced me to medicines, disease mechanisms, pharmacology, therapeutics, and the relationship between a drug and the patient. My research exposure then took me closer to molecular questions—particularly through work related to cancer biology, miRNA, and nanocarrier-based drug delivery.</p>
          <p>The more I explored these areas, the more I became interested in what happens underneath the biological and therapeutic picture.</p>
          <p>That is where computational biology began to attract me.</p>

          <h3>From medicines to molecules</h3>
          <p>A drug is not simply a molecule that "treats" a disease.</p>
          <p>Its effects depend on interactions with biological systems: proteins, nucleic acids, cells, pathways, tissues, and eventually the patient.</p>
          <p>Understanding these systems can require enormous amounts of information.</p>
          <p>Biological data can come from genomic sequences, molecular structures, gene expression, protein interactions, clinical observations, and many other sources.</p>
          <p>Trying to understand all of this information manually is not realistic.</p>
          <p>Computation provides another way to approach these problems.</p>

          <h3>More than AI</h3>
          <p>My interest in computational biology is not simply an interest in artificial intelligence.</p>
          <p>AI and machine learning are powerful tools, but <strong>computational biology is much broader than AI</strong>.</p>
          <p>It involves using computational and mathematical approaches to investigate biological questions.</p>
          <p>That can include areas such as:</p>
          <ul>
            <li>Bioinformatics</li>
            <li>Structural biology</li>
            <li>Molecular modelling</li>
            <li>Computational drug discovery</li>
            <li>Biological data analysis</li>
            <li>Systems biology</li>
            <li>Machine learning for biological problems</li>
          </ul>
          <p>What interests me most is the possibility of using these approaches to understand biological systems at a deeper level.</p>

          <h3>Why it makes sense from a Pharm.D background</h3>
          <p>I don't see computational biology as moving away from pharmacy.</p>
          <p>I see it as building another layer on top of what I already study.</p>
          <p>My Pharm.D education gives me a foundation in the biological and therapeutic side of medicine.</p>
          <p>Research introduced me to questions at the molecular level.</p>
          <p>Learning programming and computational methods gives me another set of tools for exploring those questions.</p>
          <p>The intersection is what excites me.</p>
          <p>For example, drug discovery can involve understanding a disease target, studying molecular structures, predicting interactions, evaluating candidate molecules, and eventually connecting those findings to therapeutic possibilities.</p>
          <p>That requires knowledge from multiple fields.</p>
          <p>I want to become comfortable working across those boundaries.</p>

          <h3>Where I want to go</h3>
          <p>My current interests are increasingly centred around <strong>structural and computational biology</strong>, with related interests in bioinformatics, AI/ML, molecular modelling, and computational approaches to drug discovery.</p>
          <p>I am still at the beginning of this journey.</p>
          <p>There are algorithms I still need to understand, biological concepts I still need to strengthen, and computational methods I still need to learn properly.</p>
          <p>I don't see that as a weakness.</p>
          <p>For me, being interested in research means being willing to enter areas where I don't yet know enough—and then systematically learn what is required.</p>
          <p>My long-term goal is to pursue advanced research that brings together biological understanding, computation, and quantitative approaches to complex biological systems.</p>
          <p>I started with pharmacy because I wanted to understand medicines and their impact on disease.</p>
          <p>Research made me want to understand the biological questions underneath them.</p>
          <p>Computational biology gives me another language through which I can explore those questions.</p>
          <p><strong>I don't see computation as leaving pharmacy behind. I see it as expanding the questions I can ask.</strong></p>
        </div>
      `
    },
    'article-3': {
      category: 'ACADEMIC JOURNEY',
      title: 'From a Pharm.D Classroom to a Research Laboratory',
      tag: 'Academic Journey · Biophysics Transition',
      imgSrc: './assets/article3_academic_journey.jpg',
      content: `
        <div class="article-body-text">
          <p>A classroom and a research laboratory can teach you about the same scientific subject in completely different ways.</p>
          <p>In the classroom, you are often given a question and expected to arrive at the correct answer.</p>
          <p>In research, you may begin with a question precisely because <strong>the answer is not known yet</strong>.</p>
          <p>Experiencing that difference changed the way I think about science.</p>

          <h3>What pharmacy taught me</h3>
          <p>As a Pharm.D student, my education is closely connected to medicines and their use.</p>
          <p>I learn about pharmacology, pharmaceutics, medicinal chemistry, pathology, therapeutics, and the clinical aspects of patient care.</p>
          <p>These subjects provide a way of understanding what happens when a drug enters the body, how it produces its effects, what can go wrong, and how therapy can ultimately benefit a patient.</p>
          <p>But research introduced another perspective.</p>
          <p>Instead of starting with an established mechanism from a textbook, I started encountering scientific questions where the evidence was still developing.</p>

          <h3>Entering research</h3>
          <p>My first significant research exposure involved work around <strong>miRNA-incorporated nanocarrier delivery for Triple-Negative Breast Cancer</strong>.</p>
          <p>The topic itself crossed several disciplines.</p>
          <p>Cancer biology was connected to molecular regulation. Molecular regulation was connected to miRNA. Therapeutic possibilities were connected to drug delivery. And drug delivery brought in nanotechnology.</p>
          <p>Suddenly, the boundaries between individual subjects became much less obvious.</p>
          <p>That was one of the first things I found exciting about research.</p>
          <p>A real scientific problem doesn't necessarily care which subject is printed on the cover of your textbook.</p>

          <h3>Learning to deal with uncertainty</h3>
          <p>Research also changed my understanding of what it means to "know" something.</p>
          <p>In academic coursework, confidence often comes from knowing the correct answer.</p>
          <p>In research, confidence can sometimes come from knowing <strong>what you don't know</strong>.</p>
          <p>You read a paper and discover a limitation.</p>
          <p>You find another study with a different result.</p>
          <p>You encounter a promising approach that still has practical barriers.</p>
          <p>And instead of stopping there, you ask another question.</p>
          <p>That process taught me that uncertainty is not necessarily a sign that something has gone wrong.</p>
          <p>Sometimes, uncertainty is where the research begins.</p>

          <h3>Building beyond my degree</h3>
          <p>My research exposure gradually expanded my interests.</p>
          <p>I became increasingly interested in <strong>computational biology, bioinformatics, structural biology, AI/ML, and computational approaches to biomedical research</strong>.</p>
          <p>This direction may look unconventional from a traditional Pharm.D pathway, but to me it feels like a natural extension.</p>
          <p>Pharmacy gave me a foundation in medicines and therapeutics.</p>
          <p>Biomedical research introduced me to molecular-level questions.</p>
          <p>Computational biology offers tools for investigating increasingly complex biological systems.</p>
          <p>I want to build across these areas rather than remain limited to a single discipline.</p>
          <p><strong>The journey from a Pharm.D classroom to a research laboratory has not been a change of direction for me. It has been an expansion of it.</strong></p>
        </div>
      `
    },
    'article-4': {
      category: 'FUTURE DIRECTION',
      title: "Why I'm Moving Toward Biophysics and Computational Biology",
      tag: 'Biophysics & Computational Biology',
      imgSrc: './assets/article4_biophysics.jpg',
      content: `
        <div class="article-body-text">
          <p>As my exposure to biomedical research has grown, I have started to recognize that the questions I am most curious about increasingly lie at the boundary between <strong>biology, physics, chemistry, and computation</strong>.</p>
          <p>That is why I am planning to move toward <strong>biophysics and computational biology</strong>.</p>
          <p>This is not because I see pharmacy as a field I need to leave behind.</p>
          <p>My Pharm.D background has given me something I consider extremely valuable: a foundation in drugs, disease, pharmacology, therapeutics, and the clinical consequences of biological processes.</p>
          <p>But I have also realized that I want to understand biological systems at a deeper level than the traditional pharmaceutical perspective alone allows me to.</p>
          <p>I want to understand not only <strong>what a drug does</strong>, but what happens at the molecular and physical level that makes those effects possible.</p>
          <ul>
            <li>How does a molecule interact with a protein?</li>
            <li>Why does a particular molecular structure produce a particular biological effect?</li>
            <li>How do proteins change their conformations?</li>
            <li>How do molecular interactions translate into cellular behaviour?</li>
            <li>Can we use computational models to predict or understand these interactions?</li>
          </ul>
          <p>These questions are what draw me toward biophysics and computational biology.</p>

          <h3>Why biophysics?</h3>
          <p>Biophysics particularly interests me because it provides a quantitative way of looking at biological systems.</p>
          <p>Biology is often taught through mechanisms and pathways, but those systems are ultimately governed by physical principles—molecular interactions, energy, forces, dynamics, diffusion, conformational changes, and thermodynamics.</p>
          <p>I find that perspective fascinating.</p>
          <p>It creates a bridge between the biological systems I already study through pharmacy and the physical principles that govern them.</p>

          <h3>Why computational biology?</h3>
          <p>At the same time, modern biology generates enormous amounts of data and increasingly detailed structural information.</p>
          <p>Computational methods can help us analyse that information, model biological systems, investigate molecular structures, identify patterns, and explore questions that would be difficult to approach experimentally alone.</p>
          <p>This is where my interest in programming, machine learning, bioinformatics, structural biology, and computational drug discovery comes together.</p>
          <p>I don't want computation to become something separate from my understanding of biology.</p>
          <p>I want it to become a <strong>tool for asking better biological questions</strong>.</p>

          <h3>Why make this transition now?</h3>
          <p>I am still early in my academic journey, which is precisely why I want to explore this direction now.</p>
          <p>Rather than waiting until the end of my Pharm.D to decide what comes next, I want to use my undergraduate years to gradually build the foundations I will need for advanced research.</p>
          <p>That means strengthening my understanding of biology and chemistry while simultaneously learning mathematics, programming, computational methods, and the physical principles behind biological systems.</p>
          <p>The transition therefore isn't:</p>
          <p><strong>Pharmacy → abandoning pharmacy → something completely different.</strong></p>
          <p>For me, it is:</p>
          <p><strong>Pharmacy → biomedical research → molecular questions → biophysics + computational biology.</strong></p>
          <p>I see my Pharm.D background as the starting point of this path, not a limitation on where it can lead.</p>
          <p>Ultimately, I want to work on biological problems that require multiple ways of thinking—where understanding a disease may require biology, understanding a molecule may require chemistry and physics, and understanding the resulting complexity may require computation.</p>
          <p>That interdisciplinary space is where I increasingly see myself as a researcher.</p>

          <h3>Still at the beginning</h3>
          <p>I am also conscious that I am still a student.</p>
          <p>I am not approaching these fields as someone who has already mastered them.</p>
          <p>I am learning programming. I am strengthening my scientific foundations. I am exploring computational methods. I am looking for more opportunities to experience research directly.</p>
          <p>That is part of what makes this stage exciting.</p>
          <p>There is still a tremendous amount to learn.</p>
          <p>My goal after Pharm.D is not simply to stop at the degree. I want to continue into advanced research, eventually working toward deeper questions in structural and computational biology and other interdisciplinary areas of biological science.</p>
          <p>Looking back, my first research experience did not give me a completely defined career path.</p>
          <p>Instead, it gave me direction.</p>
          <p><strong>I see my Pharm.D background as the starting point of this path — not a limitation on where it can lead.</strong></p>
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
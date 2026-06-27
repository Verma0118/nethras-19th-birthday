(function () {
  const PLACEHOLDER_CLASSES = [
    'poster--rose',
    'poster--wine',
    'poster--ember',
    'poster--plum',
    'poster--night',
    'poster--dusk',
    'poster--mauve',
    'poster--crimson',
  ];

  const intro = document.getElementById('intro');
  const home = document.getElementById('home');
  const nav = document.querySelector('.nav');
  const rowsContainer = document.getElementById('rows');
  const modal = document.getElementById('modal');
  const letterModal = document.getElementById('letter-modal');
  const liveRegion = document.getElementById('live-region');

  const heroBackdrop = document.getElementById('hero-backdrop');
  const heroTitle = document.getElementById('hero-title');
  const heroTagline = document.getElementById('hero-tagline');
  const heroMeta = document.getElementById('hero-meta');
  const heroPlay = document.getElementById('hero-play');
  const heroInfo = document.getElementById('hero-info');

  const modalHero = document.getElementById('modal-hero');
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  const modalCaption = document.getElementById('modal-caption');

  const letterTitle = document.getElementById('letter-title');
  const letterBody = document.getElementById('letter-body');

  let lastFocus = null;
  let showLookup = {};
  let rowObserver = null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function announce(message) {
    liveRegion.textContent = '';
    window.setTimeout(() => {
      liveRegion.textContent = message;
    }, 30);
  }

  function wait(ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, reducedMotion ? 0 : ms);
    });
  }

  function placeholderClass(seed) {
    let hash = 0;
    const str = String(seed);
    for (let i = 0; i < str.length; i += 1) {
      hash = (hash + str.charCodeAt(i) * (i + 1)) % PLACEHOLDER_CLASSES.length;
    }
    return PLACEHOLDER_CLASSES[hash];
  }

  function imageCandidates(src) {
    const base = src.replace(/\.(jpe?g|png|webp|heic)$/i, '');
    const unique = new Set([src, `${base}.jpg`, `${base}.jpeg`, `${base}.png`, `${base}.webp`]);
    return Array.from(unique);
  }

  function applyImage(element, src, alt, seed) {
    const fallbackClass = placeholderClass(seed);
    element.classList.add(fallbackClass);
    element.setAttribute('aria-label', alt);

    const candidates = imageCandidates(src);
    let index = 0;

    function tryNext() {
      if (index >= candidates.length) {
        element.style.backgroundImage = '';
        return;
      }

      const img = new Image();
      img.onload = () => {
        element.style.backgroundImage = `url("${candidates[index]}")`;
        element.classList.remove(fallbackClass);
      };
      img.onerror = () => {
        index += 1;
        tryNext();
      };
      img.src = candidates[index];
    }

    tryNext();
  }

  function buildShowLookup() {
    showLookup = { [CATALOG.hero.id]: CATALOG.hero };
    CATALOG.rows.forEach((row) => {
      row.shows.forEach((show) => {
        showLookup[show.id] = show;
      });
    });
  }

  function renderProfiles() {
    const nethraAvatar = document.getElementById('profile-avatar-nethra');
    const aaravAvatar = document.getElementById('profile-avatar-aarav');

    applyImage(
      nethraAvatar,
      CATALOG.profile.avatar,
      `${CATALOG.profile.name}'s profile photo`,
      'nethra-profile'
    );
    applyImage(
      aaravAvatar,
      CATALOG.lockedProfile.avatar,
      `${CATALOG.lockedProfile.name}'s profile photo`,
      'aarav-profile'
    );
  }

  function renderHero() {
    const { hero } = CATALOG;
    heroTitle.textContent = hero.title;
    heroTagline.textContent = hero.tagline;
    heroMeta.textContent = hero.meta;
    applyImage(heroBackdrop, hero.image, hero.title, hero.id);
  }

  function createShowCard(show, index) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'show-card' + (show.isLetter ? ' show-card--letter' : '');
    card.dataset.showId = show.id;
    card.setAttribute('aria-label', `${show.title}. ${show.caption}`);
    card.style.transitionDelay = reducedMotion ? '0ms' : `${Math.min(index * 40, 200)}ms`;

    const poster = document.createElement('div');
    poster.className = 'show-card__poster';

    if (!show.isLetter) {
      const overlay = document.createElement('div');
      overlay.className = 'show-card__overlay';
      overlay.innerHTML = '<span class="show-card__play" aria-hidden="true">▶</span>';
      poster.appendChild(overlay);
    }

    if (show.isLetter) {
      const icon = document.createElement('span');
      icon.className = 'show-card__letter-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '✉';
      poster.appendChild(icon);
      applyImage(poster, show.image, show.title, show.id);
    } else {
      applyImage(poster, show.image, show.title, show.id);
    }

    const label = document.createElement('span');
    label.className = 'show-card__label';
    label.textContent = show.title;

    card.appendChild(poster);
    card.appendChild(label);

    card.addEventListener('click', () => {
      if (show.isLetter) {
        openLetter();
      } else {
        openShow(show.id);
      }
    });

    return card;
  }

  function setupRowControls(track) {
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'row__arrow row__arrow--prev';
    prev.setAttribute('aria-label', 'Scroll left');
    prev.textContent = '‹';

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'row__arrow row__arrow--next';
    next.setAttribute('aria-label', 'Scroll right');
    next.textContent = '›';

    function updateArrows() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= maxScroll - 4;
    }

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -track.clientWidth * 0.75, behavior: reducedMotion ? 'auto' : 'smooth' });
    });

    next.addEventListener('click', () => {
      track.scrollBy({ left: track.clientWidth * 0.75, behavior: reducedMotion ? 'auto' : 'smooth' });
    });

    track.addEventListener('scroll', updateArrows, { passive: true });
    window.setTimeout(updateArrows, 100);

    return { prev, next };
  }

  function renderRows() {
    rowsContainer.innerHTML = '';

    CATALOG.rows.forEach((row, rowIndex) => {
      const section = document.createElement('section');
      section.className = 'row';
      section.setAttribute('aria-labelledby', `row-${row.id}`);
      section.dataset.rowIndex = String(rowIndex);

      const header = document.createElement('div');
      header.className = 'row__header';

      const heading = document.createElement('h2');
      heading.id = `row-${row.id}`;
      heading.className = 'row__title';
      heading.textContent = row.title;

      const controls = document.createElement('div');
      controls.className = 'row__controls';

      const wrap = document.createElement('div');
      wrap.className = 'row__track-wrap';

      const track = document.createElement('div');
      track.className = 'row__track';
      track.setAttribute('role', 'list');

      row.shows.forEach((show, index) => {
        const card = createShowCard(show, index);
        card.setAttribute('role', 'listitem');
        track.appendChild(card);
      });

      const arrows = setupRowControls(track);
      controls.appendChild(arrows.prev);
      controls.appendChild(arrows.next);

      header.appendChild(heading);
      header.appendChild(controls);
      wrap.appendChild(track);
      section.appendChild(header);
      section.appendChild(wrap);
      rowsContainer.appendChild(section);
    });
  }

  function setupRowObserver() {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.row').forEach((row) => row.classList.add('row--visible'));
      return;
    }

    rowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const row = entry.target;
            const index = Number(row.dataset.rowIndex || 0);
            window.setTimeout(() => {
              row.classList.add('row--visible');
            }, index * 80);
            rowObserver.unobserve(row);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.row').forEach((row) => rowObserver.observe(row));
  }

  function setupNavScroll() {
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function getFocusable(container) {
    return Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function trapFocus(container, event) {
    const focusable = getFocusable(container);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function openModalElement(element, onReady) {
    element.hidden = false;
    element.classList.remove('hidden');
    document.body.classList.add('modal-open');
    onReady();
    await wait(20);
    element.classList.add('modal--open');
  }

  async function closeModalElement(element) {
    element.classList.remove('modal--open');
    await wait(reducedMotion ? 0 : 320);
    element.classList.add('hidden');
    element.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function openShow(id) {
    const show = showLookup[id];
    if (!show || show.isLetter) return;

    lastFocus = document.activeElement;
    modalTitle.textContent = show.title;
    modalMeta.textContent = show.meta;
    modalCaption.textContent = show.caption;
    modalHero.style.backgroundImage = '';
    modalHero.className = 'modal__hero ' + placeholderClass(show.id);
    applyImage(modalHero, show.image, show.title, show.id);

    openModalElement(modal, () => announce(`Opened ${show.title}`));

    const closeBtn = modal.querySelector('.modal__close');
    window.setTimeout(() => closeBtn.focus(), 80);
  }

  function closeShow() {
    closeModalElement(modal).then(() => {
      if (lastFocus) lastFocus.focus();
      announce('Closed memory details');
    });
  }

  function openLetter() {
    lastFocus = document.activeElement;
    letterTitle.textContent = CATALOG.letter.title;
    letterBody.innerHTML = CATALOG.letter.body
      .map((line) => (line ? `<p>${escapeHtml(line)}</p>` : '<p aria-hidden="true">&nbsp;</p>'))
      .join('');

    openModalElement(letterModal, () => announce('Opened birthday letter'));

    const closeBtn = letterModal.querySelector('.modal__close');
    window.setTimeout(() => closeBtn.focus(), 80);
  }

  function closeLetter() {
    closeModalElement(letterModal).then(() => {
      if (lastFocus) lastFocus.focus();
      announce('Closed birthday letter');
    });
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function enterHome() {
    const profileBtn = document.querySelector('[data-profile="nethra"]');
    profileBtn.disabled = true;
    profileBtn.classList.add('profile--entering');
    intro.classList.add('screen--exit');

    await wait(650);

    intro.classList.add('hidden');
    intro.hidden = true;
    home.hidden = false;
    home.classList.remove('hidden');
    home.classList.add('screen--enter');

    announce(`Welcome to ${CATALOG.brand}`);
    setupRowObserver();
    window.setTimeout(() => heroPlay.focus(), 400);
  }

  function bindEvents() {
    document.querySelector('[data-profile="nethra"]').addEventListener('click', enterHome);

    heroPlay.addEventListener('click', () => openShow(CATALOG.hero.id));
    heroInfo.addEventListener('click', () => openShow(CATALOG.hero.id));

    modal.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeShow);
    });

    letterModal.querySelectorAll('[data-close-letter]').forEach((el) => {
      el.addEventListener('click', closeLetter);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (!modal.hidden) closeShow();
        if (!letterModal.hidden) closeLetter();
      }

      if (!modal.hidden && event.key === 'Tab') trapFocus(modal, event);
      if (!letterModal.hidden && event.key === 'Tab') trapFocus(letterModal, event);
    });
  }

  function showBootError(message) {
    document.body.innerHTML =
      '<main style="min-height:100vh;display:grid;place-items:center;padding:2rem;background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;text-align:center;">' +
      '<div><h1 style="color:#e50914;font-size:1.5rem;margin:0 0 1rem;">Nethraflix could not start</h1>' +
      '<p style="color:#b3b3b3;max-width:40ch;margin:0 auto 1rem;">' +
      message +
      '</p><p style="color:#808080;font-size:0.9rem;">Open via GitHub Pages or run <code>./preview.command</code> — do not double-click index.html.</p></div></main>';
  }

  function init() {
    if (typeof CATALOG === 'undefined') {
      showBootError('Site data failed to load. Check that js/catalog.js is available.');
      return;
    }

    try {
      buildShowLookup();
      renderProfiles();
      renderHero();
      renderRows();
      bindEvents();
      setupNavScroll();
    } catch (error) {
      console.error(error);
      showBootError(error.message || 'Something went wrong while loading the site.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

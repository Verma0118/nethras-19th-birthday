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

  function announce(message) {
    liveRegion.textContent = '';
    window.setTimeout(() => {
      liveRegion.textContent = message;
    }, 30);
  }

  function placeholderClass(seed) {
    let hash = 0;
    const str = String(seed);
    for (let i = 0; i < str.length; i += 1) {
      hash = (hash + str.charCodeAt(i) * (i + 1)) % PLACEHOLDER_CLASSES.length;
    }
    return PLACEHOLDER_CLASSES[hash];
  }

  function applyImage(element, src, alt, seed) {
    const fallbackClass = placeholderClass(seed);
    element.classList.add(fallbackClass);
    element.setAttribute('aria-label', alt);

    const img = new Image();
    img.onload = () => {
      element.style.backgroundImage = `url("${src}")`;
      element.classList.remove(fallbackClass);
    };
    img.onerror = () => {
      element.style.backgroundImage = '';
    };
    img.src = src;
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

  function createShowCard(show) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'show-card' + (show.isLetter ? ' show-card--letter' : '');
    card.dataset.showId = show.id;
    card.setAttribute('aria-label', `${show.title}. ${show.caption}`);

    const poster = document.createElement('div');
    poster.className = 'show-card__poster';

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

  function renderRows() {
    rowsContainer.innerHTML = '';

    CATALOG.rows.forEach((row) => {
      const section = document.createElement('section');
      section.className = 'row';
      section.setAttribute('aria-labelledby', `row-${row.id}`);

      const heading = document.createElement('h2');
      heading.id = `row-${row.id}`;
      heading.className = 'row__title';
      heading.textContent = row.title;

      const track = document.createElement('div');
      track.className = 'row__track';
      track.setAttribute('role', 'list');

      row.shows.forEach((show) => {
        const card = createShowCard(show);
        card.setAttribute('role', 'listitem');
        track.appendChild(card);
      });

      section.appendChild(heading);
      section.appendChild(track);
      rowsContainer.appendChild(section);
    });
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

    modal.hidden = false;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    announce(`Opened ${show.title}`);

    const closeBtn = modal.querySelector('.modal__close');
    window.setTimeout(() => closeBtn.focus(), 50);
  }

  function closeShow() {
    modal.classList.add('hidden');
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
    announce('Closed memory details');
  }

  function openLetter() {
    lastFocus = document.activeElement;
    letterTitle.textContent = CATALOG.letter.title;
    letterBody.innerHTML = CATALOG.letter.body
      .map((line) => (line ? `<p>${escapeHtml(line)}</p>` : '<p aria-hidden="true">&nbsp;</p>'))
      .join('');

    letterModal.hidden = false;
    letterModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    announce('Opened birthday letter');

    const closeBtn = letterModal.querySelector('.modal__close');
    window.setTimeout(() => closeBtn.focus(), 50);
  }

  function closeLetter() {
    letterModal.classList.add('hidden');
    letterModal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
    announce('Closed birthday letter');
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function enterHome() {
    intro.classList.add('hidden');
    intro.hidden = true;
    home.hidden = false;
    home.classList.remove('hidden');
    home.classList.add('screen--fade-in');
    announce(`Welcome to ${CATALOG.brand}`);
    heroPlay.focus();
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

  function init() {
    buildShowLookup();
    renderProfiles();
    renderHero();
    renderRows();
    bindEvents();
  }

  init();
})();

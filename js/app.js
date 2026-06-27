(function () {
  const PLACEHOLDER_CLASSES = [
    'poster--rose', 'poster--wine', 'poster--ember', 'poster--plum',
    'poster--night', 'poster--dusk', 'poster--mauve', 'poster--crimson',
  ];

  const SCENE_DURATION = 4500;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loader-fill');
  const loaderStatus = document.getElementById('loader-status');
  const intro = document.getElementById('intro');
  const home = document.getElementById('home');
  const nav = document.querySelector('.nav');
  const catalogEl = document.getElementById('catalog');
  const liveRegion = document.getElementById('live-region');

  const heroBackdrop = document.getElementById('hero-backdrop');
  const heroTitle = document.getElementById('hero-title');
  const heroTagline = document.getElementById('hero-tagline');
  const heroMeta = document.getElementById('hero-meta');
  const heroSynopsis = document.getElementById('hero-synopsis');
  const heroPlay = document.getElementById('hero-play');
  const heroInfo = document.getElementById('hero-info');

  const player = document.getElementById('player');
  const playerLayerA = document.getElementById('player-layer-a');
  const playerLayerB = document.getElementById('player-layer-b');
  const playerTitle = document.getElementById('player-title');
  const playerEpisode = document.getElementById('player-episode');
  const playerCaption = document.getElementById('player-caption');
  const playerProgressFill = document.getElementById('player-progress-fill');
  const playerProgress = document.getElementById('player-progress');
  const playerDots = document.getElementById('player-dots');
  const playerClose = document.getElementById('player-close');
  const playerPrev = document.getElementById('player-prev');
  const playerNext = document.getElementById('player-next');
  const playerToggle = document.getElementById('player-toggle');
  const playerTapLeft = document.getElementById('player-tap-left');
  const playerTapRight = document.getElementById('player-tap-right');
  const playerBuffer = document.getElementById('player-buffer');

  const infoPanel = document.getElementById('info-panel');
  const infoPoster = document.getElementById('info-poster');
  const infoTitle = document.getElementById('info-title');
  const infoMeta = document.getElementById('info-meta');
  const infoSynopsis = document.getElementById('info-synopsis');
  const infoPlay = document.getElementById('info-play');

  const letterModal = document.getElementById('letter-modal');
  const letterTitle = document.getElementById('letter-title');
  const letterBody = document.getElementById('letter-body');

  let lastFocus = null;
  let featuredShow = null;
  let infoShowId = null;

  const playerState = {
    show: null,
    sceneIndex: 0,
    activeLayer: 'a',
    playing: true,
    timer: null,
    progressRaf: null,
    progressStart: 0,
    transitioning: false,
  };

  function announce(msg) {
    liveRegion.textContent = '';
    window.setTimeout(() => { liveRegion.textContent = msg; }, 30);
  }

  function wait(ms) {
    return new Promise((r) => window.setTimeout(r, reducedMotion ? 0 : ms));
  }

  function getShow(id) {
    return CATALOG.shows[id];
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
    return [...new Set([src, `${base}.jpg`, `${base}.jpeg`, `${base}.png`, `${base}.webp`])];
  }

  function loadImage(src) {
    const candidates = imageCandidates(src);
    return new Promise((resolve) => {
      let i = 0;
      function tryNext() {
        if (i >= candidates.length) {
          resolve({ ok: false, src: candidates[0] });
          return;
        }
        const img = new Image();
        img.onload = () => resolve({ ok: true, src: candidates[i] });
        img.onerror = () => { i += 1; tryNext(); };
        img.src = candidates[i];
      }
      tryNext();
    });
  }

  function applyImageToEl(element, src, alt, seed) {
    const fb = placeholderClass(seed);
    element.classList.add(fb);
    element.setAttribute('aria-label', alt || '');
    loadImage(src).then(({ ok, src: resolved }) => {
      if (ok) {
        element.style.backgroundImage = `url("${resolved}")`;
        element.classList.remove(fb);
      }
    });
  }

  function preloadShowImages() {
    const urls = new Set();
    Object.values(CATALOG.shows).forEach((show) => {
      if (show.poster) urls.add(show.poster);
      (show.scenes || []).forEach((s) => urls.add(s.image));
    });
    urls.add(CATALOG.profile.avatar);
    urls.add(CATALOG.lockedProfile.avatar);
    return Promise.all([...urls].map((u) => loadImage(u)));
  }

  async function runLoader() {
    const bar = loader.querySelector('.loader__bar');
    const messages = CATALOG.loader.messages;
    let progress = 0;
    let msgIndex = 0;

    const preload = preloadShowImages();
    const minTime = wait(reducedMotion ? 400 : 2400);
    const start = performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      const target = Math.min(92, (elapsed / 2200) * 92);
      progress = Math.max(progress, target);
      loaderFill.style.width = `${progress}%`;
      bar.setAttribute('aria-valuenow', String(Math.round(progress)));

      const nextMsg = Math.floor(elapsed / 700) % messages.length;
      if (nextMsg !== msgIndex) {
        msgIndex = nextMsg;
        loaderStatus.textContent = messages[msgIndex];
      }

      if (progress < 92) requestAnimationFrame(tick);
    };

    if (!reducedMotion) requestAnimationFrame(tick);
    else loaderFill.style.width = '100%';

    await Promise.all([preload, minTime]);
    loaderFill.style.width = '100%';
    bar.setAttribute('aria-valuenow', '100');
    loaderStatus.textContent = 'Welcome to Nethraflix';

    await wait(reducedMotion ? 200 : 500);
    loader.classList.add('screen--exit');
    await wait(reducedMotion ? 0 : 500);

    loader.classList.add('hidden');
    loader.hidden = true;
    intro.hidden = false;
    intro.classList.remove('hidden');
    intro.classList.add('screen--enter');
    announce('Choose your profile');
  }

  function renderProfiles() {
    applyImageToEl(
      document.getElementById('profile-avatar-nethra'),
      CATALOG.profile.avatar,
      `${CATALOG.profile.name}'s profile`,
      'nethra'
    );
    applyImageToEl(
      document.getElementById('profile-avatar-aarav'),
      CATALOG.lockedProfile.avatar,
      `${CATALOG.lockedProfile.name}'s profile`,
      'aarav'
    );
  }

  function renderHero() {
    featuredShow = getShow(CATALOG.hero.showId);
    heroTitle.textContent = featuredShow.title;
    heroTagline.textContent = CATALOG.hero.tagline;
    heroMeta.textContent = CATALOG.hero.meta;
    heroSynopsis.textContent = featuredShow.synopsis;
    applyImageToEl(heroBackdrop, featuredShow.poster, featuredShow.title, featuredShow.id);
  }

  function createCard(show) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'tile' + (show.isLetter ? ' tile--letter' : '');
    card.dataset.showId = show.id;

    const epCount = show.scenes ? show.scenes.length : 0;
    const epLabel = show.isLetter ? 'Letter' : `${epCount} Episodes`;
    card.setAttribute('aria-label', `${show.title}. ${show.synopsis}. ${epLabel}`);

    const poster = document.createElement('div');
    poster.className = 'tile__poster';
    applyImageToEl(poster, show.poster, show.title, show.id);

    const shine = document.createElement('div');
    shine.className = 'tile__shine';
    shine.setAttribute('aria-hidden', 'true');
    poster.appendChild(shine);

    if (!show.isLetter) {
      const play = document.createElement('span');
      play.className = 'tile__play';
      play.setAttribute('aria-hidden', 'true');
      play.innerHTML = '<svg width="22" height="22" viewBox="0 0 14 14" fill="currentColor"><path d="M2 1.5v11l9-5.5z"/></svg>';
      poster.appendChild(play);
    } else {
      const icon = document.createElement('span');
      icon.className = 'tile__letter-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '✉';
      poster.appendChild(icon);
    }

    const body = document.createElement('div');
    body.className = 'tile__body';
    body.innerHTML =
      `<span class="tile__meta">${show.meta}</span>` +
      `<span class="tile__title">${show.title}</span>` +
      `<span class="tile__episodes">${epLabel}</span>`;

    card.appendChild(poster);
    card.appendChild(body);

    card.addEventListener('click', () => {
      if (show.isLetter) openLetter();
      else openPlayer(show.id);
    });

    return card;
  }

  function renderCatalog() {
    catalogEl.innerHTML = '';
    CATALOG.rows.forEach((row, rowIndex) => {
      const section = document.createElement('section');
      section.className = 'catalog__row';
      section.style.setProperty('--row-delay', `${rowIndex * 100}ms`);
      section.setAttribute('aria-labelledby', `catalog-${row.id}`);

      const heading = document.createElement('h2');
      heading.id = `catalog-${row.id}`;
      heading.className = 'catalog__heading';
      heading.textContent = row.title;

      const grid = document.createElement('div');
      grid.className = 'catalog__grid';
      grid.setAttribute('role', 'list');

      row.shows.forEach((showId) => {
        const show = getShow(showId);
        const card = createCard(show);
        card.setAttribute('role', 'listitem');
        grid.appendChild(card);
      });

      section.appendChild(heading);
      section.appendChild(grid);
      catalogEl.appendChild(section);
    });
  }

  function stopPlayerTimer() {
    if (playerState.timer) {
      clearTimeout(playerState.timer);
      playerState.timer = null;
    }
    if (playerState.progressRaf) {
      cancelAnimationFrame(playerState.progressRaf);
      playerState.progressRaf = null;
    }
  }

  function updateProgressUI() {
    const total = playerState.show.scenes.length;
    const pct = ((playerState.sceneIndex + 1) / total) * 100;
    playerProgressFill.style.width = `${pct}%`;
    playerProgress.setAttribute('aria-valuenow', String(Math.round(pct)));
    playerEpisode.textContent = `Episode ${playerState.sceneIndex + 1} of ${total}`;

    playerDots.innerHTML = '';
    playerState.show.scenes.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'player__dot' + (i === playerState.sceneIndex ? ' is-active' : '');
      dot.setAttribute('aria-label', `Go to episode ${i + 1}`);
      dot.addEventListener('click', () => goToScene(i));
      playerDots.appendChild(dot);
    });
  }

  function animateProgressBar() {
    if (!playerState.playing || reducedMotion) return;
    const duration = SCENE_DURATION;
    playerState.progressStart = performance.now();

    const step = (now) => {
      if (!playerState.playing) return;
      const elapsed = now - playerState.progressStart;
      const scenePct = Math.min(elapsed / duration, 1);
      const total = playerState.show.scenes.length;
      const base = (playerState.sceneIndex / total) * 100;
      const slice = (1 / total) * 100;
      playerProgressFill.style.width = `${base + scenePct * slice}%`;
      if (scenePct < 1) playerState.progressRaf = requestAnimationFrame(step);
    };
    playerState.progressRaf = requestAnimationFrame(step);
  }

  async function setPlayerScene(index, direction) {
    if (!playerState.show || playerState.transitioning) return;
    const scenes = playerState.show.scenes;
    if (index < 0 || index >= scenes.length) return;

    playerState.transitioning = true;
    stopPlayerTimer();
    playerBuffer.classList.add('is-visible');

    const scene = scenes[index];
    const result = await loadImage(scene.image);

    const incoming = playerState.activeLayer === 'a' ? playerLayerB : playerLayerA;
    const outgoing = playerState.activeLayer === 'a' ? playerLayerA : playerLayerB;

    incoming.className = `player__layer player__layer--${playerState.activeLayer === 'a' ? 'b' : 'a'}`;
    incoming.classList.remove('is-active', 'is-exit', 'slide-left', 'slide-right');

    if (result.ok) {
      incoming.style.backgroundImage = `url("${result.src}")`;
      incoming.classList.remove(...PLACEHOLDER_CLASSES);
    } else {
      incoming.style.backgroundImage = '';
      incoming.className += ' ' + placeholderClass(`${playerState.show.id}-${index}`);
    }
    incoming.setAttribute('aria-label', scene.caption);

    if (!reducedMotion && direction) {
      incoming.classList.add(direction > 0 ? 'slide-right' : 'slide-left');
    }

    playerCaption.classList.remove('is-visible');
    await wait(reducedMotion ? 0 : 80);

    incoming.classList.add('is-active');
    outgoing.classList.remove('is-active');
    outgoing.classList.add('is-exit');

    playerState.sceneIndex = index;
    playerState.activeLayer = playerState.activeLayer === 'a' ? 'b' : 'a';
    playerCaption.textContent = scene.caption;
    updateProgressUI();

    await wait(reducedMotion ? 0 : 520);
    playerCaption.classList.add('is-visible');
    playerBuffer.classList.remove('is-visible');
    playerState.transitioning = false;

    if (playerState.playing) scheduleNextScene();
    else animateProgressBar();
  }

  function scheduleNextScene() {
    stopPlayerTimer();
    if (!playerState.playing) return;
    animateProgressBar();
    playerState.timer = window.setTimeout(() => {
      const next = playerState.sceneIndex + 1;
      if (next < playerState.show.scenes.length) setPlayerScene(next, 1);
      else setPlayerScene(0, 1);
    }, reducedMotion ? 8000 : SCENE_DURATION);
  }

  function goToScene(index) {
    const dir = index > playerState.sceneIndex ? 1 : -1;
    setPlayerScene(index, dir);
  }

  function nextScene() {
    const next = (playerState.sceneIndex + 1) % playerState.show.scenes.length;
    setPlayerScene(next, 1);
  }

  function prevScene() {
    const prev = (playerState.sceneIndex - 1 + playerState.show.scenes.length) % playerState.show.scenes.length;
    setPlayerScene(prev, -1);
  }

  function togglePlay() {
    playerState.playing = !playerState.playing;
    playerToggle.setAttribute('aria-label', playerState.playing ? 'Pause slideshow' : 'Play slideshow');
    playerToggle.querySelector('.player__pause-icon').classList.toggle('hidden', !playerState.playing);
    playerToggle.querySelector('.player__play-icon').classList.toggle('hidden', playerState.playing);
    if (playerState.playing) scheduleNextScene();
    else stopPlayerTimer();
  }

  async function openPlayer(showId) {
    const show = getShow(showId);
    if (!show || show.isLetter || !show.scenes.length) return;

    lastFocus = document.activeElement;
    playerState.show = show;
    playerState.sceneIndex = 0;
    playerState.activeLayer = 'a';
    playerState.playing = !reducedMotion;

    playerTitle.textContent = show.title;
    playerToggle.querySelector('.player__pause-icon').classList.toggle('hidden', !playerState.playing);
    playerToggle.querySelector('.player__play-icon').classList.toggle('hidden', playerState.playing);

    player.hidden = false;
    player.classList.remove('hidden');
    document.body.classList.add('player-open');
    await wait(20);
    player.classList.add('player--open');

    playerLayerA.className = 'player__layer player__layer--a';
    playerLayerB.className = 'player__layer player__layer--b';
    await setPlayerScene(0, 0);
    if (playerState.playing) scheduleNextScene();
    announce(`Now playing ${show.title}`);
    playerClose.focus();
  }

  async function closePlayer() {
    stopPlayerTimer();
    playerState.show = null;
    player.classList.remove('player--open');
    await wait(reducedMotion ? 0 : 400);
    player.classList.add('hidden');
    player.hidden = true;
    document.body.classList.remove('player-open');
    if (lastFocus) lastFocus.focus();
    announce('Back to browse');
  }

  function openInfo(showId) {
    const show = getShow(showId);
    if (!show || show.isLetter) return;
    infoShowId = showId;
    lastFocus = document.activeElement;
    infoTitle.textContent = show.title;
    infoMeta.textContent = show.meta;
    infoSynopsis.textContent = show.synopsis;
    applyImageToEl(infoPoster, show.poster, show.title, show.id);
    infoPanel.hidden = false;
    infoPanel.classList.remove('hidden');
    document.body.classList.add('modal-open');
    window.setTimeout(() => infoPanel.classList.add('info-panel--open'), 20);
    announce(`More info for ${show.title}`);
    infoPanel.querySelector('.info-panel__close').focus();
  }

  function closeInfo() {
    infoPanel.classList.remove('info-panel--open');
    window.setTimeout(() => {
      infoPanel.classList.add('hidden');
      infoPanel.hidden = true;
      document.body.classList.remove('modal-open');
      if (lastFocus) lastFocus.focus();
    }, reducedMotion ? 0 : 320);
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
    window.setTimeout(() => letterModal.classList.add('letter-modal--open'), 20);
    announce('Opened birthday letter');
    letterModal.querySelector('.letter-modal__close').focus();
  }

  function closeLetter() {
    letterModal.classList.remove('letter-modal--open');
    window.setTimeout(() => {
      letterModal.classList.add('hidden');
      letterModal.hidden = true;
      document.body.classList.remove('modal-open');
      if (lastFocus) lastFocus.focus();
    }, reducedMotion ? 0 : 320);
  }

  function escapeHtml(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  async function enterHome() {
    const btn = document.querySelector('[data-profile="nethra"]');
    btn.disabled = true;
    btn.classList.add('profile--entering');
    intro.classList.add('screen--exit');
    await wait(reducedMotion ? 0 : 650);

    intro.classList.add('hidden');
    intro.hidden = true;
    home.hidden = false;
    home.classList.remove('hidden');
    home.classList.add('screen--enter');
    catalogEl.classList.add('catalog--visible');
    announce(`Welcome to ${CATALOG.brand}`);
    window.setTimeout(() => heroPlay.focus(), 300);
  }

  function setupNavScroll() {
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function bindEvents() {
    document.querySelector('[data-profile="nethra"]').addEventListener('click', enterHome);
    heroPlay.addEventListener('click', () => openPlayer(CATALOG.hero.showId));
    heroInfo.addEventListener('click', () => openInfo(CATALOG.hero.showId));
    infoPlay.addEventListener('click', () => { closeInfo(); openPlayer(infoShowId); });
    infoPanel.querySelectorAll('[data-close-info]').forEach((el) => el.addEventListener('click', closeInfo));
    letterModal.querySelectorAll('[data-close-letter]').forEach((el) => el.addEventListener('click', closeLetter));

    playerClose.addEventListener('click', closePlayer);
    playerPrev.addEventListener('click', prevScene);
    playerNext.addEventListener('click', nextScene);
    playerToggle.addEventListener('click', togglePlay);
    playerTapLeft.addEventListener('click', prevScene);
    playerTapRight.addEventListener('click', nextScene);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!player.hidden) closePlayer();
        else if (!infoPanel.hidden) closeInfo();
        else if (!letterModal.hidden) closeLetter();
      }
      if (!player.hidden) {
        if (e.key === 'ArrowRight') nextScene();
        if (e.key === 'ArrowLeft') prevScene();
        if (e.key === ' ') { e.preventDefault(); togglePlay(); }
      }
    });
  }

  function showBootError(message) {
    document.body.innerHTML =
      '<main style="min-height:100vh;display:grid;place-items:center;padding:2rem;background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;text-align:center">' +
      `<div><h1 style="color:#e50914">Nethraflix could not start</h1><p style="color:#b3b3b3">${message}</p></div></main>`;
  }

  async function init() {
    if (typeof CATALOG === 'undefined') {
      showBootError('Site data failed to load.');
      return;
    }
    try {
      renderProfiles();
      renderHero();
      renderCatalog();
      bindEvents();
      setupNavScroll();
      await runLoader();
    } catch (err) {
      console.error(err);
      showBootError(err.message || 'Something went wrong.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

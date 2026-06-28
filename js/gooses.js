(function () {
  const GOOSE_SVG = (
    '<svg class="goose__art" viewBox="0 0 52 44" width="72" height="62" aria-hidden="true" focusable="false">' +
    '<ellipse class="goose__shadow" cx="26" cy="38" rx="12" ry="3" fill="rgba(0,0,0,0.15)"/>' +
    '<ellipse cx="22" cy="30" rx="15" ry="11" fill="#f7f6f0"/>' +
    '<ellipse class="goose__wing" cx="18" cy="28" rx="7" ry="5" fill="#ebe9df" transform="rotate(-12 18 28)"/>' +
    '<path d="M22 22 C24 10 30 6 34 12" stroke="#f7f6f0" stroke-width="7" fill="none" stroke-linecap="round"/>' +
    '<circle cx="35" cy="11" r="6" fill="#f7f6f0"/>' +
    '<circle cx="37" cy="10" r="1.4" fill="#2a2a2a"/>' +
    '<path d="M40 9 L47 7 L40 14 Z" fill="#f0a030"/>' +
    '<path d="M10 32 L5 34 M12 35 L7 38" stroke="#f0a030" stroke-width="2.2" stroke-linecap="round"/>' +
    '</svg>'
  );

  const PATHS = {
    intro: [
      { id: 'a', dur: 22, delay: 0, keyframes: 'goosePathIntroA', start: 'translate(12vw, 72vh) scaleX(1)' },
      { id: 'b', dur: 26, delay: 2, keyframes: 'goosePathIntroB', start: 'translate(82vw, 28vh) scaleX(-1)' },
    ],
    home: [
      { id: 'a', dur: 24, delay: 0, keyframes: 'goosePathHomeA', start: 'translate(6vw, 24vh) scaleX(1)' },
      { id: 'b', dur: 28, delay: 1.5, keyframes: 'goosePathHomeB', start: 'translate(90vw, 62vh) scaleX(-1)' },
      { id: 'c', dur: 20, delay: 3, keyframes: 'goosePathHomeC', start: 'translate(22vw, 82vh) scaleX(1)' },
      { id: 'd', dur: 32, delay: 0.5, keyframes: 'goosePathHomeD', start: 'translate(75vw, 18vh) scaleX(-1)' },
    ],
  };

  let field = null;
  let facts = [];
  let factIndex = 0;
  let activeGoose = null;
  let announceFn = null;
  let reducedMotion = false;
  let currentScreen = null;

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function nextFact() {
    if (!facts.length) return 'Did you know geese are secretly the best animals ever?';
    const fact = facts[factIndex % facts.length];
    factIndex += 1;
    if (factIndex >= facts.length) {
      facts = shuffle(facts);
      factIndex = 0;
    }
    return fact;
  }

  function closeBubble() {
    if (!activeGoose) return;
    const bubble = activeGoose.querySelector('.goose__bubble');
    const btn = activeGoose;
    bubble.classList.remove('goose__bubble--open');
    window.setTimeout(() => {
      bubble.hidden = true;
    }, reducedMotion ? 0 : 220);
    btn.setAttribute('aria-expanded', 'false');
    activeGoose = null;
  }

  function openBubble(goose, fact) {
    if (activeGoose && activeGoose !== goose) closeBubble();

    const bubble = goose.querySelector('.goose__bubble');
    const text = bubble.querySelector('.goose__bubble-text');
    text.textContent = fact;
    bubble.hidden = false;
    window.requestAnimationFrame(() => {
      bubble.classList.add('goose__bubble--open');
    });
    goose.setAttribute('aria-expanded', 'true');
    goose.classList.add('goose--happy');
    window.setTimeout(() => goose.classList.remove('goose--happy'), 600);
    activeGoose = goose;
    if (announceFn) announceFn(fact);
  }

  function onGooseClick(e) {
    e.stopPropagation();
    const goose = e.currentTarget;
    if (activeGoose === goose && goose.querySelector('.goose__bubble').classList.contains('goose__bubble--open')) {
      closeBubble();
      return;
    }
    openBubble(goose, nextFact());
  }

  function buildTrail() {
    const trail = document.createElement('span');
    trail.className = 'goose__trail';
    trail.setAttribute('aria-hidden', 'true');
    trail.innerHTML =
      '<svg class="goose__trail-svg" viewBox="0 0 40 24" width="40" height="24">' +
      '<path d="M2 20 Q12 4 38 10" fill="none" stroke="rgba(255, 220, 140, 0.8)" stroke-width="2.5" stroke-dasharray="5 6" stroke-linecap="round"/>' +
      '</svg>';
    return trail;
  }

  function buildGoose(index, path) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'goose';
    btn.dataset.path = path.id;
    btn.style.setProperty('--goose-dur', path.dur + 's');
    btn.style.setProperty('--goose-delay', path.delay + 's');
    btn.style.animationName = reducedMotion ? 'none' : path.keyframes;
    if (path.start) btn.style.transform = path.start;
    btn.setAttribute('aria-label', 'Cute goose — tap for a fun fact');
    btn.setAttribute('aria-expanded', 'false');

    btn.appendChild(buildTrail());

    const sprite = document.createElement('span');
    sprite.className = 'goose__sprite';
    sprite.innerHTML = GOOSE_SVG;
    btn.appendChild(sprite);

    const bubble = document.createElement('span');
    bubble.className = 'goose__bubble';
    bubble.hidden = true;
    bubble.setAttribute('role', 'status');
    bubble.innerHTML = '<span class="goose__bubble-tail" aria-hidden="true"></span><span class="goose__bubble-text"></span>';
    btn.appendChild(bubble);

    btn.addEventListener('click', onGooseClick);
    return btn;
  }

  function render(screen) {
    if (!field) return;
    field.innerHTML = '';
    const paths = PATHS[screen] || PATHS.home;
    paths.forEach((path, i) => {
      field.appendChild(buildGoose(i, path));
    });
  }

  function show(screen) {
    if (!field || !facts.length) return;
    currentScreen = screen;
    render(screen);
    field.removeAttribute('hidden');
    field.classList.remove('hidden');
    field.setAttribute('aria-hidden', 'false');
  }

  function hide() {
    if (!field) return;
    closeBubble();
    currentScreen = null;
    field.classList.add('hidden');
    field.setAttribute('hidden', '');
    field.setAttribute('aria-hidden', 'true');
  }

  function init(options) {
    facts = shuffle(options.facts || []);
    factIndex = 0;
    announceFn = options.announce || null;
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    field = document.getElementById('goose-field');
    if (!field) return;

    document.addEventListener('click', (e) => {
      if (!activeGoose) return;
      if (!e.target.closest('.goose')) closeBubble();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeGoose) closeBubble();
    });
  }

  window.GooseField = { init, show, hide };
})();

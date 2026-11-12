// Shared page behaviour.
// Publishes the sticky header's (and page nav's) height as CSS variables so the
// page nav can stick directly beneath the header and anchor jumps land below both.
(function () {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const pageNav = document.querySelector('.page-nav');

  function measure() {
    if (header) root.style.setProperty('--header-h', header.offsetHeight + 'px');
    if (pageNav) root.style.setProperty('--page-nav-h', pageNav.offsetHeight + 'px');
  }

  measure();
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(measure);
    if (header) ro.observe(header);
    if (pageNav) ro.observe(pageNav);
  } else {
    addEventListener('resize', measure);
  }
})();

// Featured carousel (hub home, activation toolkits)
(function () {
  const panels = document.querySelectorAll('[data-slide-panel]');
  if (!panels.length) return;
  const dots = document.querySelectorAll('[data-slide]');
  let current = 0;
  function show(i) {
    current = (i + panels.length) % panels.length;
    panels.forEach((p, n) => { p.hidden = n !== current; });
    dots.forEach((d, n) => d.setAttribute('aria-current', n === current ? 'true' : 'false'));
  }
  document.querySelector('[data-carousel="prev"]').addEventListener('click', () => show(current - 1));
  document.querySelector('[data-carousel="next"]').addEventListener('click', () => show(current + 1));
  dots.forEach(d => d.addEventListener('click', () => show(+d.dataset.slide)));
})();

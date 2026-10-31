/* ==========================================================================
   Pixel Forge — blueprint effects
   Everything here is rAF-throttled and transform/opacity only.
   ========================================================================== */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 15 · top horizon progress bar ---- */
  var bar = document.createElement('div');
  bar.className = 'pf-progress';
  document.body.appendChild(bar);
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (reduce) return;

  /* ---- 19 · ambient pixel drift ---- */
  var drift = document.createElement('div');
  drift.className = 'pf-drift';
  for (var i = 0; i < 18; i++) {
    var s = document.createElement('i');
    s.style.left = (Math.random() * 100) + '%';
    s.style.animationDuration = (16 + Math.random() * 18) + 's';
    s.style.animationDelay = (-Math.random() * 26) + 's';
    s.style.opacity = (0.05 + Math.random() * 0.15).toFixed(2);
    drift.appendChild(s);
  }
  document.body.appendChild(drift);

  /* ---- 37 · corner reticles snap in ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.pf-sec, .pf-forge, .sec').forEach(function (n) {
    n.classList.add('pf-reticle');
    io.observe(n);
  });

  /* ---- 28 · anvil strike on logo click ---- */
  document.querySelectorAll('.brand').forEach(function (b) {
    b.addEventListener('click', function () {
      b.classList.add('striking');
      var ring = document.createElement('span');
      ring.className = 'pf-spark go';
      var mark = b.querySelector('.brand-mark');
      if (mark) {
        mark.style.position = 'relative';
        mark.appendChild(ring);
        setTimeout(function () { ring.remove(); }, 650);
      }
      setTimeout(function () { b.classList.remove('striking'); }, 550);
    });
  });

  /* ---- 04 · pixel cursor trail (one node, reused) ---- */
  var trail = document.createElement('div');
  trail.className = 'pf-trail';
  document.body.appendChild(trail);
  var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
  window.addEventListener('pointermove', function (e) {
    tx = e.clientX; ty = e.clientY;
    trail.style.opacity = '0.85';
    if (!running) { running = true; requestAnimationFrame(step); }
  }, { passive: true });
  function step() {
    cx += (tx - cx) * 0.22;
    cy += (ty - cy) * 0.22;
    trail.style.transform = 'translate3d(' + (cx - 2) + 'px,' + (cy - 2) + 'px,0)';
    if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) {
      requestAnimationFrame(step);
    } else {
      running = false;
      trail.style.opacity = '0';
    }
  }

  /* ---- 23 · fluid metric counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var dur = 1100;
        function tick(now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { cio.observe(c); });
  }
})();

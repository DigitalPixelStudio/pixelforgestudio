/* hard guarantee: nothing in this file may lock the page */
(function(){try{
  document.documentElement.style.overflow='';
  document.body.style.overflow='';
  document.body.style.position='';
}catch(e){}})();
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


  /* ---- v78 · hero scanline + per-section dust ---- */
  var hero = document.querySelector('.pf-hero');
  if (hero) {
    var sl = document.createElement('div');
    sl.className = 'scanline';
    hero.appendChild(sl);
  }

  document.querySelectorAll('.pf-sec, .sec, .sec-alt').forEach(function (sec) {
    if (sec.querySelector(':scope > .dust')) return;
    var d = document.createElement('div');
    d.className = 'dust';
    for (var j = 0; j < 10; j++) {
      var p = document.createElement('i');
      p.style.left = (Math.random() * 100) + '%';
      p.style.bottom = (Math.random() * 40) + '%';
      p.style.animationDuration = (7 + Math.random() * 9) + 's';
      p.style.animationDelay = (-Math.random() * 12) + 's';
      d.appendChild(p);
    }
    sec.appendChild(d);
  });

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

/* ==========================================================================
   v79 — 3D pointer tilt + section lift
   Transform-only. One rAF loop, no layout reads inside it.
   ========================================================================== */
(function () {
  try {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return; // skip on touch

  var cards = Array.prototype.slice.call(
    document.querySelectorAll('.sitem, .cnt, .vitem, .pkg, .card')
  ).slice(0, 60); // cap so the loop stays cheap

  var active = null, tx = 0, ty = 0, raf = null;

  function run() {
    if (!active) { raf = null; return; }
    var r = active.__r;
    var rx = (ty - 0.5) * -7;
    var ry = (tx - 0.5) * 7;
    active.style.transform =
      'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' +
      ry.toFixed(2) + 'deg) translateY(-5px) scale(1.012)';
    raf = null;
  }

  cards.forEach(function (c) {
    c.addEventListener('pointerenter', function () {
      c.__r = c.getBoundingClientRect();
      active = c;
    });
    c.addEventListener('pointermove', function (e) {
      if (active !== c) { c.__r = c.getBoundingClientRect(); active = c; }
      tx = (e.clientX - c.__r.left) / c.__r.width;
      ty = (e.clientY - c.__r.top) / c.__r.height;
      if (!raf) raf = requestAnimationFrame(run);
    });
    c.addEventListener('pointerleave', function () {
      active = null;
      c.style.transform = '';
    });
  });

  /* section lift-in */
  var sio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        sio.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.sec, .pf-sec, .pf-forge').forEach(function (n) {
    sio.observe(n);
  });

  /* never let a stuck tilt lock the page */
  document.addEventListener('pointerout', function () {
    if (active) { active.style.transform = ''; active = null; }
  }, { passive: true });
  window.addEventListener('scroll', function () {
    if (active) { active.style.transform = ''; active = null; }
  }, { passive: true });
  } catch (e) {
    /* a decorative effect must never break the page */
    document.querySelectorAll('.sitem,.cnt,.vitem,.pkg,.card').forEach(function (c) {
      c.style.transform = '';
    });
  }
})();

/* ==========================================================================
   v81 — decorative graphics. Purely additive; wrapped so a failure can never
   affect scrolling or the page.
   ========================================================================== */
(function () {
  try {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* grid floor + drifting orbs inside each major section */
    document.querySelectorAll('.pf-sec, .sec, .pf-forge').forEach(function (sec, i) {
      if (sec.querySelector(':scope > .gridfloor')) return;

      var g = document.createElement('div');
      g.className = 'gridfloor';
      g.setAttribute('aria-hidden', 'true');
      sec.appendChild(g);

      if (reduce) return;

      /* two glow orbs per section, offset so they never sync */
      for (var k = 0; k < 2; k++) {
        var o = document.createElement('div');
        o.className = 'orb-fx';
        var size = 180 + Math.random() * 220;
        o.style.width = size + 'px';
        o.style.height = size + 'px';
        o.style.left = (k === 0 ? 6 + Math.random() * 14 : 62 + Math.random() * 22) + '%';
        o.style.top = (10 + Math.random() * 60) + '%';
        o.style.animationDelay = (-Math.random() * 20) + 's';
        o.style.animationDuration = (22 + Math.random() * 16) + 's';
        o.setAttribute('aria-hidden', 'true');
        sec.appendChild(o);
      }
    });

    /* twinkling sparkles in the hero */
    var hero = document.querySelector('.pf-hero');
    if (hero && !reduce && !hero.querySelector('.sparkle')) {
      for (var s = 0; s < 14; s++) {
        var sp = document.createElement('span');
        sp.className = 'sparkle';
        sp.style.left = (Math.random() * 100) + '%';
        sp.style.top = (Math.random() * 100) + '%';
        sp.style.animationDelay = (-Math.random() * 5) + 's';
        sp.style.animationDuration = (3.5 + Math.random() * 3) + 's';
        sp.style.opacity = '0';
        sp.setAttribute('aria-hidden', 'true');
        hero.appendChild(sp);
      }
    }
  } catch (e) {
    /* decorative only — never break the page */
  }
})();

/* ==========================================================================
   PIXEL FORGE STUDIO — main.js
   Nav · reveal · counters · configurator · FAQ · mobile menu
   ========================================================================== */
(function () {
  'use strict';

  // ?still → render final state immediately (used for screenshots/previews)
  var STILL = window.location.search.indexOf('still') > -1;
  if (STILL) document.documentElement.classList.add('still');

  /* ---------- CONFIG ---------- */
  // ⚠️ VERIFY THIS NUMBER BEFORE LAUNCH
  var WA_NUMBER = '919620024812';

  var TIERS = {
    'launchpad':   { base: 9999 },
    'website':     { base: 19999 },
    'website-ai':  { base: 34999 },
    'crm':         { base: 49999 },
    'crm-ai':      { base: 74999 },
    'app':         { base: 39999 },
    'app-ai':      { base: 64999 }
  };

  var CORE_LABEL = { website: 'Website', crm: 'CRM', app: 'App' };
  var TIER_LABEL = { launchpad: 'Launchpad', growth: 'Growth', conquerer: 'Conquerer', empire: 'Empire' };

  var ADDONS = [
    { g:'Presence', id:'gbp',       name:'Google Business Profile', desc:'Claim, verify, photos, categories', price: 4999 },
    { g:'Presence', id:'fb',        name:'Facebook Page',           desc:'Setup, bio, cover, first posts',    price: 2999 },
    { g:'Presence', id:'ig',        name:'Instagram Page',          desc:'Setup, bio, highlights, grid',      price: 2999 },
    { g:'Presence', id:'fb_ig',     name:'Facebook + Instagram',    desc:'Both pages, bundled',               price: 4999 },
    { g:'Presence', id:'linkedin',  name:'LinkedIn company page',   desc:'Setup with content, not just a shell', price: 2999 },
    { g:'Presence', id:'youtube',   name:'YouTube channel',         desc:'Banner, about, playlists, 3 uploads', price: 3999 },
    { g:'Presence', id:'justdial',  name:'Justdial listing',        desc:'Verification, categories, photos',  price: 2999 },
    { g:'Presence', id:'indiamart', name:'IndiaMART profile',       desc:'25 products · platform fee at cost', price: 4999 },
    { g:'Presence', id:'sulekha',   name:'Sulekha listing',         desc:'Service areas, lead inbox',         price: 2499 },
    { g:'Presence', id:'wa',        name:'WhatsApp Business',       desc:'Catalogue, quick replies, labels',  price: 4999 },
    { g:'Presence', id:'waba',      name:'WhatsApp Business API',   desc:'Verified API, templates, flows',    price: 14999 },
    { g:'Presence', id:'profile',   name:'Complete Online Profile', desc:'All 8 listings + WhatsApp + Google · saves 8,492', price: 24999 },
    { g:'Analytics & ads', id:'ads',   name:'Google Ads account + tracking', desc:'Account, campaigns, conversion events', price: 4999 },
    { g:'Analytics & ads', id:'meta',  name:'Meta Business Suite',  desc:'Pixel, Conversions API, catalogue', price: 4999 },
    { g:'Analytics & ads', id:'bing',  name:'Bing Ads + Webmaster', desc:'Cheaper CPCs for B2B',              price: 2999 },
    { g:'Analytics & ads', id:'merchant', name:'Google Merchant Center', desc:'Product feed, shopping setup',  price: 3999 },
    { g:'Analytics & ads', id:'analytics', name:'GA4 + GTM + Search Console', desc:'Conversion events + dashboard', price: 4999 },
    { g:'Analytics & ads', id:'reviews', name:'Reviews & Reputation', desc:'QR, 10 templates, 30-day campaign', price: 7999 },
    { g:'AI & automation', id:'aibot', name:'Website AI bot',        desc:'Trained on your business, 24/7',   price: 24999 },
    { g:'AI & automation', id:'waai',  name:'WhatsApp AI bot',       desc:'Answers, qualifies, books',        price: 34999 },
    { g:'AI & automation', id:'botcrm',name:'Bot integration (existing CRM)', desc:'For Zoho, HubSpot or Salesforce', price: 14999 },
    { g:'AI & automation', id:'voice', name:'Voice bot setup',       desc:'Answers inbound calls, EN + Kannada', price: 24999 }
  ];

  var MONTHLY = [
    { g:'Care plans', id:'care_b',  name:'Care Basic',        desc:'Uptime, backups, security, 1 update', price: 2499 },
    { g:'Care plans', id:'care_p',  name:'Care Plus',         desc:'+ 3 updates, report, bot running',    price: 4999 },
    { g:'Care plans', id:'care_g',  name:'Growth Care',       desc:'+ SEO upkeep, 5 updates, GBP posts',  price: 9999 },
    { g:'Care plans', id:'care_crm',name:'CRM Care',          desc:'+ user support, bug fixes, 4 hrs/mo', price: 7499 },
    { g:'Care plans', id:'care_e',  name:'Elite Care',        desc:'+ 4-hour SLA, dedicated, quarterly',  price: 19999 },
    { g:'Marketing', id:'gbpm',  name:'GBP management',    desc:'Posts, review replies, photos',      price: 4999 },
    { g:'Marketing', id:'seo',   name:'Local SEO',         desc:'GBP, content, citations, reporting', price: 19999 },
    { g:'Marketing', id:'seog',  name:'SEO Growth',        desc:'25+ keywords, technical, content',   price: 29999 },
    { g:'Marketing', id:'adsm',  name:'Google Ads mgmt',   desc:'Campaigns, negatives, tracking',     price: 14999 },
    { g:'Marketing', id:'adsmm', name:'Google + Meta Ads', desc:'Both platforms, one report',         price: 24999 },
    { g:'Marketing', id:'social',name:'Social media',      desc:'12 posts + 4 reels',                 price: 19999 },
    { g:'Marketing', id:'email', name:'Email marketing',   desc:'Sequences, newsletters',             price: 9999 },
    { g:'Marketing', id:'full',  name:'Full Digital',      desc:'SEO + Ads + Social · saves 4,998',   price: 49999 },
    { g:'AI', id:'botrun', name:'AI bot running',          desc:'API usage, monitoring, tuning',      price: 2499 },
    { g:'AI', id:'voicerun', name:'Voice bot running',     desc:'Call minutes and monitoring',        price: 9999 }
  ];

  /* ---------- helpers ---------- */
  function inr(n) {
    return '₹' + n.toLocaleString('en-IN');
  }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- MOTION ENGINE ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. cursor glow
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    var cg = document.createElement('div');
    cg.className = 'cursor-glow';
    document.body.appendChild(cg);
    var cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.09; cy += (ty - cy) * 0.09;
      cg.style.left = cx + 'px'; cg.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
  }

  // 2. magnetic buttons
  if (!reduce) {
    $$('.btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var mx = e.clientX - r.left, my = e.clientY - r.top;
        b.style.setProperty('--bx', mx + 'px');
        b.style.setProperty('--by', my + 'px');
        b.style.transform = 'translate(' + ((mx - r.width / 2) * 0.06) + 'px,' +
                            ((my - r.height / 2) * 0.12 - 3) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  // 3. card 3D tilt
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    $$('.card,.pcard,.pcard-l,.tile').forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'perspective(900px) rotateY(' + (px * 5) + 'deg) rotateX(' +
                            (-py * 5) + 'deg) translateY(-5px)';
      });
      c.addEventListener('mouseleave', function () { c.style.transform = ''; });
    });
  }

  // 4. scroll parallax — rAF-throttled, transform only (no layout thrash)
  if (!reduce) {
    var orbs = $$('.bg i');
    var mock = $('.hero .mock');
    var ticking = false, lastY = 0;
    var paint = function () {
      var y = lastY;
      for (var i = 0; i < orbs.length; i++) {
        orbs[i].style.transform = 'translate3d(0,' + (y * (0.05 + i * 0.035)).toFixed(1) + 'px,0)';
      }
      if (mock && y < 900) mock.style.transform = 'translate3d(0,' + (56 - y * 0.06).toFixed(1) + 'px,0)';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      lastY = window.scrollY;
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
  }

  // 5. heading clip-reveal for section heads
  $$('.sec-head').forEach(function (h) { h.classList.add('reveal-h'); });


  /* ---------- ENQUIRY FORM: route to WhatsApp so no lead is lost ---------- */
  var enq = document.getElementById('enq');
  if (enq) {
    enq.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (n) { var el = enq.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var name = g('name'), phone = g('phone'), biz = g('business'),
          need = g('need'), msg = g('message');

      if (!name || !phone) {
        var warn = enq.querySelector('.enq-warn');
        if (!warn) {
          warn = document.createElement('p');
          warn.className = 'enq-warn';
          warn.style.cssText = 'color:#B4441B;font-size:.8rem;margin:8px 0 0';
          enq.appendChild(warn);
        }
        warn.textContent = 'Please add your name and WhatsApp number so we can reply.';
        return;
      }

      var now = new Date();
      var ref = 'PF-' + String(now.getDate()).padStart(2,'0') + String(now.getMonth()+1).padStart(2,'0') + '-' +
                String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0');
      var L = [];
      L.push('*NEW ENQUIRY — Pixel Forge Studio*');
      L.push('Ref: ' + ref);
      L.push('');
      L.push('*Name:* ' + name);
      if (biz) L.push('*Business:* ' + biz);
      L.push('*WhatsApp:* ' + phone);
      L.push('*Looking for:* ' + need);
      if (msg) { L.push(''); L.push('*Details:*'); L.push(msg); }
      L.push('');
      L.push('_Sent from contact form · ' + now.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) +
             ' ' + now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true}) + ' IST_');

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(L.join('\n'));
      window.open(url, '_blank');

      var ok = enq.querySelector('.enq-ok');
      if (!ok) {
        ok = document.createElement('p');
        ok.className = 'enq-ok';
        ok.style.cssText = 'color:var(--green-deep);font-size:.82rem;margin:10px 0 0;font-weight:500';
        enq.appendChild(ok);
      }
      ok.innerHTML = 'WhatsApp opened with your details. If it did not open, ' +
        '<a href="' + url + '" style="text-decoration:underline">tap here</a> or email ' +
        '<a href="mailto:hello@pixelforgestudio.com" style="text-decoration:underline">hello@pixelforgestudio.com</a>.';
    });
  }

  /* ---------- copy UPI ID ---------- */
  var cu = document.getElementById('copy-upi');
  if (cu) {
    cu.addEventListener('click', function () {
      var id = document.getElementById('upi-id');
      var txt = id ? id.textContent.trim() : '';
      var done = function () { cu.textContent = 'Copied'; setTimeout(function () { cu.textContent = 'Copy'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done).catch(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }

  /* ---------- exit-intent lead capture (once per session) ---------- */
  var xm = document.getElementById('xmodal');
  if (xm && !sessionStorage.getItem('pf_x')) {
    var showX = function () {
      if (sessionStorage.getItem('pf_x')) return;
      xm.classList.add('on');
      sessionStorage.setItem('pf_x', '1');
    };
    document.addEventListener('mouseout', function (e) {
      if (e.clientY <= 0 && !e.relatedTarget) showX();
    });
    var xc = document.getElementById('xclose'), xl = document.getElementById('xlater');
    if (xc) xc.addEventListener('click', function () { xm.classList.remove('on'); });
    if (xl) xl.addEventListener('click', function () { xm.classList.remove('on'); });
    xm.addEventListener('click', function (e) { if (e.target === xm) xm.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') xm.classList.remove('on'); });
  }


  /* ==================================================================
     HERO 3D ENGINE — rotating wireframe globe, orbiting rings, starfield
     Canvas 2D with manual 3D projection. No libraries.
     ================================================================== */
  (function () {
    var cv = document.getElementById('fx3d');
    if (!cv) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ctx = cv.getContext('2d', { alpha: true });
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, CX = 0, CY = 0, R = 0;
    var running = true, t = 0;

    /* ---- geometry ---- */
    var NODES = [], EDGES = [], STARS = [];
    var MOB = window.innerWidth < 820;
    var LAT = MOB ? 5 : 9, LON = MOB ? 8 : 14;

    function buildSphere() {
      NODES = [];
      for (var i = 0; i <= LAT; i++) {
        var phi = (i / LAT) * Math.PI;            // 0..PI
        for (var k = 0; k < LON; k++) {
          var th = (k / LON) * Math.PI * 2;
          NODES.push({
            x: Math.sin(phi) * Math.cos(th),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(th)
          });
        }
      }
      // connect each node to its 3 nearest — gives the mesh look
      EDGES = [];
      for (var a = 0; a < NODES.length; a++) {
        var best = [];
        for (var b = 0; b < NODES.length; b++) {
          if (a === b) continue;
          var dx = NODES[a].x - NODES[b].x, dy = NODES[a].y - NODES[b].y, dz = NODES[a].z - NODES[b].z;
          var d = dx * dx + dy * dy + dz * dz;
          if (d < 0.16) best.push(b);
        }
        best.slice(0, 3).forEach(function (b2) { if (b2 > a) EDGES.push([a, b2]); });
      }
    }

    function buildStars() {
      STARS = [];
      var n = Math.min(90, Math.round(W / 14));
      for (var i = 0; i < n; i++) {
        STARS.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .3,
                     a: Math.random() * .6 + .15, sp: Math.random() * .6 + .2, ph: Math.random() * 6.28 });
      }
    }

    function size() {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      CX = W * (W < 700 ? 0.5 : 0.34); CY = H * 0.5;
      R = Math.min(W, H) * (W < 700 ? 0.34 : 0.26);
      buildSphere(); buildStars();
    }

    function project(p, rotY, rotX) {
      // rotate around Y then X
      var cy = Math.cos(rotY), sy = Math.sin(rotY);
      var cx = Math.cos(rotX), sx = Math.sin(rotX);
      var x1 = p.x * cy - p.z * sy;
      var z1 = p.x * sy + p.z * cy;
      var y1 = p.y * cx - z1 * sx;
      var z2 = p.y * sx + z1 * cx;
      var persp = 1 / (2.6 - z2);          // depth scaling
      return {
        x: CX + x1 * R * persp * 2.6,
        y: CY + y1 * R * persp * 2.6,
        z: z2,
        s: persp
      };
    }

    function ring(radius, squash, tilt, spin, alpha, color) {
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(tilt);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * squash, 0, 0, 6.2832);
      ctx.strokeStyle = color.replace('ALPHA', alpha.toFixed(3));
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // travelling dot on the ring
      var ang = spin;
      var px = Math.cos(ang) * radius;
      var py = Math.sin(ang) * radius * squash;
      ctx.beginPath();
      ctx.arc(px, py, 2.6, 0, 6.2832);
      ctx.fillStyle = color.replace('ALPHA', '0.9');
      ctx.fill();
      ctx.restore();
    }

    var lastT = 0, MIN_MS = (window.innerWidth < 820) ? 33 : 16;
    function frame(ts) {
      if (!running) return;
      if (ts && ts - lastT < MIN_MS) { requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, W, H);

      var rotY = t * 0.0022;
      var rotX = Math.sin(t * 0.0006) * 0.42;

      /* starfield */
      for (var s = 0; s < STARS.length; s++) {
        var st = STARS[s];
        st.y -= st.sp * 0.25;
        if (st.y < -4) { st.y = H + 4; st.x = Math.random() * W; }
        var tw = 0.55 + Math.sin(t * 0.002 + st.ph) * 0.45;
        ctx.fillStyle = 'rgba(196,181,253,' + (st.a * tw).toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.2832); ctx.fill();
      }

      /* glowing core */
      var g = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 1.5);
      g.addColorStop(0, 'rgba(124,58,237,.55)');
      g.addColorStop(0.45, 'rgba(139,92,246,.22)');
      g.addColorStop(1, 'rgba(139,92,246,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(CX, CY, R * 1.5, 0, 6.2832); ctx.fill();

      /* projected nodes */
      var P = NODES.map(function (n) { return project(n, rotY, rotX); });

      /* mesh edges */
      for (var e = 0; e < EDGES.length; e++) {
        var A = P[EDGES[e][0]], B = P[EDGES[e][1]];
        var depth = (A.z + B.z) * 0.5;              // -1..1
        if (depth < -0.15) continue;                 // hide back faces
        var o = Math.max(0.06, (depth + 1) * 0.38);
        ctx.strokeStyle = 'rgba(0,242,254,' + o.toFixed(3) + ')';
        ctx.lineWidth = 1.15;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
      }

      /* nodes */
      for (var i2 = 0; i2 < P.length; i2++) {
        var q = P[i2];
        if (q.z < -0.2) continue;
        var r = Math.max(0.7, 1.9 * q.s * 2.2);
        ctx.fillStyle = q.z > 0.55 ? 'rgba(255,138,61,.95)' : 'rgba(167,139,250,.8)';
        ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, 6.2832); ctx.fill();
        if (q.z > 0.7) {
          ctx.beginPath(); ctx.arc(q.x, q.y, r * 3.4, 0, 6.2832);
          ctx.strokeStyle = 'rgba(255,138,61,.16)'; ctx.stroke();
        }
      }

      /* orbiting rings */
      ring(R * 1.72, 0.30, 0.32, t * 0.0016, 0.22, 'rgba(255,45,149,ALPHA)');
      ring(R * 2.02, 0.24, -0.52, -t * 0.0011, 0.16, 'rgba(0,242,254,ALPHA)');
      ring(R * 1.42, 0.42, 0.92, t * 0.0021, 0.13, 'rgba(167,139,250,ALPHA)');

      t += 16;
      lastT = performance.now();
      requestAnimationFrame(frame);
    }

    window.addEventListener('resize', size, { passive: true });
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(frame);
    });

    /* pause the canvas entirely once the hero leaves the viewport */
    var heroEl = document.querySelector('.hero') || document.querySelector('header');
    if (heroEl && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        var vis = es[0].isIntersecting;
        if (vis && !running) { running = true; requestAnimationFrame(frame); }
        else if (!vis) { running = false; }
      }, { threshold: 0 }).observe(heroEl);
    }

    size();
    if (reduce) { frame(); running = false; }
    else requestAnimationFrame(frame);
  })();


  /* ---------- gallery scroll reveal (IntersectionObserver, zero cost) ---------- */
  (function () {
    var items = document.querySelectorAll('.galitem');
    if (!items.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e, idx) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.classList.add('in'); }, idx * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();


  /* ---------- PAY NOW flow ---------- */
  (function () {
    var pm = document.getElementById('pmodal');
    if (!pm) return;
    var s1 = document.getElementById('pstep1'), s2 = document.getElementById('pstep2'),
        form = document.getElementById('pform'), err = document.getElementById('perr'),
        sumEl = document.getElementById('psummary'), amtEl = document.getElementById('pamount'),
        upLink = document.getElementById('puplink'), confirmBtn = document.getElementById('pconfirm');
    var order = { label: '', oneTime: 0, monthly: 0 };

    function money(n) { return '\u20b9' + Number(n).toLocaleString('en-IN'); }
    function openModal() {
      var lines = [], one = 0, mo = 0;
      var nodes = document.querySelectorAll('#sum-lines .sum-line');
      for (var i = 0; i < nodes.length; i++) {
        var t = nodes[i].querySelector('span'), b = nodes[i].querySelector('b');
        if (t && b) lines.push(t.textContent + ' \u2014 ' + b.textContent);
      }
      var tot = document.getElementById('sum-total');
      var mEl = document.getElementById('sum-monthly');
      one = tot ? (parseInt(tot.textContent.replace(/[^0-9]/g, ''), 10) || 0) : 0;
      mo = (mEl && mEl.textContent !== '\u2014') ? (parseInt(mEl.textContent.replace(/[^0-9]/g, ''), 10) || 0) : 0;
      order.oneTime = one; order.monthly = mo;
      order.label = lines.join(' | ') || 'Custom build';
      if (sumEl) sumEl.innerHTML = lines.length
        ? lines.join('<br>') + (mo ? '<br><b style="color:#C4B5FD">Monthly: ' + money(mo) + '</b>' : '')
        : 'Pick your options above \u2014 or just tell us and we will quote it.';
      if (amtEl) amtEl.textContent = one ? money(one) : 'On quote';
      pm.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() { pm.classList.remove('on'); document.body.style.overflow = ''; }

    var triggers = document.querySelectorAll('[data-pay]');
    for (var k = 0; k < triggers.length; k++) {
      triggers[k].addEventListener('click', function (e) { e.preventDefault(); openModal(); });
    }
    var pc = document.getElementById('pclose');
    if (pc) pc.addEventListener('click', closeModal);
    pm.addEventListener('click', function (e) { if (e.target === pm) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var need = ['pname', 'pphone', 'pbiz', 'ptype', 'pcity'];
      for (var i = 0; i < need.length; i++) {
        if (!g(need[i])) { if (err) err.textContent = 'Please fill the required fields marked *'; return; }
      }
      if (!/^[0-9]{10}$/.test(g('pphone').replace(/\D/g, ''))) {
        if (err) err.textContent = 'Mobile number should be 10 digits.'; return;
      }
      if (err) err.textContent = '';
      if (s1) s1.style.display = 'none';
      if (s2) s2.style.display = 'block';

      var upi = 'upi://pay?pa=9620024812@airtel&pn=Pixel%20Forge%20Studio&cu=INR' +
                (order.oneTime ? '&am=' + order.oneTime : '');
      if (upLink) upLink.href = upi;

      var now = new Date();
      var ref = 'PF-' + String(now.getDate()).padStart(2, '0') + String(now.getMonth() + 1).padStart(2, '0') + '-' +
                String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
      var L = [];
      L.push('*NEW PAID ORDER \u2014 Pixel Forge Studio*');
      L.push('Ref: ' + ref);
      L.push('');
      L.push('*CUSTOMER*');
      L.push('Name: ' + g('pname'));
      L.push('Business: ' + g('pbiz') + ' (' + g('ptype') + ')');
      L.push('City: ' + g('pcity'));
      L.push('Mobile: ' + g('pphone'));
      if (g('pemail')) L.push('Email: ' + g('pemail'));
      if (g('pgst')) L.push('GST: ' + g('pgst'));
      if (g('pnote')) L.push('Note: ' + g('pnote'));
      L.push('');
      L.push('*ORDER*');
      L.push(order.label);
      L.push('One-time: ' + (order.oneTime ? money(order.oneTime) : 'on quote'));
      if (order.monthly) L.push('Monthly: ' + money(order.monthly) + '/mo');
      L.push('');
      L.push('_Payment initiated via UPI on ' + now.toLocaleString('en-IN') + '_');
      L.push('_Please verify against the UPI statement and issue the invoice._');
      if (confirmBtn) confirmBtn.href = 'https://wa.me/919620024812?text=' + encodeURIComponent(L.join('\n'));
    });

    var c2 = document.getElementById('copy-upi2');
    if (c2) c2.addEventListener('click', function () {
      var t = document.getElementById('upi2');
      if (t && navigator.clipboard) navigator.clipboard.writeText(t.textContent.trim());
      c2.textContent = 'Copied'; setTimeout(function () { c2.textContent = 'Copy'; }, 1600);
    });
  })();


  /* ---------- scroll progress + spotlight ---------- */
  (function () {
    var bar = document.createElement('div');
    bar.id = 'pbar';
    document.body.appendChild(bar);
    var raf = false;
    function upd() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      raf = false;
    }
    addEventListener('scroll', function () {
      if (!raf) { raf = true; requestAnimationFrame(upd); }
    }, { passive: true });
    upd();

    if (matchMedia('(hover:hover) and (min-width:1024px)').matches) {
      var rafP = false, lastEv = null;
      document.addEventListener('pointermove', function (e) {
        lastEv = e;
        if (rafP) return;
        rafP = true;
        requestAnimationFrame(function () {
          rafP = false;
          if (!lastEv) return;
          var el = lastEv.target.closest('.bcard');
          if (!el) return;
          var r = el.getBoundingClientRect();
          el.style.setProperty('--mx', (lastEv.clientX - r.left) + 'px');
          el.style.setProperty('--my', (lastEv.clientY - r.top) + 'px');
        });
      }, { passive: true });
    }
  })();

  /* ---------- PWA service worker ---------- */
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* silent */ });
    });
  }

  /* ---------- theme dock (only with ?themes=1) ---------- */
  if (window.location.search.indexOf('themes') > -1) {
    var dock = document.getElementById('themedock');
    if (dock) {
      dock.classList.add('on');
      var cur = localStorage.getItem('pf-theme') || 'ember';
      document.documentElement.setAttribute('data-theme', cur);
      Array.prototype.forEach.call(dock.querySelectorAll('button'), function (btn) {
        btn.classList.toggle('cur', btn.getAttribute('data-t') === cur);
        btn.addEventListener('click', function () {
          var th = btn.getAttribute('data-t');
          document.documentElement.setAttribute('data-theme', th);
          localStorage.setItem('pf-theme', th);
          Array.prototype.forEach.call(dock.querySelectorAll('button'), function (b2) {
            b2.classList.toggle('cur', b2 === btn);
          });
        });
      });
    }
  }

  /* ---------- nav scroll ---------- */
  var nav = $('header.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  var burger = $('#burger');
  if (burger) {
    var panel = document.createElement('div');
    panel.className = 'mnav';
    var links = $$('nav.links a');
    panel.innerHTML = links.map(function (a) {
      return '<a href="' + a.getAttribute('href') + '">' + a.textContent + '</a>';
    }).join('') + '<a class="btn btn-primary btn-block" href="contact.html">Get a free mockup</a>';
    document.body.appendChild(panel);
    burger.addEventListener('click', function () {
      panel.classList.toggle('open');
      burger.classList.toggle('on');
    });
    $$('a', panel).forEach(function (a) {
      a.addEventListener('click', function () { panel.classList.remove('open'); });
    });
  }

  /* ---------- hero entrance (staggered) ---------- */
  var heroEnter = function () {
    var words = $$('.hero-title .w');
    words.forEach(function (w, i) {
      setTimeout(function () { w.classList.add('in'); }, 90 + i * 85);
    });
    var gw = $('.grad-wrap');
    if (gw) setTimeout(function () { gw.classList.add('in'); }, 90 + words.length * 85 + 60);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(heroEnter, 40); });
  } else { setTimeout(heroEnter, 40); }

  /* ---------- reveal on scroll ---------- */
  var rvEls = $$('.rv');
  if (STILL) { rvEls.forEach(function (el) { el.classList.add('in'); }); }
  if (!STILL && 'IntersectionObserver' in window && rvEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var d = e.target.getAttribute('data-d') || 0;
          setTimeout(function () { e.target.classList.add('in'); }, Number(d));
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rvEls.forEach(function (el) { io.observe(el); });
  } else {
    rvEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- safety net: never leave content invisible ---------- */
  setTimeout(function () {
    document.documentElement.classList.add('safetyNet');
    $$('.rv').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.2) el.classList.add('in');
    });
  }, 2200);

  /* ---------- counters ---------- */
  var counters = $$('[data-count]');
  if (STILL) {
    counters.forEach(function (el) {
      var txt = el.getAttribute('data-text');
      if (txt) { el.textContent = txt; return; }
      var v = el.getAttribute('data-count');
      var suf = el.getAttribute('data-suffix') || '';
      var pre = el.getAttribute('data-prefix') || '';
      var dec = el.getAttribute('data-dec') ? Number(el.getAttribute('data-dec')) : 0;
      var n = parseFloat(v);
      el.textContent = pre + (dec ? n.toFixed(dec) : Math.round(n).toLocaleString('en-IN')) + suf;
    });
  }
  if (!STILL && counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var txt = el.getAttribute('data-text');
        if (txt) { el.textContent = txt; cio.unobserve(el); return; }
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var dec = el.getAttribute('data-dec') ? Number(el.getAttribute('data-dec')) : 0;
        el.textContent = '0';
        var t0 = null, dur = 1400;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = prefix + (dec ? val.toFixed(dec) : Math.round(val).toLocaleString('en-IN')) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- card mouse glow ---------- */
  $$('.card').forEach(function (card) {
    card.addEventListener('mousemove', function (ev) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
      card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
    });
  });

  /* ---------- FAQ ---------- */
  $$('.faq-item').forEach(function (item) {
    var q = $('.faq-q', item);
    var a = $('.faq-a', item);
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      $$('.faq-item').forEach(function (o) {
        o.classList.remove('open');
        var oa = $('.faq-a', o); if (oa) oa.style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- CONFIGURATOR ---------- */
  var cfg = $('#cfg');
  if (cfg) {
    var state = { core: 'website', cores: [], tier: '', addons: {}, monthly: {} };

    // build add-on lists
    var addonBox = $('#cfg-addons');
    var monthlyBox = $('#cfg-monthly');
    function grouped(list, attr, suffix) {
      var out = '', lastG = '';
      list.forEach(function (a) {
        if (a.g && a.g !== lastG) {
          out += '<div class="opt-group">' + a.g + '</div>';
          lastG = a.g;
        }
        out += '<label class="opt cb" data-' + attr + '="' + a.id + '">' +
          '<input type="checkbox" value="' + a.id + '">' +
          '<span class="opt-body"><span class="opt-t">' + a.name + '</span>' +
          '<span class="opt-d">' + a.desc + '</span></span>' +
          '<span class="opt-p">' + inr(a.price) + (suffix || '') + '</span></label>';
      });
      return out;
    }
    if (addonBox) addonBox.innerHTML = grouped(ADDONS, 'addon', '');
    if (monthlyBox) monthlyBox.innerHTML = grouped(MONTHLY, 'monthly', '/mo');

    function render() {
      // selection styling
      $$('#cfg-core .opt').forEach(function (o) {
        var inp = $('input', o);
        o.classList.toggle('sel', inp && inp.checked);
      });
      $$('#cfg-tier .opt').forEach(function (o) {
        var inp = $('input', o);
        o.classList.toggle('sel', inp && inp.checked);
      });

      var lines = [];
      var oneTime = 0;

      var CORE_LABEL2 = {
        'launchpad':'Launchpad — Starters', 'website':'Website — Traditional', 'website-ai':'Website — Empire + AI',
        'crm':'CRM — Traditional', 'crm-ai':'CRM — Empire + AI',
        'app':'App — Traditional', 'app-ai':'App — Empire + AI'
      };
      var picked = (state.cores && state.cores.length) ? state.cores : (state.core ? [state.core] : []);
      var corePrice = 0;
      picked.forEach(function (c) {
        var p = (TIERS[c] && TIERS[c].base) || 0;
        lines.push({ t: CORE_LABEL2[c] || c, p: p });
        oneTime += p; corePrice += p;
      });
      // bundle discount: 2+ cores = 12% off the core total
      if (picked.length >= 2) {
        var disc = Math.round(corePrice * 0.12);
        lines.push({ t: 'Bundle discount (2+ cores, 12%)', p: -disc });
        oneTime -= disc;
      }

      ADDONS.forEach(function (a) {
        if (state.addons[a.id]) {
          lines.push({ t: a.name, p: a.price });
          oneTime += a.price;
        }
      });

      var monthlyTotal = 0;
      MONTHLY.forEach(function (a) {
        if (state.monthly[a.id]) monthlyTotal += a.price;
      });

      // bundle saving: 2 cores would be 12% — show as a hint only on core step
      var sum = $('#sum-lines');
      if (sum) {
        sum.innerHTML = lines.map(function (l) {
          return '<div class="sum-line"><span>' + l.t + '</span><b>' + inr(l.p) + '</b></div>';
        }).join('') || '<div class="sum-empty">Pick a package to begin.</div>';
      }
      var tot = $('#sum-total');
      if (tot) tot.textContent = inr(oneTime);
      var mo = $('#sum-monthly');
      if (mo) {
        mo.textContent = monthlyTotal ? inr(monthlyTotal) + '/mo' : '—';
        mo.style.display = monthlyTotal ? 'block' : 'none';
      }
      var moRow = $('#sum-monthly-row');
      if (moRow) moRow.style.display = monthlyTotal ? 'flex' : 'none';

      // ---------- full lead message ----------
      var now = new Date();
      var ref = 'PF-' + String(now.getDate()).padStart(2,'0') + String(now.getMonth()+1).padStart(2,'0') + '-' +
                String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0');
      var stamp = now.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) + ', ' +
                  now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true}) + ' IST';

      var TIER_NOTE = {
        website:{launchpad:'5 pages, mobile-first, SEO basics, WhatsApp',growth:'Adds AI assistant, PWA, Google Business, 2 socials',conquerer:'10 pages, all 8 listings, reviews pack, analytics, reporting',empire:'Custom Next.js build, everything included, 6 months care'},
        crm:{launchpad:'Pipeline, contacts, quotes, AI bot, 5 users',growth:'Adds GST invoices, dashboards, mobile PWA',conquerer:'Adds WhatsApp API, presence bundle, email + SMS',empire:'Custom build, multi-role, ERP integration, SLA'},
        app:{launchpad:'Android, login, payments, push, AI',growth:'Both stores, richer UI, analytics',conquerer:'Both stores, admin panel, presence bundle',empire:'Platform build, real-time, multi-role, SLA'}
      };

      var L = [];
      L.push('*NEW ENQUIRY — Pixel Forge Studio*');
      L.push('Ref: ' + ref);
      L.push('');
      L.push('*WHAT THEY WANT*');
      picked.forEach(function (c) {
        L.push('• ' + (CORE_LABEL2[c] || c) + '  (' + inr((TIERS[c] && TIERS[c].base) || 0) + ')');
      });

      var chosen = ADDONS.filter(function (a) { return state.addons[a.id]; });
      if (chosen.length) {
        L.push('');
        L.push('*ADD-ONS*');
        chosen.forEach(function (a) { L.push('• ' + a.name + ' — ' + inr(a.price)); });
      }

      var chosenM = MONTHLY.filter(function (a) { return state.monthly[a.id]; });
      if (chosenM.length) {
        L.push('');
        L.push('*MONTHLY*');
        chosenM.forEach(function (a) { L.push('• ' + a.name + ' — ' + inr(a.price) + '/mo'); });
      }

      var gst = Math.round(oneTime * 0.18);
      L.push('');
      L.push('*TOTALS*');
      L.push('One-time: ' + inr(oneTime));
      if (monthlyTotal) L.push('Monthly: ' + inr(monthlyTotal) + '/mo');
      L.push('GST 18%: ' + inr(gst));
      L.push('*Grand total: ' + inr(oneTime + gst) + '*');

      L.push('');
      L.push('*TIMELINE*');
      L.push('Design preview in 48 hours · Live in 7 days from content');

      L.push('');
      L.push('_Sent from ' + (location.pathname.split('/').pop() || 'index.html') + ' · ' + stamp + '_');

      var msg = L.join('\n');

      var send = $('#sum-send');
      if (send) {
        send.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
        send.setAttribute('data-msg', msg);
      }
    }

    $$('#cfg-core .opt input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        if (!state.cores) state.cores = [];
        if (inp.checked) {
          if (state.cores.indexOf(inp.value) === -1) state.cores.push(inp.value);
        } else {
          state.cores = state.cores.filter(function (c) { return c !== inp.value; });
        }
        state.core = state.cores[0] || '';
        render();
      });
    });
    $$('#cfg-tier .opt input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        state.tier = inp.value;
        render();
      });
    });
    if (addonBox) {
      $$('input', addonBox).forEach(function (inp) {
        inp.addEventListener('change', function () {
          state.addons[inp.value] = inp.checked;
          render();
        });
      });
    }
    if (monthlyBox) {
      $$('input', monthlyBox).forEach(function (inp) {
        inp.addEventListener('change', function () {
          state.monthly[inp.value] = inp.checked;
          render();
        });
      });
    }

    render();
  }

  /* ======================================================================
     ASTRA — conversational assistant
     Knows the packages, policies, process and site map.
     Qualifies, recommends, handles objections, hands off to WhatsApp.
     ====================================================================== */
  var botBtn = $('#botbtn');
  if (botBtn) {
    var botPanel = $('#botpanel'), botLog = $('#botlog'),
        botForm = $('#botform'), botInput = $('#botinput');

    /* ---------- knowledge ---------- */
    var PKG = {
      launchpad: { name:'Launchpad', price:'₹9,999', note:'one-page PWA, Google Business, Bing, WhatsApp link. Live in 5 days.' },
      growth:    { name:'Growth', price:'₹1,49,999', note:'multi-page site + CRM + Android app + Meta AI agent. Saves ₹34,998 versus buying separately.' },
      empire:    { name:'Empire', price:'₹4,99,999', note:'custom Next.js build, multi-role CRM, native app, API integration, 90-day support.' }
    };

    var KB = [
      { t:'service services offer provide do you do what all general everything list scope',
        a:'Everything under one roof: websites, business CRMs, Android apps and PWAs, AI assistants, Google Business Profile, local SEO, Google and Meta ads, WhatsApp Business API, and the eight major directory listings. Website, CRM and app can be bought separately or as one stack. Which of those is closest to what you need?' },
      { t:'price cost pricing rate charge budget expensive how much rates package',
        a:'Three ways in. <b>Launchpad ₹9,999</b> — one page, Google Business, WhatsApp, live in 5 days. <b>Traditional Build</b> — website ₹19,999, CRM ₹49,999, app ₹39,999, or combos at ₹64,999 and ₹99,999, no AI. <b>Empire Build</b> — the same with a 24/7 AI assistant: ₹34,999, ₹74,999, ₹64,999, and combos at ₹99,999 and ₹1,49,999. What kind of business is it?' },
      { t:'website web page site design build frontend',
        a:'Websites run ₹9,999 for a one-pager, ₹19,999–₹49,999 for a proper business site, ₹89,999 for a custom build. Hand-coded, static-first, 95+ Lighthouse, under two seconds on a mid-range phone. What does your business do?' },
      { t:'crm lead pipeline customer manage track followup invoice gst quotation',
        a:'A CRM is where every enquiry lands so none get lost — leads, pipeline stages, quotes, GST invoices and follow-up reminders in one place. Ours is included inside the Growth Engine rather than billed separately. Are you tracking leads in a notebook or a spreadsheet today?' },
      { t:'app android ios mobile play store pwa install',
        a:'Android apps start at ₹89,999, both stores ₹1,39,999. The Growth Engine includes an Android PWA — installable to the home screen, works offline, no Play Store approval or 30% cut. Do you need native features like camera or push notifications?' },
      { t:'time long fast quick delivery timeline launch days week deadline',
        a:'Seven days from the moment we have your content and photos. You see a real homepage design in 48 hours before paying anything. If we miss the date because of us, the project fee is refunded. What is your deadline?' },
      { t:'free mockup sample demo preview concept trial see first',
        a:'We design a real homepage for your business — free, within 48 hours, no card. One concept, one revision. If you do not like it you keep it and we part as friends. Want me to start one?' },
      { t:'own ownership code files source domain hosting account mine rights handover',
        a:'Your domain, Google and Meta accounts, analytics and every customer record are registered in your name from day one. The platform itself is built and managed by us — that is why it keeps getting updated and never breaks. If you ever leave, your domain and data export with you. Prices start at ₹9,999 for Launchpad and run to ₹1,49,999 for the full Website + CRM + App + AI build.' },
      { t:'hidden cost extra charge surprise fee gst tax monthly recurring',
        a:'No hidden costs. Every price includes design, deployment, SSL and three months of care. Prices exclude 18% GST, stated openly. There is no monthly platform fee — you pay for the build once and own it.' },
      { t:'ai bot assistant chatbot automation agent astra artificial intelligence',
        a:'Every build from Professional upward includes an AI assistant trained on your business — services, prices, timings, policies. It answers at 11pm, captures the number, and hands off to you on WhatsApp when it is unsure. That is what I am, on this site.' },
      { t:'whatsapp business api verified meta catalogue broadcast',
        a:'WhatsApp Business setup ₹4,999 · Business API ₹14,999 · WhatsApp AI bot ₹34,999. We can also set up your catalogue, quick replies and broadcast lists.' },
      { t:'google business profile gmb maps listing local search',
        a:'Google Business Profile setup is ₹4,999 — claim, verification, categories, photos, hours. It is the single highest-return thing most local businesses skip.' },
      { t:'justdial indiamart sulekha directory listing yellow pages',
        a:'Justdial ₹2,999 · IndiaMART ₹4,999 · Sulekha ₹2,499. All eight listings together with WhatsApp and Google is ₹24,999 as the Complete Online Profile.' },
      { t:'seo search ranking google rank keyword organic traffic',
        a:'Local SEO ₹19,999 a month, SEO Growth ₹29,999 a month. Both include conversion tracking so you can see which enquiries actually became customers, not just traffic.' },
      { t:'ads advertising ppc google ads meta facebook instagram campaign paid',
        a:'Google Ads setup ₹4,999, management ₹14,999 a month. Google plus Meta together ₹24,999 a month. Bing ₹2,999 — almost nobody in Bangalore offers that, and it is cheap reach.' },
      { t:'payment pay instalment emi split advance deposit upi refund money',
        a:'50% to start, 50% on launch. Stacks and apps are split across milestones. Deposits go to our Airtel merchant UPI — the QR is in the payments section. We never ask for your PIN, OTP or card details.' },
      { t:'guarantee refund late delay promise warranty assurance',
        a:'For a single website or CRM: live by the agreed date or the fee is refunded. For apps and stacks it is milestone-based — miss one by more than seven days and that milestone is waived.' },
      { t:'care maintenance support after launch ongoing help fix bug',
        a:'Three months of care is included free on every project — uptime, backups, security, updates and small fixes. After that it continues from ₹2,499 a month, only if you want it. No auto-renewal, no lock-in.' },
      { t:'kannada language local regional english hindi tamil',
        a:'We build in Kannada as well as English — content and the AI assistant. For most Bangalore businesses that matters more than people expect.' },
      { t:'portfolio work example case study proof client reviews redapple demo',
        a:'Our live case study is Red Apple Mobile Repair in Indiranagar — 4.9 stars, 767 reviews, website and Google Ads with full tracking, live in seven days. Open their real site at <b>redmobilerepair.in</b> — it is not a screenshot.' },
      { t:'about who founder company studio registered trust udyam msme government',
        a:'Pixel Forge Studio is a Bengaluru studio registered with the Ministry of MSME — Udyam UDYAM-KA-03-0460058, verifiable on the government portal. Trading since October 2023.' },
      { t:'address office location where based bengaluru bangalore remote india city',
        a:'We work remotely with clients across India. In Bengaluru we also do in-person consulting — at your office or your home, whichever you prefer, by appointment. Which city are you in?' },
      { t:'contact call phone talk human speak person whatsapp reach',
        a:'Tap the green WhatsApp button and our team replies — usually within five minutes during business hours, 10am to 7pm IST, Monday to Saturday.' },
      { t:'stack bundle all three deal discount save combo',
        a:'Growth ₹1,49,999, Conquerer ₹2,24,999 and Empire ₹4,99,999 each bundle website, CRM and app together — 19–37% cheaper than buying them separately. Launchpad ₹9,999 is the single-page entry product.' },
      { t:'entry starter small first basic minimum cheap budget low',
        a:'Launchpad at ₹9,999 — one page, Google Business Profile, Bing and WhatsApp setup, live in five days. It deliberately excludes the AI assistant and code handover; those start at Growth (₹1,49,999). Bought separately the Launchpad is worth ₹19,997.' },
      { t:'hosting server speed performance fast lighthouse load',
        a:'Sites are built static-first and score 95+ on Lighthouse, loading under two seconds on a mid-range phone. Speed is part of the build, not an upgrade you pay for later.' },
      { t:'competitor other agency compare difference why you alternative better',
        a:'Agencies charge ₹60,000 to ₹2,50,000 plus monthly retainers. Freelancers vanish. We publish our prices, show the design first, include the AI and CRM instead of billing them separately, and hand over everything in seven days. The comparison table on this page has the full picture.' },
      { t:'process how work steps start begin kickoff on board',
        a:'Five steps: free homepage concept in 48 hours → agree scope and price in writing → we build → two rounds of review → handover with every file and key. You are involved at step one and step four; we handle the rest.' },
      { t:'need from me content photos logo requirements prepare',
        a:'Your business name, services with prices, photos if you have them, and your logo. No logo? We use a clean wordmark. No photos? We source licensed images for your category. Content is usually the slowest part — send it early and seven days holds.' },
      { t:'revision change edit rounds feedback',
        a:'Two rounds of changes are included on every build. In practice most projects use one. Additional rounds are ₹2,999 each, but we have never charged a client for a third.' },
      { t:'redesign existing old site migrate move shift',
        a:'Yes. We rebuild on your existing domain and keep your rankings — 301 redirects, sitemap resubmission, and Search Console monitoring for the first 30 days. Redesigns start at ₹29,999.' },
      { t:'domain name buy purchase register url',
        a:'We register it in your name and hand over the registrar login. Typical cost ₹800–₹1,200 a year, paid directly by you — no markup from us.' },
      { t:'contract agreement terms legal lock in commitment',
        a:'One-page scope document: what is being built, the price, the date, what happens if either side is late. No long contract, no lock-in clause, no exclusivity.' },
      { t:'social media instagram facebook page post content branding logo',
        a:'Social media management is ₹14,999 a month. Logo and brand identity start at ₹9,999. Both are add-ons — they are not required to buy a website.' },
      { t:'invoice gst bill tax receipt company',
        a:'We issue a GST-compliant invoice for every payment. Our Udyam registration is on the footer if your accounts team needs to verify us.' },
      { t:'why choose should trust best quality price turnaround',
        a:'Best quality, best price and best turnaround in the market — that is the claim, and here is why it holds: hand-coded rather than templated, published prices with no monthly fee, AI and CRM included instead of billed separately, and a seven-day date we refund if we miss. Compare that line by line with any Bengaluru quote.' },
      { t:'team how many people staff size small big',
        a:'A small, senior team — you deal with the people doing the work, not an account manager relaying messages. That is why seven days is possible.' },
      { t:'slow bad website lose customer why important',
        a:'A slow or invisible site costs you customers every day: 53% of mobile visitors leave after three seconds, and most local buying decisions start with a Google search. If you are not there, a competitor is.' },
      { t:'meaning what is explain definition purpose benefit why need',
        a:'Ask me <b>what is</b> anything we offer and I will explain what it means, what it is for, and what it earns you. Try "what is a PWA", "what is GMB", "what is local SEO", "what is a CRM" or "what is Bing listing".' },
      { t:'gmb google business profile map pack meaning what is purpose benefit',
        a:'<b>Google Business Profile (GMB)</b> is the free listing that appears when someone searches "mobile repair near me" — the map result with photos, hours, reviews and a call button. <b>Purpose:</b> get found at the exact moment someone nearby is ready to buy. <b>Benefit:</b> it is the highest-return free asset a local business has; most enquiries come from it before your website is even opened. ₹4,999 to set up properly — claim, verify, categories, photos, hours.' },
      { t:'crm meaning what is purpose benefit explain',
        a:'<b>CRM</b> means Customer Relationship Management — one place where every enquiry lands so none get lost. <b>Purpose:</b> track who enquired, what they wanted, what you quoted, and when to follow up. <b>Benefit:</b> most small businesses lose 30–40% of leads simply by not following up. A CRM turns a messy notebook into a pipeline you can see. Ours includes quotes, GST invoices and reminders, and it comes inside the Growth Engine rather than as a paid extra.' },
      { t:'pwa meaning what is progressive web app purpose benefit explain',
        a:'<b>PWA</b> means Progressive Web App — a website that installs to the phone home screen like an app, works offline, and sends notifications. <b>Purpose:</b> give customers an app experience without Play Store approval, downloads or the 30% store cut. <b>Benefit:</b> loads in under two seconds, appears as an icon next to their other apps, and costs a fraction of a native app. Included in the Growth Engine.' },
      { t:'seo meaning what is local seo purpose benefit explain',
        a:'<b>Local SEO</b> is making your business appear when people nearby search for what you sell. <b>Purpose:</b> rank in the map pack and organic results for your area and category. <b>Benefit:</b> these are the highest-intent enquiries that exist — someone searching "dental clinic Indiranagar" is ready to book. ₹19,999 a month including posts, content, citations and tracking.' },
      { t:'bing listing webmaster meaning what is purpose benefit',
        a:'<b>Bing</b> is Microsoft\'s search engine — smaller than Google, but almost no Bengaluru agency submits clients to it. <b>Purpose:</b> free extra visibility, plus Bing feeds some desktop and Windows search results. <b>Benefit:</b> low competition for the same keywords, and it costs ₹2,999 as an add-on or is included in the Launchpad. A genuine edge nobody else offers.' },
      { t:'listing directory justdial indiamart sulekha meaning purpose benefit',
        a:'<b>Directory listings</b> are business profiles on Justdial, IndiaMART, Sulekha and similar — where people still search by category and city. <b>Purpose:</b> be present where buyers compare suppliers, especially in B2B and wholesale. <b>Benefit:</b> they rank on Google themselves, so your listing can outrank your own website for some searches. All eight together is ₹24,999 as the Complete Online Profile.' },
      { t:'ads google meta facebook instagram meaning purpose benefit explain',
        a:'<b>Paid ads</b> put your business in front of people searching or scrolling, immediately. <b>Google Ads</b> catches active intent — someone typing what you sell. <b>Meta ads</b> create demand — reaching people who did not know they needed you. <b>Benefit:</b> results in days not months, and with conversion tracking you see the exact cost per enquiry. Setup ₹4,999, management ₹14,999 a month.' },
      { t:'whatsapp business api meaning purpose benefit explain',
        a:'<b>WhatsApp Business API</b> is the official version of WhatsApp for companies — verified name, blue tick eligibility, automated replies, catalogues and broadcast lists. <b>Purpose:</b> handle enquiries at scale without a personal phone. <b>Benefit:</b> Indian customers reply on WhatsApp far more than email — typically 3–5× the response rate. ₹14,999 to set up, ₹34,999 with an AI bot answering.' },
      { t:'stack meaning what is bundle purpose benefit',
        a:'A <b>stack</b> is website, CRM and app built together as one system instead of three separate projects. <b>Purpose:</b> one design language, one team, one invoice, one launch date. <b>Benefit:</b> roughly 19–37% cheaper than buying them separately, and they actually talk to each other — a form enquiry appears in the CRM, the app reads the same data. Startup ₹1,49,999, Elite ₹4,99,999.' },
      { t:'care plan meaning what is support purpose benefit',
        a:'<b>Care</b> is the ongoing upkeep after launch — uptime monitoring, backups, security patches, updates and small content changes. <b>Purpose:</b> a website is not a one-time object; it needs watching. <b>Benefit:</b> three months are included free on every project, then from ₹2,499 a month only if you want it. No auto-renewal, no lock-in.' },
      { t:'turnaround seven days guarantee meaning how possible',
        a:'<b>Seven days</b> is possible because the design system, deployment pipeline and testing are already built — we are assembling proven parts, not inventing them. <b>Purpose:</b> get you earning sooner. <b>Benefit:</b> most agencies take 3–6 weeks. If we miss the date because of us, the project fee is refunded.' },
      { t:'traditional without ai difference elite with ai support comparison which',
        a:'The difference is the tier. Launchpad ₹9,999 has no AI and no code handover. Growth ₹1,49,999 upward adds a 24/7 AI assistant trained on your business that answers customers, captures numbers and books appointments — plus full code handover. If enquiries arrive outside business hours, the AI tiers pay for themselves.' },
      { t:'standalone combo website crm app options how many buy',
        a:'Two ways to buy. <b>Full packages:</b> Launchpad ₹9,999 · Growth ₹1,49,999 · Conquerer ₹2,24,999 · Empire ₹4,99,999. <b>Single modules:</b> Website ₹19,999 (₹34,999 with AI) · CRM ₹49,999 (₹74,999 with AI) · App ₹39,999 (₹64,999 with AI) · Website+CRM ₹64,999 (₹99,999 with AI) · all three ₹99,999 (₹1,49,999 with AI).' },
      { t:'pay now payment online buy order checkout deposit',
        a:'Two ways to start: tap WhatsApp and we build the quote with you, or tap <b>Pay now</b> under the configurator — fill five details, then pay the deposit by UPI. Either way you get a reference number and a written scope before any work begins.' },
      { t:'faq questions common doubts why not cheaper how long really guarantee proof',
        a:'The three questions we get most: <b>1.</b> Why is a ₹9,999 site different from a ₹49,999 one? Because one is a page, the other is a system with a CRM, app and AI. <b>2.</b> Will it really be done in 7 days? Yes — from the moment we have your content. <b>3.</b> What if I do not like it? You see a free homepage concept before paying anything, and if we miss the agreed date the fee is refunded.' },
      { t:'navigate sections page where find scroll go show',
        a:'The page reads top to bottom: what we build, who we build for, our work, then packages, single modules, add-ons, payment and contact. You can also ask me to show you a section — try "show packages" or "show payment".' },
      { t:'help support problem issue complain not working broken',
        a:'If something is not working on your site, message us on WhatsApp with a screenshot — care clients get priority. Basic care is ₹2,499/month, Elite is ₹19,999/month with a 4-hour SLA. If you are already a client, tell me your business name and I will flag it for the team.' },
      { t:'start begin first step next what do i do now',
        a:'Two ways. Tap <b>WhatsApp</b> and we build the quote with you, or tap <b>Pay now</b> under the configurator to place it with a deposit. Either way you get a reference number and a written scope before any work starts — and a free homepage concept within 48 hours.' },
      { t:'thank thanks ok great nice good bye bye',
        a:'Happy to help. If anything else comes up, message us on WhatsApp — we usually reply within five minutes during business hours. Good luck with the build.' },
      { t:'bento grid layout why 2026 modern design trend best looking site',
        a:'Everything on this page is hand-built: a custom design system, a rotating 3D wireframe globe rendered on canvas, glass-free solid panels for readability, scroll-linked reveals, and a cursor spotlight on every card. No page builder, no template. That is why it loads in under two seconds and scores 98 on Lighthouse.' },
      { t:'speed performance lighthouse core web vitals slow fast load',
        a:'We target 98+ Lighthouse on every build. Static-first HTML, WebP images with fixed aspect boxes so nothing shifts, lazy loading below the fold, and animations restricted to transform and opacity so the browser composites them on the GPU. No layout recalculation on scroll.' },
      { t:'accessibility keyboard screen reader contrast wcag disability',
        a:'Keyboard navigable with visible focus rings, semantic HTML, alt text on every image, and contrast checked against WCAG AA. Animations respect prefers-reduced-motion — if a visitor has that set, everything holds still.' },
      { t:'analytics tracking google ga4 conversion pixel meta',
        a:'GA4 and Meta Pixel installed with conversion events on WhatsApp clicks, form submits and calls. Google Search Console and Bing Webmaster verified. You own all of it and get access on handover.' },
      { t:'backup security ssl https hack safe protect',
        a:'SSL included, Cloudflare DDoS protection, daily automated backups, and no database exposed to the internet. We do not store card numbers — payments go through UPI directly, so there is nothing for us to leak.' },
      { t:'update change content edit myself cms admin after launch',
        a:'Small text and price changes go through us free for the first three months. If you want to edit yourself, we can add a lightweight CMS at ₹9,999, or you send changes on WhatsApp and we handle them under a care plan.' },
      { t:'invoice quotation estimate scope document what included',
        a:'You get a one-page scope document before paying: exactly what is being built, what is excluded, the price, and the delivery date. Nothing is added to the bill afterwards unless you ask for it in writing.' },
      { t:'multiple branches locations franchise multi city chain',
        a:'Handled in the CRM and the site — branch-level logins so staff see only their location, a location switcher on the site, and consolidated reporting for you. Priced from ₹1,49,999 for a full multi-location build.' },
      { t:'migrate from wix godaddy squarespace wordpress shift move',
        a:'Yes. We export your content, rebuild it properly, keep your domain, and set up 301 redirects so rankings carry over. We monitor Search Console for 30 days after the switch to catch anything that breaks.' },
      { t:'trial demo sample see before buy free concept example',
        a:'We build a real homepage concept for your business before you pay anything — free, in 48 hours. You see your own business in the design, not a template with your logo dropped in. If you do not like it, you keep it and we part as friends.' },
      { t:'trustworthy scam real legit genuine proof review client work',
        a:'Udyam registered with the Ministry of MSME — UDYAM-KA-03-0460058, verifiable on the government portal. Meta Verified business on WhatsApp. One live client site you can open right now: redmobilerepair.in. Prices published, no deposit before scope is agreed.' },
      { t:'what if i need more pages extra page add increase scope',
        a:'Additional pages are ₹1,499 each beyond the agreed count. If the scope genuinely grows because your requirements changed, we quote it in writing before doing the work — never as a surprise on the invoice.' },
      { t:'seasonal offer discount sale cheaper deal negotiate price',
        a:'Prices are published and fixed, which is why they are low. We do not run fake discounts or inflate a price to cross it out. The one genuine saving is the bundle: pick two or more cores and 12% comes off automatically.' },
      { t:'cancel after paying refund if unhappy dispute problem',
        a:'Before work begins: full refund minus any third-party cost already paid. After work begins: we refund the balance of undelivered milestones. If we miss the agreed date on a single build, the fee is refunded in full.' },
      { t:'how do we start first step begin process kick off',
        a:'Send one line about your business on WhatsApp. We reply with a scope and a free homepage concept in 48 hours. If you like it, you pay, send content, and we build. First message to +91 96200 24812.' },
      { t:'what is included launchpad exactly nine thousand nine hundred cheap entry',
        a:'Launchpad ₹9,999 gives you: a one-page website built around your business, Google Business Profile claimed and verified, Bing Webmaster indexing, WhatsApp click-to-chat wired in, and mobile-first design. Live in 5 days. No AI assistant, no CRM, no app — that is what the higher tracks add. Upgrade later and the ₹9,999 is credited.' },
      { t:'difference traditional empire ai worth it should i pay more',
        a:'The only difference is the AI assistant. Traditional: we build it, you run it, no monthly assistant. Empire: the same build plus an assistant that answers enquiries 24/7, qualifies them and books appointments. Empire adds ₹15,000 on a website (₹19,999 to ₹34,999). If you get more than two enquiries a week after hours, it pays for itself.' },
      { t:'what does the ai actually say to my customers script answers',
        a:'It answers in your words, trained on your services, prices, timings and policies. It can explain what you offer, quote a range, check availability and book a slot. When it is unsure it says so and hands the conversation to you on WhatsApp — it never invents a price or promises something you have not agreed.' },
      { t:'can i see example live site proof portfolio demo real',
        a:'Yes — redmobilerepair.in is a live build. An independent Apple repair lab in Indiranagar, trading since 2014, 767 Google reviews at 4.9 stars. Their old site was invisible online; the new one ranks and takes bookings. That is the only public case study so far, and we say so rather than padding the portfolio.' },
      { t:'how much total cost hidden charges extra fee surprise',
        a:'The published price plus 18% GST. Nothing else. No setup fee, no onboarding fee, no per-page surprise, no monthly platform charge unless you choose a care plan (from ₹2,499/month, optional). Domain is ₹800–1,200/year paid directly to the registrar at cost.' },
      { t:'do you work with clients outside bangalore other cities india',
        a:'Yes — we work remotely across all of India. Clients in Mumbai, Delhi, Hyderabad, Chennai, Pune and smaller towns all run the same way: WhatsApp, calls and screen-shares. Bengaluru clients can request an on-site meeting by appointment.' },
      { t:'hello hi hey namaste good morning evening',
        a:'Hello. I am Astra, the Pixel Forge Studio assistant. I can help you pick a package, explain pricing, or answer anything about how we work. What are you building?' }
    ];

    var STOP = {'the':1,'a':1,'an':1,'is':1,'are':1,'do':1,'you':1,'i':1,'to':1,'of':1,'for':1,'and':1,'in':1,'on':1,'it':1,'me':1,'my':1,'we':1,'can':1,'what':1,'how':1,'will':1,'would':1,'about':1,'tell':1,'know':1,'please':1,'need':1,'want':1,'get':1,'have':1};

    /* ---------- conversation state ---------- */
    var ctx = { biz:'', goal:'', stage:'start', asked:0, said:[] };
    try {
      var saved = JSON.parse(localStorage.getItem('pf_bot') || '{}');
      if (saved.biz) ctx.biz = saved.biz;
      if (saved.visits) ctx.visits = saved.visits;
      ctx.visits = (ctx.visits || 0) + 1;
      localStorage.setItem('pf_bot', JSON.stringify({ biz: ctx.biz, visits: ctx.visits }));
    } catch (e) {}

    var BIZ_MAP = {
      shop:'launchpad', store:'launchpad', salon:'growth', clinic:'growth', hospital:'growth',
      hotel:'growth', restaurant:'growth', realestate:'growth', builder:'growth',
      lawyer:'launchpad', consultant:'launchpad', freelancer:'launchpad', creator:'launchpad',
      school:'growth', coaching:'growth', wholesale:'growth', distributor:'growth',
      manufacturer:'growth', factory:'growth', agency:'growth', ecommerce:'growth',
      brand:'empire', enterprise:'empire', chain:'empire', franchise:'empire', corporate:'empire'
    };

    function score(q) {
      var words = q.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(function(w){return w && !STOP[w];});
      var best = null, bestScore = 0;
      KB.forEach(function (item) {
        var hits = 0, matched = 0;
        words.forEach(function (w) {
          if (w.length < 3) return;
          // word-boundary match so "start" does not match "starter"
          var re = new RegExp('(^|\\s)' + w + '(s|es|ing)?(\\s|$)');
          if (re.test(item.t)) { hits += w.length; matched++; }
        });
        var sc = matched * 22 + hits;
        if (sc > bestScore) { bestScore = sc; best = item; }
      });
      return bestScore >= 22 ? best : null;
    }

    function detectBiz(q) {
      var l = q.toLowerCase();
      for (var k in BIZ_MAP) { if (l.indexOf(k) > -1) return k; }
      return null;
    }

    function recommend(bizKey) {
      var p = BIZ_MAP[bizKey];
      if (!p) return null;
      var pkg = PKG[p];
      var why = p === 'launchpad'
        ? 'You mostly need to be found and contacted — a one-pager with Google Business and WhatsApp does that job without paying for software you will not use.'
        : p === 'growth'
          ? 'You will have leads coming from more than one place, and losing one is expensive. That is exactly what the Growth Engine is for — site, CRM and app in one build.'
          : 'At your scale the constraint is operations, not a website. The Empire is a custom build with multi-role permissions and real integrations.';
      return 'Based on that, I would point you at <b>' + pkg.name + '</b> — ' + pkg.price + '. ' + why +
             '<br><br>' + pkg.note +
             '<br><br>Want me to put this in a WhatsApp message so the team can pick it up?';
    }

    /* ---------- objection handling ---------- */
    function objection(q) {
      var l = q.toLowerCase();
      if (/expensive|costly|too much|afford|budget tight|cheap/.test(l))
        return 'Fair concern. Two things worth knowing: the Launchpad starts at ₹9,999, and the free homepage concept means you see real work before paying anything. If ₹1,49,999 is the wrong size, we can scope down rather than discount — what budget did you have in mind?';
      if (/think|later|not now|maybe|discuss|decide/.test(l))
        return 'Of course. The free concept is the low-risk way to decide — you get a real homepage for your business in 48 hours with no commitment. If you do not like it, you keep it. Shall I start one?';
      if (/another|other agency|quote|cheaper|freelanc/.test(l))
        return 'Worth comparing properly. Ask them three things: do I own the code, is there a monthly fee after launch, and what happens if it is late. If any answer is vague, the real price is higher than the quote. Our answers are yes, no, and refunded.';
      if (/trust|real|genuine|legit|proof|scared/.test(l))
        return 'Reasonable. Check us yourself: Udyam UDYAM-KA-03-0460058 on the government MSME portal, and redmobilerepair.in — a real client site you can open right now. We also show the design before you pay.';
      if (/discount|reduce|lower|negotiat/.test(l))
        return 'We do not discount the published prices — that is why they are published. What we can do is scope down: drop a tier, remove add-ons you do not need, or start with the Launchpad and upgrade later with the fee credited.';
      return null;
    }

    /* ---------- navigation ---------- */
    function navigate(q) {
      var l = q.toLowerCase();
      var map = { 'package':'packages','pricing':'packages','price list':'packages','add-on':'addons','addon':'addons',
                  'work':'work','portfolio':'work','case':'work','about':'about','process':'process',
                  'faq':'faq','contact':'contact','compare':'compare','payment':'pay','pay':'pay','service':'services' };
      for (var k in map) {
        if (l.indexOf(k) > -1 && /show|see|go|open|where|take|jump|scroll/.test(l)) {
          var el = document.getElementById(map[k]);
          if (el) { el.scrollIntoView({behavior:'smooth', block:'start'}); return 'Scrolling you to that section now.'; }
        }
      }
      return null;
    }

    function answer(q) {
      var t = q.trim().toLowerCase();
      if (/^(hi|hey|hello|yo|namaste|good (morning|afternoon|evening))\b/.test(t) && t.length < 22)
        return 'Hello. I am <b>Astra</b>, the Pixel Forge Studio assistant. I can help you pick a package, explain pricing, or answer anything about how we work. What are you building?';

      if (/what (did|have) i (pick|select|choose)|my (selection|order|build)|what.*selected/i.test(q)) {
        var lines = [];
        document.querySelectorAll('#sum-lines .sum-line').forEach(function (l) {
          var t = l.querySelector('span'), b = l.querySelector('b');
          if (t && b) lines.push(t.textContent + ' — ' + b.textContent);
        });
        var tot = document.getElementById('sum-total');
        if (!lines.length) return 'Nothing selected yet. Scroll to the configurator and pick a core, a tier and any add-ons — I will keep track.';
        return '<b>Your build so far:</b><br>' + lines.join('<br>') +
               (tot ? '<br><br><b>One-time: ' + tot.textContent + '</b>' : '') +
               '<br><br>Tap WhatsApp below to send it over, or <b>Pay now</b> to place it with a deposit.';
      }

      var nav = navigate(q);
      if (nav) return nav;

      var obj = objection(q);
      if (obj && Math.random() < 1) return obj;

      var biz = detectBiz(q);
      if (biz) {
        ctx.biz = biz;
        try { localStorage.setItem('pf_bot', JSON.stringify({ biz: biz, visits: ctx.visits || 1 })); } catch (e) {}
        var rec = recommend(biz); if (rec) return rec;
      }

      var hit = score(q);
      if (hit) {
        // never send the same answer twice in a row
        if (ctx.said.indexOf(hit.a) > -1) {
          return 'I have covered that above — but if it did not answer it, tell me a bit more and I will be specific. Or tap WhatsApp below and a person will pick it up straight away.';
        }
        ctx.said.push(hit.a);
        if (ctx.said.length > 4) ctx.said.shift();
        return hit.a;
      }

      if (/^(yes|yeah|ok|okay|sure|go ahead|start|proceed)/i.test(q.trim()))
        return 'Good. Tap the green WhatsApp button below and the team will pick it up — or tell me your business type and I will recommend the right package first.';

      return 'I can help with packages, pricing, timelines, ownership, AI, WhatsApp, SEO or the payment process. You can also ask me to show you a section. What would you like to know?';
    }

    /* ---------- UI ---------- */
    function push(text, who) {
      var d = document.createElement('div');
      d.className = 'bmsg ' + who;
      d.innerHTML = text;
      botLog.appendChild(d);
      botLog.scrollTop = botLog.scrollHeight;
    }

    function chips(list) {
      var w = document.createElement('div');
      w.className = 'bchips';
      list.forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button'; b.textContent = c;
        b.addEventListener('click', function () {
          push(c, 'me');
          setTimeout(function () { push(answer(c), 'bot'); }, 320);
          w.remove();
        });
        w.appendChild(b);
      });
      botLog.appendChild(w);
      botLog.scrollTop = botLog.scrollHeight;
    }

    botBtn.addEventListener('click', function () {
      botPanel.classList.toggle('open');
      if (botPanel.classList.contains('open') && !botLog.childElementCount) {
        push(ctx.visits > 1
          ? 'Welcome back. Picking up where you left off — what would you like to know?'
          : 'I can help you pick the right package in under two minutes — or explain anything we offer. What kind of business is it?', 'bot');
        setTimeout(function () { chips(['Website', 'CRM', 'App', 'Just browsing']); }, 300);
      }
      if (botPanel.classList.contains('open')) botInput.focus();
    });

    if (botForm) {
      botForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var v = botInput.value.trim();
        if (!v) return;
        push(v, 'me');
        botInput.value = '';
        setTimeout(function () {
          push(answer(v), 'bot');
          if (++ctx.asked === 3) {
            setTimeout(function () {
              chips(['Talk on WhatsApp', 'See pricing', 'Free mockup', 'What is a PWA?']);
            }, 500);
          }
        }, 380);
      });
    }
  }
})();

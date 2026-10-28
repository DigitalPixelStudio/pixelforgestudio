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
    website: { essential: 19999, professional: 29999, complete: 49999, elite: 89999 },
    crm:     { essential: 74999, professional: 109999, complete: 149999, elite: 299999 },
    app:     { essential: 89999, professional: 139999, complete: 199999, elite: 399999 }
  };

  var CORE_LABEL = { website: 'Website', crm: 'CRM', app: 'App' };
  var TIER_LABEL = { essential: 'Essential', professional: 'Professional', complete: 'Complete', elite: 'Elite' };

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

  // 4. scroll parallax on ambient orbs + hero mock
  if (!reduce) {
    var orbs = $$('.bg i');
    var mock = $('.hero .mock');
    var last = -1;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (Math.abs(y - last) < 2) return;
      last = y;
      orbs.forEach(function (o, i) {
        o.style.marginTop = (y * (0.05 + i * 0.035)) + 'px';
      });
      if (mock && y < 900) mock.style.marginTop = (56 - y * 0.06) + 'px';
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


  /* ---------- 3D particle field (GPU-light canvas) ---------- */
  (function () {
    var cv = document.getElementById('fx3d');
    if (!cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var ctx = cv.getContext('2d', { alpha: true });
    var W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);
    var pts = [], N = 0, mouse = { x: -999, y: -999 };
    var running = true;

    function size() {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      N = Math.min(64, Math.round(W / 24));
      pts = [];
      for (var i = 0; i < N; i++) {
        var HUE = [[139,92,246],[0,242,254],[255,138,61],[168,85,247],[74,222,128]];
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          z: 0.3 + Math.random() * 0.7,
          vx: (Math.random() - .5) * .28,
          vy: (Math.random() - .5) * .28,
          c: HUE[Math.floor(Math.random() * HUE.length)],
          ph: Math.random() * 6.283
        });
      }
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx * p.z; p.y += p.vy * p.z;
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
      }

      // links
      for (var a = 0; a < pts.length; a++) {
        for (var b2 = a + 1; b2 < pts.length; b2++) {
          var dx = pts[a].x - pts[b2].x, dy = pts[a].y - pts[b2].y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 20000) {
            var o = (1 - d2 / 20000) * 0.16;
            var cc = pts[a].c;
            ctx.strokeStyle = 'rgba(' + cc[0] + ',' + cc[1] + ',' + cc[2] + ',' + o.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b2].x, pts[b2].y); ctx.stroke();
          }
        }
      }

      // dots + cursor attraction
      for (var k = 0; k < pts.length; k++) {
        var q = pts[k];
        var mx = q.x - mouse.x, my = q.y - mouse.y;
        var md = Math.sqrt(mx * mx + my * my);
        var near = md < 180;
        if (near) {
          ctx.strokeStyle = 'rgba(255,138,61,' + ((1 - md / 180) * .32).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        q.ph += 0.012;
        var pulse = 0.72 + Math.sin(q.ph) * 0.28;
        var r = (1.5 * q.z + (near ? .9 : 0)) * pulse;
        var col = near ? [255,138,61] : q.c;
        ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (near ? .85 : .5) + ')';
        ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, 6.283); ctx.fill();
        if (near) {
          ctx.beginPath(); ctx.arc(q.x, q.y, r * 3.2, 0, 6.283);
          ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',.14)';
          ctx.stroke();
        }
      }

      requestAnimationFrame(frame);
    }

    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('mouseleave', function () { mouse.x = -999; mouse.y = -999; });
    window.addEventListener('resize', size, { passive: true });
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(frame);
    });

    size();
    requestAnimationFrame(frame);
  })();


  /* ---------- PAY NOW flow ---------- */
  (function () {
    var pm = document.getElementById('pmodal');
    if (!pm) return;
    var s1 = document.getElementById('pstep1'), s2 = document.getElementById('pstep2'),
        form = document.getElementById('pform'), err = document.getElementById('perr'),
        sumEl = document.getElementById('psummary'), amtEl = document.getElementById('pamount'),
        upLink = document.getElementById('puplink'), confirmBtn = document.getElementById('pconfirm');
    var order = { label:'', oneTime:0, monthly:0 };

    function money(n){ return '₹' + Number(n).toLocaleString('en-IN'); }

    function open() {
      // pull the live selection from the configurator if present
      var lines = [], one = 0, mo = 0;
      document.querySelectorAll('#sum-lines .sum-line').forEach(function (l) {
        var t = l.querySelector('span'), b = l.querySelector('b');
        if (t && b) lines.push(t.textContent + ' — ' + b.textContent);
      });
      var tot = document.getElementById('sum-total');
      var mEl = document.getElementById('sum-monthly');
      one = tot ? parseInt(tot.textContent.replace(/[^0-9]/g,''), 10) || 0 : 0;
      mo  = mEl && mEl.textContent !== '—' ? parseInt(mEl.textContent.replace(/[^0-9]/g,''), 10) || 0 : 0;
      order.oneTime = one; order.monthly = mo;
      order.label = lines.join(' | ') || 'Custom build';
      sumEl.innerHTML = lines.length
        ? lines.join('<br>') + (mo ? '<br><b style="color:#C4B5FD">Monthly: ' + money(mo) + '</b>' : '')
        : 'Pick your options in the configurator first — or just tell us and we will quote it.';
      amtEl.textContent = one ? money(one) : 'On quote';
      pm.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function close() { pm.classList.remove('on'); document.body.style.overflow = ''; }

    document.querySelectorAll('[data-pay]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); open(); });
    });
    var pc = document.getElementById('pclose');
    if (pc) pc.addEventListener('click', close);
    pm.addEventListener('click', function (e) { if (e.target === pm) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var need = ['pname','pphone','pbiz','ptype','pcity'];
      for (var i = 0; i < need.length; i++) {
        if (!g(need[i])) { err.textContent = 'Please fill the required fields marked with *'; return; }
      }
      if (!/^[0-9]{10}$/.test(g('pphone').replace(/\D/g,''))) {
        err.textContent = 'Mobile number should be 10 digits.'; return;
      }
      err.textContent = '';
      s1.style.display = 'none'; s2.style.display = 'block';

      var upi = 'upi://pay?pa=9620024812@airtel&pn=Pixel%20Forge%20Studio&cu=INR' +
                (order.oneTime ? '&am=' + order.oneTime : '');
      upLink.href = upi;

      var now = new Date();
      var ref = 'PF-' + String(now.getDate()).padStart(2,'0') + String(now.getMonth()+1).padStart(2,'0') + '-' +
                String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0');
      var L = [];
      L.push('*NEW PAID ORDER — Pixel Forge Studio*');
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
      confirmBtn.href = 'https://wa.me/919620024812?text=' + encodeURIComponent(L.join('\n'));
    });

    var c2 = document.getElementById('copy-upi2');
    if (c2) c2.addEventListener('click', function () {
      var t = document.getElementById('upi2');
      if (navigator.clipboard) navigator.clipboard.writeText(t.textContent.trim());
      c2.textContent = 'Copied'; setTimeout(function(){ c2.textContent = 'Copy'; }, 1600);
    });
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
    var state = { core: 'website', tier: 'professional', addons: {}, monthly: {} };

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

      // tier price labels follow the selected core
      Object.keys(TIER_LABEL).forEach(function (tk) {
        var el = document.querySelector('[data-tierprice="' + tk + '"]');
        if (el) el.textContent = inr(TIERS[state.core][tk]);
      });

      var corePrice = TIERS[state.core][state.tier];
      lines.push({ t: CORE_LABEL[state.core] + ' — ' + TIER_LABEL[state.tier], p: corePrice });
      oneTime += corePrice;

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
        website:{essential:'5 pages, mobile-first, SEO basics, WhatsApp',professional:'Adds AI assistant, PWA, Google Business, 2 socials',complete:'10 pages, all 8 listings, reviews pack, analytics, reporting',elite:'Custom Next.js build, everything included, 6 months care'},
        crm:{essential:'Pipeline, contacts, quotes, AI bot, 5 users',professional:'Adds GST invoices, dashboards, mobile PWA',complete:'Adds WhatsApp API, presence bundle, email + SMS',elite:'Custom build, multi-role, ERP integration, SLA'},
        app:{essential:'Android, login, payments, push, AI',professional:'Both stores, richer UI, analytics',complete:'Both stores, admin panel, presence bundle',elite:'Platform build, real-time, multi-role, SLA'}
      };

      var L = [];
      L.push('*NEW ENQUIRY — Pixel Forge Studio*');
      L.push('Ref: ' + ref);
      L.push('');
      L.push('*WHAT THEY WANT*');
      L.push(CORE_LABEL[state.core] + ' — ' + TIER_LABEL[state.tier] + '  (' + inr(corePrice) + ')');
      L.push('_' + (TIER_NOTE[state.core] && TIER_NOTE[state.core][state.tier] || '') + '_');

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
        state.core = inp.value;
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
        a:'Four packages: <b>Launchpad ₹9,999</b> (one page, no AI, no code handover) · <b>Growth ₹1,49,999</b> (site + CRM + app + AI) · <b>Conquerer ₹2,24,999</b> (professional everything, both app stores, WhatsApp AI) · <b>Empire ₹4,99,999</b> (custom enterprise build, 4-hour SLA). Every price includes design, build, deployment, SSL and care. What kind of business is it?' },
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
        a:'You own everything — code, repository, domain, hosting, analytics, ad accounts, all registered in your name. No lock-in, no fee to keep your own site. Most agencies keep the code; we hand it over on day seven.' },
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
        a:'Four packages cover it: Launchpad ₹9,999 · Growth ₹1,49,999 · Conquerer ₹2,24,999 · Empire ₹4,99,999. The upper four already bundle website, CRM and app. If you only need one of the three, we scope that separately — tell me which one and I will price it.' },
      { t:'pay now payment online buy order checkout deposit',
        a:'Two ways to start: tap WhatsApp and we build the quote with you, or tap <b>Pay now</b> under the configurator — fill five details, then pay the deposit by UPI. Either way you get a reference number and a written scope before any work begins.' },
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

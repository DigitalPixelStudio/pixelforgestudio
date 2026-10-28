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
      launchpad: { name:'The Launchpad', price:'₹9,999', note:'one-page PWA, Google Business, Bing, WhatsApp link. Live in 5 days.' },
      growth:    { name:'The Growth Engine', price:'₹1,49,999', note:'multi-page site + CRM + Android app + Meta AI agent. Saves ₹34,998 versus buying separately.' },
      empire:    { name:'The Empire', price:'from ₹4,99,999', note:'custom Next.js build, multi-role CRM, native app, API integration, 90-day support.' }
    };

    var KB = [
      { t:'price cost pricing rate charge budget expensive how much',
        a:'Three published packages: The Launchpad ₹9,999 · The Growth Engine ₹1,49,999 · The Empire from ₹4,99,999. Everything else is priced on the packages section — nothing hidden. What kind of business are you building for?' },
      { t:'website web page site design build',
        a:'Websites run ₹9,999 for a one-pager, ₹19,999–₹49,999 for a proper business site, and ₹89,999 for a custom build. Most local businesses land on the Growth Engine. Shall I recommend one for your business type?' },
      { t:'crm lead pipeline customer manage invoice gst',
        a:'The CRM starts inside the Growth Engine — leads, pipeline, quotes, GST invoices and an AI assistant, all in one. Enterprise agencies bill ₹1.5 lakh+ for that as a separate add-on. What are you using to track leads today?' },
      { t:'app android ios mobile play store pwa',
        a:'Android apps start at ₹89,999, both stores ₹1,39,999. The Growth Engine already includes an Android PWA — installable, works offline, no Play Store approval needed. Do you need native features like push or camera?' },
      { t:'time long fast quick delivery timeline launch days week',
        a:'Seven days from the moment we have your content and photos. You see a real homepage design in 48 hours, before paying anything. If we miss the date because of us, the project fee is refunded. What is your deadline?' },
      { t:'free mockup sample demo preview concept trial',
        a:'We design a real homepage for your business — free, within 48 hours, no card. One concept, one revision. If you do not like it you keep it and we part as friends. Want me to start one?' },
      { t:'own ownership code files source domain hosting account mine rights',
        a:'You own everything — code, repository, domain, hosting, analytics, ad accounts, all in your name. No lock-in and no fee to keep your own site. Most agencies keep the code; we hand it over on day seven.' },
      { t:'hidden cost extra charge surprise fee gst tax monthly',
        a:'No hidden costs. Every price on the site includes design, deployment, SSL and three months of care. Prices exclude 18% GST, stated openly. There is no monthly platform fee — ever.' },
      { t:'ai bot assistant chatbot automation agent astra',
        a:'Every build from Professional upward includes an AI assistant trained on your business — services, prices, timings. It answers at 11pm, captures the number, and hands off to you on WhatsApp when unsure. That is what I am, on this site.' },
      { t:'whatsapp business api verified meta catalogue',
        a:'WhatsApp Business setup ₹4,999 · Business API ₹14,999 · WhatsApp AI bot ₹34,999. We can also set up your catalogue and quick replies.' },
      { t:'google business profile gmb maps listing local seo',
        a:'Google Business Profile setup is ₹4,999 — claim, verification, categories, photos. Local SEO is ₹19,999 a month including posts, content and citations.' },
      { t:'justdial indiamart sulekha directory listing',
        a:'Justdial ₹2,999 · IndiaMART ₹4,999 · Sulekha ₹2,499. All eight listings together with WhatsApp and Google is ₹24,999 as the Complete Online Profile.' },
      { t:'seo search ranking google rank keyword organic',
        a:'Local SEO ₹19,999 a month, SEO Growth ₹29,999 a month. Both include conversion tracking so you can see which enquiries became customers.' },
      { t:'ads advertising ppc google ads meta facebook instagram campaign',
        a:'Google Ads setup ₹4,999, management ₹14,999 a month. Google plus Meta ₹24,999 a month. Bing ₹2,999 — almost nobody in Bangalore offers that.' },
      { t:'payment pay instalment emi split advance deposit upi refund',
        a:'50% to start, 50% on launch. Stacks and apps are split across milestones. Deposits go to our Airtel merchant UPI — the QR is in the payments section, and we never ask for your PIN or OTP.' },
      { t:'guarantee refund late delay promise warranty',
        a:'For a single website or CRM: live by the agreed date or the fee is refunded. For apps and stacks it is milestone-based — miss one by more than seven days and that milestone is waived.' },
      { t:'care maintenance support after launch ongoing',
        a:'Three months of care is included free on every project — uptime, backups, security, updates. After that it continues from ₹2,499 a month, only if you want it. No auto-renewal.' },
      { t:'kannada language local regional english',
        a:'We build in Kannada as well as English — content and the AI assistant. For most Bangalore businesses that matters more than people expect.' },
      { t:'portfolio work example case study proof client reviews redapple',
        a:'Our live case study is Red Apple Mobile Repair in Indiranagar — 4.9 stars, 767 reviews, website and Google Ads with full tracking, live in seven days. You can open their real site at redmobilerepair.in.' },
      { t:'about who founder company studio registered trust udyam',
        a:'Pixel Forge Studio is a Bengaluru studio registered with the Ministry of MSME — Udyam UDYAM-KA-03-0460058, verifiable on the government portal. Trading since October 2023.' },
      { t:'address office location where based bengaluru bangalore remote india',
        a:'We work remotely with clients across India. In Bengaluru we also do in-person consulting — at your office or your home, whichever you prefer, by appointment. Which city are you in?' },
      { t:'contact call phone talk human speak person whatsapp',
        a:'Tap the green WhatsApp button and our team replies — usually within five minutes during business hours, 10am to 7pm IST, Monday to Saturday.' },
      { t:'stack bundle all three package deal discount save',
        a:'Startup ₹1,49,999 · Growth ₹2,24,999 · Scale ₹3,11,999 · Elite ₹4,99,999. Any two of website, CRM and app together gets 12% off the combined list price.' },
      { t:'tripwire entry starter small first basic minimum cheap',
        a:'The entry product is the Launchpad at ₹9,999 — one page, Google Business Profile and WhatsApp setup, live in five days. Bought separately that is ₹19,997.' },
      { t:'hosting server speed performance fast lighthouse',
        a:'Sites are built static-first and score 95+ on Lighthouse, loading under two seconds on a mid-range phone. Speed is part of the build, not an upgrade.' },
      { t:'competitor other agency compare difference why you cheap alternative',
        a:'Agencies charge ₹60,000 to ₹2,50,000 plus monthly retainers. Freelancers vanish. We publish our prices, show the design first, include the AI and CRM instead of billing them separately, and hand over everything in seven days. The comparison table on this page has the full picture.' },
      { t:'hello hi hey namaste good morning',
        a:'Hello. I am Astra, the Pixel Forge Studio assistant. I can help you pick a package, explain pricing, or answer anything about how we work. What are you building?' }
    ];

    var STOP = {'the':1,'a':1,'an':1,'is':1,'are':1,'do':1,'you':1,'i':1,'to':1,'of':1,'for':1,'and':1,'in':1,'on':1,'it':1,'me':1,'my':1,'we':1,'can':1,'what':1,'how':1,'will':1,'would':1,'about':1,'tell':1,'know':1,'please':1,'need':1,'want':1,'get':1,'have':1};

    /* ---------- conversation state ---------- */
    var ctx = { biz:'', goal:'', stage:'start', asked:0 };

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
          if (w.length >= 3 && item.t.indexOf(w) > -1) { hits += w.length; matched++; }
        });
        var sc = matched * 10 + hits;
        if (sc > bestScore) { bestScore = sc; best = item; }
      });
      return bestScore >= 13 ? best : null;
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

      var nav = navigate(q);
      if (nav) return nav;

      var obj = objection(q);
      if (obj && Math.random() < 1) return obj;

      var biz = detectBiz(q);
      if (biz) { ctx.biz = biz; var rec = recommend(biz); if (rec) return rec; }

      var hit = score(q);
      if (hit) return hit.a;

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
        push('Hello — I am <b>Astra</b>, the Pixel Forge Studio assistant. I can help you pick a package, explain pricing, or answer anything about how we work.', 'bot');
        setTimeout(function () { chips(['How much?', 'How long?', 'Show packages', 'Free mockup']); }, 300);
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
              chips(['Talk on WhatsApp', 'See pricing', 'Free mockup']);
            }, 500);
          }
        }, 380);
      });
    }
  }
})();

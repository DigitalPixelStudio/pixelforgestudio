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

      // whatsapp message
      var msg = 'Hi Faisal, I built a package on your website.\n\n';
      msg += 'Building: ' + CORE_LABEL[state.core] + ' — ' + TIER_LABEL[state.tier] + ' (' + inr(corePrice) + ')\n';
      var chosen = ADDONS.filter(function (a) { return state.addons[a.id]; });
      if (chosen.length) {
        msg += '\nAdd-ons:\n' + chosen.map(function (a) { return '- ' + a.name + ' (' + inr(a.price) + ')'; }).join('\n') + '\n';
      }
      var chosenM = MONTHLY.filter(function (a) { return state.monthly[a.id]; });
      if (chosenM.length) {
        msg += '\nMonthly:\n' + chosenM.map(function (a) { return '- ' + a.name + ' (' + inr(a.price) + '/mo)'; }).join('\n') + '\n';
      }
      msg += '\nOne-time total: ' + inr(oneTime);
      if (monthlyTotal) msg += '\nMonthly total: ' + inr(monthlyTotal) + '/mo';
      msg += '\n\nPlease share next steps.';

      var send = $('#sum-send');
      if (send) {
        send.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
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

  /* ---------- AI bot widget (Phase 1 demo — no API key wired yet) ---------- */
  var botBtn = $('#botbtn');
  if (botBtn) {
    var botPanel = $('#botpanel');
    var botLog = $('#botlog');
    var botForm = $('#botform');
    var botInput = $('#botinput');

    var RULES = [
      { k: ['price', 'cost', 'charge', 'kitna', 'rate'], a: 'Websites start at ₹9,999. Most local businesses choose the ₹19,999–₹29,999 range, which includes the AI assistant. Want me to walk you through what is included?' },
      { k: ['7 day', 'seven day', 'how long', 'time', 'kitne din'], a: 'Seven days from the day we have your content and photos. The design preview arrives in 48 hours, before you pay anything.' },
      { k: ['ai', 'bot', 'chatbot'], a: 'Every website includes an AI assistant trained on your business — services, prices, timings. It answers customers at 11pm when you are asleep.' },
      { k: ['crm'], a: 'Our CRM starts at ₹74,999 and includes an AI assistant inside it. That is roughly a fifth of what agencies charge for the same thing.' },
      { k: ['app', 'android', 'ios'], a: 'Apps start at ₹89,999 for Android, ₹1,39,999 for both stores with AI built in.' },
      { k: ['own', 'ownership', 'code'], a: 'You own everything — the code, the repository, the domain, the hosting, every account. No lock-in, ever.' },
      { k: ['mockup', 'free', 'sample'], a: 'Yes — we design your homepage free, in 48 hours, before any payment. If you do not like it, you keep it and we part as friends.' },
      { k: ['seo', 'google'], a: 'Local SEO is ₹19,999 a month and includes Google Business Profile posts, content and citations.' },
      { k: ['whatsapp'], a: 'WhatsApp Business setup is ₹4,999. The WhatsApp AI bot is ₹34,999, or ₹14,999 for the API setup alone.' },
      { k: ['hello', 'hi', 'hey'], a: 'Hello. I am the Pixel Forge assistant. Ask me about pricing, timelines, or what is included — or tap WhatsApp to speak to Faisal directly.' }
    ];

    function push(text, who) {
      var d = document.createElement('div');
      d.className = 'bmsg ' + who;
      d.textContent = text;
      botLog.appendChild(d);
      botLog.scrollTop = botLog.scrollHeight;
    }

    function answer(q) {
      var low = q.toLowerCase();
      for (var i = 0; i < RULES.length; i++) {
        for (var j = 0; j < RULES[i].k.length; j++) {
          if (low.indexOf(RULES[i].k[j]) > -1) return RULES[i].a;
        }
      }
      return 'I am not certain about that one. Tap WhatsApp below and Faisal will answer directly — usually within five minutes during business hours.';
    }

    botBtn.addEventListener('click', function () {
      botPanel.classList.toggle('open');
      if (botPanel.classList.contains('open') && !botLog.childElementCount) {
        push('Hello — I am the Pixel Forge assistant. Ask me about pricing, timelines or what is included.', 'bot');
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
        setTimeout(function () { push(answer(v), 'bot'); }, 420);
      });
    }
  }
})();

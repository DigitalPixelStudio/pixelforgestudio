/* ==========================================================================
   Pixel Forge — v89 motion layer
   Injected, not hand-edited into the 121 KB page. Adds:
     · the forge flame above section headings
     · two glass-red sliders
     · slider drag + arrow + progress
   Every effect is transform/opacity. Failures are swallowed so a decorative
   piece can never break the page.
   ========================================================================== */
(function () {
  'use strict';
  try {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------------------------------------------------------- flame */
    function makeFlame(small) {
      var f = document.createElement('div');
      f.className = 'flame' + (small ? ' flame-sm' : '');
      f.setAttribute('aria-hidden', 'true');
      var i = document.createElement('i');
      f.appendChild(i);
      var g = document.createElement('span');
      g.className = 'flame-glow';
      f.appendChild(g);
      return f;
    }

    /* put one above the first 5 section headings, plus the hero */
    var heads = Array.prototype.slice.call(
      document.querySelectorAll('.sec-head, .pf-h2, .pf-forge__line, .hero-title')
    ).slice(0, 6);

    heads.forEach(function (h) {
      if (h.previousElementSibling && h.previousElementSibling.classList.contains('flame')) return;
      var parent = h.parentNode;
      if (!parent) return;
      parent.insertBefore(makeFlame(heads.indexOf(h) > 2), h);
    });

    /* ------------------------------------------------------------- sliders */
    var ICON = {
      bolt: '<path d="M13 2L4.5 13H11l-1 9 8.5-11H12z"/>',
      code: '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/>',
      chart:'<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
      phone:'<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/>',
      crm:  '<path d="M3 5h18M3 12h18M3 19h12"/><circle cx="18" cy="19" r="2.2"/>',
      seo:  '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
      ai:   '<path d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4z"/>',
      shield:'<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>'
    };

    function svg(name) {
      return '<svg viewBox="0 0 24 24">' + (ICON[name] || ICON.bolt) + '</svg>';
    }

    function buildSlider(id, kicker, title, items) {
      if (document.getElementById(id)) return;

      var sec = document.createElement('section');
      sec.className = 'sec';
      sec.id = id;

      var cards = items.map(function (it, i) {
        return '<article class="pfslider__card">' +
          '<span class="n">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<div class="ico">' + svg(it.ico) + '</div>' +
          '<h4>' + it.t + '</h4>' +
          '<p>' + it.d + '</p>' +
          '</article>';
      }).join('');

      sec.innerHTML =
        '<div class="wrap">' +
          '<span class="kicker mono">' + kicker + '</span>' +
          '<h2 class="pf-h2">' + title + '</h2>' +
          '<div class="pfslider">' +
            '<div class="pfslider__rail" data-rail>' + cards + '</div>' +
            '<div class="pfslider__bar"><i data-bar></i></div>' +
            '<div class="pfslider__nav">' +
              '<button type="button" data-prev aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>' +
              '<button type="button" data-next aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>' +
            '</div>' +
          '</div>' +
        '</div>';

      /* place it after the services section if we can find one */
      var anchor = document.getElementById('services') ||
                   document.querySelector('.sec') ||
                   document.querySelector('main');
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(sec, anchor.nextSibling);
      } else {
        document.body.insertBefore(sec, document.body.firstChild);
      }

      wire(sec);
      return sec;
    }

    function wire(sec) {
      var rail = sec.querySelector('[data-rail]');
      var bar  = sec.querySelector('[data-bar]');
      var prev = sec.querySelector('[data-prev]');
      var next = sec.querySelector('[data-next]');
      if (!rail) return;

      function sync() {
        var max = rail.scrollWidth - rail.clientWidth;
        var p = max > 0 ? rail.scrollLeft / max : 0;
        if (bar) {
          var vis = rail.clientWidth / Math.max(1, rail.scrollWidth);
          bar.style.width = Math.max(12, vis * 100) + '%';
          bar.style.transform = 'translateX(' + (p * (100 / Math.max(0.12, vis) - 100)) + '%)';
        }
      }

      var ticking = false;
      rail.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { ticking = false; sync(); });
      }, { passive: true });

      function step(dir) {
        var card = rail.querySelector('.pfslider__card');
        var w = card ? card.getBoundingClientRect().width + 14 : 280;
        rail.scrollBy({ left: dir * w, behavior: 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { step(-1); });
      if (next) next.addEventListener('click', function () { step(1); });

      /* pointer drag for desktop */
      var down = false, startX = 0, startL = 0;
      rail.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') return;
        down = true; startX = e.clientX; startL = rail.scrollLeft;
        rail.style.cursor = 'grabbing';
      });
      rail.addEventListener('pointermove', function (e) {
        if (!down) return;
        rail.scrollLeft = startL - (e.clientX - startX);
      });
      window.addEventListener('pointerup', function () {
        down = false; rail.style.cursor = '';
      }, { passive: true });

      sync();
    }

    /* only add the sliders if the page does not already have them */
    buildSlider('slider-stack', 'The stack', 'What we build it with.', [
      { ico:'code',   t:'Next.js & React',      d:'Server-rendered where it helps, static where it is faster. No page builder.' },
      { ico:'bolt',   t:'Static-first delivery', d:'Pre-rendered HTML served from the edge. Under two seconds on a mid-range Android.' },
      { ico:'ai',     t:'AI on the page',        d:'A trained assistant that answers, qualifies and hands off to WhatsApp.' },
      { ico:'crm',    t:'CRM built in',          d:'Leads, pipeline, quotes and GST invoices in one place you own.' },
      { ico:'phone',  t:'PWA, not an app store', d:'Installs from the browser, works offline, sends push notifications.' },
      { ico:'seo',    t:'SEO from day one',      d:'Schema, sitemaps, Bing and IndexNow. Structured for local search.' },
      { ico:'shield', t:'You own everything',    d:'Domain, accounts, data and analytics stay in your name. No lock-in.' },
      { ico:'chart',  t:'Measured, not promised',d:'GA4 events on every call, form and WhatsApp tap. You see what converted.' }
    ]);

    buildSlider('slider-work', 'Recent builds', 'What ships in seven days.', [
      { ico:'phone',  t:'Red Apple Mobile Repair', d:'315 priced repairs, WhatsApp quote wizard, AI assistant, local SEO. Live in 7 days.' },
      { ico:'crm',    t:'Lead pipeline',           d:'Structured WhatsApp capture with auto-routing and a status board.' },
      { ico:'seo',    t:'Local search',            d:'Google Business Profile, Bing Webmaster and structured data on every page.' },
      { ico:'bolt',   t:'Speed',                   d:'Static-first build, 95+ Lighthouse, under two seconds on 4G.' },
      { ico:'shield', t:'Ownership',               d:'Client holds the domain, the analytics and every customer record.' },
      { ico:'ai',     t:'Assistant',               d:'Answers pricing, warranty and turnaround questions at 11pm.' }
    ]);

  } catch (e) {
    /* decorative only — never break the page */
  }
})();

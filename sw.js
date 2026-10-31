/* Pixel Forge Studio — service worker
   Cache name is versioned. Bump V whenever any shell asset changes, otherwise
   returning visitors keep seeing the old build (that is exactly what happened
   between v74 and v76). */
const V = 'pf-v77';
const ASSETS = [
  './',
  './index.html',
  './services.html',
  './packages.html',
  './add-ons.html',
  './work.html',
  './about.html',
  './process.html',
  './faq.html',
  './contact.html',
  './assets/css/style.css',
  './assets/css/amoled.css?v=76',
  './assets/js/main.js',
  './pf-fx.js?v=1',
  './mark-192.png',
  './mark-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(V)
      .then((c) => c.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((k) => Promise.all(k.filter((x) => x !== V).map((x) => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

/* Network-first for documents and code so a deploy is visible on the next
   load. Cache is the offline fallback only. */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isShell =
    e.request.mode === 'navigate' ||
    /\.(html|css|js|json)$/.test(url.pathname);

  if (isShell) {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          const cp = r.clone();
          caches.open(V).then((c) => c.put(e.request, cp)).catch(() => {});
          return r;
        })
        .catch(() =>
          caches.match(e.request).then((r) => r || caches.match('./index.html'))
        )
    );
    return;
  }

  /* images and everything else: cache-first */
  e.respondWith(
    caches.match(e.request).then(
      (r) =>
        r ||
        fetch(e.request).then((res) => {
          const cp = res.clone();
          caches.open(V).then((c) => c.put(e.request, cp)).catch(() => {});
          return res;
        })
    )
  );
});

/* let the page force an update */
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

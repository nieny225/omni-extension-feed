const cacheName = 'headline-v1';
const staticFiles = [
  './',
  './index.html',
  './app.js',
  './styles.css',
];

self.addEventListener('install', e => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[Service Worker] Caching all: ', staticFiles);
      return cache.addAll(staticFiles);
    }),
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return r || fetch(e.request);
    }),
  );
});
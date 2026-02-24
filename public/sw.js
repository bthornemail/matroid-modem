/* WESIRI PWA Service Worker */

const VERSION = 'v1';
const PRECACHE = `wesiri-precache-${VERSION}`;
const RUNTIME = `wesiri-runtime-${VERSION}`;

const START_URL = './wesiri-modem-full-calibrated-autoqr.html';

const PRECACHE_URLS = [
  './index.html',
  START_URL,
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      await cache.addAll(PRECACHE_URLS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([PRECACHE, RUNTIME]);
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
    (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  event.respondWith(
    (async () => {
      // Navigation: network-first, offline fallback to cached START_URL.
      if (isNavigationRequest(request)) {
        try {
          const network = await fetch(request);
          const cache = await caches.open(RUNTIME);
          cache.put(request, network.clone()).catch(() => {});
          return network;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match(START_URL);
          if (fallback) return fallback;
          throw new Error('offline');
        }
      }

      // Static assets: cache-first, then network.
      const cached = await caches.match(request);
      if (cached) return cached;

      try {
        const response = await fetch(request);
        const cache = await caches.open(RUNTIME);
        cache.put(request, response.clone()).catch(() => {});
        return response;
      } catch (err) {
        // Last resort: return cached START_URL for same-origin HTML-like requests.
        if (request.destination === 'document') {
          const fallback = await caches.match(START_URL);
          if (fallback) return fallback;
        }
        throw err;
      }
    })()
  );
});

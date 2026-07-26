self.addEventListener('install', event => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  clients.claim()
})

self.addEventListener('fetch', event => {
  // Very simple network-first for API, cache-first for others could be added
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)))
})

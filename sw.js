// sw.js
const CACHE_NAME = 'kawaii-voice-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './processor.js',
  './manifest.json',
  // ここに icon-192.png などを追加
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
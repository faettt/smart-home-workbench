/* 全屋智能点位工作台 - Service Worker
 * 策略：页面导航 network-first（有网时始终拿最新版，离线回落缓存）；
 * 静态资源 cache-first；GitHub API 请求不缓存。
 * 更新说明：修改 CACHE 版本号可强制刷新全部缓存；页面采用 network-first，通常无需手动升版本。 */
const CACHE = 'smarthome-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // GitHub API 等跨域请求直连

  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req)
        .then((r) => {
          if (r && r.ok) {
            const copy = r.clone();
            e.waitUntil(caches.open(CACHE).then((c) => c.put('./index.html', copy)));
          }
          return r;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((r) => {
          if (r && r.ok) {
            const copy = r.clone();
            e.waitUntil(caches.open(CACHE).then((c) => c.put(req, copy)));
          }
          return r;
        })
    )
  );
});

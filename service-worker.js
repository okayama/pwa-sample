// configuration
const
  version = '1.0.0',
  CACHE = version + '::PWAsite',
  offlineURL = '/offline/index.html',
  installFilesEssential = [
    '/pwa-sample/',
    '/pwa-sample/manifest.json',
    '/pwa-sample/styles.css',
    '/pwa-sample/main.js',
    '/pwa-sample/offline/index.html',
    '/pwa-sample/offline/offline.css',
    '/pwa-sample/offline/offline.js',
    '/pwa-sample/pwa-logo.svg'
  ].concat(offlineURL),
  installFilesDesirable = [
    '/pwa-sample/p.html'
  ];

// install static assets
function installStaticFiles() {

  return caches.open(CACHE)
    .then(cache => {

      // cache desirable files
      cache.addAll(installFilesDesirable);

      // cache essential files
      return cache.addAll(installFilesEssential);

    });

}

// service-worker.js
// application installation
self.addEventListener('install', event => {

  console.log('service worker: install');

  // cache core files
  event.waitUntil(
    installStaticFiles()
    .then(() => self.skipWaiting())
  );

});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});

// 現状では、この処理を書かないとService Workerが有効と判定されないようです
self.addEventListener('fetch', function(event) {});

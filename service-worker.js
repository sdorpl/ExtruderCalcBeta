// ExtruderCalc


const version = "0.6.66";
const cacheName = `excalc-beta-${version}`;
//document.getElementById('appver').innerHTML = `${version}-beta`;
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/images/ico_512x512.png',
  '/images/ico_192x192.png',
  '/scripts/app.js',
  '/scripts/functions.js',
  '/css/style.css'
];

//install
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  console.log('[ExtruderCalc SW] Install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ExtruderCalc SW] Send app files to Cache');
      return cache.addAll(filesToCache)
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ExtruderCalc SW] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ExtruderCalc SW] Remove old chache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

//After install, fetch event is triggered for every page request

//self.addEventListener("fetch", function (event) {
//	console.log("Request -->", event.request.url);
//	//To tell browser to evaluate the result of event
//	event.respondWith(
//		caches.match(event.request)
//    //To match current request with cached request it
//		.then(function(response) {
//			//If response found return it, else fetch again.
//			return response || fetch(event.request);
//		}).catch(function(error) {
//			console.error("Error: ", error);
//		})
//  );
//});

//fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
    .then(cache => cache.match(event.request, {
      ignoreSearch: true
    }))
    .then(response => {
      return response || fetch(event.request);
    })
  );
});

//self.addEventListener('activate', function(e) {
//  console.log('[ServiceWorker] Activate');
//  e.waitUntil(
//    caches.keys().then(function(keyList) {
//      return Promise.all(keyList.map(function(key) {
//        if (key !== cacheName) {
//          console.log('[ServiceWorker] Removing old cache', key);
//          return caches.delete(key);
//        }
//      }));
//    })
//  );


/*
 * Fixes a corner case in which the app wasn't returning the latest data.
 * You can reproduce the corner case by commenting out the line below and
 * then doing the following steps: 1) load app for first time so that the
 * initial New York City data is shown 2) press the refresh button on the
 * app 3) go offline 4) reload the app. You expect to see the newer NYC
 * data, but you actually see the initial data. This happens because the
 * service worker is not yet activated. The code below essentially lets
 * you activate the service worker faster.
 */
//  return self.clients.claim();
//});

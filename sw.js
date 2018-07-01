

//const dataCacheName = 'currency-conversion-v1';
const cacheName = 'cache-money-v1';
const filesToCache = [
  'index.html',
  '/scripts/app.js',
  '/change.js',
  'converter.js',
  '/package.js',
  '/js/bootstrap.min.js',
  '/js/converter.js',
  '/js/jquery.slim.min.js',

];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(

    createDB()

    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
 
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://free.currencyconverterapi.com/api/v5/currencies';
  if (e.request.url.indexOf(dataUrl) > -1) {
    
    e.respondWith(
      caches.open(cacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});


function createDB(){

const idbPromise = idb.open('converter', 1, (upgradeDB)=>{
  let store= upgradeDB.createObjectStore('https://free.currencyconverterapi.com/api/v5/currencies', {
    keyPath: 'id'
  });
});



idbPromise.then((db)=>{
  let tx = db.transaction('https://free.currencyconverterapi.com/api/v5/currencies');
  let store = tx.objectStore('https://free.currencyconverterapi.com/api/v5/currencies');
  return store.getAll(); 
}).then((val)=>{
    for(key in val.results){
      console.log(val.result[key]);
    }
});

 

idbPromise.then((db)=>{
  let tx =db.transaction('https://free.currencyconverterapi.com/api/v5/currencies', 'readwrite');
  let store = tx.objectStore('https://free.currencyconverterapi.com/api/v5/currencies');
  store.put('https://free.currencyconverterapi.com/api/v5/currencies');

  return tx.complete;
}).then(()=>{
  console.log("transaction is successafully completed");
});

}

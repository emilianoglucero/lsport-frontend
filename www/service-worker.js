self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(event) {
    console.log('Network intercept example. Testing this URL for a png: ', event.request.url);
                        
 });
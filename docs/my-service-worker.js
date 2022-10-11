//install
self.addEventListener('install', function(event) {
    console.log('Service2 Worker: Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                'index.html',

            ]);
        })
    );
    //active worker





});

//active
self.addEventListener('activate', function(event) {
    console.log('Active ...', event);
    return self.clients.claim();
});

//fetch


self.addEventListener('fetch', async function(event) {

   var url =event.request.url.replace(/(&key=\w*)|(&token=\d*)/g,"");

    var ar = [
        'https://maps.googleapis.com/maps/api/place/js/Place',
        'https://maps.googleapis.com/maps/api/place/',
    ]
    //start with any of the strings in the array




    event.respondWith(
    caches.match(url).then(response => {
        if (response && ar.some(a=>url.toLowerCase().startsWith(a.toLowerCase()))) {
            //response.text().then(a=>console.log(a));

            return response;
        } else {
            return fetch(event.request)
                .then(res => caches.open('v1').then(cache => {

                    cache.put(url, res.clone());
                    return res;
                }))
                .catch(err => caches.match(event.request).then(res => res));
        }
    }));



});








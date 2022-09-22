const CACHE_NAME = 'cairo-cache-v1';

const URLS = ['./index.html'];

console.log('tut test')

self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(URLS);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),
    );
});

self.addEventListener('fetch', (event: any) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }

            const fetchRequest = event.request.clone();
            return fetch(fetchRequest).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        }),
    );
});

self.addEventListener('activate', function (event: any) {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map((name) => caches.delete(name)));
        }),
    );
});

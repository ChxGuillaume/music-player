const CACHE_NAME = "lol-songs-cache";

const CACHE_DATA = [
    ...self.__precacheManifest.map(e => e.url),
    '/',
    '/img/icons/favicon-32x32.png',
    '/img/icons/android-chrome-192x192.png',
    '/img/icons/favicon-16x16.png',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
    'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
    'https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff?v=5.8.55',
    'https://songs.nekotiki.fr/thumbnails/KDA_VILLAIN.jpg',
    'https://songs.nekotiki.fr/musics/KDA_VILLAIN.mp3',
    'https://songs.nekotiki.fr/thumbnails/KDA_MORE.jpg',
    'https://songs.nekotiki.fr/musics/KDA_MORE.mp3',
    'https://songs.nekotiki.fr/thumbnails/KDA_BADDEST.jpg',
    'https://songs.nekotiki.fr/musics/KDA_BADDEST.mp3',
    'https://songs.nekotiki.fr/thumbnails/KDA_POP_STARS.jpg',
    'https://songs.nekotiki.fr/musics/KDA_POP_STARS.mp3',
    'https://songs.nekotiki.fr/thumbnails/WARRIORS.jpg',
    'https://songs.nekotiki.fr/musics/WARRIORS.mp3',
    'https://songs.nekotiki.fr/thumbnails/RISE.jpg',
    'https://songs.nekotiki.fr/musics/RISE.mp3',
    'https://songs.nekotiki.fr/thumbnails/LEGENDS_NEVER_DIE.jpg',
    'https://songs.nekotiki.fr/musics/LEGENDS_NEVER_DIE.mp3',
    'https://songs.nekotiki.fr/thumbnails/TRUE_DAMAGE_GIANTS.jpg',
    'https://songs.nekotiki.fr/musics/TRUE_DAMAGE_GIANTS.mp3',
    'https://songs.nekotiki.fr/thumbnails/GET_JINXED.jpg',
    'https://songs.nekotiki.fr/musics/GET_JINXED.mp3',
    'https://songs.nekotiki.fr/thumbnails/PHOENIX.jpg',
    'https://songs.nekotiki.fr/musics/PHOENIX.mp3',
    'https://songs.nekotiki.fr/thumbnails/IGNITE.jpg',
    'https://songs.nekotiki.fr/musics/IGNITE.mp3',
    'https://songs.nekotiki.fr/thumbnails/AWAKEN.jpg',
    'https://songs.nekotiki.fr/musics/AWAKEN.mp3',
    'https://songs.nekotiki.fr/thumbnails/WARRIORS_CINEMATIC.jpg',
    'https://songs.nekotiki.fr/musics/WARRIORS_CINEMATIC.mp3',
    'https://songs.nekotiki.fr/thumbnails/DRUM_GO_DUM.jpg',
    'https://songs.nekotiki.fr/musics/DRUM_GO_DUM.mp3',
    'https://songs.nekotiki.fr/thumbnails/I-LL_SHOW_YOU.jpg',
    'https://songs.nekotiki.fr/musics/I-LL_SHOW_YOU.mp3',
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHE_DATA);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('Handling fetch event for', event.request.url);

    if (event.request.headers.get('range')) {
        const pos = Number(/^bytes=(\d+)-$/g.exec(event.request.headers.get('range'))[1]);
        console.log('Range request for', event.request.url, ', starting position:', pos);
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(function(cache) {
                    return cache.match(event.request.url);
                }).then(function(res) {
                if (!res) {
                    return fetch(event.request)
                        .then(res => {
                            return res.arrayBuffer();
                        });
                }
                return res.arrayBuffer();
            }).then(function(ab) {
                return new Response(
                    ab.slice(pos),
                    {
                        status: 206,
                        statusText: 'Partial Content',
                        headers: [
                            // ['Content-Type', 'video/webm'],
                            ['Content-Range', 'bytes ' + pos + '-' +
                            (ab.byteLength - 1) + '/' + ab.byteLength]]
                    });
            }));
    } else {
        console.log('Non-range request for', event.request.url);
        event.respondWith(
            // caches.match() will look for a cache entry in all of the caches available to the service worker.
            // It's an alternative to first opening a specific named cache and then matching on that.
            caches.match(event.request).then(function(response) {
                if (response) {
                    console.log('Found response in cache:', response);
                    return response;
                }
                console.log('No response found in cache. About to fetch from network...');
                // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
                // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
                return fetch(event.request).then(function(response) {
                    console.log('Response from network is:', response);

                    return response;
                }).catch(function(error) {
                    // This catch() will handle exceptions thrown from the fetch() operation.
                    // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
                    // It will return a normal response object that has the appropriate error code set.
                    console.error('Fetching failed:', error);

                    throw error;
                });
            })
        );
    }
});

// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             console.log(event.request)
//             return response || fetch(event.request);
//         })
//     );
// });
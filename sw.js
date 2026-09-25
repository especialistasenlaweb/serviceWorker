const CACHE = "mi-cache-v4";

const RECURSOS = [
    "./",
    "./sw.js",
    "./index.html",
    "./css/bootstrap.min.css",
    "./js/bootstrap.bundle.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(RECURSOS))
    );
});


self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(respuesta => {
                return respuesta || fetch(event.request);
            })
             .catch(() => {
                // opcional: devolver una página offline de respaldo
                return caches.match("/offline.html");
            })
    );

});
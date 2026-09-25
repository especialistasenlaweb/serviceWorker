const CACHE = "mi-cache-v1";

const RECURSOS = [
    "./",
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
    );

});
const CACHE_NAME = "V2";
const STATIC_CACHE_URLS = ["/", "styles.css", "scripts.js"];

self.addEventListener("install", event => {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS))
    );
});

self.addEventListener("activate", event => {
    // Delete caches que não correspondem ao atual
    event.waitUntil(
        caches
            .keys()
            .then(keys => keys.filter(key => key !== CACHE_NAME))
            .then(keys =>
                Promise.all(
                    keys.map(key => {
                        console.log(`Deleting cache ${key}`);
                        return caches.delete(key);
                    })
                )
            )
    );
});

function cache(request, response) {
    if (response.type === "error" || response.type === "opaque") {
        return Promise.resolve(); // Não armazena erros de rede
    }

    return caches
        .open(CACHE_NAME)
        .then(cache => cache.put(request, response.clone()));
}

function update(request) {
    return fetch(request.url)
        .then(response =>
            cache(request, response) // Salva no cache
                .then(() => response) // Retorna a resposta da rede
        );
}

function refresh(response) {
    return response.json().then(jsonResponse => {
        self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
            clients.forEach(client => {
                // Verifica se o cliente está visível antes de enviar mensagem
                if (client.visibilityState === 'visible') {
                    client.postMessage(
                        JSON.stringify({
                            type: response.url,
                            data: jsonResponse.data
                        })
                    );
                }
            });
        });
        return jsonResponse.data; // Retorna os dados para o Service Worker
    });
}

self.addEventListener("fetch", event => {
    if (event.request.url.includes("/api/")) {
        // Resposta para API: estratégia Cache Update Refresh
        event.respondWith(caches.match(event.request));
        event.waitUntil(update(event.request).then(refresh));
    } else {
        // Resposta para arquivos estáticos: Cache First
        event.respondWith(
            caches
                .match(event.request)
                .then(cached => cached || fetch(event.request))
                .then(response =>
                    cache(event.request, response).then(() => response)
                )
        );
    }
});

// Verifica se Background Sync é suportado
if ("sync" in self.registration) {
    self.addEventListener("sync", function (event) {
        console.log("Sync event", event);
        if (event.tag === "syncAttendees") {
            event.waitUntil(syncAttendees());
        }
    });
}

function syncAttendees() {
    return update({
        url: `https://reqres.in/api/users`
    })
        .then(refresh)
        .then(attendees =>
            self.registration.showNotification(
                `${attendees.length} attendees to the PWA Workshop`
            )
        );
}

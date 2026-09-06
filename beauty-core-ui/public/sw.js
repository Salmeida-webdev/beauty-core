const CACHE_VERSION = "beauty-core-portal-v1";
const PUBLIC_CACHE = `${CACHE_VERSION}-public`;

const PUBLIC_ASSETS = [
  "/images/portal/pwa/portal-app-icon-192.png",
  "/images/portal/pwa/portal-app-icon-512.png",
  "/images/portal/pwa/portal-app-icon-maskable-512.png",
  "/images/portal/pwa/portal-pwa-splash.webp",
  "/images/portal/states/portal-offline.webp",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PUBLIC_CACHE).then((cache) => cache.addAll(PUBLIC_ASSETS)),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("beauty-core-portal-") &&
                key !== PUBLIC_CACHE,
            )
            .map((key) => caches.delete(key)),
        ),
      ),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  if (!url.pathname.startsWith("/portal/")) {
    return;
  }

  if (
    url.pathname.startsWith("/area-cliente/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.includes("/auth/") ||
    url.pathname.includes("/session")
  ) {
    event.respondWith(fetch(request));
    return;
  }

  if (
    url.pathname.startsWith("/images/portal/") ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }

        return fetch(request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const copy = response.clone();

          void caches.open(PUBLIC_CACHE).then((cache) => {
            void cache.put(request, copy);
          });

          return response;
        });
      }),
    );

    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(
            "<!doctype html><html lang='pt-BR'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Portal offline</title></head><body><main><h1>Você está offline</h1><p>Reconecte-se para consultar seus dados do Portal.</p><img src='/images/portal/states/portal-offline.webp' alt='' width='320' height='220'></main></body></html>",
            {
              headers: {
                "Content-Type": "text/html; charset=utf-8",
              },
            },
          ),
      ),
    );
  }
});

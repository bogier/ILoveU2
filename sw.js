// public/sw.js
const CACHE = "iloveu2-v1";

// Important: on cache l'app-shell (index) au scope /ILoveU2/
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);

    // self.registration.scope = "http://localhost:4173/ILoveU2/"
    // On construit l'URL de index.html dans ce scope
    const scopeUrl = new URL(self.registration.scope);
    const indexUrl = new URL("index.html", scopeUrl).toString();

    await cache.addAll([
      indexUrl,
      // Manifest et SW sont dans le même scope
      new URL("manifest.json", scopeUrl).toString(),
    ]);

    // Prend la main plus vite
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Nettoyage simple des vieux caches
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1) Navigation SPA: offline => renvoie index.html
if (req.mode === "navigate") {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const indexKey = new URL("index.html", self.registration.scope).toString();

    try {
      const fresh = await fetch(req);
      // update cache app-shell
      cache.put(indexKey, fresh.clone());
      return fresh;
    } catch {
      const cachedIndex = await cache.match(indexKey);
      return cachedIndex || new Response("Offline", { status: 503 });
    }
  })());
  return;
}


  // 2) Assets same-origin (JS/CSS/images): cache-first + mise à jour en arrière-plan
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;

      const res = await fetch(req);
      // On cache seulement les réponses OK
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })());
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const scopeUrl = new URL(self.registration.scope);

    const indexUrl = new URL("index.html", scopeUrl).toString();
    await cache.add(indexUrl);

    try {
      await cache.add(new URL("manifest.json", scopeUrl).toString());
    } catch {
      // ok, pas bloquant
    }

    await self.skipWaiting();
  })());
});


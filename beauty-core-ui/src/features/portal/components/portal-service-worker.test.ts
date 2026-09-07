import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const serviceWorkerPath = resolve(
  process.cwd(),
  "public/sw.js",
);

const registrationPath = resolve(
  process.cwd(),
  "src/features/portal/components/portal-service-worker-registration.tsx",
);

const serviceWorker = readFileSync(
  serviceWorkerPath,
  "utf8",
);

const registration = readFileSync(
  registrationPath,
  "utf8",
);

describe("Portal Service Worker", () => {
  it("uses versioned public cache", () => {
    expect(serviceWorker).toContain("beauty-core-portal-v1");
    expect(serviceWorker).toContain("caches.open(PUBLIC_CACHE)");
    expect(serviceWorker).toContain("caches.delete(key)");
  });

  it("restricts handling to the Portal scope", () => {
    expect(serviceWorker).toContain('url.pathname.startsWith("/portal/")');
    expect(serviceWorker).toContain(
      'url.pathname.startsWith("/portal/")',
    );

    expect(registration).toContain(
      'scope: "/portal/"',
    );
  });

  it("does not cache private API responses", () => {
    expect(serviceWorker).toContain('url.pathname.startsWith("/area-cliente/")');
    expect(serviceWorker).toContain('url.pathname.startsWith("/api/")');
    expect(serviceWorker).toContain("event.respondWith(fetch(request))");
    expect(serviceWorker).not.toContain(
      'cache.put(request, response.clone())',
    );
  });

  it("does not contain tokens or session persistence", () => {
    expect(serviceWorker).not.toMatch(/localStorage|sessionStorage|accessToken|refreshToken/i);
    expect(serviceWorker).not.toMatch(/clienteId|empresaId|tenantId/i);
  });

  it("provides a generic offline response without private data", () => {
    expect(serviceWorker).toContain("Você está offline");
    expect(serviceWorker).toContain("portal-offline.webp");
    expect(serviceWorker).toContain("Reconecte-se");
  });
});

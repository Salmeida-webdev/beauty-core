import { describe, expect, it } from "vitest";

import manifest from "./manifest";

describe("Portal PWA manifest", () => {
  it("defines the approved Portal installation metadata", () => {
    const result = manifest();

    expect(result.name).toBe("Portal do Cliente");
    expect(result.short_name).toBe("Portal");
    expect(result.start_url).toBe("/portal");
    expect(result.scope).toBe("/portal/");
    expect(result.display).toBe("standalone");
    expect(result.background_color).toBe("#F8F5F0");
    expect(result.theme_color).toBe("#8B6F47");
  });

  it("defines technical icons without replacing the visual master", () => {
    const result = manifest();

    expect(result.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: "/images/portal/pwa/portal-app-icon-192.png",
          sizes: "192x192",
          purpose: "any",
        }),
        expect.objectContaining({
          src: "/images/portal/pwa/portal-app-icon-512.png",
          sizes: "512x512",
          purpose: "any",
        }),
        expect.objectContaining({
          src: "/images/portal/pwa/portal-app-icon-maskable-512.png",
          sizes: "512x512",
          purpose: "maskable",
        }),
      ]),
    );
  });

  it("does not use an administrative or external start URL", () => {
    const result = manifest();

    expect(result.start_url).not.toContain("/admin");
    expect(result.start_url).not.toMatch(/^https?:\/\//);
    expect(result.scope).toBe("/portal/");
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(
    resolve(process.cwd(), relativePath),
    "utf8",
  );
}

describe("Portal accessibility and responsive hardening", () => {
  it("keeps shell landmarks and skip navigation", () => {
    const source = read(
      "src/features/portal/components/portal-shell.tsx",
    );

    expect(source).toContain('href="#portal-main"');
    expect(source).toContain('id="portal-main"');
    expect(source).toContain("<header");
    expect(source).toContain("<main");
    expect(source).toContain("<footer");
  });

  it("keeps accessible navigation and focus behavior", () => {
    const source = read(
      "src/features/portal/components/portal-navigation.tsx",
    );

    expect(source).toContain("aria-label");
    expect(source).toContain("aria-current");
    expect(source).toContain("focus-visible");
    expect(source).toContain("motion-reduce");
    expect(source).toContain("min-h-11");
  });

  it("keeps semantic state panels and proportional images", () => {
    const source = read(
      "src/features/portal/states/portal-state-views.tsx",
    );

    expect(source).toContain("aria-labelledby");
    expect(source).toContain("aria-describedby");
    expect(source).toContain("width={320}");
    expect(source).toContain("height={320}");
    expect(source).toContain("sizes=");
  });

  it("keeps the messages page read-only and semantic", () => {
    const source = read(
      "src/app/portal/mensagens/page.tsx",
    );

    expect(source).toContain("<h1");
    expect(source).toContain("<ol");
    expect(source).toContain("<article");
    expect(source).toContain("<time");
    expect(source).toContain("maskRecipient");
    expect(source).not.toMatch(/\.post\(|\.patch\(|\.put\(|\.delete\(/);
  });

  it("announces offline state accessibly", () => {
    const source = read(
      "src/features/portal/pwa/portal-offline-indicator.tsx",
    );

    expect(source).toContain('aria-live="polite"');
    expect(source).toContain('role="status"');
    expect(source).toContain("Você está offline");
  });
});

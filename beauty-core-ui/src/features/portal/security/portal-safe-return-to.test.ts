import { describe, expect, it } from "vitest";

import {
  isSafePortalReturnTo,
  sanitizePortalReturnTo,
} from "./portal-safe-return-to";

describe("Portal safe returnTo", () => {
  it("accepts only internal Portal paths", () => {
    expect(isSafePortalReturnTo("/portal")).toBe(true);
    expect(isSafePortalReturnTo("/portal/historico")).toBe(true);
    expect(isSafePortalReturnTo("/portal/perfil")).toBe(true);
  });

  it("rejects external, administrative and protocol-based destinations", () => {
    const unsafeValues = [
      "https://evil.example/steal",
      "http://evil.example",
      "//evil.example",
      "javascript:alert(1)",
      "/admin",
      "/login",
      "portal/historico",
      "/portal\\evil.example",
    ];

    for (const value of unsafeValues) {
      expect(isSafePortalReturnTo(value)).toBe(false);
      expect(sanitizePortalReturnTo(value)).toBe("/portal");
    }
  });

  it("rejects query strings, fragments and encoded traversal", () => {
    expect(
      sanitizePortalReturnTo("/portal/historico?email=cliente@example.com"),
    ).toBe("/portal");

    expect(
      sanitizePortalReturnTo("/portal/historico#dados-privados"),
    ).toBe("/portal");

    expect(
      sanitizePortalReturnTo("/portal/%2f%2fevil.example"),
    ).toBe("/portal");
  });

  it("supports a safe internal fallback", () => {
    expect(
      sanitizePortalReturnTo("https://evil.example", "/portal/historico"),
    ).toBe("/portal/historico");

    expect(
      sanitizePortalReturnTo("https://evil.example", "/admin"),
    ).toBe("/portal");
  });

  it("does not expose arbitrary values in the result", () => {
    const maliciousValue =
      "https://evil.example/?token=secret&clienteId=private";

    const result = sanitizePortalReturnTo(maliciousValue);

    expect(result).toBe("/portal");
    expect(result).not.toContain("evil.example");
    expect(result).not.toContain("secret");
    expect(result).not.toContain("clienteId");
  });
});

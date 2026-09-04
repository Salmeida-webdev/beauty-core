import { describe, expect, it } from "vitest";

import {
  getPortalFirstAccessHref,
  PORTAL_FIRST_ACCESS_PATH,
  resolvePortalAuthRoute,
  sanitizePortalFirstAccessReturnTo,
} from "./portal-auth-routing";

describe("Portal first-access routing", () => {
  it("builds a safe first-access href", () => {
    expect(
      getPortalFirstAccessHref("/portal/historico"),
    ).toBe(
      "/portal/primeiro-acesso?returnTo=%2Fportal%2Fhistorico",
    );
  });

  it("falls back safely when returnTo is external", () => {
    expect(
      getPortalFirstAccessHref("https://evil.example"),
    ).toBe(
      "/portal/primeiro-acesso?returnTo=%2Fportal",
    );
  });

  it("does not allow first access to be bypassed by returnTo", () => {
    expect(
      resolvePortalAuthRoute({
        currentPath: "/portal",
        primeiroAcesso: true,
        returnTo: "/portal/historico",
      }),
    ).toBe(
      "/portal/primeiro-acesso?returnTo=%2Fportal%2Fhistorico",
    );
  });

  it("returns a normal user from the first-access route", () => {
    expect(
      resolvePortalAuthRoute({
        currentPath: PORTAL_FIRST_ACCESS_PATH,
        primeiroAcesso: false,
        returnTo: "/portal/historico",
      }),
    ).toBe("/portal/historico");
  });

  it("does not redirect a normal user from the regular Portal route", () => {
    expect(
      resolvePortalAuthRoute({
        currentPath: "/portal",
        primeiroAcesso: false,
        returnTo: "/admin",
      }),
    ).toBeNull();

    expect(
      sanitizePortalFirstAccessReturnTo(
        PORTAL_FIRST_ACCESS_PATH,
      ),
    ).toBe("/portal");
  });
});

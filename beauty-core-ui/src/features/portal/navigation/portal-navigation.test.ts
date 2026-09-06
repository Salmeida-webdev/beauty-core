import {
  describe,
  expect,
  it,
} from "vitest";

import { portalNavigationItems } from "./portal-navigation-config";
import {
  isPortalNavigationItemActive,
  isSafePortalHref,
} from "./portal-navigation";

describe("portal navigation utilities", () => {
  it("accepts only routes inside the Portal namespace", () => {
    expect(isSafePortalHref("/portal")).toBe(true);
    expect(isSafePortalHref("/portal/historico")).toBe(true);
    expect(isSafePortalHref("/admin")).toBe(false);
    expect(isSafePortalHref("https://externo.example")).toBe(false);
    expect(isSafePortalHref("//externo.example")).toBe(false);
  });

  it("exposes exactly the approved Portal routes", () => {
    expect(portalNavigationItems).toEqual([
      { href: "/portal", label: "Inicio" },
      { href: "/portal/perfil", label: "Perfil" },
      { href: "/portal/historico", label: "Historico" },
    ]);
    expect(portalNavigationItems.every((item) => isSafePortalHref(item.href))).toBe(true);
    expect(portalNavigationItems.some((item) => item.href === "/admin")).toBe(false);
  });

  it("calculates the active route without false positives", () => {
    expect(isPortalNavigationItemActive("/portal", "/portal")).toBe(true);
    expect(isPortalNavigationItemActive("/portal", "/portal/historico"))
      .toBe(false);
    expect(
      isPortalNavigationItemActive(
        "/portal/historico",
        "/portal/historico/detalhes",
      ),
    ).toBe(true);
  });
});
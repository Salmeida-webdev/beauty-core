import { describe, expect, it } from "vitest";

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
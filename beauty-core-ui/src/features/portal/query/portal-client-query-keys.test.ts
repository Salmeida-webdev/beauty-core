import {
  describe,
  expect,
  it,
} from "vitest";

import {
  portalClientQueryKeys,
} from "./portal-client-query-keys";

describe("portalClientQueryKeys", () => {
  it("usa somente o namespace privado da foundation", () => {
    expect(portalClientQueryKeys.all()).toEqual([
      "portal",
      "private",
    ]);
    expect(portalClientQueryKeys.dashboard()).toEqual([
      "portal",
      "private",
      "dashboard",
    ]);
    expect(portalClientQueryKeys.profile()).toEqual([
      "portal",
      "private",
      "profile",
    ]);
    expect(portalClientQueryKeys.history()).toEqual([
      "portal",
      "private",
      "history",
    ]);
  });

  it("nao inclui identidade ou tenant arbitrario nas keys", () => {
    const serialized = JSON.stringify([
      portalClientQueryKeys.dashboard(),
      portalClientQueryKeys.profile(),
      portalClientQueryKeys.history(),
    ]);

    expect(serialized).not.toContain("clienteId");
    expect(serialized).not.toContain("empresaId");
    expect(serialized).not.toContain("sid");
  });

  it("mantem recursos separados para invalidacao focalizada", () => {
    expect(
      portalClientQueryKeys.dashboard(),
    ).not.toEqual(portalClientQueryKeys.profile());
    expect(
      portalClientQueryKeys.profile(),
    ).not.toEqual(portalClientQueryKeys.history());
  });
});

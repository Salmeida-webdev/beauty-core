import {
  describe,
  expect,
  it,
} from "vitest";

import { canReadClientPackages } from "./clientes-pacotes-permissions";

describe("clientes-pacotes permissions", () => {
  it.each([
    "ADMIN",
    "GERENTE",
    "RECEPCAO",
    "PROFISSIONAL",
  ])(
    "%s pode consultar pacotes de cliente",
    (role) => {
      expect(
        canReadClientPackages(role),
      ).toBe(true);
    },
  );

  it("não inclui SUPER_ADMIN automaticamente", () => {
    expect(
      canReadClientPackages(
        "SUPER_ADMIN",
      ),
    ).toBe(false);
  });

  it("nega role ausente", () => {
    expect(
      canReadClientPackages(null),
    ).toBe(false);
  });
});

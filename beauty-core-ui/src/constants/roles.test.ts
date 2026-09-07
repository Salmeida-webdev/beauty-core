import { describe, expect, it } from "vitest";

import {
  ADMIN_ROLES,
  APP_ROLES,
  isAdminRole,
  isAppRole,
} from "@/constants/roles";

describe("roles administrativas", () => {
  it("mantém todas as roles da aplicação", () => {
    expect(APP_ROLES).toEqual([
      "SUPER_ADMIN",
      "ADMIN",
      "GERENTE",
      "RECEPCAO",
      "PROFISSIONAL",
      "CLIENTE",
    ]);
  });

  it("exclui CLIENTE das roles administrativas", () => {
    expect(ADMIN_ROLES).not.toContain("CLIENTE");
    expect(ADMIN_ROLES).toContain("SUPER_ADMIN");
  });

  it("valida roles conhecidas em runtime", () => {
    expect(isAppRole("CLIENTE")).toBe(true);
    expect(isAppRole("DESCONHECIDA")).toBe(false);
    expect(isAppRole(null)).toBe(false);
  });

  it("aceita somente roles administrativas no painel", () => {
    expect(isAdminRole("ADMIN")).toBe(true);
    expect(isAdminRole("CLIENTE")).toBe(false);
    expect(isAdminRole(undefined)).toBe(false);
  });
});

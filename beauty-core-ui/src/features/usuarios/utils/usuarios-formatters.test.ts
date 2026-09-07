import { describe, expect, it } from "vitest";

import {
  formatUsuarioRole,
  formatUsuarioUltimoLogin,
} from "@/features/usuarios/utils/usuarios-formatters";

describe("usuarios formatters", () => {
  it("traduz roles", () => {
    expect(formatUsuarioRole("SUPER_ADMIN")).toBe("Super administrador");

    expect(formatUsuarioRole("ADMIN")).toBe("Administrador");

    expect(formatUsuarioRole("GERENTE")).toBe("Gerente");

    expect(formatUsuarioRole("RECEPCAO")).toBe("Recepção");

    expect(formatUsuarioRole("PROFISSIONAL")).toBe("Profissional");
  });

  it("representa ausencia de login", () => {
    expect(formatUsuarioUltimoLogin(null)).toBe("Nunca");
  });

  it("formata data valida", () => {
    expect(formatUsuarioUltimoLogin("2026-08-28T15:00:00.000Z")).not.toBe(
      "\u2014",
    );
  });

  it("protege data invalida", () => {
    expect(formatUsuarioUltimoLogin("invalida")).toBe("\u2014");
  });
});

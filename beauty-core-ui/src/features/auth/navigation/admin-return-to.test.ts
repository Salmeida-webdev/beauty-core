import {
  describe,
  expect,
  it,
} from "vitest";
import {
  buildAdminLoginHref,
  getAdminReturnToFromSearch,
  normalizeAdminReturnTo,
} from "@/features/auth/navigation/admin-return-to";

describe("admin returnTo", () => {
  it("preserva rota administrativa interna", () => {
    expect(
      normalizeAdminReturnTo(
        "/agenda?view=week#segunda",
      ),
    ).toBe(
      "/agenda?view=week#segunda",
    );
  });

  it("usa dashboard quando o destino está ausente", () => {
    expect(
      normalizeAdminReturnTo(null),
    ).toBe("/dashboard");

    expect(
      normalizeAdminReturnTo(undefined),
    ).toBe("/dashboard");

    expect(
      normalizeAdminReturnTo(""),
    ).toBe("/dashboard");
  });

  it("rejeita URL externa absoluta", () => {
    expect(
      normalizeAdminReturnTo(
        "https://site-malicioso.com",
      ),
    ).toBe("/dashboard");
  });

  it("rejeita URL protocol-relative", () => {
    expect(
      normalizeAdminReturnTo(
        "//site-malicioso.com",
      ),
    ).toBe("/dashboard");
  });

  it("rejeita destino com barra invertida", () => {
    expect(
      normalizeAdminReturnTo(
        "/dashboard\\evil",
      ),
    ).toBe("/dashboard");
  });

  it("impede loop para a própria rota de login", () => {
    expect(
      normalizeAdminReturnTo("/login"),
    ).toBe("/dashboard");

    expect(
      normalizeAdminReturnTo(
        "/login/reset",
      ),
    ).toBe("/dashboard");
  });

  it("codifica returnTo ao montar o href de login", () => {
    expect(
      buildAdminLoginHref(
        "/agenda?view=week",
      ),
    ).toBe(
      "/login?returnTo=%2Fagenda%3Fview%3Dweek",
    );
  });

  it("extrai returnTo seguro da query string", () => {
    expect(
      getAdminReturnToFromSearch(
        "?returnTo=%2Fclientes%3Fpage%3D2",
      ),
    ).toBe("/clientes?page=2");
  });

  it("descarta returnTo externo vindo da query string", () => {
    expect(
      getAdminReturnToFromSearch(
        "?returnTo=https%3A%2F%2Fevil.example",
      ),
    ).toBe("/dashboard");
  });
});

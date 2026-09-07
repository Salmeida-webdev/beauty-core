import { beforeEach, describe, expect, it } from "vitest";

import { getAuthState } from "@/stores/auth-store";

describe("auth-store", () => {
  beforeEach(() => {
    getAuthState().clearSession();
  });

  it("inicia sem identidade autenticada", () => {
    expect(getAuthState().status).toBe("idle");
    expect(getAuthState().user).toBeNull();
  });

  it("marca o início da restauração", () => {
    getAuthState().beginSessionRestore();
    expect(getAuthState().status).toBe("restoring");
  });

  it("armazena a identidade resumida", () => {
    getAuthState().setAuthenticated({
      id: "usuario-1",
      nome: "Administrador",
      email: "admin@beautycore.com.br",
      role: "ADMIN",
      empresaId: "empresa-1",
      sessaoId: "sessao-1",
    });

    expect(getAuthState().status).toBe("authenticated");
    expect(getAuthState().user?.role).toBe("ADMIN");
    expect(getAuthState().user?.empresaId).toBe("empresa-1");
  });

  it("remove a identidade ao sair", () => {
    getAuthState().setAuthenticated({
      id: "usuario-1",
      email: "admin@beautycore.com.br",
      role: "ADMIN",
      empresaId: "empresa-1",
    });

    getAuthState().setUnauthenticated();

    expect(getAuthState().status).toBe("unauthenticated");
    expect(getAuthState().user).toBeNull();
  });

  it("restaura o estado inicial", () => {
    getAuthState().setUnauthenticated();
    getAuthState().clearSession();

    expect(getAuthState().status).toBe("idle");
    expect(getAuthState().user).toBeNull();
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  publicClient: {
    post: vi.fn(),
  },
  apiClient: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

vi.mock("@/services/api/api-client", () => ({
  getPublicApiClient: vi.fn(() => mocks.publicClient),
  getApiClient: vi.fn(() => mocks.apiClient),
}));

import {
  portalAuthApi,
} from "./portal-auth-api";

import {
  portalAuthQueryKeys,
} from "./portal-auth-contracts";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("portalAuthApi", () => {
  it("solicita OTP pela rota pública tenant-aware sem enviar empresaId", async () => {
    const response = {
      data: {
        message: "Código gerado com sucesso.",
        empresa: {
          empresaId: "empresa-real",
          nome: "Beauty Demo",
          slug: "beauty-demo",
          dominio: null,
          logo: null,
        },
        codigoDesenvolvimento: "123456",
      },
    };

    mocks.publicClient.post.mockResolvedValueOnce(response);

    await portalAuthApi.requestOtp({
      slug: "beauty-demo",
      telefone: "83999999999",
    });

    expect(mocks.publicClient.post).toHaveBeenCalledWith(
      "/public/beauty-demo/auth-cliente/solicitar-codigo",
      {
        telefone: "83999999999",
      },
    );

    expect(
      JSON.stringify(mocks.publicClient.post.mock.calls[0][1]),
    ).not.toContain("empresaId");
  });

  it("verifica OTP pela mesma rota pública e preserva somente os campos contratuais", async () => {
    mocks.publicClient.post.mockResolvedValueOnce({
      data: {
        access_token: "access-token",
        refresh_token: "refresh-token",
        primeiroAcesso: true,
        empresa: {
          empresaId: "empresa-real",
          nome: "Beauty Demo",
          slug: "beauty-demo",
          dominio: null,
          logo: null,
        },
        cliente: {
          id: "cliente-real",
          nome: "Maria",
          telefone: "83999999999",
          empresaId: "empresa-real",
          aceitouTermos: false,
        },
      },
    });

    const result = await portalAuthApi.verifyOtp({
      slug: "beauty-demo",
      telefone: "83999999999",
      codigo: "123456",
    });

    expect(mocks.publicClient.post).toHaveBeenCalledWith(
      "/public/beauty-demo/auth-cliente/verificar-codigo",
      {
        telefone: "83999999999",
        codigo: "123456",
      },
    );

    expect(result.access_token).toBe("access-token");
    expect(result.refresh_token).toBe("refresh-token");
    expect(result.primeiroAcesso).toBe(true);
  });

  it("usa o contrato real de refresh com refreshToken no body", async () => {
    mocks.publicClient.post.mockResolvedValueOnce({
      data: {
        access_token: "new-access-token",
        refresh_token: "new-refresh-token",
      },
    });

    await portalAuthApi.refresh({
      refreshToken: "refresh-token",
    });

    expect(mocks.publicClient.post).toHaveBeenCalledWith(
      "/auth-cliente/refresh",
      {
        refreshToken: "refresh-token",
      },
    );
  });

  it("usa o contrato real de logout da sessão atual", async () => {
    mocks.apiClient.post.mockResolvedValueOnce({
      data: {
        message: "Logout realizado com sucesso.",
      },
    });

    await portalAuthApi.logout({
      refreshToken: "refresh-token",
    });

    expect(mocks.apiClient.post).toHaveBeenCalledWith(
      "/auth-cliente/logout",
      {
        refreshToken: "refresh-token",
      },
    );
  });

  it("usa logout-all sem inventar payload", async () => {
    mocks.apiClient.post.mockResolvedValueOnce({
      data: {
        message: "Logout realizado com sucesso.",
      },
    });

    await portalAuthApi.logoutAll();

    expect(mocks.apiClient.post).toHaveBeenCalledWith(
      "/auth-cliente/logout-all",
    );
  });

  it("consulta me e aceita termos pelos endpoints privados reais", async () => {
    mocks.apiClient.get.mockResolvedValueOnce({
      data: {
        id: "cliente-real",
        nome: "Maria",
        telefone: "83999999999",
        email: "maria@example.com",
        empresaId: "empresa-real",
        primeiroAcesso: true,
        aceitouTermos: false,
        dataAceiteTermos: null,
      },
    });

    mocks.apiClient.post.mockResolvedValueOnce({
      data: {
        id: "cliente-real",
        nome: "Maria",
        telefone: "83999999999",
        empresaId: "empresa-real",
        aceitouTermos: true,
        dataAceiteTermos: "2026-09-04T20:00:00.000Z",
      },
    });

    await portalAuthApi.me();
    await portalAuthApi.acceptTerms({
      aceitouTermos: true,
    });

    expect(mocks.apiClient.get).toHaveBeenCalledWith(
      "/auth-cliente/me",
    );

    expect(mocks.apiClient.post).toHaveBeenCalledWith(
      "/auth-cliente/aceitar-termos",
      {
        aceitouTermos: true,
      },
    );
  });

  it("mantém a chave de auth sem empresaId arbitrário", () => {
    expect(portalAuthQueryKeys.me()).toEqual([
      "portal",
      "auth",
      "me",
    ]);

    expect(
      JSON.stringify(portalAuthQueryKeys.me()),
    ).not.toContain("empresaId");
  });
});
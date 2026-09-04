import { beforeEach, describe, expect, it, vi } from "vitest";

import type {
  PortalVerifyOtpResponse,
} from "./portal-auth-contracts";

const mocks = vi.hoisted(() => ({
  getAccessToken: vi.fn(),
  getRefreshToken: vi.fn(),
  setTokens: vi.fn(),
  clearTokens: vi.fn(),
  refresh: vi.fn(),
  me: vi.fn(),
  logout: vi.fn(),
  logoutAll: vi.fn(),
}));

vi.mock("@/services/auth/token-storage", () => ({
  tokenStorage: {
    getAccessToken: mocks.getAccessToken,
    getRefreshToken: mocks.getRefreshToken,
    setTokens: mocks.setTokens,
    clearTokens: mocks.clearTokens,
  },
}));

vi.mock("./portal-auth-api", () => ({
  portalAuthApi: {
    refresh: mocks.refresh,
    me: mocks.me,
    logout: mocks.logout,
    logoutAll: mocks.logoutAll,
  },
}));

import {
  clearPortalSession,
  hasPortalSession,
  logoutAllPortalSessions,
  logoutPortalSession,
  restorePortalSession,
  startPortalSession,
} from "./portal-auth-session";

function createToken(payload: Record<string, unknown>): string {
  const encoded = Buffer.from(
    JSON.stringify(payload),
  ).toString("base64url");

  return `header.${encoded}.signature`;
}

const accessToken = createToken({
  sub: "cliente-real",
  clienteId: "cliente-real",
  empresaId: "empresa-real",
  sid: "sessao-real",
  iat: 1000,
  exp: 1900,
});

const refreshedAccessToken = createToken({
  sub: "cliente-real",
  clienteId: "cliente-real",
  empresaId: "empresa-real",
  sid: "sessao-renovada",
  iat: 2000,
  exp: 2900,
});

const otpResponse: PortalVerifyOtpResponse = {
  access_token: accessToken,
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
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getAccessToken.mockReturnValue(null);
  mocks.getRefreshToken.mockReturnValue(null);
});

describe("portal-auth-session", () => {
  it("não restaura quando não existem tokens", async () => {
    expect(await restorePortalSession()).toBeNull();
    expect(mocks.me).not.toHaveBeenCalled();
  });

  it("inicia sessão usando identidade real e expiração do JWT", () => {
    const identity = startPortalSession(otpResponse);

    expect(identity).toEqual({
      clienteId: "cliente-real",
      empresaId: "empresa-real",
      sid: "sessao-real",
    });

    expect(mocks.setTokens).toHaveBeenCalledWith({
      accessToken,
      refreshToken: "refresh-token",
      expiresInSeconds: 900,
    });
  });

  it("renova sessão quando existe somente refresh token", async () => {
    mocks.getRefreshToken.mockReturnValue("refresh-antigo");

    mocks.refresh.mockResolvedValue({
      access_token: refreshedAccessToken,
      refresh_token: "refresh-novo",
    });

    mocks.me.mockResolvedValue({
      id: "cliente-real",
      nome: "Maria",
      telefone: "83999999999",
      email: null,
      empresaId: "empresa-real",
      primeiroAcesso: false,
      aceitouTermos: true,
      dataAceiteTermos: "2026-09-04T20:00:00.000Z",
    });

    const identity = await restorePortalSession();

    expect(mocks.refresh).toHaveBeenCalledWith({
      refreshToken: "refresh-antigo",
    });

    expect(mocks.me).toHaveBeenCalledTimes(1);
    expect(identity).toEqual({
      clienteId: "cliente-real",
      empresaId: "empresa-real",
      sid: "sessao-renovada",
    });

    expect(mocks.setTokens).toHaveBeenCalledWith({
      accessToken: refreshedAccessToken,
      refreshToken: "refresh-novo",
      expiresInSeconds: 900,
    });
  });

  it("limpa a sessão local quando o logout atual falha", async () => {
    mocks.getRefreshToken.mockReturnValue("refresh-token");
    mocks.logout.mockRejectedValue(new Error("Servidor indisponível"));

    await expect(logoutPortalSession()).rejects.toThrow(
      "Servidor indisponível",
    );

    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
  });

  it("executa logout-all e limpa a sessão local", async () => {
    mocks.logoutAll.mockResolvedValue({
      message: "Logout realizado com sucesso.",
    });

    await logoutAllPortalSessions();

    expect(mocks.logoutAll).toHaveBeenCalledTimes(1);
    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
  });

  it("permite verificar e limpar a existência de sessão", () => {
    mocks.getAccessToken.mockReturnValue("access-token");

    expect(hasPortalSession()).toBe(true);

    clearPortalSession();

    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
  });
});
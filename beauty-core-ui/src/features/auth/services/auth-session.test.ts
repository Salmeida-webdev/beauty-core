import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type {
  LoginResponse,
} from "@/features/auth/types/auth.types";
import { getAuthState } from "@/stores/auth-store";

const mocks = vi.hoisted(() => ({
  loginAdmin: vi.fn(),
  logoutAdmin: vi.fn(),
  logoutAllAdminSessions: vi.fn(),
  getAuthenticatedAdminProfile:
    vi.fn(),
  refreshAccessToken: vi.fn(),
  getRefreshToken: vi.fn(),
  getAccessToken: vi.fn(),
  setTokens: vi.fn(),
  clearTokens: vi.fn(),
}));

vi.mock(
  "@/features/auth/services/auth-api",
  () => ({
    loginAdmin:
      mocks.loginAdmin,

    logoutAdmin:
      mocks.logoutAdmin,

    logoutAllAdminSessions:
      mocks.logoutAllAdminSessions,

    getAuthenticatedAdminProfile:
      mocks.getAuthenticatedAdminProfile,
  }),
);

vi.mock(
  "@/services/auth/refresh-coordinator",
  () => ({
    refreshAccessToken:
      mocks.refreshAccessToken,
  }),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getPublicApiClient: () => ({}),
  }),
);

vi.mock(
  "@/services/auth/token-storage",
  () => ({
    tokenStorage: {
      getRefreshToken:
        mocks.getRefreshToken,

      getAccessToken:
        mocks.getAccessToken,

      setTokens:
        mocks.setTokens,

      clearTokens:
        mocks.clearTokens,
    },
  }),
);

import {
  authenticateAdmin,
  clearLocalAdminSession,
  terminateAllAdminSessions,
  terminateCurrentAdminSession,
} from "@/features/auth/services/auth-session";

const LOGIN_RESPONSE:
  LoginResponse = {
    access_token: "access-token",
    refresh_token: "refresh-token",
    expires_in: 900,
    usuario: {
      id: "user-1",
      nome: "Administrador",
      email: "admin@example.com",
      role: "ADMIN",
      empresaId: "company-1",
    },
  };

beforeEach(() => {
  vi.clearAllMocks();

  getAuthState()
    .clearSession();

  mocks.getRefreshToken
    .mockReturnValue(
      "refresh-token",
    );

  mocks.getAccessToken
    .mockReturnValue(
      "access-token",
    );
});

describe("auth-session", () => {
  it("carrega sessaoId após autenticação", async () => {
    mocks.loginAdmin
      .mockResolvedValue(
        LOGIN_RESPONSE,
      );

    mocks.getAuthenticatedAdminProfile
      .mockResolvedValue({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
        sessaoId: "session-123",
      });

    const identity =
      await authenticateAdmin({
        email: "admin@example.com",
        senha: "senha-segura",
      });

    expect(
      mocks.setTokens,
    ).toHaveBeenCalledWith({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      expiresInSeconds: 900,
    });

    expect(
      identity.sessaoId,
    ).toBe("session-123");

    expect(
      getAuthState()
        .user
        ?.sessaoId,
    ).toBe("session-123");

    expect(
      getAuthState().status,
    ).toBe("authenticated");
  });

  it("limpa autenticação se não conseguir carregar o perfil após login", async () => {
    mocks.loginAdmin
      .mockResolvedValue(
        LOGIN_RESPONSE,
      );

    mocks.getAuthenticatedAdminProfile
      .mockRejectedValue(
        new Error(
          "Falha ao carregar perfil",
        ),
      );

    await expect(
      authenticateAdmin({
        email: "admin@example.com",
        senha: "senha-segura",
      }),
    ).rejects.toThrow(
      "Falha ao carregar perfil",
    );

    expect(
      mocks.clearTokens,
    ).toHaveBeenCalled();

    expect(
      getAuthState().status,
    ).toBe("unauthenticated");
  });

  it("encerra a sessão atual e limpa estado local", async () => {
    getAuthState()
      .setAuthenticated({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
      });

    mocks.logoutAdmin
      .mockResolvedValue({
        message:
          "Sessão encerrada",
      });

    await terminateCurrentAdminSession();

    expect(
      mocks.logoutAdmin,
    ).toHaveBeenCalledWith(
      {
        refreshToken:
          "refresh-token",
      },
      undefined,
    );

    expect(
      mocks.clearTokens,
    ).toHaveBeenCalled();

    expect(
      getAuthState().status,
    ).toBe("unauthenticated");

    expect(
      getAuthState().user,
    ).toBeNull();
  });

  it("limpa sessão local mesmo quando logout atual falha no servidor", async () => {
    getAuthState()
      .setAuthenticated({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
      });

    mocks.logoutAdmin
      .mockRejectedValue(
        new Error(
          "Servidor indisponível",
        ),
      );

    await expect(
      terminateCurrentAdminSession(),
    ).rejects.toThrow(
      "Servidor indisponível",
    );

    expect(
      mocks.clearTokens,
    ).toHaveBeenCalled();

    expect(
      getAuthState().status,
    ).toBe("unauthenticated");
  });

  it("encerra todas as sessões e limpa estado local", async () => {
    getAuthState()
      .setAuthenticated({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
      });

    mocks.logoutAllAdminSessions
      .mockResolvedValue({
        message:
          "Sessões encerradas",
        totalRevogadas: 3,
      });

    const result =
      await terminateAllAdminSessions();

    expect(
      result.totalRevogadas,
    ).toBe(3);

    expect(
      mocks.logoutAllAdminSessions,
    ).toHaveBeenCalledWith(
      undefined,
    );

    expect(
      mocks.clearTokens,
    ).toHaveBeenCalled();

    expect(
      getAuthState().status,
    ).toBe("unauthenticated");
  });

  it("limpa sessão local mesmo quando logout global falha", async () => {
    getAuthState()
      .setAuthenticated({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
      });

    mocks.logoutAllAdminSessions
      .mockRejectedValue(
        new Error(
          "Falha global",
        ),
      );

    await expect(
      terminateAllAdminSessions(),
    ).rejects.toThrow(
      "Falha global",
    );

    expect(
      mocks.clearTokens,
    ).toHaveBeenCalled();

    expect(
      getAuthState().status,
    ).toBe("unauthenticated");
  });

  it("limpa sessão administrativa local explicitamente", () => {
    getAuthState()
      .setAuthenticated({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
      });

    clearLocalAdminSession();

    expect(
      mocks.clearTokens,
    ).toHaveBeenCalled();

    expect(
      getAuthState().status,
    ).toBe("unauthenticated");

    expect(
      getAuthState().user,
    ).toBeNull();
  });
});

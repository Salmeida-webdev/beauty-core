const REFRESH_TOKEN_STORAGE_KEY = "beauty-core:admin:refresh-token";
const DEFAULT_SAFETY_WINDOW_MS = 30_000;

let accessToken: string | null = null;
let accessTokenExpiresAt: number | null = null;

type SetTokensParams = {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
};

function canUseSessionStorage(): boolean {
  return typeof window !== "undefined";
}

function readRefreshToken(): string | null {
  if (!canUseSessionStorage()) {
    return null;
  }

  try {
    return window.sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeRefreshToken(token: string): void {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
  } catch {
    // O navegador pode bloquear o storage em contextos restritos.
  }
}

function removeRefreshToken(): void {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  } catch {
    // A limpeza em memória continua sendo executada.
  }
}

export const tokenStorage = {
  getAccessToken(): string | null {
    return accessToken;
  },

  getRefreshToken(): string | null {
    return readRefreshToken();
  },

  getAccessTokenExpiresAt(): number | null {
    return accessTokenExpiresAt;
  },

  hasUsableAccessToken(
    safetyWindowMs = DEFAULT_SAFETY_WINDOW_MS,
  ): boolean {
    if (!accessToken || !accessTokenExpiresAt) {
      return false;
    }

    return accessTokenExpiresAt - safetyWindowMs > Date.now();
  },

  setAccessToken(token: string, expiresInSeconds: number): void {
    accessToken = token;
    accessTokenExpiresAt = Date.now() + expiresInSeconds * 1_000;
  },

  setRefreshToken(token: string): void {
    writeRefreshToken(token);
  },

  setTokens({
    accessToken: nextAccessToken,
    refreshToken,
    expiresInSeconds,
  }: SetTokensParams): void {
    accessToken = nextAccessToken;
    accessTokenExpiresAt = Date.now() + expiresInSeconds * 1_000;
    writeRefreshToken(refreshToken);
  },

  clearAccessToken(): void {
    accessToken = null;
    accessTokenExpiresAt = null;
  },

  clearTokens(): void {
    accessToken = null;
    accessTokenExpiresAt = null;
    removeRefreshToken();
  },
};

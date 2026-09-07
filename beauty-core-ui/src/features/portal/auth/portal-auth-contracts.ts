export type PortalTenantSummary = Readonly<{
  empresaId: string;
  nome: string;
  slug: string;
  dominio: string | null;
  logo: string | null;
}>;

export type PortalOtpRequest = Readonly<{
  slug: string;
  telefone: string;
}>;

export type PortalOtpRequestResponse = Readonly<{
  message: string;
  empresa: PortalTenantSummary;
  codigoDesenvolvimento?: string;
}>;

export type PortalVerifyOtpRequest = Readonly<{
  slug: string;
  telefone: string;
  codigo: string;
}>;

export type PortalClientSummary = Readonly<{
  id: string;
  nome: string;
  telefone: string;
  email?: string | null;
  empresaId: string;
  aceitouTermos: boolean;
  dataAceiteTermos?: string | null;
}>;

export type PortalVerifyOtpResponse = Readonly<{
  access_token: string;
  refresh_token: string;
  primeiroAcesso: boolean;
  empresa: PortalTenantSummary;
  cliente: PortalClientSummary;
}>;

export type PortalRefreshTokenRequest = Readonly<{
  refreshToken: string;
}>;

export type PortalRefreshTokenResponse = Readonly<{
  access_token: string;
  refresh_token: string;
}>;

export type PortalLogoutRequest = Readonly<{
  refreshToken: string;
}>;

export type PortalLogoutResponse = Readonly<{
  message: string;
}>;

export type PortalMeResponse = Readonly<{
  id: string;
  nome: string;
  telefone: string;
  email: string | null;
  empresaId: string;
  primeiroAcesso: boolean;
  aceitouTermos: boolean;
  dataAceiteTermos: string | null;
}>;

export type PortalTermsAcceptanceRequest = Readonly<{
  aceitouTermos: boolean;
}>;

export type PortalTermsAcceptanceResponse = Readonly<{
  id: string;
  nome: string;
  telefone: string;
  empresaId: string;
  aceitouTermos: boolean;
  dataAceiteTermos: string | null;
}>;

export const portalAuthQueryKeys = {
  all: ["portal", "auth"] as const,

  me: () => [...portalAuthQueryKeys.all, "me"] as const,
} as const;
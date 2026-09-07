import type { AdminRole } from "@/constants/roles";

export type LoginRequest = {
  email: string;
  senha: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type LogoutRequest = RefreshTokenRequest;

export type AuthUser = {
  id: string;
  nome: string;
  email: string;
  role: AdminRole;
  empresaId: string | null;
  ativo?: boolean;
  ultimoLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  usuario: AuthUser;
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type AuthenticatedProfile = {
  id: string;
  email: string;
  role: AdminRole;
  empresaId: string | null;
  sessaoId: string;
};

export type AdminSession = {
  id: string;
  ip: string | null;
  dispositivo: string | null;
  sistemaOperacional: string | null;
  navegador: string | null;
  ultimaAtividade: string;
  expiraEm: string;
  createdAt: string;
};

export type MessageResponse = {
  message: string;
};

export type LogoutAllResponse = MessageResponse & {
  totalRevogadas: number;
};

export type AdminSessionIdentity = {
  id: string;
  nome?: string;
  email: string;
  role: AdminRole;
  empresaId: string | null;
  sessaoId?: string;
};


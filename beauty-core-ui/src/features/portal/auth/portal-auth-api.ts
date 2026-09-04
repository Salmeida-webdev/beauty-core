import {
  getApiClient,
  getPublicApiClient,
} from "@/services/api/api-client";

import type {
  PortalLogoutRequest,
  PortalLogoutResponse,
  PortalMeResponse,
  PortalOtpRequest,
  PortalOtpRequestResponse,
  PortalRefreshTokenRequest,
  PortalRefreshTokenResponse,
  PortalTermsAcceptanceRequest,
  PortalTermsAcceptanceResponse,
  PortalVerifyOtpRequest,
  PortalVerifyOtpResponse,
} from "./portal-auth-contracts";

function getPublicAuthClientePath(slug: string): string {
  return `/public/${encodeURIComponent(slug)}/auth-cliente`;
}

export const portalAuthApi = {
  async requestOtp(
    request: PortalOtpRequest,
  ): Promise<PortalOtpRequestResponse> {
    const response = await getPublicApiClient().post<PortalOtpRequestResponse>(
      `${getPublicAuthClientePath(request.slug)}/solicitar-codigo`,
      {
        telefone: request.telefone,
      },
    );

    return response.data;
  },

  async verifyOtp(
    request: PortalVerifyOtpRequest,
  ): Promise<PortalVerifyOtpResponse> {
    const response = await getPublicApiClient().post<PortalVerifyOtpResponse>(
      `${getPublicAuthClientePath(request.slug)}/verificar-codigo`,
      {
        telefone: request.telefone,
        codigo: request.codigo,
      },
    );

    return response.data;
  },

  async refresh(
    request: PortalRefreshTokenRequest,
  ): Promise<PortalRefreshTokenResponse> {
    const response =
      await getPublicApiClient().post<PortalRefreshTokenResponse>(
        "/auth-cliente/refresh",
        {
          refreshToken: request.refreshToken,
        },
      );

    return response.data;
  },

  async logout(
    request: PortalLogoutRequest,
  ): Promise<PortalLogoutResponse> {
    const response = await getApiClient().post<PortalLogoutResponse>(
      "/auth-cliente/logout",
      {
        refreshToken: request.refreshToken,
      },
    );

    return response.data;
  },

  async logoutAll(): Promise<PortalLogoutResponse> {
    const response = await getApiClient().post<PortalLogoutResponse>(
      "/auth-cliente/logout-all",
    );

    return response.data;
  },

  async me(): Promise<PortalMeResponse> {
    const response = await getApiClient().get<PortalMeResponse>(
      "/auth-cliente/me",
    );

    return response.data;
  },

  async acceptTerms(
    request: PortalTermsAcceptanceRequest,
  ): Promise<PortalTermsAcceptanceResponse> {
    const response =
      await getApiClient().post<PortalTermsAcceptanceResponse>(
        "/auth-cliente/aceitar-termos",
        {
          aceitouTermos: request.aceitouTermos,
        },
      );

    return response.data;
  },
};
import {
  getApiClient,
} from "@/services/api/api-client";

import type {
  PortalDashboard,
  PortalHistory,
  PortalProfile,
  PortalProfileUpdateInput,
} from "../contracts/portal-client-contracts";
import {
  adaptPortalDashboard,
  adaptPortalHistory,
  adaptPortalProfile,
  normalizePortalProfileUpdate,
  portalDashboardTransportSchema,
  portalHistoryTransportSchema,
  portalProfileTransportSchema,
} from "../contracts/portal-client-adapters";

export const PORTAL_CLIENT_ENDPOINTS = {
  dashboard: "/area-cliente/me/dashboard",
  profile: "/area-cliente/me/perfil",
  history: "/area-cliente/me/historico",
} as const;

export async function getPortalDashboard(): Promise<PortalDashboard> {
  const response = await getApiClient().get<unknown>(
    PORTAL_CLIENT_ENDPOINTS.dashboard,
  );

  return adaptPortalDashboard(response.data);
}

export async function getPortalProfile(): Promise<PortalProfile> {
  const response = await getApiClient().get<unknown>(
    PORTAL_CLIENT_ENDPOINTS.profile,
  );

  return adaptPortalProfile(response.data);
}

export async function updatePortalProfile(
  input: PortalProfileUpdateInput,
): Promise<PortalProfile> {
  const payload = normalizePortalProfileUpdate(input);
  const response = await getApiClient().patch<unknown>(
    PORTAL_CLIENT_ENDPOINTS.profile,
    payload,
  );

  return adaptPortalProfile(response.data);
}

export async function getPortalHistory(): Promise<PortalHistory> {
  const response = await getApiClient().get<unknown>(
    PORTAL_CLIENT_ENDPOINTS.history,
  );

  return adaptPortalHistory(response.data);
}

export const portalClientApi = {
  dashboard: getPortalDashboard,
  profile: getPortalProfile,
  updateProfile: updatePortalProfile,
  history: getPortalHistory,
} as const;

export {
  portalDashboardTransportSchema,
  portalHistoryTransportSchema,
  portalProfileTransportSchema,
};

import { getApiClient } from "@/services/api/api-client";

import {
  portalBenefitsSchema,
  portalLoyaltySchema,
  portalPointsResponseSchema,
  type PortalBenefits,
  type PortalLoyalty,
  type PortalPointsResponse,
} from "../contracts/portal-loyalty-contracts";

export const PORTAL_LOYALTY_ENDPOINTS = {
  loyalty: "/area-cliente/me/fidelidade",
  points: "/area-cliente/me/pontos",
  benefits: "/area-cliente/me/beneficios",
} as const;

export async function getPortalLoyalty(): Promise<PortalLoyalty> {
  const response = await getApiClient().get<unknown>(
    PORTAL_LOYALTY_ENDPOINTS.loyalty,
  );

  return portalLoyaltySchema.parse(response.data);
}

export async function getPortalPoints(params?: {
  page?: number;
  limit?: number;
}): Promise<PortalPointsResponse> {
  const response = await getApiClient().get<unknown>(
    PORTAL_LOYALTY_ENDPOINTS.points,
    { params },
  );

  return portalPointsResponseSchema.parse(response.data);
}

export async function getPortalBenefits(): Promise<PortalBenefits> {
  const response = await getApiClient().get<unknown>(
    PORTAL_LOYALTY_ENDPOINTS.benefits,
  );

  return portalBenefitsSchema.parse(response.data);
}

export const portalLoyaltyApi = {
  loyalty: getPortalLoyalty,
  points: getPortalPoints,
  benefits: getPortalBenefits,
} as const;

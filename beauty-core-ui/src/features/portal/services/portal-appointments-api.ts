import { getApiClient } from "@/services/api/api-client";

import type { PortalAppointmentsResponse } from "../contracts/portal-appointments-contracts";
import { adaptPortalAppointments } from "../contracts/portal-appointments-adapters";

export const PORTAL_APPOINTMENTS_ENDPOINTS = {
  list: "/area-cliente/me/agendamentos",
  upcoming: "/area-cliente/me/proximos-agendamentos",
  latest: "/area-cliente/me/ultimo-agendamento",
} as const;

export async function getPortalAppointments(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<PortalAppointmentsResponse> {
  const response = await getApiClient().get<unknown>(
    PORTAL_APPOINTMENTS_ENDPOINTS.list,
    { params },
  );

  return adaptPortalAppointments(response.data);
}

export const portalAppointmentsApi = {
  list: getPortalAppointments,
} as const;

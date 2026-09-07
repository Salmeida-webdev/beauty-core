import { useQuery } from "@tanstack/react-query";

import { usePortalQueryGate } from "./portal-query-gate";
import { portalClientQueryKeys } from "./portal-client-query-keys";
import { getPortalAppointments } from "../services/portal-appointments-api";

export function usePortalAppointmentsQuery(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  const enabled = usePortalQueryGate();

  return useQuery({
    queryKey: [
      ...portalClientQueryKeys.all(),
      "appointments",
      params?.page ?? 1,
      params?.limit ?? 20,
      params?.status ?? "all",
    ],
    queryFn: () => getPortalAppointments(params),
    enabled,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

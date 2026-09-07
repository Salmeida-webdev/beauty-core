import { queryOptions } from "@tanstack/react-query";

import { getPortalDashboard } from "../services/portal-client-api";
import { portalClientQueryKeys } from "./portal-client-query-keys";

export const PORTAL_DASHBOARD_STALE_TIME = 60_000;

export function portalDashboardQueryOptions(
  enabled: boolean,
) {
  return queryOptions({
    queryKey: portalClientQueryKeys.dashboard(),
    queryFn: () => getPortalDashboard(),
    enabled,
    staleTime: PORTAL_DASHBOARD_STALE_TIME,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
import { useQuery } from "@tanstack/react-query";
import { fetchPortalPackages } from "../services/portal-packages-api";

export const portalPackagesQueryKey = ["portal", "pacotes"] as const;

export function usePortalPackagesQuery() {
  return useQuery({
    queryKey: portalPackagesQueryKey,
    queryFn: fetchPortalPackages,
    staleTime: 60_000,
  });
}

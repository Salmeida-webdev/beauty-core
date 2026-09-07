"use client";

import { useQuery } from "@tanstack/react-query";

import { usePortalQueryGate } from "./portal-query-gate";
import { portalClientQueryKeys } from "./portal-client-query-keys";
import { portalLoyaltyApi } from "../services/portal-loyalty-api";

export function usePortalLoyaltyQuery() {
  const enabled = usePortalQueryGate();

  return useQuery({
    queryKey: [...portalClientQueryKeys.all(), "loyalty"],
    queryFn: portalLoyaltyApi.loyalty,
    enabled,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function usePortalPointsQuery() {
  const enabled = usePortalQueryGate();

  return useQuery({
    queryKey: [...portalClientQueryKeys.all(), "points", 1, 20],
    queryFn: () => portalLoyaltyApi.points({ page: 1, limit: 20 }),
    enabled,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function usePortalBenefitsQuery() {
  const enabled = usePortalQueryGate();

  return useQuery({
    queryKey: [...portalClientQueryKeys.all(), "benefits"],
    queryFn: portalLoyaltyApi.benefits,
    enabled,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

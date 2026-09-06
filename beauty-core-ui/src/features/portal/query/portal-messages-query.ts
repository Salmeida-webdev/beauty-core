"use client";

import { useQuery } from "@tanstack/react-query";

import { usePortalAuth } from "../auth/portal-auth-context";
import { portalQueryEnabled } from "./portal-query";
import {
  getPortalWhatsappMessages,
} from "../services/portal-messages-api";
import type {
  PortalWhatsappMessagesParams,
} from "../contracts/portal-messages-contracts";

export const portalMessagesQueryKeys = {
  all: ["portal", "messages"] as const,
  list: (page: number, limit: number) =>
    ["portal", "messages", "list", page, limit] as const,
};

export function usePortalWhatsappMessagesQuery(
  params: PortalWhatsappMessagesParams = {},
) {
  const { status } = usePortalAuth();

  const page = params.page ?? 1;
  const limit = params.limit ?? 20;

  return useQuery({
    queryKey: portalMessagesQueryKeys.list(page, limit),
    queryFn: () => getPortalWhatsappMessages({ page, limit }),
    enabled: portalQueryEnabled(status, true),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

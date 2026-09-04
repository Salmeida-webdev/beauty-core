"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { usePortalAuth } from "../auth/portal-auth-context";
import {
  handlePortalAccessError,
  portalQueryEnabled,
} from "./portal-query";

export function usePortalQueryGate(
  requiresAuthentication = true,
): boolean {
  const { status } = usePortalAuth();

  return portalQueryEnabled(status, requiresAuthentication);
}

export function usePortalAccessErrorHandler() {
  const queryClient = useQueryClient();
  const { markAnonymous, markDenied } = usePortalAuth();

  return useCallback(
    (status: number): boolean =>
      handlePortalAccessError(queryClient, status, (transition) => {
        if (transition === "anonymous") {
          markAnonymous();
          return;
        }

        markDenied();
      }),
    [markAnonymous, markDenied, queryClient],
  );
}

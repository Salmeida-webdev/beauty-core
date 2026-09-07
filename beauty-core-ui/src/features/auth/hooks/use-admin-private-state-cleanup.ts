"use client";

import {
  useCallback,
} from "react";
import {
  useQueryClient,
} from "@tanstack/react-query";

import { useTenant } from "@/providers/tenant-provider";

export function useAdminPrivateStateCleanup() {
  const queryClient = useQueryClient();

  const {
    resetTenant,
  } = useTenant();

  return useCallback(async () => {
    try {
      await queryClient.cancelQueries();
    } finally {
      queryClient.clear();
      resetTenant();
    }
  }, [
    queryClient,
    resetTenant,
  ]);
}

"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPortalResourceErrorStatus } from "../errors/portal-resource-errors";
import {
  usePortalAccessErrorHandler,
  usePortalQueryGate,
} from "./portal-query-gate";
import { portalDashboardQueryOptions } from "./portal-dashboard-query-options";

export function usePortalDashboardQuery() {
  const enabled = usePortalQueryGate();
  const handleAccessError = usePortalAccessErrorHandler();
  const query = useQuery(portalDashboardQueryOptions(enabled));

  useEffect(() => {
    if (!query.error) {
      return;
    }

    const status = getPortalResourceErrorStatus(query.error);

    if (status === null) {
      return;
    }

    handleAccessError(status);
  }, [handleAccessError, query.error]);

  return query;
}
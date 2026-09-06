"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { usePortalAuth } from "../auth/portal-auth-context";
import { portalQueryEnabled } from "./portal-query";
import {
  getPortalNotifications,
  getPortalUnreadNotifications,
  markPortalNotificationAsRead,
} from "../services/portal-notifications-api";
import { portalClientQueryKeys } from "./portal-client-query-keys";

export function usePortalNotificationsQuery(
  page = 1,
  limit = 20,
) {
  const { status } = usePortalAuth();

  return useQuery({
    queryKey: portalClientQueryKeys.notifications(page, limit),
    queryFn: () => getPortalNotifications(page, limit),
    enabled: portalQueryEnabled(status, true),
  });
}

export function usePortalUnreadNotificationsQuery() {
  const { status } = usePortalAuth();

  return useQuery({
    queryKey: portalClientQueryKeys.notificationsUnread(),
    queryFn: getPortalUnreadNotifications,
    enabled: portalQueryEnabled(status, true),
  });
}

export function useMarkPortalNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markPortalNotificationAsRead,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: portalClientQueryKeys.notificationsRoot(),
        }),
        queryClient.invalidateQueries({
          queryKey: portalClientQueryKeys.notificationsUnread(),
        }),
      ]);
    },
  });
}

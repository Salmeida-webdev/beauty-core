import { portalQueryKeys } from "./portal-query";

export const portalClientQueryKeys = {
  all: () => portalQueryKeys.private(),
  dashboard: () =>
    portalQueryKeys.privateResource("dashboard"),
  profile: () =>
    portalQueryKeys.privateResource("profile"),
  history: () =>
    portalQueryKeys.privateResource("history"),
  notificationsRoot: () =>
    portalQueryKeys.privateResource("notifications"),
  notifications: (page: number, limit: number) =>
    portalQueryKeys.privateResource("notifications", page, limit),
  notificationsUnread: () =>
    portalQueryKeys.privateResource("notifications", "unread"),
} as const;

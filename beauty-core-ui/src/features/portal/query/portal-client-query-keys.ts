import { portalQueryKeys } from "./portal-query";

export const portalClientQueryKeys = {
  all: () => portalQueryKeys.private(),
  dashboard: () =>
    portalQueryKeys.privateResource("dashboard"),
  profile: () =>
    portalQueryKeys.privateResource("profile"),
  history: () =>
    portalQueryKeys.privateResource("history"),
} as const;

import type { QueryClient } from "@tanstack/react-query";

import type { PortalAuthStatus } from "../auth/portal-auth";

export const portalQueryKeys = {
  all: ["portal"] as const,

  public: () => [...portalQueryKeys.all, "public"] as const,

  private: () => [...portalQueryKeys.all, "private"] as const,

  publicResource: (
    resource: string,
    ...parts: readonly unknown[]
  ) => [...portalQueryKeys.public(), resource, ...parts] as const,

  privateResource: (
    resource: string,
    ...parts: readonly unknown[]
  ) => [...portalQueryKeys.private(), resource, ...parts] as const,
};

export function portalQueryEnabled(
  status: PortalAuthStatus,
  requiresAuthentication: boolean,
): boolean {
  if (requiresAuthentication) {
    return status === "authenticated";
  }

  return (
    status === "anonymous" ||
    status === "authenticated" ||
    status === "denied"
  );
}

export function cleanupPortalPrivateQueries(
  queryClient: QueryClient,
): void {
  void queryClient.cancelQueries({
    queryKey: portalQueryKeys.private(),
  });

  queryClient.removeQueries({
    queryKey: portalQueryKeys.private(),
  });
}

export type PortalAccessTransition = "anonymous" | "denied";

export function portalAccessTransitionFromStatus(
  status: number,
): PortalAccessTransition | null {
  if (status === 401) {
    return "anonymous";
  }

  if (status === 403) {
    return "denied";
  }

  return null;
}

export function handlePortalAccessError(
  queryClient: QueryClient,
  status: number,
  onTransition: (transition: PortalAccessTransition) => void,
): boolean {
  const transition = portalAccessTransitionFromStatus(status);

  if (!transition) {
    return false;
  }

  cleanupPortalPrivateQueries(queryClient);
  onTransition(transition);

  return true;
}

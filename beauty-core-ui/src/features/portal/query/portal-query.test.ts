import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";

import {
  cleanupPortalPrivateQueries,
  handlePortalAccessError,
  portalAccessTransitionFromStatus,
  portalQueryEnabled,
  portalQueryKeys,
  type PortalAccessTransition,
} from "./portal-query";

describe("Portal query foundation", () => {
  it("creates stable public and private namespaces without tenant selection", () => {
    const publicKey = portalQueryKeys.publicResource("tenant");
    const privateKey = portalQueryKeys.privateResource("profile", "current");

    expect(publicKey).toEqual(["portal", "public", "tenant"]);
    expect(privateKey).toEqual([
      "portal",
      "private",
      "profile",
      "current",
    ]);
    expect(JSON.stringify(publicKey)).not.toContain("empresaId");
    expect(JSON.stringify(privateKey)).not.toContain("empresaId");
  });

  it("gates private queries exclusively for authenticated clients", () => {
    expect(portalQueryEnabled("unknown", true)).toBe(false);
    expect(portalQueryEnabled("restoring", true)).toBe(false);
    expect(portalQueryEnabled("anonymous", true)).toBe(false);
    expect(portalQueryEnabled("denied", true)).toBe(false);
    expect(portalQueryEnabled("authenticated", true)).toBe(true);
  });

  it("keeps public queries available only after restoration settles", () => {
    expect(portalQueryEnabled("unknown", false)).toBe(false);
    expect(portalQueryEnabled("restoring", false)).toBe(false);
    expect(portalQueryEnabled("anonymous", false)).toBe(true);
    expect(portalQueryEnabled("authenticated", false)).toBe(true);
    expect(portalQueryEnabled("denied", false)).toBe(true);
  });

  it("cleans private cache while preserving public cache", () => {
    const queryClient = new QueryClient();
    const privateKey = portalQueryKeys.privateResource("profile");
    const publicKey = portalQueryKeys.publicResource("tenant");

    queryClient.setQueryData(privateKey, { private: true });
    queryClient.setQueryData(publicKey, { public: true });

    cleanupPortalPrivateQueries(queryClient);

    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
    expect(queryClient.getQueryData(publicKey)).toEqual({ public: true });
  });

  it("maps 401 and 403 to safe auth transitions", () => {
    expect(portalAccessTransitionFromStatus(401)).toBe("anonymous");
    expect(portalAccessTransitionFromStatus(403)).toBe("denied");
    expect(portalAccessTransitionFromStatus(500)).toBeNull();
  });

  it("cleans private cache when access is rejected", () => {
    const queryClient = new QueryClient();
    const privateKey = portalQueryKeys.privateResource("history");
    const transitions: PortalAccessTransition[] = [];

    queryClient.setQueryData(privateKey, { private: true });

    const handled = handlePortalAccessError(
      queryClient,
      401,
      (transition) => transitions.push(transition),
    );

    expect(handled).toBe(true);
    expect(transitions).toEqual(["anonymous"]);
    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
  });

  it("does not intercept unrelated server errors", () => {
    const queryClient = new QueryClient();
    const onTransition = vi.fn();

    expect(
      handlePortalAccessError(queryClient, 500, onTransition),
    ).toBe(false);

    expect(onTransition).not.toHaveBeenCalled();
  });
});

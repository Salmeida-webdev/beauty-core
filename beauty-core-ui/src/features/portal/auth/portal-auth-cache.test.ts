import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";

import { clearPortalPrivateQueries } from "./portal-auth-cache";

describe("clearPortalPrivateQueries", () => {
  it("removes Portal private queries and preserves unrelated cache", () => {
    const queryClient = new QueryClient();

    queryClient.setQueryData(["portal", "perfil"], { nome: "Cliente" });
    queryClient.setQueryData(["portal", "agendamentos"], [{ id: "agenda-1" }]);
    queryClient.setQueryData(["other-module", "public"], { ready: true });

    clearPortalPrivateQueries(queryClient);

    expect(
      queryClient.getQueryData(["portal", "perfil"]),
    ).toBeUndefined();
    expect(
      queryClient.getQueryData(["portal", "agendamentos"]),
    ).toBeUndefined();
    expect(
      queryClient.getQueryData(["other-module", "public"]),
    ).toEqual({ ready: true });
  });

  it("is safe when the Portal cache is already empty", () => {
    const queryClient = new QueryClient();

    expect(() => {
      clearPortalPrivateQueries(queryClient);
    }).not.toThrow();
  });

  it("does not remove queries from another namespace", () => {
    const queryClient = new QueryClient();

    queryClient.setQueryData(["admin", "dashboard"], { total: 1 });

    clearPortalPrivateQueries(queryClient);

    expect(
      queryClient.getQueryData(["admin", "dashboard"]),
    ).toEqual({ total: 1 });
  });

  it("does not depend on token values or browser storage", () => {
    const queryClient = new QueryClient();

    queryClient.setQueryData(["portal", "session"], {
      state: "authenticated",
    });

    clearPortalPrivateQueries(queryClient);

    expect(
      queryClient.getQueryData(["portal", "session"]),
    ).toBeUndefined();
  });
});

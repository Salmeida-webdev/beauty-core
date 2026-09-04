import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { usePortalAuth } from "../auth/portal-auth-context";
import { portalAuthApi } from "../auth/portal-auth-api";
import { PORTAL_FIRST_ACCESS_PATH } from "../auth/portal-auth-routing";
import { TenantProvider } from "@/providers/tenant-provider";

import { PortalFirstAccessPage } from "./portal-first-access-page";

const navigation = vi.hoisted(() => ({
  currentPath: "/portal/primeiro-acesso",
  search: "",
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.currentPath,
  useSearchParams: () => new URLSearchParams(navigation.search),
  useRouter: () => ({
    replace: navigation.replace,
  }),
}));

vi.mock("../auth/portal-auth-context", () => ({
  usePortalAuth: vi.fn(),
}));

vi.mock("../auth/portal-auth-api", () => ({
  portalAuthApi: {
    me: vi.fn(),
  },
}));

type MeResponse = Awaited<
  ReturnType<typeof portalAuthApi.me>
>;

const profile = (primeiroAcesso: boolean) =>
  ({
    id: "cliente-real",
    nome: "Cliente Real",
    telefone: "83999999999",
    email: "cliente@example.com",
    empresaId: "empresa-real",
    primeiroAcesso,
    aceitouTermos: !primeiroAcesso,
    dataAceiteTermos: primeiroAcesso
      ? null
      : "2026-09-04T00:00:00.000Z",
  }) as MeResponse;

const usePortalAuthMock = vi.mocked(usePortalAuth);
const meMock = vi.mocked(portalAuthApi.me);

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  navigation.currentPath = PORTAL_FIRST_ACCESS_PATH;
  navigation.search = "";
  navigation.replace.mockReset();
  meMock.mockReset();

  usePortalAuthMock.mockReturnValue({
    status: "authenticated",
    identity: {
      clienteId: "cliente-real",
      empresaId: "empresa-real",
      sid: "sessao-real",
    },
  } as ReturnType<typeof usePortalAuth>);
});

describe("PortalFirstAccessPage", () => {
  it("keeps the required first-access route for a first-access client", async () => {
    meMock.mockResolvedValue(profile(true));

    render(
  <TenantProvider>
    <PortalFirstAccessPage />
  </TenantProvider>,
);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Primeiro acesso obrigatório",
        }),
      ).toBeInTheDocument();
    });

    expect(navigation.replace).not.toHaveBeenCalled();
  });

  it("returns a normal client to a safe Portal destination", async () => {
    meMock.mockResolvedValue(profile(false));
    navigation.search = "returnTo=%2Fportal%2Fhistorico";

    render(
  <TenantProvider>
    <PortalFirstAccessPage />
  </TenantProvider>,
);

    await waitFor(() => {
      expect(navigation.replace).toHaveBeenCalledWith(
        "/portal/historico",
      );
    });
  });

  it("sends an anonymous client back to the Portal entry", async () => {
    usePortalAuthMock.mockReturnValue({
      status: "anonymous",
      identity: null,
    } as ReturnType<typeof usePortalAuth>);

    render(
  <TenantProvider>
    <PortalFirstAccessPage />
  </TenantProvider>,
);

    await waitFor(() => {
      expect(navigation.replace).toHaveBeenCalledWith(
        "/portal?returnTo=%2Fportal%2Fprimeiro-acesso",
      );
    });

    expect(meMock).not.toHaveBeenCalled();
  });

  it("shows a safe error when the profile cannot be loaded", async () => {
    meMock.mockRejectedValue(new Error("network"));

    render(
  <TenantProvider>
    <PortalFirstAccessPage />
  </TenantProvider>,
);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Não foi possível verificar o acesso neste momento.",
      );
    });
  });
});

import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { usePortalAuth } from "./portal-auth-context";
import { portalAuthApi } from "./portal-auth-api";
import { PortalAuthRouteOrchestrator } from "./portal-auth-route-orchestrator";
import { hasPortalSession } from "./portal-auth-session";

const navigation = vi.hoisted(() => ({
  currentPath: "/portal",
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

vi.mock("./portal-auth-context", () => ({
  usePortalAuth: vi.fn(),
}));

vi.mock("./portal-auth-api", () => ({
  portalAuthApi: {
    me: vi.fn(),
  },
}));

vi.mock("./portal-auth-session", () => ({
  hasPortalSession: vi.fn(),
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
    dataAceiteTermos: primeiroAcesso ? null : "2026-09-04T00:00:00.000Z",
  }) as MeResponse;

const usePortalAuthMock = vi.mocked(usePortalAuth);
const meMock = vi.mocked(portalAuthApi.me);
const hasPortalSessionMock = vi.mocked(hasPortalSession);

function renderOrchestrator(
  knownFirstAccess: boolean | null = null,
) {
  return render(
    <PortalAuthRouteOrchestrator
      knownFirstAccess={knownFirstAccess}
    >
      <p>superfície autorizada</p>
    </PortalAuthRouteOrchestrator>,
  );
}

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  navigation.currentPath = "/portal";
  navigation.search = "";
  navigation.replace.mockReset();

  hasPortalSessionMock.mockReturnValue(false);
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

describe("PortalAuthRouteOrchestrator", () => {
  it("routes a first-access client before exposing the regular surface", async () => {
    renderOrchestrator(true);

    await waitFor(() => {
      expect(navigation.replace).toHaveBeenCalledWith(
        "/portal/primeiro-acesso?returnTo=%2Fportal",
      );
    });

    expect(
      screen.queryByText("superfície autorizada"),
    ).not.toBeInTheDocument();
  });

  it("keeps a normal client outside the first-access route", async () => {
    navigation.currentPath = "/portal/primeiro-acesso";
    navigation.search = "returnTo=%2Fportal%2Fhistorico";

    renderOrchestrator(false);

    await waitFor(() => {
      expect(navigation.replace).toHaveBeenCalledWith(
        "/portal/historico",
      );
    });
  });

  it("restores the decision from the real me contract after reload", async () => {
    meMock.mockResolvedValue(profile(true));

    renderOrchestrator(null);

    await waitFor(() => {
      expect(meMock).toHaveBeenCalledTimes(1);
      expect(navigation.replace).toHaveBeenCalledWith(
        "/portal/primeiro-acesso?returnTo=%2Fportal",
      );
    });
  });

  it("does not expose content when the auth profile cannot be verified", async () => {
    meMock.mockRejectedValue(new Error("network"));

    renderOrchestrator(null);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Não foi possível verificar o requisito de acesso agora.",
      );
    });

    expect(
      screen.queryByText("superfície autorizada"),
    ).not.toBeInTheDocument();
  });
});

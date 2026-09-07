import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, describe, expect, it } from "vitest";
import { useEffect } from "react";

import PortalLayout from "@/app/portal/layout";
import PortalPage from "@/app/portal/page";
import { TenantProvider } from "@/providers/tenant-provider";
import {
  PortalAuthBoundary,
  PortalAuthProvider,
  usePortalAuth,
} from "@/features/portal/auth/portal-auth-context";
import { PortalEmptyState, PortalSuccessState } from "@/features/portal/states/portal-state-views";
import { portalAssets } from "@/features/portal/assets/portal-assets";
import { usePortalQueryGate, usePortalAccessErrorHandler } from "@/features/portal/query/portal-query-gate";
import {
  handlePortalAccessError,
  portalQueryKeys,
} from "@/features/portal/query/portal-query";

import { sanitizePortalReturnTo } from "@/features/portal/security/portal-safe-return-to";

afterEach(() => {
  cleanup();
});

const CLIENT_IDENTITY = {
  clienteId: "cliente-real",
  empresaId: "empresa-do-contexto",
  sid: "sessao-real",
};

function AuthQueryProbe() {
  const { status } = usePortalAuth();
  const privateQueriesEnabled = usePortalQueryGate();

  return (
    <output data-testid="auth-query-state">
      {status}:{String(privateQueriesEnabled)}
    </output>
  );
}

function PrivateBoundaryProbe() {
  return (
    <PortalAuthBoundary
      anonymousFallback={<p>superficie anonima</p>}
      deniedFallback={<p>superficie indisponivel</p>}
      restoringFallback={<p>restaurando acesso</p>}
    >
      <p>conteudo privado autorizado</p>
    </PortalAuthBoundary>
  );
}

function AccessErrorProbe({ status }: { status: number }) {
  const handleAccessError = usePortalAccessErrorHandler();

  useEffect(() => {
    handleAccessError(status);
  }, [handleAccessError, status]);

  return null;
}

describe("Portal foundation integrations", () => {
  it("composes the real route with PortalAuthProvider, PortalShell and Tenant", () => {
    render(
      <TenantProvider>
        <PortalLayout>
          <PortalPage />
        </PortalLayout>
      </TenantProvider>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Sua experiência personalizada começa aqui",
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Beauty Core")).toBeInTheDocument();
  });

  it("connects authenticated client state to private query gating and boundaries", () => {
    render(
      <PortalAuthProvider
        initialState={{
          status: "authenticated",
          identity: CLIENT_IDENTITY,
        }}
      >
        <AuthQueryProbe />
        <PrivateBoundaryProbe />
      </PortalAuthProvider>,
    );

    expect(screen.getByTestId("auth-query-state")).toHaveTextContent(
      "authenticated:true",
    );

    expect(
      screen.getByText("conteudo privado autorizado"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("superficie anonima"),
    ).not.toBeInTheDocument();
  });

  it("connects an API access rejection to auth cleanup and cache removal", async () => {
    const queryClient = new QueryClient();
    const privateKey = portalQueryKeys.privateResource("profile");

    queryClient.setQueryData(privateKey, {
      private: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PortalAuthProvider
          initialState={{
            status: "authenticated",
            identity: CLIENT_IDENTITY,
          }}
        >
          <AuthQueryProbe />
          <AccessErrorProbe status={401} />
        </PortalAuthProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-query-state")).toHaveTextContent(
        "anonymous:false",
      );
    });

    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
  });

  it("connects Portal states to approved runtime assets", () => {
    render(
      <PortalSuccessState
        assetAlt="Ilustracao de sucesso"
        description="A operacao foi concluida."
        title="Sucesso"
      />,
    );

    const image = screen.getByAltText("Ilustracao de sucesso");
    const source = decodeURIComponent(image.getAttribute("src") ?? "");

    expect(source).toContain(portalAssets.states.success.src);
  });

  it("keeps returnTo inside the Portal namespace", () => {
    expect(
      sanitizePortalReturnTo("/portal/historico"),
    ).toBe("/portal/historico");

    expect(
      sanitizePortalReturnTo("https://evil.example"),
    ).toBe("/portal");
  });

  it("does not expose private content during the anonymous route foundation", () => {
    render(
      <TenantProvider>
        <PortalAuthProvider
          initialState={{
            status: "anonymous",
            identity: null,
          }}
        >
          <PortalAuthBoundary
            anonymousFallback={<p>acesso do cliente futuro</p>}
          >
            <p>dados privados do cliente</p>
          </PortalAuthBoundary>
        </PortalAuthProvider>
      </TenantProvider>,
    );

    expect(screen.getByText("acesso do cliente futuro")).toBeInTheDocument();
    expect(
      screen.queryByText("dados privados do cliente"),
    ).not.toBeInTheDocument();
  });

  it("preserves the low-level 401 and 403 transition contract", () => {
    const queryClient = new QueryClient();
    const transitions: string[] = [];

    expect(
      handlePortalAccessError(queryClient, 401, (transition) => {
        transitions.push(transition);
      }),
    ).toBe(true);

    expect(
      handlePortalAccessError(queryClient, 403, (transition) => {
        transitions.push(transition);
      }),
    ).toBe(true);

    expect(transitions).toEqual(["anonymous", "denied"]);
  });

  it("keeps the empty state available for future resource integrations", () => {
    render(
      <PortalEmptyState
        description="Nenhum resultado disponivel."
        title="Lista vazia"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Lista vazia" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Lista vazia" })
        .closest("[data-portal-state]"),
    ).toHaveAttribute("data-portal-state", "empty");
  });
});

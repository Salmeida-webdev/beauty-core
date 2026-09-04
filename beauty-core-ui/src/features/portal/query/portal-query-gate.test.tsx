import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import type { PortalAuthState } from "../auth/portal-auth";
import {
  PortalAuthProvider,
  usePortalAuth,
} from "../auth/portal-auth-context";
import { usePortalQueryGate } from "./portal-query-gate";

afterEach(() => {
  cleanup();
});

const CLIENT_IDENTITY = {
  clienteId: "cliente-real",
  empresaId: "empresa-do-contexto",
  sid: "sessao-real",
};

function QueryGateProbe({
  requiresAuthentication,
}: {
  requiresAuthentication: boolean;
}) {
  const enabled = usePortalQueryGate(requiresAuthentication);
  const { status } = usePortalAuth();

  return (
    <output data-testid="query-gate">
      {status}:{String(enabled)}
    </output>
  );
}

describe("usePortalQueryGate", () => {
  it("blocks private queries until the client is authenticated", () => {
    const anonymousState: PortalAuthState = {
      status: "anonymous",
      identity: null,
    };

    render(
      <PortalAuthProvider initialState={anonymousState}>
        <QueryGateProbe requiresAuthentication />
      </PortalAuthProvider>,
    );

    expect(screen.getByTestId("query-gate")).toHaveTextContent(
      "anonymous:false",
    );

    cleanup();

    render(
      <PortalAuthProvider
        initialState={{
          status: "authenticated",
          identity: CLIENT_IDENTITY,
        }}
      >
        <QueryGateProbe requiresAuthentication />
      </PortalAuthProvider>,
    );

    expect(screen.getByTestId("query-gate")).toHaveTextContent(
      "authenticated:true",
    );
  });

  it("allows public queries after the auth surface settles", () => {
    render(
      <PortalAuthProvider
        initialState={{ status: "anonymous", identity: null }}
      >
        <QueryGateProbe requiresAuthentication={false} />
      </PortalAuthProvider>,
    );

    expect(screen.getByTestId("query-gate")).toHaveTextContent(
      "anonymous:true",
    );
  });
});

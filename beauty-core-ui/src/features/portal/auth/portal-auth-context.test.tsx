import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  PortalAuthBoundary,
  PortalAuthProvider,
  usePortalAuth,
} from "./portal-auth-context";
import type { PortalAuthState } from "./portal-auth";

afterEach(() => {
  cleanup();
});

const CLIENT_IDENTITY = {
  clienteId: "cliente-real",
  empresaId: "empresa-do-contexto",
  sid: "sessao-real",
};

function AuthProbe() {
  const auth = usePortalAuth();

  return (
    <div>
      <output data-testid="status">{auth.status}</output>
      <output data-testid="private-query">
        {String(auth.canUsePrivateQueries)}
      </output>
      <output data-testid="identity">
        {auth.identity
          ? `${auth.identity.clienteId}|${auth.identity.empresaId}|${auth.identity.sid}`
          : ""}
      </output>
      <button type="button" onClick={auth.beginRestore}>
        restaurar
      </button>
      <button type="button" onClick={auth.markAnonymous}>
        anonimo
      </button>
      <button
        type="button"
        onClick={() => auth.markAuthenticated(CLIENT_IDENTITY)}
      >
        autenticar
      </button>
      <button type="button" onClick={auth.markDenied}>
        negar
      </button>
      <button type="button" onClick={auth.clearSession}>
        limpar
      </button>
    </div>
  );
}

describe("PortalAuthProvider", () => {
  it("starts without assuming a client session", () => {
    render(
      <PortalAuthProvider>
        <AuthProbe />
      </PortalAuthProvider>,
    );

    expect(screen.getByTestId("status")).toHaveTextContent("unknown");
    expect(screen.getByTestId("private-query")).toHaveTextContent("false");
    expect(screen.getByTestId("identity")).toBeEmptyDOMElement();
  });

  it("supports the client authentication state transitions", () => {
    render(
      <PortalAuthProvider>
        <AuthProbe />
      </PortalAuthProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "restaurar" }));
    expect(screen.getByTestId("status")).toHaveTextContent("restoring");

    fireEvent.click(screen.getByRole("button", { name: "autenticar" }));
    expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
    expect(screen.getByTestId("private-query")).toHaveTextContent("true");
    expect(screen.getByTestId("identity")).toHaveTextContent(
      "cliente-real|empresa-do-contexto|sessao-real",
    );

    fireEvent.click(screen.getByRole("button", { name: "negar" }));
    expect(screen.getByTestId("status")).toHaveTextContent("denied");
    expect(screen.getByTestId("private-query")).toHaveTextContent("false");
    expect(screen.getByTestId("identity")).toBeEmptyDOMElement();

    fireEvent.click(screen.getByRole("button", { name: "limpar" }));
    expect(screen.getByTestId("status")).toHaveTextContent("anonymous");
  });
});

describe("PortalAuthBoundary", () => {
  it("exposes only the surface allowed by the current state", () => {
    const initialState: PortalAuthState = {
      status: "anonymous",
      identity: null,
    };

    render(
      <PortalAuthProvider initialState={initialState}>
        <PortalAuthBoundary
          anonymousFallback={<p>superficie anonima</p>}
          deniedFallback={<p>superficie negada</p>}
          restoringFallback={<p>restaurando</p>}
        >
          <p>conteudo privado</p>
        </PortalAuthBoundary>
      </PortalAuthProvider>,
    );

    expect(screen.getByText("superficie anonima")).toBeInTheDocument();
    expect(screen.queryByText("conteudo privado")).not.toBeInTheDocument();

    cleanup();

    render(
      <PortalAuthProvider
        initialState={{ status: "authenticated", identity: CLIENT_IDENTITY }}
      >
        <PortalAuthBoundary
          anonymousFallback={<p>superficie anonima</p>}
          deniedFallback={<p>superficie negada</p>}
          restoringFallback={<p>restaurando</p>}
        >
          <p>conteudo privado</p>
        </PortalAuthBoundary>
      </PortalAuthProvider>,
    );

    expect(screen.getByText("conteudo privado")).toBeInTheDocument();
    expect(screen.queryByText("superficie anonima")).not.toBeInTheDocument();
  });
});

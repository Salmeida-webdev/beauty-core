import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import { TenantProvider } from "@/providers/tenant-provider";

import {
  PortalAuthProvider,
} from "@/features/portal/auth/portal-auth-context";
import PortalPage from "./page";

const portalHeading =
  "Sua experiência personalizada começa aqui";

const portalDescription =
  "Informe seu telefone com DDD para receber um código de acesso.";

describe("Portal routing foundation", () => {
  it("renders the OTP request route inside the anonymous Portal auth state", () => {
    render(
      <TenantProvider initialTenant={DEFAULT_TENANT}>
        <PortalAuthProvider
          initialState={{
            status: "anonymous",
            identity: null,
          }}
        >
          <PortalPage />
        </PortalAuthProvider>
      </TenantProvider>,
    );

    expect(
      screen.getByRole("heading", { name: portalHeading }),
    ).toBeInTheDocument();

    expect(screen.getByText(portalDescription)).toBeInTheDocument();

    expect(
      screen.getByRole("form", {
        name: "Solicitar código de acesso",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Telefone com DDD"),
    ).toBeInTheDocument();
  });
});

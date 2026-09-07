import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import type { PortalAuthState } from "@/features/portal/auth/portal-auth";
import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
import { portalAssets } from "@/features/portal/assets/portal-assets";
import { PortalShell } from "@/features/portal/components/portal-shell";
import { PortalOtpRequestPage } from "@/features/portal/pages/portal-otp-request-page";
import { TenantProvider } from "@/providers/tenant-provider";

afterEach(() => {
  cleanup();
});

const anonymousState: PortalAuthState = {
  status: "anonymous",
  identity: null,
};

function renderPage(
  initialState: PortalAuthState = anonymousState,
  tenant: TenantPublicConfig = DEFAULT_TENANT,
) {
  return render(
    <TenantProvider initialTenant={tenant}>
      <PortalAuthProvider initialState={initialState}>
        <PortalShell>
          <PortalOtpRequestPage />
        </PortalShell>
      </PortalAuthProvider>
    </TenantProvider>,
  );
}

function imageSourceFrom(element: Element | null | undefined): string {
  return decodeURIComponent(element?.getAttribute("src") ?? "");
}

describe("Portal authentication UX", () => {
  it("renders the anonymous OTP experience with the official asset", () => {
    renderPage();

    expect(
      screen.getByRole("heading", {
        name: "Sua experiência personalizada começa aqui",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Informe seu telefone com DDD para receber um código de acesso.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Telefone com DDD")).toHaveAttribute(
      "autocomplete",
      "tel",
    );

    const surface = screen
      .getByRole("heading", {
        name: "Sua experiência personalizada começa aqui",
      })
      .closest("section");

    expect(surface).toHaveAttribute(
      "data-portal-auth-surface",
      "otp",
    );
    expect(surface).toHaveClass("w-full");
    expect(surface).toHaveClass("max-w-6xl");
    expect(surface).toHaveClass("pb-[calc(1rem+env(safe-area-inset-bottom))]");

    const image = surface?.querySelector("img");

    expect(image).not.toBeNull();
    expect(imageSourceFrom(image)).toContain(
      portalAssets.auth.otpIllustration.src,
    );
  });

  it("renders tenant-aware copy while preserving the real fallback provider", () => {
    const customTenant: TenantPublicConfig = {
      ...DEFAULT_TENANT,
      name: "Studio Aurora",
      slug: "studio-aurora",
      branding: {
        ...DEFAULT_TENANT.branding,
        logoUrl: null,
      },
    };

    renderPage(anonymousState, customTenant);

    expect(screen.getByLabelText("Studio Aurora")).toBeInTheDocument();
    expect(
      screen.getByText("Acesso seguro à área de Studio Aurora."),
    ).toBeInTheDocument();
  });

  it("uses accessible official states for restoring and denied access", () => {
    renderPage({
      status: "restoring",
      identity: null,
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      "Verificando seu acesso...",
    );

    cleanup();

    renderPage({
      status: "denied",
      identity: null,
    });

    const deniedState = screen
      .getByRole("heading", { name: "Acesso indisponível" })
      .closest("section");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível verificar o acesso neste momento.",
    );
    expect(deniedState).toHaveAttribute(
      "data-portal-state",
      "access-unavailable",
    );

    const deniedImage = deniedState?.querySelector("img");

    expect(deniedImage).not.toBeNull();
    expect(imageSourceFrom(deniedImage)).toContain(
      portalAssets.auth.accessUnavailable.src,
    );
  });
});
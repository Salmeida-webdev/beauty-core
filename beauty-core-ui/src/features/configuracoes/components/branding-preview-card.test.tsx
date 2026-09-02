import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { BrandingPreviewCard } from "@/features/configuracoes/components/branding-preview-card";

afterEach(() => {
  cleanup();
});

describe("BrandingPreviewCard", () => {
  it("renderiza identidade personalizada", () => {
    render(
      <BrandingPreviewCard
        branding={{
          tenantName: "Clínica Aurora",
          primaryColor: "#7A1234",
          hasCustomLogo: true,
          logoStatus: "custom",
        }}
      />,
    );

    expect(screen.getByText("Clínica Aurora")).toBeInTheDocument();

    expect(screen.getByText("#7A1234")).toBeInTheDocument();

    expect(
      screen.getByText("Logo personalizada configurada"),
    ).toBeInTheDocument();

    expect(screen.getByText("Personalizada")).toBeInTheDocument();
  });

  it("explicita fallback Beauty Core", () => {
    render(
      <BrandingPreviewCard
        branding={{
          tenantName: "Beauty Core",
          primaryColor: "#18181B",
          hasCustomLogo: false,
          logoStatus: "fallback",
        }}
      />,
    );

    expect(
      screen.getByText("Usando fallback visual do Beauty Core"),
    ).toBeInTheDocument();

    expect(screen.getByText("Fallback Beauty Core")).toBeInTheDocument();
  });
});

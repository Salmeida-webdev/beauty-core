import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { BrandingPreviewCard } from "@/features/configuracoes/components/branding-preview-card";

afterEach(() => {
  cleanup();
});

describe("BrandingPreviewCard accessibility", () => {
  it("nao usa cor tenant como fundo de texto", () => {
    render(
      <BrandingPreviewCard
        branding={{
          tenantName: "Clínica Aurora",
          primaryColor: "#FFFF00",
          hasCustomLogo: true,
          logoStatus: "custom",
        }}
      />,
    );

    const brandMark = screen.getByText("C");

    expect(brandMark).toHaveClass("bg-muted", "text-foreground");

    expect(brandMark).not.toHaveAttribute("style");

    expect(screen.getByText("#FFFF00")).toBeInTheDocument();
  });

  it("mantem cor customizada somente em elemento decorativo", () => {
    const { container } = render(
      <BrandingPreviewCard
        branding={{
          tenantName: "Clínica Aurora",
          primaryColor: "#7A1234",
          hasCustomLogo: true,
          logoStatus: "custom",
        }}
      />,
    );

    const styledElements = container.querySelectorAll(
      '[style*="background-color"]',
    );

    expect(styledElements.length).toBe(1);

    for (const element of styledElements) {
      expect(element).toHaveAttribute("aria-hidden", "true");
    }
  });
});

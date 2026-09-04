import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { portalAssets } from "../assets/portal-assets";

import { PortalAssetImage } from "./portal-asset-image";

describe("PortalAssetImage", () => {
  it("renders an approved runtime asset with its accessible alternative", () => {
    render(
      <PortalAssetImage
        alt="Visual principal do Portal"
        asset={portalAssets.identity.keyVisual}
        height={1200}
        sizes="(max-width: 768px) 100vw, 768px"
        width={1800}
      />,
    );

    const image = screen.getByAltText("Visual principal do Portal");
    const src = image.getAttribute("src");

    expect(src).toBeTruthy();
    expect(decodeURIComponent(src ?? "")).toContain(
      "/images/portal/identity/portal-key-visual.webp",
    );
  });

  it("renders decorative assets with an empty alternative", () => {
    render(
      <PortalAssetImage
        alt="Nao deve ser anunciado"
        asset={portalAssets.identity.keyVisual}
        decorative
        height={1200}
        sizes="100vw"
        width={1800}
      />,
    );

    expect(screen.getByAltText("")).toBeInTheDocument();
  });
});
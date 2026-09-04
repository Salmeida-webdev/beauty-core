import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PortalPage from "./page";

const portalHeading =
  "Sua experi\u00eancia personalizada come\u00e7a aqui";

const portalDescription =
  "Acesse futuramente sua experi\u00eancia personalizada com a empresa.";

describe("Portal routing foundation", () => {
  it("renders the neutral portal root page", () => {
    render(<PortalPage />);

    expect(
      screen.getByRole("heading", { name: portalHeading }),
    ).toBeInTheDocument();

    expect(screen.getByText(portalDescription)).toBeInTheDocument();
  });
});
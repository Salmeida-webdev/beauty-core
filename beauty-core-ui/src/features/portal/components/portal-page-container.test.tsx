import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PortalPageContainer } from "./portal-page-container";

describe("PortalPageContainer", () => {
  it("renders children inside the shared Card primitive", () => {
    render(
      <PortalPageContainer>
        <h1>Foundation do portal</h1>
      </PortalPageContainer>,
    );

    expect(
      screen.getByRole("heading", { name: "Foundation do portal" }),
    ).toBeInTheDocument();
  });
});
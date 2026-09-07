import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  PageSection,
} from "@/components/layout/page-section";

afterEach(() => {
  cleanup();
});

describe("dashboard section accessibility", () => {
  it("associa a seção ao título e à descrição", () => {
    render(
      <PageSection
        title="Financeiro"
        description="Resumo financeiro"
      >
        <p>Conteúdo</p>
      </PageSection>,
    );

    const section =
      screen.getByRole("region", {
        name: "Financeiro",
      });

    expect(section).toHaveAttribute(
      "aria-describedby",
    );

    expect(
      screen.getByText(
        "Resumo financeiro",
      ),
    ).toHaveAttribute("id");
  });
});

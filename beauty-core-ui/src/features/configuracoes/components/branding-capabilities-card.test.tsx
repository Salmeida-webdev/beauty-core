import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { BrandingCapabilitiesCard } from "@/features/configuracoes/components/branding-capabilities-card";

afterEach(() => {
  cleanup();
});

describe("BrandingCapabilitiesCard", () => {
  it("explica capacidades reais e gaps", () => {
    render(<BrandingCapabilitiesCard />);

    expect(screen.getByText("Logo personalizada")).toBeInTheDocument();

    expect(screen.getByText("Cor primária")).toBeInTheDocument();

    expect(screen.getByText(/Favicon por tenant/i)).toBeInTheDocument();

    expect(
      screen.getByText(/logo específica para tema escuro/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/CSS, HTML ou JavaScript/i)).toBeInTheDocument();
  });

  it("nao cria controles de edicao", () => {
    render(<BrandingCapabilitiesCard />);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

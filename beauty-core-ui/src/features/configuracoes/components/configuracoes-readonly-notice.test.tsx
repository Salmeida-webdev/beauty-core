import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ConfiguracoesReadonlyNotice } from "@/features/configuracoes/components/configuracoes-readonly-notice";

afterEach(() => {
  cleanup();
});

describe("ConfiguracoesReadonlyNotice", () => {
  it("explica a ausencia de mutation tenant-safe", () => {
    render(<ConfiguracoesReadonlyNotice />);

    expect(screen.getByText("Alterações cadastrais")).toBeInTheDocument();

    expect(
      screen.getByText(/contrato tenant-safe comprovado/i),
    ).toBeInTheDocument();
  });
});

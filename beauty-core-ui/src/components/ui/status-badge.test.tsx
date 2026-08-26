import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatusBadge } from "@/components/ui/status-badge";

describe("StatusBadge", () => {
  it("usa o tom neutro por padrão", () => {
    render(
      <StatusBadge>
        Neutro
      </StatusBadge>,
    );

    expect(
      screen.getByText("Neutro"),
    ).toHaveClass(
      "bg-surface-subtle",
      "text-text-secondary",
    );
  });

  it("aplica o tom de sucesso", () => {
    render(
      <StatusBadge tone="success">
        Ativo
      </StatusBadge>,
    );

    expect(
      screen.getByText("Ativo"),
    ).toHaveClass(
      "bg-success/10",
      "text-success-foreground",
    );
  });

  it("aplica o tom de perigo", () => {
    render(
      <StatusBadge tone="danger">
        Erro
      </StatusBadge>,
    );

    expect(
      screen.getByText("Erro"),
    ).toHaveClass(
      "bg-danger/10",
      "text-danger-foreground",
    );
  });
});
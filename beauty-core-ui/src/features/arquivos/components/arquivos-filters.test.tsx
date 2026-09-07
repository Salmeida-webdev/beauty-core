import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArquivosFilters } from "@/features/arquivos/components/arquivos-filters";

afterEach(() => {
  cleanup();
});

describe("ArquivosFilters", () => {
  it("renderiza somente filtro por tipo", () => {
    render(<ArquivosFilters tipo={null} onTipoChange={vi.fn()} />);

    expect(screen.getByLabelText("Filtrar por tipo")).toBeInTheDocument();

    expect(screen.queryByLabelText(/cliente/i)).not.toBeInTheDocument();

    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });

  it("seleciona tipo real", () => {
    const onTipoChange = vi.fn();

    render(<ArquivosFilters tipo={null} onTipoChange={onTipoChange} />);

    fireEvent.change(screen.getByLabelText("Filtrar por tipo"), {
      target: {
        value: "DOCUMENTO",
      },
    });

    expect(onTipoChange).toHaveBeenCalledWith("DOCUMENTO");
  });

  it("remove filtro ao selecionar todos", () => {
    const onTipoChange = vi.fn();

    render(<ArquivosFilters tipo="DOCUMENTO" onTipoChange={onTipoChange} />);

    fireEvent.change(screen.getByLabelText("Filtrar por tipo"), {
      target: {
        value: "",
      },
    });

    expect(onTipoChange).toHaveBeenCalledWith(null);
  });
});

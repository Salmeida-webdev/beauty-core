import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  CampanhasWhatsappList,
} from "./campanhas-whatsapp-list";

const campanha = {
  id: "campanha-1",
  nome: "Campanha de retorno",
  descricao: "Clientes inativos",
  tipo: "CAMPANHA" as const,
  mensagem: "Temos uma novidade.",
  status: "SIMULADA" as const,
  totalDestinatarios: 10,
  totalEnviadas: 0,
  totalFalhas: 0,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

afterEach(() => {
  cleanup();
});

describe("Chat 54 — CampanhasWhatsappList", () => {
  it("renderiza catálogo real", () => {
    render(
      <CampanhasWhatsappList
        campanhas={[campanha]}
        canManage
        onEdit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Campanha de retorno",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Clientes inativos",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Simulada",
      ),
    ).toBeInTheDocument();
  });

  it("aciona edição", () => {
    const onEdit = vi.fn();

    render(
      <CampanhasWhatsappList
        campanhas={[campanha]}
        canManage
        onEdit={onEdit}
        onCancel={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Editar",
        },
      ),
    );

    expect(onEdit).toHaveBeenCalledWith(
      campanha,
    );
  });

  it("aciona cancelamento administrativo", () => {
    const onCancel = vi.fn();

    render(
      <CampanhasWhatsappList
        campanhas={[campanha]}
        canManage
        onEdit={vi.fn()}
        onCancel={onCancel}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Cancelar",
        },
      ),
    );

    expect(
      onCancel,
    ).toHaveBeenCalledWith(
      campanha,
    );
  });

  it("não expõe ações sem permissão", () => {
    render(
      <CampanhasWhatsappList
        campanhas={[campanha]}
        canManage={false}
        onEdit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole(
        "button",
        {
          name: "Editar",
        },
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole(
        "button",
        {
          name: "Cancelar",
        },
      ),
    ).not.toBeInTheDocument();
  });

  it("não oferece cancelar para campanha já cancelada", () => {
    render(
      <CampanhasWhatsappList
        campanhas={[
          {
            ...campanha,
            status: "CANCELADA",
          },
        ]}
        canManage
        onEdit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Cancelada",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole(
        "button",
        {
          name: "Cancelar",
        },
      ),
    ).not.toBeInTheDocument();
  });

  it("renderiza empty state", () => {
    render(
      <CampanhasWhatsappList
        campanhas={[]}
        canManage
        onEdit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Nenhuma campanha cadastrada",
      ),
    ).toBeInTheDocument();
  });
});
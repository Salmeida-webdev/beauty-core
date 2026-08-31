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
  TemplatesWhatsappList,
} from "./templates-whatsapp-list";

const template = {
  id: "template-1",
  nome: "Confirmação",
  tipo:
    "CONFIRMACAO_AGENDAMENTO" as const,
  titulo:
    "Agendamento confirmado",
  mensagem:
    "Seu horário está confirmado.",
  ativo: true,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

afterEach(() => {
  cleanup();
});

describe("Chat 54 — TemplatesWhatsappList", () => {
  it("renderiza os campos reais", () => {
    render(
      <TemplatesWhatsappList
        templates={[template]}
        canManage
        onEdit={vi.fn()}
        onInactivate={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Confirmação"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Agendamento confirmado",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Seu horário está confirmado.",
      ),
    ).toBeInTheDocument();
  });

  it("aciona edição e inativação", () => {
    const onEdit = vi.fn();
    const onInactivate = vi.fn();

    render(
      <TemplatesWhatsappList
        templates={[template]}
        canManage
        onEdit={onEdit}
        onInactivate={onInactivate}
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

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Inativar",
        },
      ),
    );

    expect(onEdit).toHaveBeenCalledWith(
      template,
    );

    expect(
      onInactivate,
    ).toHaveBeenCalledWith(
      template,
    );
  });

  it("não expõe ações sem permissão", () => {
    render(
      <TemplatesWhatsappList
        templates={[template]}
        canManage={false}
        onEdit={vi.fn()}
        onInactivate={vi.fn()}
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
          name: "Inativar",
        },
      ),
    ).not.toBeInTheDocument();
  });

  it("renderiza empty state", () => {
    render(
      <TemplatesWhatsappList
        templates={[]}
        canManage
        onEdit={vi.fn()}
        onInactivate={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Nenhum template ativo",
      ),
    ).toBeInTheDocument();
  });
});
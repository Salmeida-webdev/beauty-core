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
  NotificacoesList,
} from "./notificacoes-list";

const notificacao = {
  id: "notificacao-1",
  usuarioId: "usuario-1",
  clienteId: null,
  tipo: "SISTEMA" as const,
  titulo: "Aviso operacional",
  mensagem: "Mensagem da notificação.",
  status: "NAO_LIDA" as const,
  dataLeitura: null,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

afterEach(() => {
  cleanup();
});

describe("Chat 54 — NotificacoesList", () => {
  it("renderiza conteúdo e status", () => {
    render(
      <NotificacoesList
        notificacoes={[notificacao]}
        isMutating={false}
        onMarkRead={vi.fn()}
        onArchive={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Aviso operacional",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Não lida",
      ),
    ).toBeInTheDocument();
  });

  it("marca não lida", () => {
    const onMarkRead = vi.fn();

    render(
      <NotificacoesList
        notificacoes={[notificacao]}
        isMutating={false}
        onMarkRead={onMarkRead}
        onArchive={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Marcar como lida",
        },
      ),
    );

    expect(
      onMarkRead,
    ).toHaveBeenCalledWith(
      notificacao,
    );
  });

  it("não oferece marcar lida novamente", () => {
    render(
      <NotificacoesList
        notificacoes={[
          {
            ...notificacao,
            status: "LIDA",
            dataLeitura:
              "2026-08-30T21:00:00.000Z",
          },
        ]}
        isMutating={false}
        onMarkRead={vi.fn()}
        onArchive={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole(
        "button",
        {
          name: "Marcar como lida",
        },
      ),
    ).not.toBeInTheDocument();
  });

  it("arquiva registro", () => {
    const onArchive = vi.fn();

    render(
      <NotificacoesList
        notificacoes={[notificacao]}
        isMutating={false}
        onMarkRead={vi.fn()}
        onArchive={onArchive}
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Arquivar",
        },
      ),
    );

    expect(
      onArchive,
    ).toHaveBeenCalledWith(
      notificacao,
    );
  });

  it("não oferece arquivar novamente", () => {
    render(
      <NotificacoesList
        notificacoes={[
          {
            ...notificacao,
            status: "ARQUIVADA",
          },
        ]}
        isMutating={false}
        onMarkRead={vi.fn()}
        onArchive={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole(
        "button",
        {
          name: "Arquivar",
        },
      ),
    ).not.toBeInTheDocument();
  });

  it("aciona exclusão", () => {
    const onDelete = vi.fn();

    render(
      <NotificacoesList
        notificacoes={[notificacao]}
        isMutating={false}
        onMarkRead={vi.fn()}
        onArchive={vi.fn()}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Excluir",
        },
      ),
    );

    expect(
      onDelete,
    ).toHaveBeenCalledWith(
      notificacao,
    );
  });

  it("renderiza empty state", () => {
    render(
      <NotificacoesList
        notificacoes={[]}
        isMutating={false}
        onMarkRead={vi.fn()}
        onArchive={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Nenhuma notificação encontrada",
      ),
    ).toBeInTheDocument();
  });
});
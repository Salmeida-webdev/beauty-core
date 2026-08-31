import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  NotificacoesSettingsForm,
} from "./notificacoes-settings-form";

const configuracao = {
  id: "config-1",
  notificarAgendamentos: true,
  notificarFinanceiro: true,
  notificarFidelidade: true,
  notificarPacotes: true,
  notificarClientes: true,
  notificarMarketing: false,
};

afterEach(() => {
  cleanup();
});

describe("Chat 54 — NotificacoesSettingsForm", () => {
  it("renderiza as seis categorias reais", () => {
    render(
      <NotificacoesSettingsForm
        configuracao={configuracao}
        isSubmitting={false}
        onSubmit={vi.fn()}
      />,
    );

    for (const label of [
      "Agendamentos",
      "Financeiro",
      "Fidelidade",
      "Pacotes",
      "Clientes",
      "Marketing",
    ]) {
      expect(
        screen.getByText(label),
      ).toBeInTheDocument();
    }
  });

  it("reflete defaults carregados", () => {
    render(
      <NotificacoesSettingsForm
        configuracao={configuracao}
        isSubmitting={false}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole(
        "checkbox",
        {
          name: /Agendamentos/i,
        },
      ),
    ).toBeChecked();

    expect(
      screen.getByRole(
        "checkbox",
        {
          name: /Marketing/i,
        },
      ),
    ).not.toBeChecked();
  });

  it("habilita salvar após alteração", () => {
    render(
      <NotificacoesSettingsForm
        configuracao={configuracao}
        isSubmitting={false}
        onSubmit={vi.fn()}
      />,
    );

    const save = screen.getByRole(
      "button",
      {
        name: "Salvar configurações",
      },
    );

    expect(save).toBeDisabled();

    fireEvent.click(
      screen.getByRole(
        "checkbox",
        {
          name: /Marketing/i,
        },
      ),
    );

    expect(save).toBeEnabled();
  });

  it("envia os seis valores reais", async () => {
    const onSubmit = vi.fn();

    render(
      <NotificacoesSettingsForm
        configuracao={configuracao}
        isSubmitting={false}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "checkbox",
        {
          name: /Marketing/i,
        },
      ),
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Salvar configurações",
        },
      ),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          notificarAgendamentos: true,
          notificarFinanceiro: true,
          notificarFidelidade: true,
          notificarPacotes: true,
          notificarClientes: true,
          notificarMarketing: true,
        },
        expect.anything(),
      );
    });
  });

  it("bloqueia interação durante submit", () => {
    render(
      <NotificacoesSettingsForm
        configuracao={configuracao}
        isSubmitting
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole(
        "button",
        {
          name: "Salvando...",
        },
      ),
    ).toBeDisabled();

    for (const checkbox of screen.getAllByRole(
      "checkbox",
    )) {
      expect(checkbox).toBeDisabled();
    }
  });
});
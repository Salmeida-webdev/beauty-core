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

import { AgendamentoCreateForm } from "@/features/agendamentos/forms/agendamento-create-form";
import { EMPTY_AGENDAMENTO_CREATE_FORM_VALUES } from "@/features/agendamentos/forms/agendamento-create-form.schema";

const ids = {
  cliente:
    "550e8400-e29b-41d4-a716-446655440001",
  profissional:
    "550e8400-e29b-41d4-a716-446655440002",
  servico:
    "550e8400-e29b-41d4-a716-446655440003",
  unidade:
    "550e8400-e29b-41d4-a716-446655440004",
};

vi.mock(
  "@/features/agendamentos/components/agenda-related-selectors",
  () => ({
    AgendaRelatedSelectors: ({
      onChange,
      disabled,
    }: {
      onChange: (
        field:
          | "clienteId"
          | "servicoId"
          | "profissionalId"
          | "unidadeId",
        value: string,
      ) => void;
      disabled?: boolean;
    }) => (
      <div>
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onChange(
              "clienteId",
              ids.cliente,
            )
          }
        >
          Selecionar cliente
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onChange(
              "servicoId",
              ids.servico,
            )
          }
        >
          Selecionar servico
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onChange(
              "profissionalId",
              ids.profissional,
            )
          }
        >
          Selecionar profissional
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onChange(
              "unidadeId",
              ids.unidade,
            )
          }
        >
          Selecionar unidade
        </button>
      </div>
    ),
  }),
);

afterEach(() => {
  cleanup();
});

describe("AgendamentoCreateForm", () => {
  it("bloqueia envio incompleto", async () => {
    const onSubmit = vi.fn();

    render(
      <AgendamentoCreateForm
        initialValues={
          EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
        }
        pending={false}
        onCancel={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Criar agendamento",
        },
      ),
    );

    expect(
      await screen.findByText(
        "Selecione cliente, servico, profissional e unidade.",
      ),
    ).toBeInTheDocument();

    expect(
      onSubmit,
    ).not.toHaveBeenCalled();
  });

  it("envia valores preenchidos", async () => {
    const onSubmit = vi.fn();

    render(
      <AgendamentoCreateForm
        initialValues={
          EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
        }
        pending={false}
        onCancel={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    for (const name of [
      "Selecionar cliente",
      "Selecionar servico",
      "Selecionar profissional",
      "Selecionar unidade",
    ]) {
      fireEvent.click(
        screen.getByRole(
          "button",
          {
            name,
          },
        ),
      );
    }

    fireEvent.change(
      screen.getByLabelText(
        /^Inicio/,
      ),
      {
        target: {
          value:
            "2026-08-29T12:00",
        },
      },
    );

    fireEvent.change(
      screen.getByLabelText(
        /^Fim/,
      ),
      {
        target: {
          value:
            "2026-08-29T12:45",
        },
      },
    );

    fireEvent.change(
      screen.getByLabelText(
        "Observacoes",
      ),
      {
        target: {
          value:
            "Atendimento.",
        },
      },
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Criar agendamento",
        },
      ),
    );

    await vi.waitFor(() => {
      expect(
        onSubmit,
      ).toHaveBeenCalledTimes(
        1,
      );
    });

    expect(
      onSubmit.mock.calls[0]?.[0],
    ).toEqual({
      related: {
        clienteId:
          ids.cliente,
        servicoId:
          ids.servico,
        profissionalId:
          ids.profissional,
        unidadeId:
          ids.unidade,
      },
      dataHoraInicio:
        "2026-08-29T12:00",
      dataHoraFim:
        "2026-08-29T12:45",
      observacoes:
        "Atendimento.",
    });
  });

  it("bloqueia controles durante submit", () => {
    render(
      <AgendamentoCreateForm
        initialValues={
          EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
        }
        pending
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByLabelText(
        /^Inicio/,
      ),
    ).toBeDisabled();

    expect(
      screen.getByRole(
        "button",
        {
          name: "Criando...",
        },
      ),
    ).toBeDisabled();

    expect(
      screen.getByRole(
        "button",
        {
          name: "Cancelar",
        },
      ),
    ).toBeDisabled();
  });

  it("exibe erro normalizado recebido do dialog", () => {
    render(
      <AgendamentoCreateForm
        initialValues={
          EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
        }
        pending={false}
        serverError="Nao foi possivel criar o agendamento."
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole(
        "alert",
      ),
    ).toHaveTextContent(
      "Nao foi possivel criar o agendamento.",
    );
  });
});
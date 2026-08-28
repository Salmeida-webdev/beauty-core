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
  ClienteForm,
} from "@/features/clientes/forms/cliente-form";
import {
  EMPTY_CLIENTE_FORM_VALUES,
} from "@/features/clientes/forms/cliente-form.schema";

afterEach(() => {
  cleanup();
});

describe("ClienteForm", () => {
  it("renderiza apenas os campos reais do DTO", () => {
    render(
      <ClienteForm
        mode="create"
        initialValues={
          EMPTY_CLIENTE_FORM_VALUES
        }
        pending={false}
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByLabelText(
        /Nome/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /Telefone/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /E-mail/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /Data de nascimento/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        /Observações/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByLabelText(
        /CPF/i,
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText(
        /Foto/i,
      ),
    ).not.toBeInTheDocument();
  });

  it("bloqueia submit vazio pela validacao Zod", async () => {
    const onSubmit = vi.fn();

    render(
      <ClienteForm
        mode="create"
        initialValues={
          EMPTY_CLIENTE_FORM_VALUES
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
            "Cadastrar cliente",
        },
      ),
    );

    expect(
      await screen.findByText(
        "Informe ao menos 2 caracteres.",
      ),
    ).toBeInTheDocument();

    expect(
      onSubmit,
    ).not.toHaveBeenCalled();
  });

  it("envia valores validos", async () => {
    const onSubmit = vi.fn();

    render(
      <ClienteForm
        mode="create"
        initialValues={
          EMPTY_CLIENTE_FORM_VALUES
        }
        pending={false}
        onCancel={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(
      screen.getByLabelText(
        /Nome/,
      ),
      {
        target: {
          value:
            "Maria Silva",
        },
      },
    );

    fireEvent.change(
      screen.getByLabelText(
        /Telefone/,
      ),
      {
        target: {
          value:
            "(83) 99999-9999",
        },
      },
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Cadastrar cliente",
        },
      ),
    );

    await vi.waitFor(() => {
      expect(
        onSubmit,
      ).toHaveBeenCalledTimes(1);
    });

    const submittedValues =
      onSubmit.mock.calls[0]?.[0];

    expect(
      submittedValues,
    ).toEqual(
      expect.objectContaining({
        nome:
          "Maria Silva",
        telefone:
          "(83) 99999-9999",
      }),
    );
  });

  it("exibe erro seguro do servidor", () => {
    render(
      <ClienteForm
        mode="edit"
        initialValues={{
          nome:
            "Maria Silva",
          telefone:
            "83999999999",
          email: "",
          dataNascimento: "",
          observacoes: "",
        }}
        pending={false}
        serverError="Cliente ja cadastrado."
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole(
        "alert",
      ),
    ).toHaveTextContent(
      "Cliente ja cadastrado.",
    );
  });
});

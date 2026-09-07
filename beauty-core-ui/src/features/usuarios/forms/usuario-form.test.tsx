import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { UsuarioForm } from "@/features/usuarios/forms/usuario-form";
import { createEmptyUsuarioFormValues } from "@/features/usuarios/forms/usuario-form.schema";

afterEach(() => cleanup());

describe("UsuarioForm", () => {
  it("exige senha no cadastro", async () => {
    const onSubmit = vi.fn();

    render(
      <UsuarioForm
        mode="create"
        actorRole="ADMIN"
        roleOptions={["GERENTE", "RECEPCAO", "PROFISSIONAL"]}
        roleLocked={false}
        initialValues={createEmptyUsuarioFormValues("GERENTE")}
        pending={false}
        onCancel={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText(/^Nome/), {
      target: {
        value: "Maria",
      },
    });

    fireEvent.change(screen.getByLabelText(/^E-mail/), {
      target: {
        value: "maria@example.com",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cadastrar usuário",
      }),
    );

    expect(
      await screen.findByText("Informe uma senha com ao menos 8 caracteres."),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("SUPER_ADMIN exige empresa para role de tenant", async () => {
    const onSubmit = vi.fn();

    render(
      <UsuarioForm
        mode="create"
        actorRole="SUPER_ADMIN"
        roleOptions={[
          "SUPER_ADMIN",
          "ADMIN",
          "GERENTE",
          "RECEPCAO",
          "PROFISSIONAL",
        ]}
        roleLocked={false}
        initialValues={createEmptyUsuarioFormValues("SUPER_ADMIN")}
        pending={false}
        onCancel={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText(/^Perfil/), {
      target: {
        value: "ADMIN",
      },
    });

    expect(screen.getByLabelText(/^ID da empresa/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^Nome/), {
      target: {
        value: "Admin Clínica",
      },
    });

    fireEvent.change(screen.getByLabelText(/^E-mail/), {
      target: {
        value: "admin@clinica.com",
      },
    });

    fireEvent.change(screen.getByLabelText(/^Senha/), {
      target: {
        value: "Senha123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cadastrar usuário",
      }),
    );

    expect(
      await screen.findByText(
        "Informe a empresa para usuários que não sejam SUPER_ADMIN.",
      ),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("bloqueia visualmente a propria role", () => {
    render(
      <UsuarioForm
        mode="edit"
        actorRole="ADMIN"
        roleOptions={["ADMIN"]}
        roleLocked
        initialValues={{
          empresaId: "550e8400-e29b-41d4-a716-446655440001",
          nome: "Admin",
          email: "admin@example.com",
          telefone: "",
          role: "ADMIN",
          senha: "",
        }}
        pending={false}
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/^Perfil/)).toBeDisabled();

    expect(
      screen.getByText("Sua própria role não pode ser alterada."),
    ).toBeInTheDocument();
  });
});

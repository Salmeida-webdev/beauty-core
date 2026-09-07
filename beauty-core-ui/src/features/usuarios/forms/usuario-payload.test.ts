import { describe, expect, it } from "vitest";

import {
  toCreateUsuarioPayload,
  toUpdateUsuarioPayload,
  usuarioToFormValues,
} from "@/features/usuarios/forms/usuario-payload";
import type { UsuarioAdministrativo } from "@/features/usuarios/types/usuarios.types";

const usuario: UsuarioAdministrativo = {
  id: "550e8400-e29b-41d4-a716-446655440020",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  nome: "Maria Gerente",
  email: "maria@example.com",
  telefone: null,
  foto: null,
  role: "GERENTE",
  ativo: true,
  ultimoLogin: null,
  createdAt: "2026-08-28T10:00:00.000Z",
  updatedAt: "2026-08-28T10:00:00.000Z",
};

describe("usuario payload", () => {
  it("ADMIN nao envia empresaId manual", () => {
    expect(
      toCreateUsuarioPayload(
        {
          empresaId: "550e8400-e29b-41d4-a716-446655440099",
          nome: " Maria ",
          email: " MARIA@EXAMPLE.COM ",
          telefone: "",
          role: "GERENTE",
          senha: "Senha123",
        },
        "ADMIN",
      ),
    ).toEqual({
      nome: "Maria",
      email: "maria@example.com",
      role: "GERENTE",
      senha: "Senha123",
    });
  });

  it("SUPER_ADMIN envia empresaId para role de tenant", () => {
    expect(
      toCreateUsuarioPayload(
        {
          empresaId: "550e8400-e29b-41d4-a716-446655440001",
          nome: "Admin Clínica",
          email: "clinica@example.com",
          telefone: "83999999999",
          role: "ADMIN",
          senha: "Senha123",
        },
        "SUPER_ADMIN",
      ),
    ).toEqual({
      empresaId: "550e8400-e29b-41d4-a716-446655440001",
      nome: "Admin Clínica",
      email: "clinica@example.com",
      telefone: "83999999999",
      role: "ADMIN",
      senha: "Senha123",
    });
  });

  it("SUPER_ADMIN global nao envia empresaId", () => {
    expect(
      toCreateUsuarioPayload(
        {
          empresaId: "550e8400-e29b-41d4-a716-446655440001",
          nome: "Master",
          email: "master@example.com",
          telefone: "",
          role: "SUPER_ADMIN",
          senha: "Senha123",
        },
        "SUPER_ADMIN",
      ),
    ).not.toHaveProperty("empresaId");
  });

  it("self update nao envia role nem senha vazia", () => {
    expect(
      toUpdateUsuarioPayload(
        {
          empresaId: usuario.empresaId ?? "",
          nome: " Maria Atualizada ",
          email: " MARIA@EXAMPLE.COM ",
          telefone: "",
          role: "GERENTE",
          senha: "",
        },
        {
          actorId: usuario.id,
          actorRole: "GERENTE",
          usuario,
        },
      ),
    ).toEqual({
      nome: "Maria Atualizada",
      email: "maria@example.com",
    });
  });

  it("SUPER_ADMIN pode promover para SUPER_ADMIN sem empresaId", () => {
    expect(
      toUpdateUsuarioPayload(
        {
          empresaId: usuario.empresaId ?? "",
          nome: usuario.nome,
          email: usuario.email,
          telefone: "",
          role: "SUPER_ADMIN",
          senha: "",
        },
        {
          actorId: "550e8400-e29b-41d4-a716-446655440099",
          actorRole: "SUPER_ADMIN",
          usuario,
        },
      ),
    ).toEqual({
      nome: "Maria Gerente",
      email: "maria@example.com",
      role: "SUPER_ADMIN",
    });
  });

  it("converte entidade sem expor senha", () => {
    expect(usuarioToFormValues(usuario)).toEqual({
      empresaId: "550e8400-e29b-41d4-a716-446655440001",
      nome: "Maria Gerente",
      email: "maria@example.com",
      telefone: "",
      role: "GERENTE",
      senha: "",
    });
  });
});

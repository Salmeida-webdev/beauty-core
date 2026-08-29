import type { AdminRole } from "@/constants/roles";
import type { UsuarioFormValues } from "@/features/usuarios/forms/usuario-form.schema";
import type {
  CreateUsuarioPayload,
  UpdateUsuarioPayload,
  UsuarioAdministrativo,
} from "@/features/usuarios/types/usuarios.types";

function optionalTrimmed(value: string): string | undefined {
  const normalized = value.trim();

  return normalized || undefined;
}

export function usuarioToFormValues(
  usuario: UsuarioAdministrativo,
): UsuarioFormValues {
  return {
    empresaId: usuario.empresaId ?? "",
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone ?? "",
    role: usuario.role,
    senha: "",
  };
}

export function toCreateUsuarioPayload(
  values: UsuarioFormValues,
  actorRole: AdminRole,
): CreateUsuarioPayload {
  const telefone = optionalTrimmed(values.telefone);

  const empresaId = optionalTrimmed(values.empresaId);

  return {
    nome: values.nome.trim(),

    email: values.email.trim().toLowerCase(),

    role: values.role,

    senha: values.senha,

    ...(telefone
      ? {
          telefone,
        }
      : {}),

    ...(actorRole === "SUPER_ADMIN" &&
    values.role !== "SUPER_ADMIN" &&
    empresaId
      ? {
          empresaId,
        }
      : {}),
  };
}

type UpdateUsuarioContext = {
  actorId: string;
  actorRole: AdminRole;
  usuario: UsuarioAdministrativo;
};

export function toUpdateUsuarioPayload(
  values: UsuarioFormValues,
  { actorId, actorRole, usuario }: UpdateUsuarioContext,
): UpdateUsuarioPayload {
  const telefone = optionalTrimmed(values.telefone);

  const empresaId = optionalTrimmed(values.empresaId);

  const isSelf = actorId === usuario.id;

  const roleChanged = values.role !== usuario.role;

  return {
    nome: values.nome.trim(),

    email: values.email.trim().toLowerCase(),

    ...(telefone
      ? {
          telefone,
        }
      : {}),

    ...(values.senha
      ? {
          senha: values.senha,
        }
      : {}),

    ...(!isSelf && roleChanged
      ? {
          role: values.role,
        }
      : {}),

    ...(actorRole === "SUPER_ADMIN" &&
    values.role !== "SUPER_ADMIN" &&
    empresaId
      ? {
          empresaId,
        }
      : {}),
  };
}

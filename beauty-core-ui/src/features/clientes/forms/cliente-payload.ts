import type {
  Cliente,
} from "@/features/clientes/types/clientes.types";
import type {
  ClienteFormValues,
} from "@/features/clientes/forms/cliente-form.schema";

export type CreateClientePayload = {
  nome: string;
  telefone: string;
  email?: string;
  dataNascimento?: string;
  observacoes?: string;
};

export type UpdateClientePayload =
  Partial<CreateClientePayload>;

function normalizeTelefone(
  telefone: string,
): string {
  return telefone.replace(
    /\D/g,
    "",
  );
}

function optionalTrimmed(
  value: string,
): string | undefined {
  const normalized = value.trim();

  return normalized
    ? normalized
    : undefined;
}

export function toCreateClientePayload(
  values: ClienteFormValues,
): CreateClientePayload {
  return {
    nome: values.nome.trim(),

    telefone:
      normalizeTelefone(
        values.telefone,
      ),

    ...(optionalTrimmed(
      values.email,
    )
      ? {
          email:
            optionalTrimmed(
              values.email,
            ),
        }
      : {}),

    ...(optionalTrimmed(
      values.dataNascimento,
    )
      ? {
          dataNascimento:
            optionalTrimmed(
              values.dataNascimento,
            ),
        }
      : {}),

    ...(optionalTrimmed(
      values.observacoes,
    )
      ? {
          observacoes:
            optionalTrimmed(
              values.observacoes,
            ),
        }
      : {}),
  };
}

export function toUpdateClientePayload(
  values: ClienteFormValues,
): UpdateClientePayload {
  return toCreateClientePayload(
    values,
  );
}

function toDateInputValue(
  value: string | null,
): string {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}

export function clienteToFormValues(
  cliente: Cliente,
): ClienteFormValues {
  return {
    nome: cliente.nome,
    telefone: cliente.telefone,
    email: cliente.email ?? "",
    dataNascimento:
      toDateInputValue(
        cliente.dataNascimento,
      ),
    observacoes:
      cliente.observacoes ?? "",
  };
}

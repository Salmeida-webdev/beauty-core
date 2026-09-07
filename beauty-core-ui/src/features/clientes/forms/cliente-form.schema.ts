import { z } from "zod";

function onlyDigits(
  value: string,
): string {
  return value.replace(/\D/g, "");
}

function validOptionalEmail(
  value: string,
): boolean {
  if (!value) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

function validOptionalDate(
  value: string,
): boolean {
  if (!value) {
    return true;
  }

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const [
    year,
    month,
    day,
  ] = value
    .split("-")
    .map(Number);

  const date = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
    ),
  );

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() ===
      month - 1 &&
    date.getUTCDate() === day
  );
}

export const clienteFormSchema =
  z.object({
    nome: z
      .string()
      .trim()
      .min(
        2,
        "Informe ao menos 2 caracteres.",
      )
      .max(
        120,
        "O nome deve ter no máximo 120 caracteres.",
      ),

    telefone: z
      .string()
      .trim()
      .refine(
        (value) => {
          const digits =
            onlyDigits(value);

          return (
            digits.length >= 10 &&
            digits.length <= 15
          );
        },
        {
          message:
            "Informe um telefone com 10 a 15 dígitos.",
        },
      ),

    email: z
      .string()
      .trim()
      .max(
        150,
        "O e-mail deve ter no máximo 150 caracteres.",
      )
      .refine(
        validOptionalEmail,
        {
          message:
            "Informe um e-mail válido.",
        },
      ),

    dataNascimento: z
      .string()
      .trim()
      .refine(
        validOptionalDate,
        {
          message:
            "Informe uma data válida.",
        },
      ),

    observacoes: z
      .string()
      .trim()
      .max(
        500,
        "As observações devem ter no máximo 500 caracteres.",
      ),
  });

export type ClienteFormValues =
  z.infer<typeof clienteFormSchema>;

export const EMPTY_CLIENTE_FORM_VALUES:
  ClienteFormValues = {
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    observacoes: "",
  };

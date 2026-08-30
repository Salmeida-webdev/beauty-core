import { z } from "zod";

import { parsePtBrDecimalInput } from "@/features/financeiro/utils/comissao-input";

const uuidV4Pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const comissaoFormSchema = z
  .object({
    profissionalId: z
      .string()
      .trim()
      .regex(uuidV4Pattern, "Informe um profissional válido."),

    agendamentoId: z
      .string()
      .trim()
      .regex(uuidV4Pattern, "Informe um agendamento válido."),

    valorServico: z
      .string()
      .trim()
      .refine((value) => {
        const parsed = parsePtBrDecimalInput(value);

        return parsed !== null && parsed >= 0;
      }, "Informe um valor de serviço válido."),

    percentual: z
      .string()
      .trim()
      .refine((value) => {
        const parsed = parsePtBrDecimalInput(value);

        return parsed !== null && parsed >= 0 && parsed <= 100;
      }, "Informe um percentual entre 0 e 100."),
  })
  .strict();

export type ComissaoFormValues = z.infer<typeof comissaoFormSchema>;

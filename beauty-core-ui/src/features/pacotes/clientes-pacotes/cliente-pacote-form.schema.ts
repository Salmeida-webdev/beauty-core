import { z } from "zod";

export const clientePacoteFormSchema =
  z.object({
    clienteId: z
      .string()
      .uuid(
        "Selecione um cliente válido.",
      ),

    pacoteId: z
      .string()
      .uuid(
        "Selecione um pacote válido.",
      ),
  });

export type ClientePacoteFormValues =
  z.infer<
    typeof clientePacoteFormSchema
  >;

export type CreateClientePacotePayload = {
  clienteId: string;
  pacoteId: string;
};

export function toCreateClientePacotePayload(
  values: ClientePacoteFormValues,
): CreateClientePacotePayload {
  return {
    clienteId: values.clienteId,
    pacoteId: values.pacoteId,
  };
}

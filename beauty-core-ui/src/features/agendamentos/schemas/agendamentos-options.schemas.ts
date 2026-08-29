import { z } from "zod";

export const agendaLookupOptionSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1),
});

export const agendaLookupOptionsSchema = z.array(
  agendaLookupOptionSchema,
);
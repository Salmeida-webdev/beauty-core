import { z } from "zod";

import {
  AGENDAMENTO_STATUSES,
  AGENDA_VIEWS,
} from "@/features/agendamentos/types/agendamentos-types";

export const agendamentoStatusSchema = z.enum(AGENDAMENTO_STATUSES);

export const agendaViewSchema = z.enum(AGENDA_VIEWS);

export const agendaDateKeySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data da agenda inv\u00e1lida.");

export const agendaUrlStateSchema = z.object({
  view: agendaViewSchema,
  date: agendaDateKeySchema,
  status: agendamentoStatusSchema.optional(),
  clienteId: z.uuid().optional(),
  profissionalId: z.uuid().optional(),
  servicoId: z.uuid().optional(),
  unidadeId: z.uuid().optional(),
});
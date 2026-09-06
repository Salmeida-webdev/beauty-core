import { z } from "zod";

import {
  PORTAL_APPOINTMENT_STATUS_VALUES,
  PORTAL_HISTORY_TYPE_VALUES,
} from "./portal-client-contracts";

const dateTimeSchema = z.string().datetime();
const nullableDateTimeSchema = dateTimeSchema.nullable();
const nullableStringSchema = z.string().nullable();

const namedRelationSchema = z
  .object({
    nome: z.string().nullable().optional(),
  })
  .passthrough();

const professionalRelationSchema = z
  .object({
    nome: z.string().nullable().optional(),
    foto: z.string().nullable().optional(),
  })
  .passthrough();

export const portalProfileTransportSchema = z
  .object({
    nome: z.string(),
    telefone: z.string(),
    email: nullableStringSchema,
    foto: nullableStringSchema,
    dataNascimento: nullableDateTimeSchema,
  })
  .passthrough();

export const portalAppointmentTransportSchema = z
  .object({
    dataHoraInicio: dateTimeSchema,
    dataHoraFim: dateTimeSchema,
    status: z.enum(PORTAL_APPOINTMENT_STATUS_VALUES),
    servico: namedRelationSchema.nullable().optional(),
    profissional: professionalRelationSchema.nullable().optional(),
    unidade: namedRelationSchema.nullable().optional(),
  })
  .passthrough();

export const portalDashboardTransportSchema = z
  .object({
    perfil: portalProfileTransportSchema,
    agendamentos: z
      .object({
        proximos: z.array(portalAppointmentTransportSchema),
        ultimo: portalAppointmentTransportSchema.nullable(),
      })
      .passthrough(),
  })
  .passthrough();

export const portalHistoryItemTransportSchema = z
  .object({
    tipo: z.enum(PORTAL_HISTORY_TYPE_VALUES),
    data: dateTimeSchema,
    titulo: z.string(),
    status: z.string().nullable().optional(),
    descricao: z.unknown().optional(),
    dados: z.unknown().optional(),
  })
  .passthrough();

export const portalHistoryTransportSchema = z.array(
  portalHistoryItemTransportSchema,
);

export const portalProfileUpdateInputSchema = z
  .object({
    nome: z.string().trim().min(2).max(120).optional(),
    email: z.string().trim().email().max(150).optional(),
    dataNascimento: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
  })
  .strict()
  .refine(
    (value) =>
      Object.values(value).some(
        (field) => field !== undefined,
      ),
    {
      message: "Informe pelo menos um campo para atualizar.",
    },
  );

export type PortalProfileTransport = z.infer<
  typeof portalProfileTransportSchema
>;

export type PortalAppointmentTransport = z.infer<
  typeof portalAppointmentTransportSchema
>;

export type PortalDashboardTransport = z.infer<
  typeof portalDashboardTransportSchema
>;

export type PortalHistoryItemTransport = z.infer<
  typeof portalHistoryItemTransportSchema
>;

export type PortalProfileUpdateInputParsed = z.infer<
  typeof portalProfileUpdateInputSchema
>;

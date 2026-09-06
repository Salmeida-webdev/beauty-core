import { z } from "zod";

export const PORTAL_APPOINTMENT_STATUSES = [
  "PENDENTE",
  "CONFIRMADO",
  "EM_ANDAMENTO",
  "CONCLUIDO",
  "CANCELADO",
  "FALTOU",
] as const;

export type PortalAppointmentStatus =
  (typeof PORTAL_APPOINTMENT_STATUSES)[number];

export type PortalAppointment = Readonly<{
  id: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  status: PortalAppointmentStatus;
  servicoNome: string | null;
  profissionalNome: string | null;
  profissionalFoto: string | null;
  unidadeNome: string | null;
}>;

export type PortalAppointmentsResponse = Readonly<{
  data: readonly PortalAppointment[];
  meta: Readonly<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }>;
}>;

export const portalAppointmentTransportSchema = z.object({
  id: z.string().min(1),
  dataHoraInicio: z.string().datetime(),
  dataHoraFim: z.string().datetime(),
  status: z.enum(PORTAL_APPOINTMENT_STATUSES),
  servico: z.object({ nome: z.string().nullable().optional() }).nullable().optional(),
  profissional: z.object({
    nome: z.string().nullable().optional(),
    foto: z.string().nullable().optional(),
  }).nullable().optional(),
  unidade: z.object({ nome: z.string().nullable().optional() }).nullable().optional(),
}).passthrough();

export const portalAppointmentsTransportSchema = z.object({
  data: z.array(portalAppointmentTransportSchema),
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }).passthrough(),
}).passthrough();

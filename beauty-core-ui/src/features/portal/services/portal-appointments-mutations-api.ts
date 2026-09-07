import { getApiClient } from "@/services/api/api-client";

import type { PortalAppointment } from "../contracts/portal-appointments-contracts";
import { portalAppointmentTransportSchema } from "../contracts/portal-appointments-contracts";

export type CreatePortalAppointmentInput = Readonly<{
  unidadeId: string;
  servicoId: string;
  profissionalId: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  observacoes?: string;
}>;

export type ReschedulePortalAppointmentInput = Readonly<{
  unidadeId?: string;
  servicoId?: string;
  profissionalId?: string;
  dataHoraInicio?: string;
  dataHoraFim?: string;
  observacoes?: string;
}>;

function adaptAppointment(value: unknown): PortalAppointment {
  const parsed = portalAppointmentTransportSchema.parse(value);

  return {
    id: parsed.id,
    dataHoraInicio: parsed.dataHoraInicio,
    dataHoraFim: parsed.dataHoraFim,
    status: parsed.status,
    servicoNome: parsed.servico?.nome ?? null,
    profissionalNome: parsed.profissional?.nome ?? null,
    profissionalFoto: parsed.profissional?.foto ?? null,
    unidadeNome: parsed.unidade?.nome ?? null,
  };
}

export async function createPortalAppointment(
  input: CreatePortalAppointmentInput,
): Promise<PortalAppointment> {
  const response = await getApiClient().post<unknown>(
    "/area-cliente/me/agendamentos",
    input,
  );

  return adaptAppointment(response.data);
}

export async function reschedulePortalAppointment(
  id: string,
  input: ReschedulePortalAppointmentInput,
): Promise<PortalAppointment> {
  const response = await getApiClient().patch<unknown>(
    `/area-cliente/me/agendamentos/${id}/reagendar`,
    input,
  );

  return adaptAppointment(response.data);
}

export async function cancelPortalAppointment(
  id: string,
): Promise<PortalAppointment> {
  const response = await getApiClient().patch<unknown>(
    `/area-cliente/me/agendamentos/${id}/cancelar`,
  );

  return adaptAppointment(response.data);
}

export const portalAppointmentsMutationsApi = {
  create: createPortalAppointment,
  reschedule: reschedulePortalAppointment,
  cancel: cancelPortalAppointment,
} as const;

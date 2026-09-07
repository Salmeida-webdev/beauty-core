import type {
  PortalAppointment,
  PortalAppointmentsResponse,
} from "./portal-appointments-contracts";
import {
  portalAppointmentTransportSchema,
  portalAppointmentsTransportSchema,
} from "./portal-appointments-contracts";

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

export function adaptPortalAppointments(
  value: unknown,
): PortalAppointmentsResponse {
  const parsed = portalAppointmentsTransportSchema.parse(value);

  return {
    data: parsed.data.map(adaptAppointment),
    meta: parsed.meta,
  };
}

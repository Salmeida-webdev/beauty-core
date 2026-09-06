import type {
  PortalAppointmentSummary,
  PortalDashboard,
  PortalHistory,
  PortalHistoryItem,
  PortalProfile,
  PortalProfileUpdateInput,
} from "./portal-client-contracts";
import {
  portalDashboardTransportSchema,
  portalHistoryTransportSchema,
  portalProfileTransportSchema,
  portalProfileUpdateInputSchema,
  type PortalAppointmentTransport,
  type PortalHistoryItemTransport,
  type PortalProfileTransport,
} from "./portal-client-schemas";

const dateOnlyPrefix = /^(\d{4}-\d{2}-\d{2})/;

function toDateOnly(value: string | null): string | null {
  if (value === null) {
    return null;
  }

  const match = dateOnlyPrefix.exec(value);

  if (!match) {
    throw new TypeError("Data de nascimento fora do formato ISO.");
  }

  return match[1];
}

function toPortalProfile(
  value: PortalProfileTransport,
): PortalProfile {
  return {
    nome: value.nome,
    telefone: value.telefone,
    email: value.email,
    foto: value.foto,
    dataNascimento: toDateOnly(value.dataNascimento),
  };
}

function toPortalAppointmentSummary(
  value: PortalAppointmentTransport,
): PortalAppointmentSummary {
  return {
    dataHoraInicio: value.dataHoraInicio,
    dataHoraFim: value.dataHoraFim ?? null,
    status: value.status,
    servicoNome: value.servico?.nome ?? null,
    profissionalNome: value.profissional?.nome ?? null,
    profissionalFoto: value.profissional?.foto ?? null,
    unidadeNome: value.unidade?.nome ?? null,
  };
}

export function adaptPortalProfile(
  value: unknown,
): PortalProfile {
  return toPortalProfile(
    portalProfileTransportSchema.parse(value),
  );
}

export function adaptPortalDashboard(
  value: unknown,
): PortalDashboard {
  const parsed =
    portalDashboardTransportSchema.parse(value);

  return {
    perfil: toPortalProfile(parsed.perfil),
    agendamentos: {
      proximos: parsed.agendamentos.proximos.map(
        toPortalAppointmentSummary,
      ),
      ultimo: parsed.agendamentos.ultimo
        ? toPortalAppointmentSummary(
            parsed.agendamentos.ultimo,
          )
        : null,
    },
  };
}

export function adaptPortalHistory(
  value: unknown,
): PortalHistory {
  const parsed =
    portalHistoryTransportSchema.parse(value);

  return parsed.map(
    (item: PortalHistoryItemTransport): PortalHistoryItem => ({
      tipo: item.tipo,
      data: item.data,
      titulo: item.titulo,
      status: item.status ?? null,
    }),
  );
}

export function normalizePortalProfileUpdate(
  value: PortalProfileUpdateInput,
): PortalProfileUpdateInput {
  const parsed =
    portalProfileUpdateInputSchema.parse(value);

  return {
    ...(parsed.nome === undefined
      ? {}
      : { nome: parsed.nome }),
    ...(parsed.email === undefined
      ? {}
      : { email: parsed.email.toLowerCase() }),
    ...(parsed.dataNascimento === undefined
      ? {}
      : { dataNascimento: parsed.dataNascimento }),
  };
}

export {
  portalDashboardTransportSchema,
  portalHistoryTransportSchema,
  portalProfileTransportSchema,
};

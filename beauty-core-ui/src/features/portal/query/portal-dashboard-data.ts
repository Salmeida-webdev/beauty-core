import type {
  PortalAppointmentSummary,
  PortalDashboard,
} from "../contracts/portal-client-contracts";

export type PortalDashboardAppointmentViewModel =
  Readonly<{
    dataHoraInicio: string;
    dataHoraFim: string | null;
    status: PortalAppointmentSummary["status"];
    servicoNome: string | null;
    profissionalNome: string | null;
    profissionalFoto: string | null;
    unidadeNome: string | null;
  }>;

export type PortalDashboardViewModel = Readonly<{
  nome: string;
  foto: string | null;
  proximos: readonly PortalDashboardAppointmentViewModel[];
  ultimo: PortalDashboardAppointmentViewModel | null;
}>;

function mapAppointment(
  value: PortalAppointmentSummary,
): PortalDashboardAppointmentViewModel {
  return {
    dataHoraInicio: value.dataHoraInicio,
    dataHoraFim: value.dataHoraFim,
    status: value.status,
    servicoNome: value.servicoNome,
    profissionalNome: value.profissionalNome,
    profissionalFoto: value.profissionalFoto,
    unidadeNome: value.unidadeNome,
  };
}

export function mapPortalDashboardToViewModel(
  value: PortalDashboard,
): PortalDashboardViewModel {
  return {
    nome: value.perfil.nome,
    foto: value.perfil.foto,
    proximos: value.agendamentos.proximos.map(mapAppointment),
    ultimo: value.agendamentos.ultimo
      ? mapAppointment(value.agendamentos.ultimo)
      : null,
  };
}

export function isPortalDashboardEmpty(
  value: PortalDashboardViewModel,
): boolean {
  return value.proximos.length === 0 && value.ultimo === null;
}
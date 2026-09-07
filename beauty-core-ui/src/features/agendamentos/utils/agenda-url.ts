import {
  agendaViewSchema,
  agendamentoStatusSchema,
} from "@/features/agendamentos/schemas/agendamentos-schemas";
import type {
  AgendaUrlState,
  AgendaView,
} from "@/features/agendamentos/types/agendamentos-types";
import {
  formatAgendaDateKey,
  parseAgendaDateKey,
} from "@/features/agendamentos/utils/agendamentos-date";

type SearchParamsReader = {
  get(name: string): string | null;
};

function parseOptionalUuid(
  value: string | null,
): string | undefined {
  if (!value) {
    return undefined;
  }

  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidPattern.test(value)
    ? value
    : undefined;
}

export function getDefaultAgendaDate(): string {
  return formatAgendaDateKey(new Date());
}

export function parseAgendaUrlState(
  searchParams: SearchParamsReader,
  fallbackDate = getDefaultAgendaDate(),
): AgendaUrlState {
  const rawView = searchParams.get("view");
  const parsedView = agendaViewSchema.safeParse(rawView);

  const view: AgendaView =
    parsedView.success
      ? parsedView.data
      : "week";

  const rawDate = searchParams.get("date");

  const date =
    rawDate && parseAgendaDateKey(rawDate)
      ? rawDate
      : fallbackDate;

  const rawStatus = searchParams.get("status");
  const parsedStatus =
    agendamentoStatusSchema.safeParse(rawStatus);

  return {
    view,
    date,

    status: parsedStatus.success
      ? parsedStatus.data
      : undefined,

    clienteId: parseOptionalUuid(
      searchParams.get("clienteId"),
    ),

    profissionalId: parseOptionalUuid(
      searchParams.get("profissionalId"),
    ),

    servicoId: parseOptionalUuid(
      searchParams.get("servicoId"),
    ),

    unidadeId: parseOptionalUuid(
      searchParams.get("unidadeId"),
    ),
  };
}

export function buildAgendaSearchParams(
  state: AgendaUrlState,
): URLSearchParams {
  const params = new URLSearchParams();

  params.set("view", state.view);
  params.set("date", state.date);

  if (state.status) {
    params.set("status", state.status);
  }

  if (state.clienteId) {
    params.set("clienteId", state.clienteId);
  }

  if (state.profissionalId) {
    params.set(
      "profissionalId",
      state.profissionalId,
    );
  }

  if (state.servicoId) {
    params.set("servicoId", state.servicoId);
  }

  if (state.unidadeId) {
    params.set("unidadeId", state.unidadeId);
  }

  return params;
}
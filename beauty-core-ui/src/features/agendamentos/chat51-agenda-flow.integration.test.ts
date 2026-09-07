import fs from "node:fs";
import path from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

function source(
  relativePath: string,
) {
  return fs.readFileSync(
    path.join(
      process.cwd(),
      relativePath,
    ),
    "utf8",
  );
}

const view = source(
  "src/features/agendamentos/components/agenda-view.tsx",
);

const filters = source(
  "src/features/agendamentos/components/agenda-filters.tsx",
);

const createDialog = source(
  "src/features/agendamentos/components/agendamento-create-dialog.tsx",
);

const detailDialog = source(
  "src/features/agendamentos/components/agendamento-detail-dialog.tsx",
);

const statusActions = source(
  "src/features/agendamentos/components/agendamento-status-actions.tsx",
);

const createPayload = source(
  "src/features/agendamentos/forms/agendamento-create-payload.ts",
);

const editPayload = source(
  "src/features/agendamentos/forms/agendamento-edit-payload.ts",
);

const urlState = source(
  "src/features/agendamentos/hooks/use-agenda-url-state.ts",
);

const queryOptions = source(
  "src/features/agendamentos/queries/agendamentos-query-options.ts",
);

const api = source(
  "src/features/agendamentos/services/agendamentos-api.ts",
);

const permissions = source(
  "src/features/agendamentos/permissions/agendamentos-permissions.ts",
);

describe("Chat 51 Agenda flow integration", () => {
  it("liga URL state, filtros e consultas reais", () => {
    expect(view).toContain(
      "useAgendaUrlState",
    );

    expect(view).toContain(
      "agendaUrlStateToFilters",
    );

    expect(view).toContain(
      "buildAgendaOperationalQuery",
    );

    expect(view).toContain(
      "requestFilters",
    );

    expect(view).toContain(
      "agendamentosQueryOptions.calendar",
    );

    expect(view).toContain(
      "agendamentosQueryOptions.list",
    );

    expect(filters).toContain(
      "AgendaRelatedSelectors",
    );

    expect(urlState).toContain(
      "router.replace",
    );

    expect(urlState).toContain(
      "buildAgendaSearchParams",
    );

    expect(urlState).toContain(
      "parseAgendaUrlState",
    );
  });

  it("liga as tres visualizacoes aos mesmos dados reais", () => {
    expect(view).toContain(
      "AgendaCalendar",
    );

    expect(view).toContain(
      "AgendaList",
    );

    expect(view).toContain(
      '"day"',
    );

    expect(view).toContain(
      '"week"',
    );

    expect(view).toContain(
      '"list"',
    );

    expect(queryOptions).toContain(
      "keepPreviousData",
    );

    expect(queryOptions).toContain(
      "retry: false",
    );
  });

  it("liga criacao ao POST real e invalidacao de cache", () => {
    expect(view).toContain(
      "AgendamentoCreateDialog",
    );

    expect(view).toContain(
      "canCreateAppointment",
    );

    expect(createDialog).toContain(
      "agendamentosApi.create",
    );

    expect(createDialog).toContain(
      "invalidateQueries",
    );

    expect(createDialog).toContain(
      "agendamentosKeys.all",
    );

    expect(createDialog).toContain(
      "retry: false",
    );

    expect(createPayload).toContain(
      "dataHoraInicio",
    );

    expect(createPayload).toContain(
      "dataHoraFim",
    );

    expect(api).toContain(
      '"/agendamentos"',
    );

    expect(api).toContain(
      ".post<unknown>",
    );
  });

  it("liga detalhe e edicao ao GET/PATCH real", () => {
    expect(view).toContain(
      "AgendamentoDetailDialog",
    );

    expect(view).toContain(
      "selectedAgendamentoId",
    );

    expect(view).toContain(
      "canEditAppointment",
    );

    expect(detailDialog).toContain(
      "agendamentosQueryOptions.detail",
    );

    expect(detailDialog).toContain(
      "agendamentosApi.update",
    );

    expect(detailDialog).toContain(
      "setQueryData",
    );

    expect(detailDialog).toContain(
      "invalidateQueries",
    );

    expect(editPayload).toContain(
      "toUpdateAgendamentoPayload",
    );

    expect(api).toContain(
      ".patch<unknown>",
    );

    expect(api).toContain(
      "`/agendamentos/${agendamentoId}`",
    );
  });

  it("liga status e cancelamento a mutations distintas", () => {
    expect(view).toContain(
      "canChangeAppointmentStatus",
    );

    expect(view).toContain(
      "canCancelAppointment",
    );

    expect(statusActions).toContain(
      "agendamentosApi.changeStatus",
    );

    expect(statusActions).toContain(
      "agendamentosApi.cancel",
    );

    expect(statusActions).toContain(
      "Confirmar alteracao de status",
    );

    expect(statusActions).toContain(
      "Confirmar cancelamento",
    );

    expect(api).toContain(
      "changeAgendamentoStatus",
    );

    expect(api).toContain(
      "cancelAgendamento",
    );

    expect(api).toContain(
      "`/agendamentos/${agendamentoId}/cancelar`",
    );
  });

  it("mantem RBAC do fluxo inteiro no contrato real", () => {
    for (const role of [
      "ADMIN",
      "GERENTE",
      "RECEPCAO",
      "PROFISSIONAL",
    ]) {
      expect(
        permissions,
      ).toContain(role);
    }

    for (const capability of [
      "canAccessSchedule",
      "canCreateAppointment",
      "canEditAppointment",
      "canRescheduleAppointment",
      "canCancelAppointment",
      "canChangeAppointmentStatus",
    ]) {
      expect(
        permissions,
      ).toContain(capability);
    }
  });

  it("mantem cache coerente apos todas as mutations", () => {
    expect(createDialog).toContain(
      "agendamentosKeys.all",
    );

    expect(detailDialog).toContain(
      "agendamentosKeys.all",
    );

    expect(statusActions).toContain(
      "agendamentosKeys.all",
    );

    expect(detailDialog).toContain(
      "setQueryData",
    );

    expect(statusActions).toContain(
      "setQueryData",
    );
  });

  it("nao possui optimistic update nas mutations criticas", () => {
    const mutations = [
      createDialog,
      detailDialog,
      statusActions,
    ].join("\n");

    expect(mutations).not.toContain(
      "onMutate",
    );

    expect(mutations).not.toContain(
      "cancelQueries",
    );
  });

  it("nao envia empresaId pelo fluxo frontend", () => {
    const functionalFlow = [
      createPayload,
      editPayload,
      createDialog,
      detailDialog,
      statusActions,
      api,
    ].join("\n");

    expect(
      functionalFlow,
    ).not.toContain(
      "empresaId",
    );
  });

  it("nao inventa disponibilidade, conflito ou transicoes", () => {
    const functionalFlow = [
      view,
      createDialog,
      detailDialog,
      statusActions,
      api,
    ]
      .join("\n")
      .toLowerCase();

    for (const forbidden of [
      "conflito detectado",
      "sem conflito",
      "horario disponivel",
      "profissional disponivel",
      "disponibilidade confirmada",
      "allowed_transitions",
      "transition_map",
    ]) {
      expect(
        functionalFlow,
      ).not.toContain(
        forbidden,
      );
    }
  });

  it("mantem retry automatico desabilitado", () => {
    expect(queryOptions).toContain(
      "retry: false",
    );

    expect(createDialog).toContain(
      "retry: false",
    );

    expect(detailDialog).toContain(
      "retry: false",
    );

    expect(
      statusActions.match(
        /retry:\s*false/g,
      )?.length,
    ).toBeGreaterThanOrEqual(
      2,
    );
  });
});
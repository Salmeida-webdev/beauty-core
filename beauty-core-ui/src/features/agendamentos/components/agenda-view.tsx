"use client";

import {
  useMemo,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import {
  ErrorState,
  LoadingState,
  PermissionState,
} from "@/components/states/feedback-states";
import { AgendaCalendar } from "@/features/agendamentos/components/agenda-calendar";
import { AgendamentoCreateDialog } from "@/features/agendamentos/components/agendamento-create-dialog";
import { AgendamentoDetailDialog } from "@/features/agendamentos/components/agendamento-detail-dialog";
import { AgendaCalendarToolbar } from "@/features/agendamentos/components/agenda-calendar-toolbar";
import { AgendaFilters } from "@/features/agendamentos/components/agenda-filters";
import { AgendaList } from "@/features/agendamentos/components/agenda-list";
import { useAgendaUrlState } from "@/features/agendamentos/hooks/use-agenda-url-state";
import {
  canAccessSchedule,
  canCancelAppointment,
  canChangeAppointmentStatus,
  canCreateAppointment,
  canEditAppointment,
} from "@/features/agendamentos/permissions/agendamentos-permissions";
import { agendamentosQueryOptions } from "@/features/agendamentos/queries/agendamentos-query-options";
import {
  agendaUrlStateToFilters,
  buildAgendaOperationalQuery,
  hasAgendaOperationalFilters,
} from "@/features/agendamentos/utils/agenda-filters";
import {
  formatAgendaPeriodLabel,
  shiftAgendaCalendarDate,
  type AgendaCalendarMode,
} from "@/features/agendamentos/utils/agenda-calendar";
import { getAgendaRange } from "@/features/agendamentos/utils/agendamentos-date";
import { getDefaultAgendaDate } from "@/features/agendamentos/utils/agenda-url";
import { useAuthStore } from "@/stores/auth-store";

export function AgendaView() {
  const status = useAuthStore(
    (state) => state.status,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const {
    state: urlState,
    updateState,
  } = useAgendaUrlState();

  const [
    listPage,
    setListPage,
  ] = useState(1);

  const [
    selectedAgendamentoId,
    setSelectedAgendamentoId,
  ] = useState<string | null>(
    null,
  );

  const isListView =
    urlState.view === "list";

  const rangeMode: AgendaCalendarMode =
    urlState.view === "day"
      ? "day"
      : "week";

  const canAccess =
    status === "authenticated" &&
    user !== null &&
    canAccessSchedule(user.role);

  const canCreate =
    status === "authenticated" &&
    user !== null &&
    canCreateAppointment(
      user.role,
    );

  const canEdit =
    status === "authenticated" &&
    user !== null &&
    canEditAppointment(
      user.role,
    );

  const canChangeStatus =
    status === "authenticated" &&
    user !== null &&
    canChangeAppointmentStatus(
      user.role,
    );

  const canCancel =
    status === "authenticated" &&
    user !== null &&
    canCancelAppointment(
      user.role,
    );

  const operationalFilters =
    useMemo(
      () =>
        agendaUrlStateToFilters(
          urlState,
        ),
      [urlState],
    );

  const requestFilters =
    useMemo(
      () =>
        buildAgendaOperationalQuery(
          operationalFilters,
        ),
      [operationalFilters],
    );

  const range =
    useMemo(
      () =>
        getAgendaRange(
          urlState.date,
          rangeMode,
        ),
      [
        rangeMode,
        urlState.date,
      ],
    );

  const calendarQuery = useQuery(
    agendamentosQueryOptions.calendar(
      range,
      requestFilters,
      canAccess &&
        !isListView,
    ),
  );

  const listQuery = useQuery(
    agendamentosQueryOptions.list(
      {
        page: listPage,
        limit: 20,
        orderBy:
          "dataHoraInicio",
        orderDirection: "asc",
        ...range,
        ...requestFilters,
      },
      canAccess,
    ),
  );

  const isRestoring =
    status === "idle" ||
    status === "restoring";

  const total =
    isListView
      ? listQuery.data?.meta.total
      : calendarQuery.data?.meta.total;

  const headerMeta =
    !canAccess
      ? "Acesso conforme o perfil administrativo"
      : total === undefined
        ? "Agenda operacional da empresa"
        : total === 1
          ? "1 agendamento no periodo"
          : `${total} agendamentos no periodo`;

  function updateUrl(
    patch: Parameters<
      typeof updateState
    >[0],
  ) {
    setListPage(1);
    updateState(patch);
  }

  function handlePrevious() {
    updateUrl({
      date:
        shiftAgendaCalendarDate(
          urlState.date,
          rangeMode,
          -1,
        ),
    });
  }

  function handleNext() {
    updateUrl({
      date:
        shiftAgendaCalendarDate(
          urlState.date,
          rangeMode,
          1,
        ),
    });
  }

  function handleToday() {
    updateUrl({
      date:
        getDefaultAgendaDate(),
    });
  }

  const listPeriodLabel =
    formatAgendaPeriodLabel(
      urlState.date,
      rangeMode,
    );

  return (
    <PageContainer
      size="wide"
      data-testid="agenda-page"
    >
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Agenda"
        description="Calendario e lista operacionais conectados aos agendamentos reais da empresa."
        meta={headerMeta}
      />

      {isRestoring ? (
        <LoadingState />
      ) : user === null ||
        !canAccess ? (
        <PermissionState description="Seu perfil nao possui permissao para acessar a Agenda desta empresa." />
      ) : (
        <div className="space-y-6">
          {canCreate ? (
            <div className="flex justify-end">
              <AgendamentoCreateDialog />
            </div>
          ) : null}

          <AgendaFilters
            state={urlState}
            onChange={
              updateUrl
            }
          />

          {isListView ? (
            <PageSection
              title="Lista operacional"
              description="Periodo, visualizacao e filtros sao reproduziveis pela URL."
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-background">
                <AgendaCalendarToolbar
                  mode="list"
                  periodLabel={
                    listPeriodLabel
                  }
                  isFetching={
                    listQuery.isFetching
                  }
                  onModeChange={(
                    nextView,
                  ) => {
                    updateUrl({
                      view: nextView,
                    });
                  }}
                  onPrevious={
                    handlePrevious
                  }
                  onToday={
                    handleToday
                  }
                  onNext={
                    handleNext
                  }
                />

                {listQuery.isPending ? (
                  <div className="min-h-56 p-card">
                    <LoadingState />
                  </div>
                ) : listQuery.isError &&
                  !listQuery.data ? (
                  <div className="p-card">
                    <ErrorState
                      title="Nao foi possivel carregar a lista"
                      description="Os agendamentos do periodo nao puderam ser carregados."
                      onRetry={() => {
                        void listQuery.refetch();
                      }}
                    />
                  </div>
                ) : listQuery.data ? (
                  <AgendaList
                    items={
                      listQuery.data.data
                    }
                    meta={
                      listQuery.data.meta
                    }
                    isFetching={
                      listQuery.isFetching
                    }
                    onPreviousPage={() => {
                      setListPage(
                        (current) =>
                          Math.max(
                            1,
                            current - 1,
                          ),
                      );
                    }}
                    onNextPage={() => {
                      setListPage(
                        (current) =>
                          current + 1,
                      );
                    }}
                    onSelect={(item) => {
                      setSelectedAgendamentoId(
                        item.id,
                      );
                    }}
                  />
                ) : null}
              </div>
            </PageSection>
          ) : (
            <>
              <PageSection
                title="Calendario operacional"
                description="Visualize os agendamentos reais por dia ou semana. Periodo, visualizacao e filtros ficam registrados na URL."
              >
                {calendarQuery.isPending ? (
                  <div className="min-h-96 rounded-2xl border border-border p-card">
                    <LoadingState />
                  </div>
                ) : calendarQuery.isError &&
                  !calendarQuery.data ? (
                  <div className="rounded-2xl border border-border p-card">
                    <ErrorState
                      title="Nao foi possivel carregar a Agenda"
                      description="Os agendamentos do periodo nao puderam ser carregados. Tente novamente."
                      onRetry={() => {
                        void calendarQuery.refetch();
                      }}
                    />
                  </div>
                ) : calendarQuery.data ? (
                  <AgendaCalendar
                    dateKey={
                      urlState.date
                    }
                    mode={
                      rangeMode
                    }
                    items={
                      calendarQuery.data
                        .data
                    }
                    total={
                      calendarQuery.data
                        .meta.total
                    }
                    filtered={hasAgendaOperationalFilters(
                      operationalFilters,
                    )}
                    isFetching={
                      calendarQuery.isFetching
                    }
                    onModeChange={(
                      nextView,
                    ) => {
                      updateUrl({
                        view: nextView,
                      });
                    }}
                    onPrevious={
                      handlePrevious
                    }
                    onToday={
                      handleToday
                    }
                    onNext={
                      handleNext
                    }
                    onSelectItem={(item) => {
                      setSelectedAgendamentoId(
                        item.id,
                      );
                    }}
                  />
                ) : null}
              </PageSection>

              <PageSection
                title="Lista complementar"
                description="A mesma consulta operacional em formato paginado, preservando periodo e filtros server-side."
              >
                {listQuery.isPending ? (
                  <div className="min-h-56 rounded-2xl border border-border p-card">
                    <LoadingState />
                  </div>
                ) : listQuery.isError &&
                  !listQuery.data ? (
                  <div className="rounded-2xl border border-border p-card">
                    <ErrorState
                      title="Nao foi possivel carregar a lista"
                      description="A lista complementar nao pode ser carregada. Tente novamente."
                      onRetry={() => {
                        void listQuery.refetch();
                      }}
                    />
                  </div>
                ) : listQuery.data ? (
                  <AgendaList
                    items={
                      listQuery.data.data
                    }
                    meta={
                      listQuery.data.meta
                    }
                    isFetching={
                      listQuery.isFetching
                    }
                    onPreviousPage={() => {
                      setListPage(
                        (current) =>
                          Math.max(
                            1,
                            current - 1,
                          ),
                      );
                    }}
                    onNextPage={() => {
                      setListPage(
                        (current) =>
                          current + 1,
                      );
                    }}
                    onSelect={(item) => {
                      setSelectedAgendamentoId(
                        item.id,
                      );
                    }}
                  />
                ) : null}
              </PageSection>
            </>
          )}
        </div>
      )}

      <AgendamentoDetailDialog
        agendamentoId={
          selectedAgendamentoId
        }
        canEdit={canEdit}
        canChangeStatus={
          canChangeStatus
        }
        canCancel={canCancel}
        onClose={() => {
          setSelectedAgendamentoId(
            null,
          );
        }}
      />
    </PageContainer>
  );
}
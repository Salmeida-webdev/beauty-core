"use client";

import { useState } from "react";

import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
import {
  PortalEmptyState,
  PortalErrorState,
  PortalLoadingState,
} from "@/features/portal/states/portal-state-views";
import { usePortalAppointmentsQuery } from "@/features/portal/query/portal-appointments-query";
import {
  useCancelPortalAppointment,
  useCreatePortalAppointment,
  useReschedulePortalAppointment,
} from "@/features/portal/query/portal-appointments-mutations";

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export default function PortalAppointmentsPage() {
  const query = usePortalAppointmentsQuery({
    page: 1,
    limit: 20,
  });

  const createMutation = useCreatePortalAppointment();
  const cancelMutation = useCancelPortalAppointment();
  const rescheduleMutation = useReschedulePortalAppointment();

  const [form, setForm] = useState({
    unidadeId: "",
    servicoId: "",
    profissionalId: "",
    dataHoraInicio: "",
    dataHoraFim: "",
    observacoes: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  function updateField(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleCreate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setFormError(null);

    try {
      await createMutation.mutateAsync({
        unidadeId: form.unidadeId,
        servicoId: form.servicoId,
        profissionalId: form.profissionalId,
        dataHoraInicio: new Date(form.dataHoraInicio).toISOString(),
        dataHoraFim: new Date(form.dataHoraFim).toISOString(),
        ...(form.observacoes
          ? { observacoes: form.observacoes }
          : {}),
      });

      setForm({
        unidadeId: "",
        servicoId: "",
        profissionalId: "",
        dataHoraInicio: "",
        dataHoraFim: "",
        observacoes: "",
      });
    } catch {
      setFormError(
        "Não foi possível criar o agendamento. Verifique os dados e a disponibilidade.",
      );
    }
  }

  async function handleCancel(id: string) {
    if (!window.confirm("Deseja cancelar este agendamento?")) {
      return;
    }

    await cancelMutation.mutateAsync(id);
  }

  async function handleReschedule(id: string) {
    const start = window.prompt(
      "Informe a nova data/hora inicial em formato ISO:",
    );

    if (!start) {
      return;
    }

    const end = window.prompt(
      "Informe a nova data/hora final em formato ISO:",
    );

    if (!end) {
      return;
    }

    await rescheduleMutation.mutateAsync({
      id,
      input: {
        dataHoraInicio: new Date(start).toISOString(),
        dataHoraFim: new Date(end).toISOString(),
      },
    });
  }

  if (query.isPending) {
    return (
      <PortalPrivateRoutePage
        heading="Agendamentos"
        description="Consulte e gerencie seus atendimentos."
      >
        <PortalLoadingState
          title="Carregando agendamentos"
          description="Estamos buscando seus atendimentos."
        />
      </PortalPrivateRoutePage>
    );
  }

  if (query.isError) {
    return (
      <PortalPrivateRoutePage
        heading="Agendamentos"
        description="Consulte e gerencie seus atendimentos."
      >
        <PortalErrorState
          title="Falha ao carregar agendamentos"
          description="Não foi possível consultar seus atendimentos."
          action={{
            label: "Tentar novamente",
            onClick: () => {
              void query.refetch();
            },
          }}
        />
      </PortalPrivateRoutePage>
    );
  }

  const appointments = query.data.data;

  return (
    <PortalPrivateRoutePage
      heading="Agendamentos"
      description="Consulte e gerencie seus atendimentos."
    >
      <div className="space-y-6">
        <form
          className="space-y-4 rounded-xl border border-border/80 bg-background/70 p-4"
          onSubmit={handleCreate}
        >
          <h2 className="text-lg font-semibold text-foreground">
            Novo agendamento
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["unidadeId", "ID da unidade"],
                ["servicoId", "ID do serviço"],
                ["profissionalId", "ID do profissional"],
                ["dataHoraInicio", "Início"],
                ["dataHoraFim", "Fim"],
              ] as const
            ).map(([field, label]) => (
              <label
                className="grid gap-1 text-sm text-muted-foreground"
                key={field}
              >
                {label}
                <input
                  className="min-h-11 rounded-md border border-border bg-background px-3 text-foreground"
                  onChange={(event) => {
                    updateField(field, event.target.value);
                  }}
                  required
                  type={field.includes("dataHora") ? "datetime-local" : "text"}
                  value={form[field]}
                />
              </label>
            ))}
          </div>

          <label className="grid gap-1 text-sm text-muted-foreground">
            Observações
            <textarea
              className="min-h-20 rounded-md border border-border bg-background px-3 py-2 text-foreground"
              maxLength={500}
              onChange={(event) => {
                updateField("observacoes", event.target.value);
              }}
              value={form.observacoes}
            />
          </label>

          {formError ? (
            <p className="text-sm text-destructive" role="alert">
              {formError}
            </p>
          ) : null}

          <button
            className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
            disabled={createMutation.isPending}
            type="submit"
          >
            {createMutation.isPending
              ? "Criando..."
              : "Criar agendamento"}
          </button>
        </form>

        {appointments.length === 0 ? (
          <PortalEmptyState
            title="Nenhum agendamento encontrado"
            description="Quando houver atendimentos registrados, eles aparecerão nesta área."
          />
        ) : (
          <ol
            aria-label="Lista de agendamentos"
            className="space-y-3"
          >
            {appointments.map((appointment) => (
              <li
                className="rounded-xl border border-border/80 bg-background/70 p-4 shadow-sm"
                key={appointment.id}
              >
                <article className="space-y-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-semibold text-foreground">
                        {appointment.servicoNome ?? "Serviço não informado"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(appointment.dataHoraInicio)}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {appointment.status}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Profissional:{" "}
                    {appointment.profissionalNome ?? "Não informado"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Unidade: {appointment.unidadeNome ?? "Não informada"}
                  </p>

                  {appointment.status !== "CANCELADO" &&
                  appointment.status !== "CONCLUIDO" ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="min-h-10 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground disabled:opacity-60"
                        disabled={
                          rescheduleMutation.isPending ||
                          cancelMutation.isPending
                        }
                        onClick={() => {
                          void handleReschedule(appointment.id);
                        }}
                        type="button"
                      >
                        Reagendar
                      </button>

                      <button
                        className="min-h-10 rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground disabled:opacity-60"
                        disabled={
                          cancelMutation.isPending ||
                          rescheduleMutation.isPending
                        }
                        onClick={() => {
                          void handleCancel(appointment.id);
                        }}
                        type="button"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </PortalPrivateRoutePage>
  );
}

import { StatusBadge } from "@/components/ui/status-badge";
import type { AgendamentoStatus } from "@/features/agendamentos/types/agendamentos-types";
import { getAgendamentoStatusMeta } from "@/features/agendamentos/utils/agendamentos-status";

type AgendaStatusBadgeProps = {
  status: AgendamentoStatus;
  className?: string;
};

export function AgendaStatusBadge({
  status,
  className,
}: AgendaStatusBadgeProps) {
  const meta =
    getAgendamentoStatusMeta(
      status,
    );

  return (
    <StatusBadge
      tone={meta.tone}
      className={className}
    >
      {meta.label}
    </StatusBadge>
  );
}
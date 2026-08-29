import { Clock3, Pencil, Sparkles, Trash2 } from "lucide-react";

import {
  ResponsiveTableRegion,
  TableFooter,
} from "@/components/tables/table-foundation";
import { EmptyState } from "@/components/states/feedback-states";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Servico } from "@/features/servicos/types/servicos.types";
import {
  formatServicoDuracao,
  formatServicoPreco,
} from "@/features/servicos/utils/servicos-formatters";

type ServicosListProps = {
  servicos: Servico[];
  isFetching: boolean;
  canManage: boolean;
  onEdit: (servico: Servico) => void;
  onDeactivate: (servico: Servico) => void;
};

function ServicoDescription({ descricao }: { descricao: string | null }) {
  const normalized = descricao?.trim();

  return (
    <p className="mt-1 line-clamp-2 text-body-small text-text-muted">
      {normalized || "Sem descrição cadastrada."}
    </p>
  );
}

function ServicoActions({
  servico,
  onEdit,
  onDeactivate,
}: {
  servico: Servico;
  onEdit: (servico: Servico) => void;
  onDeactivate: (servico: Servico) => void;
}) {
  return (
    <div className="flex flex-wrap justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onEdit(servico)}
      >
        <Pencil aria-hidden="true" />
        Editar
      </Button>

      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => onDeactivate(servico)}
      >
        <Trash2 aria-hidden="true" />
        Inativar
      </Button>
    </div>
  );
}

export function ServicosList({
  servicos,
  isFetching,
  canManage,
  onEdit,
  onDeactivate,
}: ServicosListProps) {
  if (servicos.length === 0) {
    return (
      <div className="p-card">
        <EmptyState
          title="Nenhum serviço cadastrado"
          description="Quando houver serviços ativos no catálogo, eles aparecerão aqui."
        />
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden" aria-label="Serviços em cartões">
        <div className="divide-y divide-border-subtle">
          {servicos.map((servico) => (
            <article key={servico.id} className="space-y-4 p-card">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-text-muted"
                >
                  <Sparkles className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-text-primary">
                    {servico.nome}
                  </h3>
                  <ServicoDescription descricao={servico.descricao} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone="success">Ativo</StatusBadge>
                <span className="font-semibold text-text-primary">
                  {formatServicoPreco(servico.preco)}
                </span>
                <span className="inline-flex items-center gap-1 text-body-small text-text-muted">
                  <Clock3 aria-hidden="true" className="size-4" />
                  {formatServicoDuracao(servico.duracaoMinutos)}
                </span>
              </div>

              {canManage && (
                <ServicoActions
                  servico={servico}
                  onEdit={onEdit}
                  onDeactivate={onDeactivate}
                />
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <ResponsiveTableRegion label="Lista de serviços">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-surface-subtle">
              <tr className="border-b border-border-subtle">
                <th
                  scope="col"
                  className="px-card py-3 text-caption font-semibold text-text-secondary"
                >
                  Serviço
                </th>
                <th
                  scope="col"
                  className="px-card py-3 text-caption font-semibold text-text-secondary"
                >
                  Duração
                </th>
                <th
                  scope="col"
                  className="px-card py-3 text-caption font-semibold text-text-secondary"
                >
                  Preço
                </th>
                <th
                  scope="col"
                  className="px-card py-3 text-caption font-semibold text-text-secondary"
                >
                  Status
                </th>
                {canManage && (
                  <th
                    scope="col"
                    className="px-card py-3 text-right text-caption font-semibold text-text-secondary"
                  >
                    Ações
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-border-subtle">
              {servicos.map((servico) => (
                <tr
                  key={servico.id}
                  className="transition-colors hover:bg-surface-subtle/60"
                >
                  <td className="max-w-md px-card py-3">
                    <div className="font-medium text-text-primary">
                      {servico.nome}
                    </div>
                    <ServicoDescription descricao={servico.descricao} />
                  </td>
                  <td className="px-card py-3 text-body-small text-text-muted">
                    {formatServicoDuracao(servico.duracaoMinutos)}
                  </td>
                  <td className="px-card py-3 font-semibold text-text-primary">
                    {formatServicoPreco(servico.preco)}
                  </td>
                  <td className="px-card py-3">
                    <StatusBadge tone="success">Ativo</StatusBadge>
                  </td>
                  {canManage && (
                    <td className="px-card py-3">
                      <ServicoActions
                        servico={servico}
                        onEdit={onEdit}
                        onDeactivate={onDeactivate}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTableRegion>
      </div>

      <TableFooter>
        <div aria-live="polite" className="flex flex-wrap gap-2">
          <span>
            {servicos.length}{" "}
            {servicos.length === 1 ? "serviço ativo" : "serviços ativos"}
          </span>
          {isFetching && (
            <>
              <span aria-hidden="true">·</span>
              <span>Atualizando…</span>
            </>
          )}
        </div>
      </TableFooter>
    </>
  );
}

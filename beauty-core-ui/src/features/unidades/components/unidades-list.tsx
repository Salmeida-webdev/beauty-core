import { Mail, MapPin, Pencil, Phone, Store, Trash2 } from "lucide-react";

import { EmptyState } from "@/components/states/feedback-states";
import {
  ResponsiveTableRegion,
  TableFooter,
} from "@/components/tables/table-foundation";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Unidade } from "@/features/unidades/types/unidades.types";
import {
  formatUnidadeOptionalText,
  formatUnidadeTelefone,
} from "@/features/unidades/utils/unidades-formatters";

type UnidadesListProps = {
  unidades: Unidade[];
  isFetching: boolean;
  canManage: boolean;
  onEdit: (unidade: Unidade) => void;
  onDeactivate: (unidade: Unidade) => void;
};

function UnidadeActions({
  unidade,
  onEdit,
  onDeactivate,
}: {
  unidade: Unidade;
  onEdit: (unidade: Unidade) => void;
  onDeactivate: (unidade: Unidade) => void;
}) {
  return (
    <div className="flex flex-wrap justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onEdit(unidade)}
      >
        <Pencil aria-hidden="true" />
        Editar
      </Button>

      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => onDeactivate(unidade)}
      >
        <Trash2 aria-hidden="true" />
        Inativar
      </Button>
    </div>
  );
}

export function UnidadesList({
  unidades,
  isFetching,
  canManage,
  onEdit,
  onDeactivate,
}: UnidadesListProps) {
  if (unidades.length === 0) {
    return (
      <div className="p-card">
        <EmptyState
          title="Nenhuma unidade cadastrada"
          description="Quando houver unidades ativas, elas aparecerão aqui."
        />
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden" aria-label="Unidades em cartões">
        <div className="divide-y divide-border-subtle">
          {unidades.map((unidade) => (
            <article key={unidade.id} className="space-y-4 p-card">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-text-muted">
                  <Store aria-hidden="true" className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-text-primary">
                    {unidade.nome}
                  </h3>

                  <p className="mt-2 flex gap-2 text-body-small text-text-muted">
                    <Phone aria-hidden="true" className="size-4" />
                    {formatUnidadeTelefone(unidade.telefone)}
                  </p>

                  <p className="flex gap-2 text-body-small text-text-muted">
                    <Mail aria-hidden="true" className="size-4" />
                    <span className="break-all">
                      {formatUnidadeOptionalText(unidade.email)}
                    </span>
                  </p>

                  <p className="flex gap-2 text-body-small text-text-muted">
                    <MapPin aria-hidden="true" className="size-4" />
                    {formatUnidadeOptionalText(unidade.endereco)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <StatusBadge tone="success">Ativa</StatusBadge>

                {canManage && (
                  <UnidadeActions
                    unidade={unidade}
                    onEdit={onEdit}
                    onDeactivate={onDeactivate}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <ResponsiveTableRegion label="Lista de unidades">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead className="bg-surface-subtle">
              <tr className="border-b border-border-subtle">
                <th className="px-card py-3" scope="col">
                  Unidade
                </th>
                <th className="px-card py-3" scope="col">
                  Contato
                </th>
                <th className="px-card py-3" scope="col">
                  Endereço
                </th>
                <th className="px-card py-3" scope="col">
                  Status
                </th>
                {canManage && (
                  <th className="px-card py-3 text-right" scope="col">
                    Ações
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-border-subtle">
              {unidades.map((unidade) => (
                <tr key={unidade.id}>
                  <td className="px-card py-3 font-medium">{unidade.nome}</td>
                  <td className="px-card py-3 text-body-small text-text-muted">
                    {formatUnidadeTelefone(unidade.telefone)}
                    <br />
                    <span className="break-all">
                      {formatUnidadeOptionalText(unidade.email)}
                    </span>
                  </td>
                  <td className="px-card py-3 text-body-small text-text-muted">
                    {formatUnidadeOptionalText(unidade.endereco)}
                  </td>
                  <td className="px-card py-3">
                    <StatusBadge tone="success">Ativa</StatusBadge>
                  </td>
                  {canManage && (
                    <td className="px-card py-3">
                      <UnidadeActions
                        unidade={unidade}
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
        <div aria-live="polite">
          {unidades.length}{" "}
          {unidades.length === 1 ? "unidade ativa" : "unidades ativas"}
          {isFetching ? " · Atualizando…" : ""}
        </div>
      </TableFooter>
    </>
  );
}

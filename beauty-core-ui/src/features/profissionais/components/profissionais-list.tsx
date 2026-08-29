import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  Pencil,
  Phone,
  Trash2,
  UserRound,
} from "lucide-react";

import type { AdminRole } from "@/constants/roles";
import { EmptyState } from "@/components/states/feedback-states";
import {
  ResponsiveTableRegion,
  TableFooter,
} from "@/components/tables/table-foundation";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatProfissionalTelefone } from "@/features/profissionais/utils/profissionais-formatters";
import {
  canDeactivateUsuario,
  canEditUsuario,
} from "@/features/usuarios/permissions/usuarios-permissions";
import type {
  UsuarioAdministrativo,
  UsuariosPaginationMeta,
} from "@/features/usuarios/types/usuarios.types";
import { formatUsuarioUltimoLogin } from "@/features/usuarios/utils/usuarios-formatters";

type ProfissionaisListProps = {
  profissionais: UsuarioAdministrativo[];

  meta: UsuariosPaginationMeta;

  actorId: string;

  actorRole: AdminRole;

  isFetching: boolean;

  filtered: boolean;

  onPageChange: (page: number) => void;

  onEdit: (profissional: UsuarioAdministrativo) => void;

  onDeactivate: (profissional: UsuarioAdministrativo) => void;
};

function ProfissionalActions({
  profissional,
  actorId,
  actorRole,
  onEdit,
  onDeactivate,
}: {
  profissional: UsuarioAdministrativo;

  actorId: string;

  actorRole: AdminRole;

  onEdit: (profissional: UsuarioAdministrativo) => void;

  onDeactivate: (profissional: UsuarioAdministrativo) => void;
}) {
  const canEdit = canEditUsuario({
    actorId,
    actorRole,
    targetId: profissional.id,
    targetRole: "PROFISSIONAL",
  });

  const canDeactivate = canDeactivateUsuario({
    actorId,
    actorRole,
    targetId: profissional.id,
    targetRole: "PROFISSIONAL",
  });

  if (!canEdit && !canDeactivate) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-end gap-1">
      {canEdit && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            onEdit(profissional);
          }}
        >
          <Pencil aria-hidden="true" />
          Editar
        </Button>
      )}

      {canDeactivate && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => {
            onDeactivate(profissional);
          }}
        >
          <Trash2 aria-hidden="true" />
          Inativar
        </Button>
      )}
    </div>
  );
}

export function ProfissionaisList({
  profissionais,
  meta,
  actorId,
  actorRole,
  isFetching,
  filtered,
  onPageChange,
  onEdit,
  onDeactivate,
}: ProfissionaisListProps) {
  if (profissionais.length === 0) {
    return (
      <div className="p-card">
        <EmptyState
          title={
            filtered
              ? "Nenhum profissional encontrado"
              : "Nenhum profissional ativo"
          }
          description={
            filtered
              ? "Altere a busca para tentar novamente."
              : "Ainda não há usuários ativos com o perfil Profissional disponíveis para o seu acesso."
          }
        />
      </div>
    );
  }

  const hasPrevious = meta.page > 1;

  const hasNext = meta.page < meta.totalPages;

  return (
    <>
      <div className="md:hidden" aria-label="Profissionais em cartões">
        <div className="divide-y divide-border-subtle">
          {profissionais.map((profissional) => (
            <article key={profissional.id} className="space-y-4 p-card">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-text-muted">
                  <UserRound aria-hidden="true" className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-text-primary">
                    {profissional.nome}
                  </h3>

                  <p className="mt-1 flex min-w-0 items-center gap-2 text-body-small text-text-muted">
                    <Mail aria-hidden="true" className="size-4 shrink-0" />

                    <span className="truncate">{profissional.email}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-body-small text-text-muted">
                <div className="flex items-center gap-2">
                  <Phone aria-hidden="true" className="size-4" />

                  <span>
                    {formatProfissionalTelefone(profissional.telefone)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 aria-hidden="true" className="size-4" />

                  <span>
                    Último acesso:{" "}
                    {formatUsuarioUltimoLogin(profissional.ultimoLogin)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <StatusBadge tone="success">Ativo</StatusBadge>

                <ProfissionalActions
                  profissional={profissional}
                  actorId={actorId}
                  actorRole={actorRole}
                  onEdit={onEdit}
                  onDeactivate={onDeactivate}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <ResponsiveTableRegion label="Lista de profissionais">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead className="bg-surface-subtle">
              <tr className="border-b border-border-subtle">
                <th className="px-card py-3" scope="col">
                  Profissional
                </th>

                <th className="px-card py-3" scope="col">
                  E-mail
                </th>

                <th className="px-card py-3" scope="col">
                  Telefone
                </th>

                <th className="px-card py-3" scope="col">
                  Último acesso
                </th>

                <th className="px-card py-3" scope="col">
                  Status
                </th>

                <th className="px-card py-3 text-right" scope="col">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-subtle">
              {profissionais.map((profissional) => (
                <tr
                  key={profissional.id}
                  className="transition-colors hover:bg-surface-subtle/60"
                >
                  <td className="px-card py-3 font-medium text-text-primary">
                    {profissional.nome}
                  </td>

                  <td className="max-w-xs px-card py-3 text-body-small text-text-muted">
                    <span className="break-all">{profissional.email}</span>
                  </td>

                  <td className="px-card py-3 text-body-small text-text-muted">
                    {formatProfissionalTelefone(profissional.telefone)}
                  </td>

                  <td className="px-card py-3 text-body-small text-text-muted">
                    {formatUsuarioUltimoLogin(profissional.ultimoLogin)}
                  </td>

                  <td className="px-card py-3">
                    <StatusBadge tone="success">Ativo</StatusBadge>
                  </td>

                  <td className="px-card py-3">
                    <ProfissionalActions
                      profissional={profissional}
                      actorId={actorId}
                      actorRole={actorRole}
                      onEdit={onEdit}
                      onDeactivate={onDeactivate}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTableRegion>
      </div>

      <TableFooter>
        <div
          aria-live="polite"
          className="flex flex-wrap items-center gap-x-2 gap-y-1"
        >
          <span>
            {meta.total} {meta.total === 1 ? "profissional" : "profissionais"}
          </span>

          <span aria-hidden="true">·</span>

          <span>
            Página {meta.page} de {Math.max(meta.totalPages, 1)}
          </span>

          {isFetching && (
            <>
              <span aria-hidden="true">·</span>

              <span>Atualizando…</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasPrevious}
            onClick={() => {
              onPageChange(meta.page - 1);
            }}
          >
            <ChevronLeft aria-hidden="true" />
            Anterior
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasNext}
            onClick={() => {
              onPageChange(meta.page + 1);
            }}
          >
            Próxima
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </TableFooter>
    </>
  );
}

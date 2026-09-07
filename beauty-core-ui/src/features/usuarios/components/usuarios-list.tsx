import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  Pencil,
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
import {
  canDeactivateUsuario,
  canEditUsuario,
} from "@/features/usuarios/permissions/usuarios-permissions";
import type {
  UsuarioAdministrativo,
  UsuariosPaginationMeta,
} from "@/features/usuarios/types/usuarios.types";
import {
  formatUsuarioRole,
  formatUsuarioUltimoLogin,
} from "@/features/usuarios/utils/usuarios-formatters";

type UsuariosListProps = {
  usuarios: UsuarioAdministrativo[];

  meta: UsuariosPaginationMeta;

  actorId: string;

  actorRole: AdminRole;

  isFetching: boolean;

  filtered: boolean;

  onPageChange: (page: number) => void;

  onEdit: (usuario: UsuarioAdministrativo) => void;

  onDeactivate: (usuario: UsuarioAdministrativo) => void;
};

function RoleLabel({
  usuario,
  actorId,
}: {
  usuario: UsuarioAdministrativo;

  actorId: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-caption font-semibold text-text-secondary">
        {formatUsuarioRole(usuario.role)}
      </span>

      {usuario.id === actorId && (
        <span className="rounded-full border border-border-subtle px-2.5 py-1 text-caption font-semibold text-text-muted">
          Você
        </span>
      )}
    </div>
  );
}

function UsuarioActions({
  usuario,
  actorId,
  actorRole,
  onEdit,
  onDeactivate,
}: {
  usuario: UsuarioAdministrativo;

  actorId: string;

  actorRole: AdminRole;

  onEdit: (usuario: UsuarioAdministrativo) => void;

  onDeactivate: (usuario: UsuarioAdministrativo) => void;
}) {
  const canEdit = canEditUsuario({
    actorId,
    actorRole,
    targetId: usuario.id,
    targetRole: usuario.role,
  });

  const canDeactivate = canDeactivateUsuario({
    actorId,
    actorRole,
    targetId: usuario.id,
    targetRole: usuario.role,
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
            onEdit(usuario);
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
            onDeactivate(usuario);
          }}
        >
          <Trash2 aria-hidden="true" />
          Inativar
        </Button>
      )}
    </div>
  );
}

export function UsuariosList({
  usuarios,
  meta,
  actorId,
  actorRole,
  isFetching,
  filtered,
  onPageChange,
  onEdit,
  onDeactivate,
}: UsuariosListProps) {
  if (usuarios.length === 0) {
    return (
      <div className="p-card">
        <EmptyState
          title={
            filtered
              ? "Nenhum usuário encontrado"
              : "Nenhum usuário administrativo ativo"
          }
          description={
            filtered
              ? "Altere a busca ou os filtros para tentar novamente."
              : "Não há usuários administrativos ativos disponíveis para o seu perfil."
          }
        />
      </div>
    );
  }

  const hasPrevious = meta.page > 1;

  const hasNext = meta.page < meta.totalPages;

  return (
    <>
      <div
        className="md:hidden"
        aria-label="Usuários administrativos em cartões"
      >
        <div className="divide-y divide-border-subtle">
          {usuarios.map((usuario) => (
            <article key={usuario.id} className="space-y-4 p-card">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-text-muted">
                  <UserRound aria-hidden="true" className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-text-primary">
                    {usuario.nome}
                  </h3>

                  <p className="mt-1 flex min-w-0 items-center gap-2 text-body-small text-text-muted">
                    <Mail aria-hidden="true" className="size-4 shrink-0" />

                    <span className="truncate">{usuario.email}</span>
                  </p>
                </div>
              </div>

              <RoleLabel usuario={usuario} actorId={actorId} />

              <div className="flex items-center gap-2 text-body-small text-text-muted">
                <Clock3 aria-hidden="true" className="size-4" />

                <span>
                  Último acesso: {formatUsuarioUltimoLogin(usuario.ultimoLogin)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <StatusBadge tone="success">Ativo</StatusBadge>

                <UsuarioActions
                  usuario={usuario}
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
        <ResponsiveTableRegion label="Lista de usuários administrativos">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead className="bg-surface-subtle">
              <tr className="border-b border-border-subtle">
                <th className="px-card py-3" scope="col">
                  Usuário
                </th>

                <th className="px-card py-3" scope="col">
                  E-mail
                </th>

                <th className="px-card py-3" scope="col">
                  Perfil
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
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="transition-colors hover:bg-surface-subtle/60"
                >
                  <td className="px-card py-3 font-medium text-text-primary">
                    {usuario.nome}
                  </td>

                  <td className="max-w-xs px-card py-3 text-body-small text-text-muted">
                    <span className="break-all">{usuario.email}</span>
                  </td>

                  <td className="px-card py-3">
                    <RoleLabel usuario={usuario} actorId={actorId} />
                  </td>

                  <td className="px-card py-3 text-body-small text-text-muted">
                    {formatUsuarioUltimoLogin(usuario.ultimoLogin)}
                  </td>

                  <td className="px-card py-3">
                    <StatusBadge tone="success">Ativo</StatusBadge>
                  </td>

                  <td className="px-card py-3">
                    <UsuarioActions
                      usuario={usuario}
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
            {meta.total}{" "}
            {meta.total === 1
              ? "usuário administrativo"
              : "usuários administrativos"}
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

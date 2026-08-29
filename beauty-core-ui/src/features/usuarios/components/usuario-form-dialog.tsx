"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ADMIN_ROLES } from "@/constants/roles";
import type { AdminRole } from "@/constants/roles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCreatableAdminRoles } from "@/features/auth/permissions/admin-permissions";
import { UsuarioForm } from "@/features/usuarios/forms/usuario-form";
import { getUsuarioMutationError } from "@/features/usuarios/forms/usuario-form-error";
import { createEmptyUsuarioFormValues } from "@/features/usuarios/forms/usuario-form.schema";
import type { UsuarioFormValues } from "@/features/usuarios/forms/usuario-form.schema";
import {
  toCreateUsuarioPayload,
  toUpdateUsuarioPayload,
  usuarioToFormValues,
} from "@/features/usuarios/forms/usuario-payload";
import { canChangeUsuarioRole } from "@/features/usuarios/permissions/usuarios-permissions";
import { usuariosKeys } from "@/features/usuarios/queries/usuarios-keys";
import { usuariosApi } from "@/features/usuarios/services/usuarios-api";
import type { UsuarioAdministrativo } from "@/features/usuarios/types/usuarios.types";
import { getAuthState } from "@/stores/auth-store";

type UsuarioFormDialogProps = {
  mode: "create" | "edit";

  usuario?: UsuarioAdministrativo;

  actorId: string;

  actorRole: AdminRole;

  open: boolean;

  onOpenChange: (open: boolean) => void;
};

export function UsuarioFormDialog({
  mode,
  usuario,
  actorId,
  actorRole,
  open,
  onOpenChange,
}: UsuarioFormDialogProps) {
  const queryClient = useQueryClient();

  const [serverError, setServerError] = useState<string | null>(null);

  const roleLocked =
    mode === "edit" && usuario !== undefined && actorId === usuario.id;

  const roleOptions = useMemo<readonly AdminRole[]>(() => {
    if (mode === "create") {
      return getCreatableAdminRoles(actorRole);
    }

    if (!usuario) {
      return [];
    }

    if (actorId === usuario.id) {
      return [usuario.role];
    }

    return ADMIN_ROLES.filter(
      (role) =>
        role === usuario.role ||
        canChangeUsuarioRole({
          actorId,
          actorRole,
          targetId: usuario.id,
          targetRole: usuario.role,
          newTargetRole: role,
        }),
    );
  }, [actorId, actorRole, mode, usuario]);

  const initialValues =
    mode === "edit" && usuario
      ? usuarioToFormValues(usuario)
      : createEmptyUsuarioFormValues(roleOptions[0] ?? actorRole);

  const mutation = useMutation({
    mutationFn: async (values: UsuarioFormValues) => {
      if (mode === "edit" && usuario) {
        return usuariosApi.update(
          usuario.id,
          toUpdateUsuarioPayload(values, {
            actorId,
            actorRole,
            usuario,
          }),
        );
      }

      return usuariosApi.create(toCreateUsuarioPayload(values, actorRole));
    },

    retry: false,

    onSuccess: async (savedUsuario) => {
      setServerError(null);

      queryClient.setQueryData(
        usuariosKeys.detail(savedUsuario.id),
        savedUsuario,
      );

      await queryClient.invalidateQueries({
        queryKey: usuariosKeys.lists(),
      });

      const authState = getAuthState();

      if (authState.user && authState.user.id === savedUsuario.id) {
        authState.setAuthenticated({
          ...authState.user,

          nome: savedUsuario.nome,

          email: savedUsuario.email,

          role: savedUsuario.role,

          empresaId: savedUsuario.empresaId,
        });
      }

      onOpenChange(false);
    },

    onError: (error) => {
      setServerError(getUsuarioMutationError(error));
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      mutation.reset();

      setServerError(null);
    }

    onOpenChange(nextOpen);
  }

  const isSelf =
    mode === "edit" && usuario !== undefined && usuario.id === actorId;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Novo usuário" : "Editar usuário"}
          </DialogTitle>

          <DialogDescription>
            {mode === "create"
              ? "Cadastre um usuário respeitando a hierarquia administrativa e o vínculo de empresa."
              : isSelf
                ? "Atualize seus dados. Sua própria role não pode ser alterada."
                : "Atualize somente dados e perfis permitidos pela hierarquia administrativa."}
          </DialogDescription>
        </DialogHeader>

        <UsuarioForm
          key={
            mode === "edit" ? (usuario?.id ?? "edit") : `create-${actorRole}`
          }
          mode={mode}
          actorRole={actorRole}
          roleOptions={roleOptions}
          roleLocked={roleLocked}
          initialValues={initialValues}
          pending={mutation.isPending}
          serverError={serverError}
          onCancel={() => {
            handleOpenChange(false);
          }}
          onSubmit={(values) => {
            setServerError(null);

            mutation.mutate(values);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AdminRole } from "@/constants/roles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UsuarioForm } from "@/features/usuarios/forms/usuario-form";
import { getUsuarioMutationError } from "@/features/usuarios/forms/usuario-form-error";
import { createEmptyUsuarioFormValues } from "@/features/usuarios/forms/usuario-form.schema";
import type { UsuarioFormValues } from "@/features/usuarios/forms/usuario-form.schema";
import {
  toCreateUsuarioPayload,
  toUpdateUsuarioPayload,
  usuarioToFormValues,
} from "@/features/usuarios/forms/usuario-payload";
import { usuariosKeys } from "@/features/usuarios/queries/usuarios-keys";
import { usuariosApi } from "@/features/usuarios/services/usuarios-api";
import type { UsuarioAdministrativo } from "@/features/usuarios/types/usuarios.types";

const PROFISSIONAL_ROLE_OPTIONS = ["PROFISSIONAL"] as const;

type ProfissionalFormDialogProps = {
  mode: "create" | "edit";

  profissional?: UsuarioAdministrativo;

  actorId: string;

  actorRole: AdminRole;

  open: boolean;

  onOpenChange: (open: boolean) => void;
};

export function ProfissionalFormDialog({
  mode,
  profissional,
  actorId,
  actorRole,
  open,
  onOpenChange,
}: ProfissionalFormDialogProps) {
  const queryClient = useQueryClient();

  const [serverError, setServerError] = useState<string | null>(null);

  const initialValues =
    mode === "edit" && profissional
      ? usuarioToFormValues(profissional)
      : createEmptyUsuarioFormValues("PROFISSIONAL");

  const mutation = useMutation({
    mutationFn: async (values: UsuarioFormValues) => {
      const safeValues: UsuarioFormValues = {
        ...values,
        role: "PROFISSIONAL",
      };

      if (mode === "edit" && profissional) {
        return usuariosApi.update(
          profissional.id,

          toUpdateUsuarioPayload(safeValues, {
            actorId,
            actorRole,
            usuario: profissional,
          }),
        );
      }

      return usuariosApi.create(toCreateUsuarioPayload(safeValues, actorRole));
    },

    retry: false,

    onSuccess: async (savedProfissional) => {
      setServerError(null);

      queryClient.setQueryData(
        usuariosKeys.detail(savedProfissional.id),
        savedProfissional,
      );

      await queryClient.invalidateQueries({
        queryKey: usuariosKeys.lists(),
      });

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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Novo profissional" : "Editar profissional"}
          </DialogTitle>

          <DialogDescription>
            {mode === "create"
              ? "Cadastre um usuário administrativo com perfil Profissional."
              : "Atualize os dados do profissional. O perfil permanece fixo como Profissional."}
          </DialogDescription>
        </DialogHeader>

        <UsuarioForm
          key={
            mode === "edit"
              ? (profissional?.id ?? "edit-profissional")
              : `create-profissional-${actorRole}`
          }
          mode={mode}
          actorRole={actorRole}
          roleOptions={PROFISSIONAL_ROLE_OPTIONS}
          roleLocked
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

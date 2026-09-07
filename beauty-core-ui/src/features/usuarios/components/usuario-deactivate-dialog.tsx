"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getUsuarioMutationError } from "@/features/usuarios/forms/usuario-form-error";
import { usuariosKeys } from "@/features/usuarios/queries/usuarios-keys";
import { usuariosApi } from "@/features/usuarios/services/usuarios-api";
import type { UsuarioAdministrativo } from "@/features/usuarios/types/usuarios.types";

type UsuarioDeactivateDialogProps = {
  usuario: UsuarioAdministrativo;

  open: boolean;

  onOpenChange: (open: boolean) => void;
};

export function UsuarioDeactivateDialog({
  usuario,
  open,
  onOpenChange,
}: UsuarioDeactivateDialogProps) {
  const queryClient = useQueryClient();

  const [serverError, setServerError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => usuariosApi.inactivate(usuario.id),

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

      onOpenChange(false);
    },

    onError: (error) => {
      setServerError(getUsuarioMutationError(error));
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    if (mutation.isPending) {
      return;
    }

    if (!nextOpen) {
      mutation.reset();

      setServerError(null);
    }

    onOpenChange(nextOpen);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inativar usuário</AlertDialogTitle>

          <AlertDialogDescription>
            {usuario.nome} perderá o acesso administrativo. O cadastro não será
            apagado.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {serverError && (
          <div
            role="alert"
            className="rounded-medium border border-danger/25 bg-danger/10 p-3 text-body-small text-danger"
          >
            {serverError}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={mutation.isPending}
            onClick={(event) => {
              event.preventDefault();

              if (!mutation.isPending) {
                mutation.mutate();
              }
            }}
          >
            {mutation.isPending ? "Inativando..." : "Confirmar inativação"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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
import { Button } from "@/components/ui/button";

import {
  canManageWhatsAppTemplates,
} from "../permissions/whatsapp.permissions";
import {
  whatsappKeys,
} from "../queries/whatsapp-keys";
import {
  whatsappQueryOptions,
} from "../queries/whatsapp-query-options";
import type {
  TemplateWhatsappFormValues,
} from "../schemas/whatsapp.schemas";
import {
  createTemplateWhatsapp,
  inactivateTemplateWhatsapp,
  listTemplatesWhatsapp,
  updateTemplateWhatsapp,
} from "../services/whatsapp-api";
import type {
  TemplateWhatsapp,
} from "../types/whatsapp.types";
import {
  TemplateWhatsappFormDialog,
} from "./template-whatsapp-form-dialog";
import {
  TemplatesWhatsappList,
} from "./templates-whatsapp-list";

interface TemplatesWhatsappSectionProps {
  role: string | null | undefined;
}

function getErrorMessage(
  error: unknown,
): string | null {
  if (error instanceof Error) {
    return error.message;
  }

  return null;
}

export function TemplatesWhatsappSection({
  role,
}: TemplatesWhatsappSectionProps) {
  const queryClient = useQueryClient();

  const canManage =
    canManageWhatsAppTemplates(role);

  const [formOpen, setFormOpen] =
    useState(false);

  const [
    editingTemplate,
    setEditingTemplate,
  ] = useState<TemplateWhatsapp | null>(
    null,
  );

  const [
    inactivatingTemplate,
    setInactivatingTemplate,
  ] = useState<TemplateWhatsapp | null>(
    null,
  );

  const query = useQuery(
    whatsappQueryOptions.templates(
      listTemplatesWhatsapp,
      canManage,
    ),
  );

  async function invalidateTemplates() {
    await queryClient.invalidateQueries({
      queryKey:
        whatsappKeys.templates(),
    });
  }

  const createMutation = useMutation({
    retry: false,
    mutationFn: createTemplateWhatsapp,

    onSuccess: async () => {
      await invalidateTemplates();
      setFormOpen(false);
      setEditingTemplate(null);
    },
  });

  const updateMutation = useMutation({
    retry: false,
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: TemplateWhatsappFormValues;
    }) =>
      updateTemplateWhatsapp(
        id,
        values,
      ),

    onSuccess: async () => {
      await invalidateTemplates();
      setFormOpen(false);
      setEditingTemplate(null);
    },
  });

  const inactivateMutation =
    useMutation({
      retry: false,
      mutationFn:
        inactivateTemplateWhatsapp,

      onSuccess: async () => {
        await invalidateTemplates();
        setInactivatingTemplate(null);
      },
    });

  const formPending =
    createMutation.isPending ||
    updateMutation.isPending;

  const formError =
    createMutation.error ??
    updateMutation.error;

  async function handleSubmit(
    values: TemplateWhatsappFormValues,
  ) {
    try {
      if (editingTemplate) {
        await updateMutation.mutateAsync({
          id: editingTemplate.id,
          values,
        });

        return;
      }

      await createMutation.mutateAsync(
        values,
      );
    } catch {
      // O erro permanece disponível no estado da mutation.
    }
  }

  if (!canManage) {
    return (
      <section
        className="rounded-lg border p-6"
        aria-labelledby="templates-whatsapp-title"
      >
        <h2
          id="templates-whatsapp-title"
          className="text-lg font-semibold"
        >
          Templates
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Seu perfil não possui permissão
          para gerenciar templates de
          WhatsApp.
        </p>
      </section>
    );
  }

  return (
    <section
      className="space-y-5"
      aria-labelledby="templates-whatsapp-title"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="templates-whatsapp-title"
            className="text-lg font-semibold"
          >
            Templates
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie os templates ativos
            da infraestrutura de WhatsApp.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => {
            setEditingTemplate(null);
            createMutation.reset();
            updateMutation.reset();
            setFormOpen(true);
          }}
        >
          Novo template
        </Button>
      </div>

      {query.isPending && (
        <div
          className="rounded-lg border p-6 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          Carregando templates...
        </div>
      )}

      {query.isError && (
        <div
          className="rounded-lg border border-destructive/40 p-6"
          role="alert"
        >
          <p className="font-medium">
            Não foi possível carregar os
            templates.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-4"
            disabled={query.isFetching}
            onClick={() => {
              void query.refetch();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {query.data && (
        <TemplatesWhatsappList
          templates={query.data}
          canManage={canManage}
          onEdit={(template) => {
            createMutation.reset();
            updateMutation.reset();

            setEditingTemplate(
              template,
            );

            setFormOpen(true);
          }}
          onInactivate={(template) => {
            inactivateMutation.reset();

            setInactivatingTemplate(
              template,
            );
          }}
        />
      )}

      <TemplateWhatsappFormDialog
        open={formOpen}
        template={editingTemplate}
        isSubmitting={formPending}
        errorMessage={
          getErrorMessage(formError)
        }
        onOpenChange={(open) => {
          if (formPending) {
            return;
          }

          setFormOpen(open);

          if (!open) {
            setEditingTemplate(null);
            createMutation.reset();
            updateMutation.reset();
          }
        }}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={
          inactivatingTemplate !== null
        }
        onOpenChange={(open) => {
          if (
            !open &&
            !inactivateMutation.isPending
          ) {
            setInactivatingTemplate(
              null,
            );

            inactivateMutation.reset();
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Inativar template?
            </AlertDialogTitle>

            <AlertDialogDescription>
              {inactivatingTemplate
                ? `O template "${inactivatingTemplate.nome}" será inativado. O registro será preservado pelo backend.`
                : "Confirme a inativação do template."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {inactivateMutation.isError && (
            <div
              className="rounded-md border border-destructive/40 p-3 text-sm text-destructive"
              role="alert"
            >
              {getErrorMessage(
                inactivateMutation.error,
              ) ??
                "Não foi possível inativar o template."}
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={
                inactivateMutation.isPending
              }
            >
              Voltar
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={
                inactivateMutation.isPending ||
                !inactivatingTemplate
              }
              aria-busy={
                inactivateMutation.isPending
              }
              onClick={(event) => {
                event.preventDefault();

                if (
                  !inactivatingTemplate
                ) {
                  return;
                }

                inactivateMutation.mutate(
                  inactivatingTemplate.id,
                );
              }}
            >
              {inactivateMutation.isPending
                ? "Inativando..."
                : "Inativar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

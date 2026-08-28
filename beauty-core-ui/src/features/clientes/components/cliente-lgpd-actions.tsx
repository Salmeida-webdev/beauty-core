"use client";

import {
  useState,
} from "react";
import {
  Download,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useRouter,
} from "next/navigation";
import { toast } from "sonner";

import {
  PageSection,
} from "@/components/layout/page-section";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  clienteProfileKeys,
} from "@/features/clientes/queries/cliente-profile-keys";
import {
  clientesKeys,
} from "@/features/clientes/queries/clientes-keys";
import {
  anonimizarCliente,
  exportarClienteDados,
} from "@/features/clientes/services/clientes-lgpd-api";
import {
  downloadClienteLgpdJson,
} from "@/features/clientes/utils/clientes-lgpd-download";
import {
  normalizeApiError,
} from "@/services/api/normalize-api-error";

type ClienteLgpdActionsProps = {
  clienteId: string;
  clienteNome: string;
  returnHref: string;
  enabled: boolean;
};

export function ClienteLgpdActions({
  clienteId,
  clienteNome,
  returnHref,
  enabled,
}: ClienteLgpdActionsProps) {
  const router = useRouter();
  const queryClient =
    useQueryClient();

  const [
    exportPending,
    setExportPending,
  ] = useState(false);

  const [
    anonymizeOpen,
    setAnonymizeOpen,
  ] = useState(false);

  const anonymizeMutation =
    useMutation({
      mutationFn: () =>
        anonimizarCliente(
          clienteId,
        ),
      retry: false,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: clientesKeys.lists(),
        });

        queryClient.removeQueries({
          queryKey: clientesKeys.detail(
            clienteId,
          ),
          exact: true,
        });

        queryClient.removeQueries({
          queryKey: clienteProfileKeys.cliente(
            clienteId,
          ),
        });

        setAnonymizeOpen(false);

        toast.success(
          "Cliente anonimizado com sucesso.",
        );

        router.replace(
          returnHref,
        );
      },
      onError: (error) => {
        const normalized =
          normalizeApiError(
            error,
          );

        toast.error(
          normalized.message,
        );
      },
    });

  const handleExport = async (): Promise<void> => {
    if (
      exportPending ||
      anonymizeMutation.isPending
    ) {
      return;
    }

    setExportPending(true);

    try {
      const payload =
        await exportarClienteDados(
          clienteId,
        );

      downloadClienteLgpdJson(
        payload,
        clienteId,
      );

      toast.success(
        "Exportação LGPD concluída.",
      );
    } catch (error) {
      const normalized =
        normalizeApiError(
          error,
        );

      toast.error(
        normalized.message,
      );
    } finally {
      setExportPending(false);
    }
  };

  if (!enabled) {
    return null;
  }

  const actionPending =
    exportPending ||
    anonymizeMutation.isPending;

  return (
    <PageSection
      title="Privacidade e LGPD"
      description="Ações administrativas protegidas para exportação e anonimização dos dados deste cliente."
    >
      <div className="flex flex-col gap-3 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          type="button"
          variant="outline"
          disabled={actionPending}
          aria-busy={exportPending}
          onClick={() => {
            void handleExport();
          }}
        >
          {exportPending ? (
            <LoaderCircle
              aria-hidden="true"
              className="size-4 animate-spin"
            />
          ) : (
            <Download
              aria-hidden="true"
              className="size-4"
            />
          )}

          {exportPending
            ? "Exportando..."
            : "Exportar dados"}
        </Button>

        <AlertDialog
          open={anonymizeOpen}
          onOpenChange={
            setAnonymizeOpen
          }
        >
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              disabled={actionPending}
              aria-busy={
                anonymizeMutation.isPending
              }
            >
              {anonymizeMutation.isPending ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />
              ) : (
                <ShieldCheck
                  aria-hidden="true"
                  className="size-4"
                />
              )}

              {anonymizeMutation.isPending
                ? "Anonimizando..."
                : "Anonimizar cliente"}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Anonimizar cliente permanentemente?
              </AlertDialogTitle>

              <AlertDialogDescription>
                Esta ação substituirá os dados pessoais de {clienteNome}
                por dados anonimizados e não poderá ser desfeita. O histórico
                financeiro, operacional e de auditoria será preservado.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={
                  anonymizeMutation.isPending
                }
              >
                Cancelar
              </AlertDialogCancel>

              <AlertDialogAction asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={
                    anonymizeMutation.isPending
                  }
                  aria-busy={
                    anonymizeMutation.isPending
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    anonymizeMutation.mutate();
                  }}
                >
                  {anonymizeMutation.isPending ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                  ) : (
                    <ShieldCheck
                      aria-hidden="true"
                      className="size-4"
                    />
                  )}

                  {anonymizeMutation.isPending
                    ? "Anonimizando..."
                    : "Confirmar anonimização"}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageSection>
  );
}

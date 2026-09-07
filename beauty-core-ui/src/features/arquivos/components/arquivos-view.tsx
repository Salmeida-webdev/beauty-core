"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/auth-store";

import { ErrorState, LoadingState } from "@/components/states/feedback-states";
import { Button } from "@/components/ui/button";
import { ArquivoDetailDialog } from "@/features/arquivos/components/arquivo-detail-dialog";
import { ArquivoRemoveDialog } from "@/features/arquivos/components/arquivo-remove-dialog";
import { ArquivoUploadDialog } from "@/features/arquivos/components/arquivo-upload-dialog";
import { ArquivosFilters } from "@/features/arquivos/components/arquivos-filters";
import { ArquivosList } from "@/features/arquivos/components/arquivos-list";
import { canRunArquivosQueries } from "@/features/arquivos/utils/arquivos-query-access";
import { arquivosKeys } from "@/features/arquivos/queries/arquivos-keys";
import {
  arquivosByTypeQueryOptions,
  arquivosListQueryOptions,
} from "@/features/arquivos/queries/arquivos-query-options";
import {
  removerArquivo,
  uploadDocumento,
  uploadGaleria,
} from "@/features/arquivos/services/arquivos-api";
import type {
  Arquivo,
  ArquivoTipo,
} from "@/features/arquivos/types/arquivos.types";
import { getArquivoActionErrorMessage } from "@/features/arquivos/utils/arquivos-action-error";
import { getArquivoUploadErrorMessage } from "@/features/arquivos/utils/arquivos-api-error";
import { baixarArquivoPublico } from "@/features/arquivos/utils/arquivos-download";
import {
  buildArquivosListHref,
  parseArquivosListSearchParams,
} from "@/features/arquivos/utils/arquivos-list-url";
import {
  clampArquivosPage,
  getArquivosTotalPages,
} from "@/features/arquivos/utils/arquivos-pagination";

const PAGE_LIMIT = 10;

export function ArquivosView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const status = useAuthStore((state) => state.status);

  const user = useAuthStore((state) => state.user);

  const canQueryArquivos = canRunArquivosQueries(status, user?.role);

  const [selectedArquivoId, setSelectedArquivoId] = useState<string | null>(
    null,
  );
  const [uploadOpen, setUploadOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<Arquivo | null>(null);

  const urlState = parseArquivosListSearchParams(searchParams);
  const page = urlState.page;
  const tipo = urlState.tipo;

  const allFilesQuery = useQuery({
    ...arquivosListQueryOptions({
      page,
      limit: PAGE_LIMIT,
    }),
    enabled: canQueryArquivos && !tipo,
  });

  const filesByTypeQuery = useQuery({
    ...arquivosByTypeQueryOptions(tipo ?? "DOCUMENTO", {
      page,
      limit: PAGE_LIMIT,
    }),
    enabled: canQueryArquivos && Boolean(tipo),
  });

  const query = tipo ? filesByTypeQuery : allFilesQuery;

  function replaceListState(nextState: {
    page: number;
    tipo: ArquivoTipo | null;
  }) {
    router.replace(buildArquivosListHref(pathname, nextState), {
      scroll: false,
    });
  }

  const uploadDocumentMutation = useMutation({
    mutationFn: uploadDocumento,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: arquivosKeys.lists(),
      });

      toast.success("Documento enviado com sucesso.");
    },
    onError: (error) => {
      toast.error(getArquivoUploadErrorMessage(error));
    },
  });

  const uploadGalleryMutation = useMutation({
    mutationFn: uploadGaleria,
    onSuccess: async (arquivos) => {
      await queryClient.invalidateQueries({
        queryKey: arquivosKeys.lists(),
      });

      toast.success(
        arquivos.length === 1
          ? "Imagem enviada para a galeria."
          : `${arquivos.length} imagens enviadas para a galeria.`,
      );
    },
    onError: (error) => {
      toast.error(getArquivoUploadErrorMessage(error));
    },
  });

  const downloadMutation = useMutation({
    mutationFn: baixarArquivoPublico,
    onSuccess: () => {
      toast.success("Download iniciado.");
    },
    onError: (error) => {
      toast.error(getArquivoActionErrorMessage(error, "download"));
    },
  });

  const removeMutation = useMutation({
    mutationFn: removerArquivo,
    onSuccess: async (result, arquivoId) => {
      await queryClient.invalidateQueries({
        queryKey: arquivosKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: arquivosKeys.detail(arquivoId),
        exact: true,
      });

      if (selectedArquivoId === arquivoId) {
        setSelectedArquivoId(null);
      }

      toast.success(result.message);
    },
    onError: (error) => {
      toast.error(getArquivoActionErrorMessage(error, "remove"));
    },
  });

  const totalPages = query.data
    ? getArquivosTotalPages({
        total: query.data.meta.total,
        limit: query.data.meta.limit,
        totalPages: query.data.meta.totalPages,
      })
    : 1;

  const currentPage = clampArquivosPage(page, totalPages);

  function goToPreviousPage() {
    replaceListState({
      page: Math.max(currentPage - 1, 1),
      tipo,
    });
  }

  function goToNextPage() {
    replaceListState({
      page: Math.min(currentPage + 1, totalPages),
      tipo,
    });
  }

  function handleTipoChange(nextTipo: ArquivoTipo | null) {
    replaceListState({
      page: 1,
      tipo: nextTipo,
    });
  }
  const accessDenied = status === "authenticated" && !canQueryArquivos;

  if (accessDenied) {
    return (
      <main className="min-w-0 space-y-6">
        <section
          className="rounded-xl border border-border bg-card p-6"
          role="alert"
        >
          <h1 className="text-xl font-semibold text-foreground">
            Acesso não disponível
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            A gestão de Arquivos está disponível somente para ADMIN e GERENTE.
          </p>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="min-w-0 space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Gestão documental
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Arquivos
              </h1>
            </div>

            <p className="max-w-3xl text-sm text-muted-foreground">
              Consulte e envie arquivos da empresa autenticada.
            </p>
          </div>

          <Button type="button" onClick={() => setUploadOpen(true)}>
            Enviar arquivo
          </Button>
        </header>

        <ArquivosFilters tipo={tipo} onTipoChange={handleTipoChange} />

        {query.isPending ? <LoadingState /> : null}

        {query.isError ? (
          <ErrorState onRetry={() => void query.refetch()} />
        ) : null}

        {query.data ? (
          <section className="space-y-4" aria-labelledby="arquivos-list-title">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="arquivos-list-title"
                  className="text-lg font-semibold text-foreground"
                >
                  Arquivos da empresa
                </h2>

                <p className="text-sm text-muted-foreground">
                  {query.data.meta.total}{" "}
                  {query.data.meta.total === 1
                    ? "arquivo registrado"
                    : "arquivos registrados"}
                </p>
              </div>

              <p className="text-sm text-muted-foreground" aria-live="polite">
                Página {currentPage} de {totalPages}
              </p>
            </div>

            <ArquivosList
              arquivos={query.data.data}
              onOpenDetails={setSelectedArquivoId}
              onDownload={(arquivo) => downloadMutation.mutate(arquivo)}
              onRemove={setRemoveTarget}
              downloadingArquivoId={
                downloadMutation.isPending
                  ? (downloadMutation.variables?.id ?? null)
                  : null
              }
              removingArquivoId={
                removeMutation.isPending
                  ? (removeMutation.variables ?? null)
                  : null
              }
            />

            <nav
              className="flex items-center justify-between gap-3"
              aria-label="Paginação de arquivos"
            >
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousPage}
                disabled={currentPage <= 1 || query.isFetching}
              >
                Anterior
              </Button>

              <span className="text-sm text-muted-foreground">
                {currentPage} / {totalPages}
              </span>

              <Button
                type="button"
                variant="outline"
                onClick={goToNextPage}
                disabled={currentPage >= totalPages || query.isFetching}
              >
                Próxima
              </Button>
            </nav>
          </section>
        ) : null}
      </main>

      <ArquivoDetailDialog
        arquivoId={selectedArquivoId}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedArquivoId(null);
          }
        }}
      />

      <ArquivoUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUploadDocument={async (file) => {
          await uploadDocumentMutation.mutateAsync(file);
        }}
        onUploadGallery={async (files) => {
          await uploadGalleryMutation.mutateAsync(files);
        }}
        isUploading={
          uploadDocumentMutation.isPending || uploadGalleryMutation.isPending
        }
      />

      <ArquivoRemoveDialog
        arquivo={removeTarget}
        onOpenChange={(open) => {
          if (!open) {
            setRemoveTarget(null);
          }
        }}
        onConfirm={async (arquivo) => {
          await removeMutation.mutateAsync(arquivo.id);
        }}
        isRemoving={removeMutation.isPending}
      />
    </>
  );
}

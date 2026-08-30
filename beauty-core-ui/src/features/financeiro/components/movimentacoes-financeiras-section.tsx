"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CancelarMovimentacaoDialog } from "@/features/financeiro/components/cancelar-movimentacao-dialog";
import { MovimentacaoFinanceiraDetailDialog } from "@/features/financeiro/components/movimentacao-financeira-detail-dialog";
import { MovimentacaoFinanceiraFormDialog } from "@/features/financeiro/components/movimentacao-financeira-form-dialog";
import { MovimentacoesFinanceirasFilters } from "@/features/financeiro/components/movimentacoes-financeiras-filters";
import { MovimentacoesFinanceirasList } from "@/features/financeiro/components/movimentacoes-financeiras-list";
import { PagamentoMovimentacaoDialog } from "@/features/financeiro/components/pagamento-movimentacao-dialog";
import { useCategoriasFinanceiras } from "@/features/financeiro/hooks/use-categorias-financeiras";
import { useMovimentacoesFinanceiras } from "@/features/financeiro/hooks/use-movimentacoes-financeiras";
import { useMovimentacoesListUrlState } from "@/features/financeiro/hooks/use-movimentacoes-list-url-state";
import type { MovimentacaoFinanceira } from "@/features/financeiro/types/financeiro.types";
import { getMovimentacoesPagination } from "@/features/financeiro/utils/movimentacoes-pagination";

export function MovimentacoesFinanceirasSection() {
  const { query, setFilters, setPage, clearFilters } =
    useMovimentacoesListUrlState();

  const movimentacoesQuery = useMovimentacoesFinanceiras(query);

  const categoriasQuery = useCategoriasFinanceiras();

  const [selected, setSelected] = useState<MovimentacaoFinanceira | null>(null);

  const [editing, setEditing] = useState<MovimentacaoFinanceira | null>(null);

  const [paymentTarget, setPaymentTarget] =
    useState<MovimentacaoFinanceira | null>(null);

  const [cancelTarget, setCancelTarget] =
    useState<MovimentacaoFinanceira | null>(null);

  const [formOpen, setFormOpen] = useState(false);

  const pagination = movimentacoesQuery.isSuccess
    ? getMovimentacoesPagination({
        page: movimentacoesQuery.data.page,
        limit: movimentacoesQuery.data.limit,
        total: movimentacoesQuery.data.total,
        totalPages: movimentacoesQuery.data.totalPages,
      })
    : null;

  return (
    <section
      className="min-w-0 space-y-4"
      aria-labelledby="movimentacoes-financeiras-title"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="movimentacoes-financeiras-title"
            className="text-lg font-semibold"
          >
            Movimentações financeiras
          </h2>

          <p className="text-sm text-muted-foreground">
            Receitas e despesas registradas no financeiro.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Nova movimentação
        </Button>
      </div>

      <MovimentacoesFinanceirasFilters
        query={query}
        categorias={categoriasQuery.data ?? []}
        categoriasLoading={categoriasQuery.isPending}
        onChange={setFilters}
        onClear={clearFilters}
      />

      {movimentacoesQuery.isPending ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border p-4 text-sm text-muted-foreground"
        >
          Carregando movimentações...
        </div>
      ) : null}

      {movimentacoesQuery.isError ? (
        <div role="alert" className="space-y-3 rounded-lg border p-4">
          <p className="text-sm text-destructive">
            Não foi possível carregar as movimentações financeiras.
          </p>

          <Button
            type="button"
            onClick={() => {
              void movimentacoesQuery.refetch();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      ) : null}

      {movimentacoesQuery.isSuccess &&
      movimentacoesQuery.data.data.length === 0 ? (
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          Nenhuma movimentação financeira encontrada para os filtros atuais.
        </div>
      ) : null}

      {movimentacoesQuery.isSuccess &&
      movimentacoesQuery.data.data.length > 0 ? (
        <>
          <MovimentacoesFinanceirasList
            movimentacoes={movimentacoesQuery.data.data}
            onSelect={setSelected}
            onEdit={(movimentacao) => {
              setEditing(movimentacao);
              setFormOpen(true);
            }}
            onPay={setPaymentTarget}
            onCancel={setCancelTarget}
          />

          <p className="text-sm text-muted-foreground">
            {movimentacoesQuery.data.total} movimentação
            {movimentacoesQuery.data.total === 1 ? "" : "ões"} encontrada
            {movimentacoesQuery.data.total === 1 ? "" : "s"}.
          </p>
        </>
      ) : null}

      {pagination ? (
        <nav
          className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Paginação das movimentações financeiras"
        >
          <p className="text-sm text-muted-foreground">
            Página {pagination.page} de {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={
                !pagination.hasPreviousPage || movimentacoesQuery.isFetching
              }
              onClick={() => setPage(pagination.page - 1)}
            >
              Anterior
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={
                !pagination.hasNextPage || movimentacoesQuery.isFetching
              }
              onClick={() => setPage(pagination.page + 1)}
            >
              Próxima
            </Button>
          </div>
        </nav>
      ) : null}

      <MovimentacaoFinanceiraFormDialog
        open={formOpen}
        movimentacao={editing}
        categorias={categoriasQuery.data ?? []}
        onOpenChange={(open) => {
          setFormOpen(open);

          if (!open) {
            setEditing(null);
          }
        }}
      />

      <PagamentoMovimentacaoDialog
        open={Boolean(paymentTarget)}
        movimentacao={paymentTarget}
        onOpenChange={(open) => {
          if (!open) {
            setPaymentTarget(null);
          }
        }}
      />

      <CancelarMovimentacaoDialog
        open={Boolean(cancelTarget)}
        movimentacao={cancelTarget}
        onOpenChange={(open) => {
          if (!open) {
            setCancelTarget(null);
          }
        }}
      />

      <MovimentacaoFinanceiraDetailDialog
        movimentacao={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
      />
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import type {
  CategoriaFinanceira,
  FinanceiroListQuery,
} from "@/features/financeiro/types/financeiro.types";

type MovimentacoesFinanceirasFiltersProps = {
  query: FinanceiroListQuery;
  categorias: CategoriaFinanceira[];
  categoriasLoading?: boolean;
  onChange: (patch: Partial<FinanceiroListQuery>) => void;
  onClear: () => void;
};

function optionalValue(value: string) {
  return value || undefined;
}

export function MovimentacoesFinanceirasFilters({
  query,
  categorias,
  categoriasLoading = false,
  onChange,
  onClear,
}: MovimentacoesFinanceirasFiltersProps) {
  const hasFilters = Boolean(
    query.categoriaId ||
    query.clienteId ||
    query.agendamentoId ||
    query.tipo ||
    query.status,
  );

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label htmlFor="financeiro-categoria" className="text-sm font-medium">
            Categoria
          </label>

          <select
            id="financeiro-categoria"
            value={query.categoriaId ?? ""}
            disabled={categoriasLoading}
            onChange={(event) =>
              onChange({
                categoriaId: optionalValue(event.target.value),
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50"
          >
            <option value="">Todas as categorias</option>

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="financeiro-tipo" className="text-sm font-medium">
            Tipo
          </label>

          <select
            id="financeiro-tipo"
            value={query.tipo ?? ""}
            onChange={(event) =>
              onChange({
                tipo: optionalValue(event.target.value) as
                  "RECEITA" | "DESPESA" | undefined,
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">Receitas e despesas</option>
            <option value="RECEITA">Receita</option>
            <option value="DESPESA">Despesa</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="financeiro-status" className="text-sm font-medium">
            Status
          </label>

          <select
            id="financeiro-status"
            value={query.status ?? ""}
            onChange={(event) =>
              onChange({
                status: optionalValue(event.target.value) as
                  "PENDENTE" | "PAGO" | "CANCELADO" | "ESTORNADO" | undefined,
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">Todos os status</option>
            <option value="PENDENTE">Pendente</option>
            <option value="PAGO">Pago</option>
            <option value="CANCELADO">Cancelado</option>
            <option value="ESTORNADO">Estornado</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="financeiro-limit" className="text-sm font-medium">
            Itens por página
          </label>

          <select
            id="financeiro-limit"
            value={String(query.limit ?? 20)}
            onChange={(event) =>
              onChange({
                limit: Number(event.target.value),
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="financeiro-order-by" className="text-sm font-medium">
            Ordenar por
          </label>

          <select
            id="financeiro-order-by"
            value={query.orderBy ?? "dataMovimentacao"}
            onChange={(event) =>
              onChange({
                orderBy: event.target.value as FinanceiroListQuery["orderBy"],
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="dataMovimentacao">Data da movimentação</option>
            <option value="createdAt">Data de criação</option>
            <option value="updatedAt">Última atualização</option>
            <option value="valor">Valor</option>
            <option value="status">Status</option>
            <option value="tipo">Tipo</option>
            <option value="descricao">Descrição</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="financeiro-order-direction"
            className="text-sm font-medium"
          >
            Direção
          </label>

          <select
            id="financeiro-order-direction"
            value={query.orderDirection ?? "desc"}
            onChange={(event) =>
              onChange({
                orderDirection: event.target
                  .value as FinanceiroListQuery["orderDirection"],
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="desc">Decrescente</option>
            <option value="asc">Crescente</option>
          </select>
        </div>
      </div>

      {query.clienteId ? (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            Filtro por cliente ativo.
          </span>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              onChange({
                clienteId: undefined,
              })
            }
          >
            Remover cliente
          </Button>
        </div>
      ) : null}

      {query.agendamentoId ? (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            Filtro por agendamento ativo.
          </span>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              onChange({
                agendamentoId: undefined,
              })
            }
          >
            Remover agendamento
          </Button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Período não é suportado pelo endpoint de listagem de movimentações.
        </p>

        {hasFilters ? (
          <Button type="button" variant="outline" onClick={onClear}>
            Limpar filtros
          </Button>
        ) : null}
      </div>
    </div>
  );
}

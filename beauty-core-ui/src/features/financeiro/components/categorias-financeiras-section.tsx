"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CategoriaFinanceiraFormDialog } from "@/features/financeiro/components/categoria-financeira-form-dialog";
import { CategoriaFinanceiraInativarDialog } from "@/features/financeiro/components/categoria-financeira-inativar-dialog";
import { useCategoriasFinanceiras } from "@/features/financeiro/hooks/use-categorias-financeiras";
import type { CategoriaFinanceira } from "@/features/financeiro/types/financeiro.types";

export function CategoriasFinanceirasSection() {
  const query = useCategoriasFinanceiras();

  const [formOpen, setFormOpen] = useState(false);

  const [selected, setSelected] = useState<CategoriaFinanceira | null>(null);

  const [toDeactivate, setToDeactivate] = useState<CategoriaFinanceira | null>(
    null,
  );

  return (
    <section
      className="min-w-0 space-y-4"
      aria-labelledby="categorias-financeiras-title"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="categorias-financeiras-title"
            className="text-lg font-semibold"
          >
            Categorias financeiras
          </h2>

          <p className="text-sm text-muted-foreground">
            Classifique receitas e despesas.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => {
            setSelected(null);
            setFormOpen(true);
          }}
        >
          Nova categoria
        </Button>
      </div>

      {query.isPending ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border p-4 text-sm text-muted-foreground"
        >
          Carregando categorias...
        </div>
      ) : null}

      {query.isError ? (
        <div role="alert" className="space-y-3 rounded-lg border p-4">
          <p className="text-sm text-destructive">
            Não foi possível carregar as categorias.
          </p>

          <Button
            type="button"
            onClick={() => {
              void query.refetch();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      ) : null}

      {query.isSuccess && query.data.length === 0 ? (
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          Nenhuma categoria financeira cadastrada.
        </div>
      ) : null}

      {query.isSuccess && query.data.length > 0 ? (
        <div className="grid gap-3">
          {query.data.map((categoria) => (
            <article
              key={categoria.id}
              className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-medium">{categoria.nome}</h3>

                <p className="text-sm text-muted-foreground">
                  {categoria.tipo === "RECEITA" ? "Receita" : "Despesa"}
                  {" · "}
                  {categoria.ativo ? "Ativa" : "Inativa"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    setSelected(categoria);
                    setFormOpen(true);
                  }}
                >
                  Editar
                </Button>

                {categoria.ativo ? (
                  <Button
                    type="button"
                    onClick={() => setToDeactivate(categoria)}
                  >
                    Inativar
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <CategoriaFinanceiraFormDialog
        open={formOpen}
        categoria={selected}
        onOpenChange={setFormOpen}
      />

      <CategoriaFinanceiraInativarDialog
        open={Boolean(toDeactivate)}
        categoria={toDeactivate}
        onOpenChange={(open) => {
          if (!open) {
            setToDeactivate(null);
          }
        }}
      />
    </section>
  );
}

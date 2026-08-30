"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ComissaoCreateDialog } from "@/features/financeiro/components/comissao-create-dialog";
import { ComissaoDetailDialog } from "@/features/financeiro/components/comissao-detail-dialog";
import { ComissaoPayDialog } from "@/features/financeiro/components/comissao-pay-dialog";
import { ComissoesList } from "@/features/financeiro/components/comissoes-list";
import { useComissoes } from "@/features/financeiro/hooks/use-comissoes";
import type { ComissaoProfissional } from "@/features/financeiro/types/financeiro.types";

export function ComissoesSection() {
  const query = useComissoes();

  const [createOpen, setCreateOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [paymentTarget, setPaymentTarget] =
    useState<ComissaoProfissional | null>(null);

  return (
    <section
      className="min-w-0 space-y-4"
      aria-labelledby="comissoes-title"
      aria-busy={query.isPending}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="comissoes-title" className="text-lg font-semibold">
            Comissões
          </h2>

          <p className="text-sm text-muted-foreground">
            Comissões vinculadas a profissionais e agendamentos.
          </p>
        </div>

        <Button type="button" onClick={() => setCreateOpen(true)}>
          Nova comissão
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        O backend atual não oferece filtros ou paginação para esta listagem.
      </p>

      {query.isPending ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border p-4 text-sm text-muted-foreground"
        >
          Carregando comissões...
        </div>
      ) : null}

      {query.isError ? (
        <div role="alert" className="space-y-3 rounded-lg border p-4">
          <p className="text-sm text-destructive">
            Não foi possível carregar as comissões.
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
          Nenhuma comissão cadastrada.
        </div>
      ) : null}

      {query.isSuccess && query.data.length > 0 ? (
        <ComissoesList
          comissoes={query.data}
          onPay={setPaymentTarget}
          onSelect={(comissao) => setSelectedId(comissao.id)}
        />
      ) : null}

      <ComissaoCreateDialog open={createOpen} onOpenChange={setCreateOpen} />

      <ComissaoPayDialog
        open={Boolean(paymentTarget)}
        comissao={paymentTarget}
        onOpenChange={(open) => {
          if (!open) {
            setPaymentTarget(null);
          }
        }}
      />

      <ComissaoDetailDialog
        id={selectedId}
        open={Boolean(selectedId)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedId(null);
          }
        }}
      />
    </section>
  );
}

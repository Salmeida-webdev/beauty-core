import { Suspense } from "react";

import { ArquivosView } from "@/features/arquivos/components/arquivos-view";

export default function ArquivosPage() {
  return (
    <Suspense
      fallback={
        <div
          className="rounded-xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground"
          role="status"
        >
          Carregando arquivos...
        </div>
      }
    >
      <ArquivosView />
    </Suspense>
  );
}

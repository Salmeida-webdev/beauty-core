import {
  ARQUIVO_TIPOS,
  arquivoTipoSchema,
} from "@/features/arquivos/schemas/arquivos.schemas";
import type { ArquivoTipo } from "@/features/arquivos/types/arquivos.types";
import { getArquivoTipoLabel } from "@/features/arquivos/utils/arquivo-tipo";

type ArquivosFiltersProps = {
  tipo: ArquivoTipo | null;
  onTipoChange: (tipo: ArquivoTipo | null) => void;
};

export function ArquivosFilters({ tipo, onTipoChange }: ArquivosFiltersProps) {
  function handleTipoChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!event.target.value) {
      onTipoChange(null);
      return;
    }

    const parsed = arquivoTipoSchema.safeParse(event.target.value);

    if (parsed.success) {
      onTipoChange(parsed.data);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="max-w-sm space-y-2">
        <label
          htmlFor="arquivos-tipo"
          className="text-sm font-medium text-foreground"
        >
          Filtrar por tipo
        </label>

        <select
          id="arquivos-tipo"
          value={tipo ?? ""}
          onChange={handleTipoChange}
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">Todos os tipos</option>

          {ARQUIVO_TIPOS.map((arquivoTipo) => (
            <option key={arquivoTipo} value={arquivoTipo}>
              {getArquivoTipoLabel(arquivoTipo)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

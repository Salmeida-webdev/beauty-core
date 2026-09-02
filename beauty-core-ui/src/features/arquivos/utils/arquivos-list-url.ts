import { arquivoTipoSchema } from "@/features/arquivos/schemas/arquivos.schemas";
import type { ArquivoTipo } from "@/features/arquivos/types/arquivos.types";

export type ArquivosListUrlState = {
  page: number;
  tipo: ArquivoTipo | null;
};

type SearchParamsReader = {
  get(name: string): string | null;
};

export const DEFAULT_ARQUIVOS_PAGE = 1;

function parsePage(value: string | null): number {
  if (!value) {
    return DEFAULT_ARQUIVOS_PAGE;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return DEFAULT_ARQUIVOS_PAGE;
  }

  return parsed;
}

function parseTipo(value: string | null): ArquivoTipo | null {
  if (!value) {
    return null;
  }

  const parsed = arquivoTipoSchema.safeParse(value);

  return parsed.success ? parsed.data : null;
}

export function parseArquivosListSearchParams(
  searchParams: SearchParamsReader,
): ArquivosListUrlState {
  return {
    page: parsePage(searchParams.get("page")),
    tipo: parseTipo(searchParams.get("tipo")),
  };
}

export function buildArquivosListHref(
  pathname: string,
  state: ArquivosListUrlState,
): string {
  const params = new URLSearchParams();

  if (state.page > DEFAULT_ARQUIVOS_PAGE) {
    params.set("page", String(state.page));
  }

  if (state.tipo) {
    params.set("tipo", state.tipo);
  }

  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
}

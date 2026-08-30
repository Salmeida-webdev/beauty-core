export const cupomTipoValues = [
  "PERCENTUAL",
  "VALOR_FIXO",
] as const;

export type CupomTipo =
  (typeof cupomTipoValues)[number];

export function isCupomTipo(
  value: string,
): value is CupomTipo {
  return cupomTipoValues.some(
    (tipo) => tipo === value,
  );
}

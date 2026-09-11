import { createHash } from 'crypto';

type JobIdParams = {
  empresaId?: string | null;
  tipo: string;
  referenciaId?: string | null;
  dataReferencia?: string | null;
  extra?: string | null;
};

function normalizarParte(valor?: string | null): string {
  return String(valor ?? 'global')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

export function createQueueJobId(params: JobIdParams): string {
  const empresaId = normalizarParte(params.empresaId);
  const tipo = normalizarParte(params.tipo);
  const referenciaId = normalizarParte(params.referenciaId);
  const dataReferencia = normalizarParte(params.dataReferencia);
  const extra = normalizarParte(params.extra);

  const rawKey = [empresaId, tipo, referenciaId, dataReferencia, extra].join(
    '|',
  );

  const hash = createHash('sha256').update(rawKey).digest('hex').slice(0, 24);

  return ['bc', empresaId, tipo, referenciaId, dataReferencia, extra, hash]
    .filter(Boolean)
    .join('-')
    .slice(0, 180);
}

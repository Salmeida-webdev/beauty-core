# B192 — Inventário ESLint dos 70 arquivos TypeScript ativos

- Data: 2026-09-22
- Escopo: arquivos `.ts` ativos sob `test/`.
- Exclusões: `node_modules`, `coverage` e `dist`.
- ESLint: formato JSON, sem `--fix`, sem cache, heap de 6144 MB.
- Nenhum arquivo de código foi alterado.

## Integridade da coleta

| Métrica | Resultado |
| --- | ---: |
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| PATH_SETS_EQUAL | `True` |
| ONLY_TS | `True` |
| Exit code do ESLint | 1, devido aos diagnósticos encontrados |

Os 70 candidatos foram enumerados recursivamente em `test/` e enviados ao ESLint. Nenhum arquivo `.js` ou `.cjs` foi analisado.

## Totais e comparação com B190

| Métrica | B190 | B192 | Variação B192−B190 |
| --- | ---: | ---: | ---: |
| Erros | 12 | 11 | -1 |
| Avisos | 38 | 32 | -6 |

| Situação | Quantidade |
| --- | ---: |
| Arquivos com diagnósticos | 14 |
| Arquivos sem diagnósticos | 56 |

## Arquivos com diagnósticos

| Arquivo | Erros | Avisos |
| --- | ---: | ---: |
| `test/e2e/cliente-area.e2e-spec.ts` | 1 | 3 |
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0 | 4 |
| `test/e2e/metrics.e2e-spec.ts` | 1 | 4 |
| `test/e2e/queues.e2e-spec.ts` | 1 | 4 |
| `test/e2e/refresh-throttle.e2e-spec.ts` | 1 | 2 |
| `test/e2e/roles.e2e-spec.ts` | 1 | 3 |
| `test/e2e/scheduler.e2e-spec.ts` | 1 | 3 |
| `test/e2e/super-admin.e2e-spec.ts` | 1 | 5 |
| `test/e2e/swagger-validation.e2e-spec.ts` | 1 | 2 |
| `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` | 0 | 1 |
| `test/e2e/whatsapp-queue-demo.e2e-spec.ts` | 0 | 1 |
| `test/unit/backup-external-upload.spec.ts` | 1 | 0 |
| `test/unit/chat03-bullmq-retention.spec.ts` | 1 | 0 |
| `test/unit/meta-whatsapp-worker-flow.spec.ts` | 1 | 0 |

## Arquivos sem diagnósticos

Total: 56. O resultado individual foi calculado para cada um dos 70 candidatos e nenhum caminho ficou fora do conjunto de resultados.

## Próximo arquivo prioritário

`test/e2e/super-admin.e2e-spec.ts` — 1 erro e 5 avisos.

Ordem dos arquivos com maior quantidade de erros e avisos:

1. `test/e2e/super-admin.e2e-spec.ts` — 1 erro, 5 avisos;
2. `test/e2e/metrics.e2e-spec.ts` — 1 erro, 4 avisos;
3. `test/e2e/queues.e2e-spec.ts` — 1 erro, 4 avisos;
4. `test/e2e/cliente-area.e2e-spec.ts` — 1 erro, 3 avisos;
5. `test/e2e/roles.e2e-spec.ts` — 1 erro, 3 avisos;
6. `test/e2e/scheduler.e2e-spec.ts` — 1 erro, 3 avisos;
7. `test/e2e/lgpd-runtime.e2e-spec.ts` — 0 erros, 4 avisos;
8. `test/e2e/refresh-throttle.e2e-spec.ts` — 1 erro, 2 avisos;
9. `test/e2e/swagger-validation.e2e-spec.ts` — 1 erro, 2 avisos;
10. `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` — 0 erros, 1 aviso;
11. `test/e2e/whatsapp-queue-demo.e2e-spec.ts` — 0 erros, 1 aviso;
12. `test/unit/backup-external-upload.spec.ts` — 1 erro, 0 avisos;
13. `test/unit/chat03-bullmq-retention.spec.ts` — 1 erro, 0 avisos;
14. `test/unit/meta-whatsapp-worker-flow.spec.ts` — 1 erro, 0 avisos.

## Restrições

Não foram executados Jest, testes E2E, stage, commit, push, migration, build ou deploy.

# Inventário ESLint dos testes ativos — B166

- Data: 2026-09-22
- Baseline: B164 (`chat-b164-backend-active-tests-eslint-inventory-20260922.md`).
- Escopo: exatamente os 70 arquivos `.ts` ativos sob `test/`.
- ESLint: sem `--fix`, sem cache, heap de 6144 MB, saída JSON.
- Nenhum código foi alterado.

## Integridade da coleta

| Métrica | Resultado |
|---|---:|
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| PATH_SETS_EQUAL | `True` |
| Somente `.ts` | `True` |
| Exit code | 1, devido a diagnósticos |

Os caminhos foram enumerados em `test/`, excluindo `node_modules`, `coverage` e `dist`, e enviados individualmente ao ESLint. Nenhum `.js` ou `.cjs` foi analisado.

## Comparação com B164

| Métrica | B164 | B166 | Variação |
|---|---:|---:|---:|
| Erros | 74 | 64 | -10 |
| Avisos | 84 | 78 | -6 |

## Próximo arquivo prioritário

`test/unit/tenant-services.coverage.spec.ts` — 7 erros e 2 avisos.

## Arquivos com mais erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/unit/tenant-services.coverage.spec.ts` | 7 | 2 |
| `test/helpers/tenant.helper.ts` | 7 | 1 |
| `test/unit/s3-storage.service.spec.ts` | 7 | 0 |
| `test/e2e/auditoria.e2e-spec.ts` | 6 | 3 |
| `test/unit/agendamentos-concurrency.spec.ts` | 6 | 0 |
| `test/e2e/auth-admin.e2e-spec.ts` | 4 | 10 |
| `test/e2e/tenant.e2e-spec.ts` | 4 | 2 |

## Restrições

- Não executados: Jest, E2E, stage, commit, push, migration, build ou deploy.

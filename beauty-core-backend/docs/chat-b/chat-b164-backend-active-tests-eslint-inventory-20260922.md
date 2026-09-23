# Inventário ESLint dos testes ativos — B164

- Data: 2026-09-22
- Baseline: B162 (`chat-b162-backend-active-tests-eslint-inventory-20260922.md`).
- Escopo: exatamente os 70 arquivos `.ts` ativos sob `test/`.
- ESLint: sem `--fix`, sem cache, heap de 6144 MB, saída JSON.
- Código não alterado.

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

## Comparação com B162

| Métrica | B162 | B164 | Variação |
|---|---:|---:|---:|
| Erros | 86 | 74 | -12 |
| Avisos | 88 | 84 | -4 |

## Próximo arquivo recomendado

`test/e2e/multiempresa.e2e-spec.ts` — 10 erros e 6 avisos.

## Arquivos com mais erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/e2e/multiempresa.e2e-spec.ts` | 10 | 6 |
| `test/unit/tenant-services.coverage.spec.ts` | 7 | 2 |
| `test/helpers/tenant.helper.ts` | 7 | 1 |
| `test/unit/s3-storage.service.spec.ts` | 7 | 0 |
| `test/e2e/auditoria.e2e-spec.ts` | 6 | 3 |
| `test/unit/agendamentos-concurrency.spec.ts` | 6 | 0 |

## Restrições

- Não executados: stage, commit, push, migration, build, E2E ou deploy.

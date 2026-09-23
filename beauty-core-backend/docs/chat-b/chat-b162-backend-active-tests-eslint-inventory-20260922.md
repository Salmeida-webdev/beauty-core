# Inventário ESLint dos testes ativos — B162

- Data: 2026-09-22
- Baseline: B160 (`chat-b160-eslint-70-ts-consolidated-20260922.md`).
- Escopo: lista explícita dos 70 arquivos `.ts` ativos sob `test/`.
- ESLint: sem `--fix`, `--no-cache`, heap de 6144 MB, formato JSON.
- Nenhum código foi alterado.

## Integridade da coleta

| Métrica | Resultado |
|---|---:|
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| PATH_SETS_EQUAL | `True` |
| Somente arquivos `.ts` | `True` |
| Exit code | 1, devido a diagnósticos |

Os 70 caminhos foram enumerados recursivamente em `test/`, excluindo `node_modules`, `coverage` e `dist`, e enviados individualmente ao ESLint. Nenhum `.js` ou `.cjs` foi incluído.

## Comparação com B160

| Métrica | B160 | B162 | Variação |
|---|---:|---:|---:|
| Erros | 100 | 86 | -14 |
| Avisos | 92 | 88 | -4 |

## Próximo alvo

`test/unit/queues-utils.coverage.spec.ts` — 12 erros e 4 avisos.

## Arquivos com mais erros

| Arquivo | Erros | Avisos |
|---|---:|---:|
| `test/unit/queues-utils.coverage.spec.ts` | 12 | 4 |
| `test/e2e/multiempresa.e2e-spec.ts` | 10 | 6 |
| `test/unit/tenant-services.coverage.spec.ts` | 7 | 2 |
| `test/helpers/tenant.helper.ts` | 7 | 1 |
| `test/unit/s3-storage.service.spec.ts` | 7 | 0 |
| `test/e2e/auditoria.e2e-spec.ts` | 6 | 3 |
| `test/unit/agendamentos-concurrency.spec.ts` | 6 | 0 |

## Contagem por regra

| Regra | Severidade | Quantidade |
|---|---|---:|
| `@typescript-eslint/no-require-imports` | erro | 20 |
| `@typescript-eslint/no-unsafe-argument` | aviso | 88 |
| `@typescript-eslint/no-unsafe-assignment` | erro | 22 |
| `@typescript-eslint/no-unsafe-call` | erro | 11 |
| `@typescript-eslint/no-unsafe-member-access` | erro | 25 |
| `@typescript-eslint/no-unsafe-return` | erro | 3 |
| `@typescript-eslint/restrict-plus-operands` | erro | 1 |
| `@typescript-eslint/unbound-method` | erro | 4 |

## Restrições

- Nenhum `stage`, commit, push, migration, build, E2E ou deploy foi executado.

# B183 — Correção de `analytics-performance-limits.spec.ts`

- Data: 2026-09-22
- Baseline: B182
- Arquivo tratado exclusivamente: `test/unit/analytics-performance-limits.spec.ts`

## Contratos analisados

Foram lidos integralmente o teste, `AnalyticsService`, `AnalyticsController`, os contratos de tenant, os delegates Prisma utilizados por analytics e as estruturas de consulta dos métodos `pacotes`, `fidelidade` e `eventos`. Também foram conferidos os limites `ANALYTICS_SCAN_LIMIT` e `ANALYTICS_TOP_LIMIT` e os mocks/fixtures do teste.

## Diagnósticos do baseline

O B182 registrava 3 erros e 2 avisos:

- 2 `@typescript-eslint/no-unsafe-argument` ao passar doubles `any` para o construtor de `AnalyticsService`.
- 3 `@typescript-eslint/no-unsafe-member-access` nos delegates `clientePacote`, `fidelidade` e `eventoSistema` tipados como `any`.

## Correções semânticas

- Substituídos os doubles `any` por contratos locais tipados para `count`, `findMany`, `aggregate` e `groupBy`.
- Tipado o mock de `validarEmpresaAtiva` com argumento `string` e retorno assíncrono.
- Mantida uma adaptação explícita e restrita dos doubles aos tipos de dependência reais `PrismaService` e `TenantValidatorService`.
- Preservadas as chamadas reais a `service.pacotes`, `service.fidelidade` e `service.eventos`.
- Mantidas as garantias de `ANALYTICS_SCAN_LIMIT=1234` e `ANALYTICS_TOP_LIMIT=7` nos argumentos `take` das consultas correspondentes.
- Não foram usados `any`, `Function`, `eslint-disable`, casts indiscriminados, assertions tautológicas ou catches silenciosos.

## Validações executadas

| Validação | Resultado |
|---|---|
| Prettier no arquivo | Aprovado |
| ESLint isolado, sem `--fix` e sem cache | 0 erros, 0 avisos |
| Jest unitário isolado | 1 suíte aprovada, 3 testes aprovados |
| `git diff --check` no arquivo | Aprovado |
| E2E | Não executado |

## Comparação

| Métrica | B182 | B183 | Variação |
|---|---:|---:|---:|
| Erros no arquivo | 3 | 0 | -3 |
| Avisos no arquivo | 2 | 0 | -2 |

Não executados: stage, commit, push, migration, build ou deploy.


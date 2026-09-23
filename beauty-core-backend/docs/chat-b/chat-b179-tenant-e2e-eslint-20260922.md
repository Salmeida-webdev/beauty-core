# B179 — Correção de `tenant.e2e-spec.ts`

- Data: 2026-09-22
- Baseline: B178
- Arquivo tratado exclusivamente: `test/e2e/tenant.e2e-spec.ts`

## Contratos analisados

Foram lidos integralmente o teste, `test/setup-e2e.ts`, `test/helpers/tenant.helper.ts`, `test/seeds/test-seed.ts`, `PublicTenantController`, `TenantPublicService`, o modelo Prisma `Empresa` e o contrato do delegate `ctx.prisma.empresa`.

## Diagnósticos do baseline

O B178 registrava 4 erros e 2 avisos:

- 1 `@typescript-eslint/no-require-imports`.
- 1 `@typescript-eslint/no-unsafe-call` e 1 `@typescript-eslint/no-unsafe-member-access` no update Prisma acessado via `any`.
- 2 `@typescript-eslint/no-unsafe-argument` ao passar `ctx.app` para SuperTest/helper.
- 1 `@typescript-eslint/restrict-plus-operands` ao concatenar o slug `unknown` do fixture.

## Correções semânticas

- Substituído o import `require` por importação tipada de `supertest`.
- Criado adaptador explícito para o contrato `INestApplication<Server>` usado pelo helper e pelo SuperTest.
- Removido `(ctx.prisma as any)`; a atualização da empresa inativa usa `ctx.prisma.empresa.update`.
- Adicionada leitura validada dos campos `id` e `slug` dos registros de seed, preservando os fixtures existentes e evitando acessos/argumentos inseguros.
- Preservados os cenários de slug válido, slug inexistente e empresa inativa.
- Não foram usados `any`, `Function`, `eslint-disable`, casts indiscriminados, assertions tautológicas ou catches silenciosos.

## Validações executadas

| Validação | Resultado |
|---|---|
| Prettier no arquivo | Aprovado |
| ESLint isolado, sem `--fix` e sem cache | 0 erros, 0 avisos |
| `git diff --check` no arquivo | Aprovado |
| E2E | Não executado |
| Jest | Não executado |

## Comparação

| Métrica | B178 | B179 | Variação |
|---|---:|---:|---:|
| Erros no arquivo | 4 | 0 | -4 |
| Avisos no arquivo | 2 | 0 | -2 |

Não executados: stage, commit, push, migration, build ou deploy.


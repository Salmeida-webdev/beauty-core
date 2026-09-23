# Beauty Core — lote B169

- Data: 2026-09-22
- Arquivo tratado: `test/helpers/tenant.helper.ts`.
- Baseline: B168 — 7 erros e 1 aviso ESLint.
- Contratos e consumidores lidos: `test/setup-e2e.ts`, `test/seeds/test-seed.ts`, `test/helpers/auth.helper.ts`, `src/modules/tenant-publico/public-tenant.controller.ts`, `src/modules/tenant-publico/tenant-publico.controller.ts`, `src/shared/tenant/tenant-public.service.ts` e `test/e2e/tenant.e2e-spec.ts`.
- Nenhum módulo de produção foi alterado.

## Correção semântica

- Substituído o import CommonJS do Supertest por import tipado.
- Preservada a API `expectTenantOk(app, slug)` e o endpoint `/public/tenant/:slug`.
- Adicionados guards tipados para as quatro formas de resposta já suportadas: `slug`, `data.slug`, `empresa.slug` e `data.empresa.slug`.
- O helper agora rejeita respostas que não sejam objetos JSON e retorna um registro tipado, mantendo o comportamento de validação do slug.
- A aplicação Nest usa um parâmetro genérico de servidor para eliminar o acesso inseguro ao `getHttpServer`.

## Validação

| Etapa | Resultado |
|---|---|
| Prettier | PASS — exit 0 |
| ESLint isolado | PASS — exit 0; 0 erros e 0 avisos |
| Teste unitário relacionado | Não identificável; o único consumidor é E2E |

E2E não foi executado.

## Variação

`7 erros / 1 aviso` → `0 erros / 0 avisos`.

## Restrições

- Não executados: stage, commit, push, migration, build, deploy ou E2E.

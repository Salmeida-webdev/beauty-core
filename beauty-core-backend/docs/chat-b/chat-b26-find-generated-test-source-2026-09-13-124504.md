# Beauty Core - Chat B - B26 - Origem dos testes gerados

- Inicio: 2026-09-13T12:45:04.6157311-03:00
- Fim: 2026-09-13T12:45:16.7506816-03:00
- Script: B26-v1
- Modo: somente leitura; o relatorio e o unico artefato criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Localizar scripts, templates ou comandos que geram os tres testes de cobertura rastreados.
- Evitar correcao manual de artefatos sem conhecer sua origem.
- Nao alterar codigo, configuracao, dependencias ou historico Git.

## Arquivos rastreados avaliados

- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts`
- `test\unit\coverage-under-70-targeted.generated.spec.ts`
- `test\unit\coverage-under-70-final-target.generated.spec.ts`

## Referencias localizadas

- Nenhuma referencia textual foi localizada fora de areas excluidas.

## Arquivos candidatos a gerador

- `scripts\chat32-fix-runtime-script-scheduler-token.ps1`
- `scripts\ci\check-coverage.js`
- `test\jest-all.coverage.js`
- `test\jest-all-json.coverage.js`
- `test\jest-e2e.coverage.js`
- `test\unit\auth-guards.coverage.spec.ts`
- `test\unit\chat36-backup.coverage.spec.ts`
- `test\unit\chat36-lgpd.coverage.spec.ts`
- `test\unit\controllers-expanded.coverage.spec.ts`
- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts`
- `test\unit\coverage-under-70-final-target.generated.spec.ts`
- `test\unit\coverage-under-70-targeted.generated.spec.ts`
- `test\unit\generated-targets\coverage-targets-under-70.json`
- `test\unit\generated-targets\generate-under-70-targets.cjs`
- `test\unit\helpers\coverage-smoke.helper.ts`
- `test\unit\infrastructure-expanded.coverage.spec.ts`
- `test\unit\micro-boost.coverage.spec.ts`
- `test\unit\modules-services-expanded.coverage.spec.ts`
- `test\unit\queues-utils.coverage.spec.ts`
- `test\unit\services-critical.coverage.spec.ts`
- `test\unit\tenant-services.coverage.spec.ts`
- `test\unit\usuario-role-policy.coverage.spec.ts`
- `test\unit\utils.coverage.spec.ts`

## Leitura operacional

- Se houver gerador, a proxima correcao deve atuar nele e regenerar os testes de forma controlada.
- Se nao houver gerador, a correcao dos testes rastreados devera ser feita em lotes pequenos e preservando sua cobertura.
- A configuracao Jest confirma descoberta por `test/unit/**/*.spec.ts`.

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Nenhum teste, build, E2E, migration ou workflow foi executado.
- Nenhum stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B26

- `PASS_WITH_ATTENTION` - busca da origem concluida; a proxima alteracao deve seguir as referencias encontradas.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B26.
- O script nao altera o projeto.
# B193 — Correção consolidada dos diagnósticos ESLint dos testes

Data: 2026-09-22

## Estado inicial

Baseline: B192.

| Métrica | B192 |
| --- | ---: |
| Arquivos-alvo | 14 |
| Erros | 11 |
| Avisos | 32 |

Foram preservadas alterações locais existentes identificadas antes da edição: alterações rastreadas em `test/e2e/lgpd-runtime.e2e-spec.ts` e `test/unit/meta-whatsapp-worker-flow.spec.ts`, além do arquivo não rastreado `test/unit/backup-external-upload.spec.ts`. Cada alvo foi lido integralmente antes da alteração, com revisão dos contratos reais usados por seu cenário.

## Resultado por arquivo

| Arquivo | Antes (E/A) | Depois (E/A) | Prettier | ESLint isolado | `git diff --check` | Jest isolado | Resultado |
| --- | ---: | ---: | --- | --- | --- | --- | --- |
| `test/e2e/super-admin.e2e-spec.ts` | 1/5 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/metrics.e2e-spec.ts` | 1/4 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/queues.e2e-spec.ts` | 1/4 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/cliente-area.e2e-spec.ts` | 1/3 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/roles.e2e-spec.ts` | 1/3 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/scheduler.e2e-spec.ts` | 1/3 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/refresh-throttle.e2e-spec.ts` | 1/2 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/swagger-validation.e2e-spec.ts` | 1/2 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0/4 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` | 0/1 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/e2e/whatsapp-queue-demo.e2e-spec.ts` | 0/1 | 0/0 | passou | passou | passou | não executado (E2E) | aprovado |
| `test/unit/backup-external-upload.spec.ts` | 1/0 | 1/0 | passou na tentativa corrigida | passou na tentativa corrigida; restaurado após Jest | passou na tentativa corrigida | falhou: `import.meta` incompatível com Jest CommonJS | bloqueado/restaurado |
| `test/unit/chat03-bullmq-retention.spec.ts` | 1/0 | 0/0 | passou | passou | passou | passou — 2 testes | aprovado |
| `test/unit/meta-whatsapp-worker-flow.spec.ts` | 1/0 | 0/0 | passou | passou | passou | passou — 3 testes | aprovado |

## Correções semânticas

- Os E2E passaram a usar import default de SuperTest e o contrato explícito `INestApplication<Server>`, eliminando argumentos inseguros sem modificar rotas, autenticação, tenants, permissões ou status esperados.
- O teste de cliente preservou o login público por slug, Prisma e todos os endpoints da área cliente.
- Os testes de métricas, filas, scheduler, refresh/throttle e Swagger mantiveram seus contratos HTTP e cenários de disponibilidade/erro.
- O teste LGPD preservou as verificações de anonimização, auditoria e ausência de segredos; suas alterações locais anteriores foram mantidas.
- Os testes de upload e WhatsApp passaram a usar o app HTTP tipado, mantendo fixtures, storage, checksum, deduplicação, fila e status do worker.
- O teste de retenção passou a observar diretamente a referência do mock `limparJobsAntigos`, preservando as garantias de limites BullMQ e integração com `BackupService`.
- O teste Meta passou a verificar tipadamente os campos reais persistidos (`status`, `metaMessageId` e `metaStatus`), preservando os cenários de sucesso, erro 4xx definitivo e retry transitório.
- No backup externo, a tentativa sem `require` usou `createRequire(import.meta.url)`, mas falhou no Jest CommonJS. O arquivo foi restaurado somente para seu snapshot original e permanece bloqueado com o diagnóstico `no-require-imports`.

## Inventário ESLint global final

Escopo: exatamente os arquivos `.ts` ativos em `test/`, excluindo `node_modules`, `coverage` e `dist`; JSON, sem `--fix`, sem cache, heap de 6144 MB.

| Métrica | Resultado |
| --- | ---: |
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| PATH_SETS_EQUAL | `True` |
| ONLY_TS | `True` |
| Erros restantes | 1 |
| Avisos restantes | 0 |
| Arquivos com diagnósticos | 1 |
| Arquivos sem diagnósticos | 69 |
| ESLint exit code | 1, devido ao diagnóstico restante |

Arquivo ainda com diagnóstico:

- `test/unit/backup-external-upload.spec.ts` — 1 erro `@typescript-eslint/no-require-imports`, 0 avisos.

## Arquivos aprovados e bloqueados

- Aprovados: 13.
- Bloqueados: 1 (`test/unit/backup-external-upload.spec.ts`), devido à incompatibilidade da correção sem `require` com o runtime Jest CommonJS.

## Operações não executadas

Não foram executados testes E2E, Jest global, stage, commit, push, migration, build ou deploy. Jest foi executado somente nos três arquivos unitários, conforme solicitado.

As alterações locais existentes foram preservadas; nenhum arquivo fora dos 14 alvos e deste relatório foi alterado pelo B193.

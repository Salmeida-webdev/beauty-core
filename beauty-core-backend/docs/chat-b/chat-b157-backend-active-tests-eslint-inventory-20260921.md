# Inventario ESLint atualizado dos testes ativos do backend

- Data: 2026-09-21
- Escopo: TypeScript sob `test/`; excluidos `node_modules`, `coverage` e `dist`.
- ESLint: `test/**/*.ts --format json --no-cache`, heap 6144 MB, sem `--fix`; exit code 1 por diagnosticos.
- Candidatos encontrados: 70; resultados JSON individuais: 70; caminhos unicos: 70.
- Validacoes: PASS; exatamente 70 candidatos, 70 resultados, 70 caminhos unicos, conjuntos de caminhos identicos.
- B154: 223 erros / 136 avisos; B157: 204 erros / 129 avisos.
- Variacao total B154 -> B157: -19 erros / -7 avisos.
- Arquivos com diagnosticos: 37; sem diagnosticos: 33.

## Impacto dos blocos B150, B153 e B156

| Bloco / arquivo corrigido | B154 erros | Atual erros | Delta erros | B154 avisos | Atual avisos | Delta avisos |
|---|---:|---:|---:|---:|---:|---:|
| `test/helpers/auth.helper.ts` | 0 | 0 | 0 | 0 | 0 | 0 |
| `test/unit/micro-boost.coverage.spec.ts` | 0 | 0 | 0 | 0 | 0 | 0 |
| `test/unit/usuario-role-policy.spec.ts` | 19 | 0 | -19 | 7 | 0 | -7 |

B150 (`auth.helper.ts`) e B153 (`micro-boost.coverage.spec.ts`) ja estavam sem diagnosticos no B154 e permanecem limpos; suas reducoes estao incorporadas ao baseline B154 e nao sao subtraidas novamente. B156 (`usuario-role-policy.spec.ts`) removeu, nesta comparacao, 19 erros e 7 avisos.

## Variacao por regra em relacao ao B154

| Regra | B154 erros | Atual erros | Delta erros | B154 avisos | Atual avisos | Delta avisos |
|---|---:|---:|---:|---:|---:|---:|
| `@typescript-eslint/await-thenable` | 2 | 1 | -1 | 0 | 0 | 0 |
| `@typescript-eslint/no-require-imports` | 34 | 33 | -1 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-argument` | 0 | 0 | 0 | 136 | 129 | -7 |
| `@typescript-eslint/no-unsafe-assignment` | 58 | 53 | -5 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-call` | 41 | 37 | -4 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-function-type` | 7 | 3 | -4 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-member-access` | 63 | 59 | -4 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-return` | 3 | 3 | 0 | 0 | 0 | 0 |
| `@typescript-eslint/no-unused-vars` | 3 | 3 | 0 | 0 | 0 | 0 |
| `@typescript-eslint/restrict-plus-operands` | 2 | 2 | 0 | 0 | 0 | 0 |
| `@typescript-eslint/unbound-method` | 4 | 4 | 0 | 0 | 0 | 0 |
| `no-empty` | 6 | 6 | 0 | 0 | 0 | 0 |

## Consolidado por arquivo e regra

| Arquivo | B154 E/A | Atual E/A | Delta E/A | Regras atuais (E=erro, A=aviso) |
|---|---:|---:|---:|---|
| `test/app.e2e-spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/e2e/auditoria.e2e-spec.ts` | 6/3 | 6/3 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3); @typescript-eslint/no-unsafe-assignment (E 1, A 0); @typescript-eslint/no-unsafe-call (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/e2e/auth-admin.e2e-spec.ts` | 4/10 | 4/10 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 10); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/e2e/auth-cliente.e2e-spec.ts` | 15/10 | 15/10 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 10); @typescript-eslint/no-unsafe-assignment (E 2, A 0); @typescript-eslint/no-unsafe-call (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 10, A 0); @typescript-eslint/restrict-plus-operands (E 1, A 0) |
| `test/e2e/cliente-area.e2e-spec.ts` | 1/3 | 1/3 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3) |
| `test/e2e/health.e2e-spec.ts` | 1/6 | 1/6 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 6) |
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0/4 | 0/4 | 0/0 | @typescript-eslint/no-unsafe-argument (E 0, A 4) |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 3/5 | 3/5 | 0/0 | @typescript-eslint/no-unsafe-argument (E 0, A 5); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/e2e/metrics.e2e-spec.ts` | 1/4 | 1/4 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 4) |
| `test/e2e/multiempresa.e2e-spec.ts` | 10/6 | 10/6 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 6); @typescript-eslint/no-unsafe-assignment (E 3, A 0); @typescript-eslint/no-unsafe-call (E 2, A 0); @typescript-eslint/no-unsafe-member-access (E 4, A 0) |
| `test/e2e/queues.e2e-spec.ts` | 1/4 | 1/4 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 4) |
| `test/e2e/refresh-throttle.e2e-spec.ts` | 1/2 | 1/2 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 2) |
| `test/e2e/roles.e2e-spec.ts` | 1/3 | 1/3 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3) |
| `test/e2e/scheduler.e2e-spec.ts` | 1/3 | 1/3 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3) |
| `test/e2e/sessoes.e2e-spec.ts` | 1/7 | 1/7 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 7) |
| `test/e2e/super-admin.e2e-spec.ts` | 1/5 | 1/5 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 5) |
| `test/e2e/swagger-validation.e2e-spec.ts` | 1/2 | 1/2 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 2) |
| `test/e2e/tenant.e2e-spec.ts` | 4/2 | 4/2 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 2); @typescript-eslint/no-unsafe-call (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 1, A 0); @typescript-eslint/restrict-plus-operands (E 1, A 0) |
| `test/e2e/uploads.e2e-spec.ts` | 13/8 | 13/8 | 0/0 | @typescript-eslint/no-unsafe-argument (E 0, A 8); @typescript-eslint/no-unsafe-assignment (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 10, A 0) |
| `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` | 0/1 | 0/1 | 0/0 | @typescript-eslint/no-unsafe-argument (E 0, A 1) |
| `test/e2e/whatsapp-queue-demo.e2e-spec.ts` | 0/1 | 0/1 | 0/0 | @typescript-eslint/no-unsafe-argument (E 0, A 1) |
| `test/env-test.guard.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/helpers/auth.helper.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/helpers/prisma.helper.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/helpers/queue.helper.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/helpers/tenant.helper.ts` | 7/1 | 7/1 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 1); @typescript-eslint/no-unsafe-assignment (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 4, A 0); @typescript-eslint/no-unsafe-return (E 1, A 0) |
| `test/helpers/upload.helper.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/integration/r2-storage.live.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/jest-e2e.setup.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/seeds/test-seed.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/setup-e2e.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/agendamentos-concurrency.spec.ts` | 6/0 | 6/0 | 0/0 | @typescript-eslint/no-unsafe-assignment (E 1, A 0); @typescript-eslint/no-unsafe-call (E 2, A 0); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/unit/agendamentos-options.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/agendamentos-query.dto.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/analytics-performance-limits.spec.ts` | 3/2 | 3/2 | 0/0 | @typescript-eslint/no-unsafe-argument (E 0, A 2); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/unit/area-cliente-privacy.spec.ts` | 13/0 | 13/0 | 0/0 | @typescript-eslint/no-unsafe-assignment (E 4, A 0); @typescript-eslint/no-unsafe-call (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 6, A 0) |
| `test/unit/auth-guards.coverage.spec.ts` | 15/3 | 15/3 | 0/0 | @typescript-eslint/no-require-imports (E 3, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3); @typescript-eslint/no-unsafe-assignment (E 6, A 0); @typescript-eslint/no-unsafe-call (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/unit/backup-external-upload.spec.ts` | 1/0 | 1/0 | 0/0 | @typescript-eslint/no-require-imports (E 1, A 0) |
| `test/unit/chat03-bullmq-retention.spec.ts` | 1/0 | 1/0 | 0/0 | @typescript-eslint/unbound-method (E 1, A 0) |
| `test/unit/chat03-retention-runtime.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/chat36-backup.coverage.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/chat36-lgpd.coverage.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/cliente-area-compatibility.spec.ts` | 3/0 | 3/0 | 0/0 | @typescript-eslint/unbound-method (E 3, A 0) |
| `test/unit/clientes-pacotes-concurrency.spec.ts` | 1/8 | 1/8 | 0/0 | @typescript-eslint/no-unsafe-argument (E 0, A 8); @typescript-eslint/no-unsafe-assignment (E 1, A 0) |
| `test/unit/controllers-expanded.coverage.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/coverage-under-70-branch-matrix.generated.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/coverage-under-70-final-target.generated.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/coverage-under-70-targeted.generated.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/env-validation-cors.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/env-validation-required.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/financeiro-list-movimentacoes-query.dto.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/helpers/coverage-smoke.helper.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/infrastructure-expanded.coverage.spec.ts` | 14/1 | 14/1 | 0/0 | @typescript-eslint/no-require-imports (E 2, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 1); @typescript-eslint/no-unsafe-assignment (E 2, A 0); @typescript-eslint/no-unsafe-call (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 1, A 0); no-empty (E 6, A 0) |
| `test/unit/meta-whatsapp-cloud.provider.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/meta-whatsapp-cloud-provider-retry.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/meta-whatsapp-worker-flow.spec.ts` | 1/0 | 1/0 | 0/0 | @typescript-eslint/no-unsafe-assignment (E 1, A 0) |
| `test/unit/micro-boost.coverage.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/modules/usuarios/usuarios-role-filter.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/modules-services-expanded.coverage.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/queues-utils.coverage.spec.ts` | 12/4 | 12/4 | 0/0 | @typescript-eslint/no-require-imports (E 2, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 4); @typescript-eslint/no-unsafe-assignment (E 6, A 0); @typescript-eslint/no-unsafe-call (E 4, A 0) |
| `test/unit/queue-utils.spec.ts` | 14/4 | 14/4 | 0/0 | @typescript-eslint/no-require-imports (E 2, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 4); @typescript-eslint/no-unsafe-assignment (E 6, A 0); @typescript-eslint/no-unsafe-call (E 4, A 0); @typescript-eslint/no-unused-vars (E 2, A 0) |
| `test/unit/s3-storage.service.spec.ts` | 7/0 | 7/0 | 0/0 | @typescript-eslint/no-unsafe-assignment (E 5, A 0); @typescript-eslint/no-unsafe-return (E 2, A 0) |
| `test/unit/sanity.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/services-critical.coverage.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/storage-roundtrip.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/tenant-services.coverage.spec.ts` | 7/2 | 7/2 | 0/0 | @typescript-eslint/no-require-imports (E 2, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 2); @typescript-eslint/no-unsafe-assignment (E 3, A 0); @typescript-eslint/no-unsafe-call (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 1, A 0) |
| `test/unit/tenant-validator.spec.ts` | 0/0 | 0/0 | 0/0 | - |
| `test/unit/usuario-role-policy.coverage.spec.ts` | 16/7 | 16/7 | 0/0 | @typescript-eslint/await-thenable (E 1, A 0); @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 7); @typescript-eslint/no-unsafe-assignment (E 3, A 0); @typescript-eslint/no-unsafe-call (E 4, A 0); @typescript-eslint/no-unsafe-function-type (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 4, A 0) |
| `test/unit/usuario-role-policy.spec.ts` | 19/7 | 0/0 | -19/-7 | - |
| `test/unit/utils.coverage.spec.ts` | 18/8 | 18/8 | 0/0 | @typescript-eslint/no-require-imports (E 4, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 8); @typescript-eslint/no-unsafe-assignment (E 5, A 0); @typescript-eslint/no-unsafe-call (E 8, A 0); @typescript-eslint/no-unused-vars (E 1, A 0) |

## Proximo arquivo recomendado

`test/unit/utils.coverage.spec.ts` - 18 erros e 8 avisos; maior contagem atual de erros.

## Integridade

- B154 preservado; novo relatorio gravado somente apos validacao dos candidatos, resultados individuais, caminhos, totais e agregacoes.
- Nenhum arquivo de codigo foi alterado; nenhum `--fix`, stage, commit, push, migration ou deploy foi executado.

# Inventario atualizado do ESLint - testes ativos do backend

- Data: 2026-09-21
- Escopo: todos os arquivos TypeScript sob `test/`; exclusoes: `node_modules`, `coverage` e `dist`.
- ESLint: `test/**/*.ts --format json --no-cache`, heap de 6144 MB; sem `--fix`. Exit code: 1.
- Candidatos encontrados por `rg --files`: 70.
- Resultados individuais do ESLint: 70; caminhos unicos: 70.
- Validacao de quantidade e caminhos: PASS; candidato e resultado individual correspondem um a um.
- B151: 244 erros e 139 avisos; B154: 223 erros e 136 avisos.
- Variacao desde B151: erros -21; avisos -3.
- Arquivos com diagnosticos: 38; arquivos sem diagnosticos: 32.

## Variacao por regra em relacao a B151

| Regra | B151 erros | B154 erros | Variacao erros | B151 avisos | B154 avisos | Variacao avisos |
|---|---:|---:|---:|---:|---:|---:|
| `@typescript-eslint/await-thenable` | 2 | 2 | 0 | 0 | 0 | 0 |
| `@typescript-eslint/no-require-imports` | 37 | 34 | -3 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-argument` | 0 | 0 | 0 | 139 | 136 | -3 |
| `@typescript-eslint/no-unsafe-assignment` | 63 | 58 | -5 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-call` | 47 | 41 | -6 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-function-type` | 7 | 7 | 0 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-member-access` | 66 | 63 | -3 | 0 | 0 | 0 |
| `@typescript-eslint/no-unsafe-return` | 3 | 3 | 0 | 0 | 0 | 0 |
| `@typescript-eslint/no-unused-vars` | 3 | 3 | 0 | 0 | 0 | 0 |
| `@typescript-eslint/restrict-plus-operands` | 2 | 2 | 0 | 0 | 0 | 0 |
| `@typescript-eslint/unbound-method` | 4 | 4 | 0 | 0 | 0 | 0 |
| `no-empty` | 10 | 6 | -4 | 0 | 0 | 0 |

## Consolidado por arquivo e regra

| Arquivo | Erros | Avisos | Regras e contagens (E=erro, A=aviso) |
|---|---:|---:|---|
| `test/app.e2e-spec.ts` | 0 | 0 | - |
| `test/e2e/auditoria.e2e-spec.ts` | 6 | 3 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3); @typescript-eslint/no-unsafe-assignment (E 1, A 0); @typescript-eslint/no-unsafe-call (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/e2e/auth-admin.e2e-spec.ts` | 4 | 10 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 10); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/e2e/auth-cliente.e2e-spec.ts` | 15 | 10 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 10); @typescript-eslint/no-unsafe-assignment (E 2, A 0); @typescript-eslint/no-unsafe-call (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 10, A 0); @typescript-eslint/restrict-plus-operands (E 1, A 0) |
| `test/e2e/cliente-area.e2e-spec.ts` | 1 | 3 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3) |
| `test/e2e/health.e2e-spec.ts` | 1 | 6 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 6) |
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0 | 4 | @typescript-eslint/no-unsafe-argument (E 0, A 4) |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 3 | 5 | @typescript-eslint/no-unsafe-argument (E 0, A 5); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/e2e/metrics.e2e-spec.ts` | 1 | 4 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 4) |
| `test/e2e/multiempresa.e2e-spec.ts` | 10 | 6 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 6); @typescript-eslint/no-unsafe-assignment (E 3, A 0); @typescript-eslint/no-unsafe-call (E 2, A 0); @typescript-eslint/no-unsafe-member-access (E 4, A 0) |
| `test/e2e/queues.e2e-spec.ts` | 1 | 4 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 4) |
| `test/e2e/refresh-throttle.e2e-spec.ts` | 1 | 2 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 2) |
| `test/e2e/roles.e2e-spec.ts` | 1 | 3 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3) |
| `test/e2e/scheduler.e2e-spec.ts` | 1 | 3 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3) |
| `test/e2e/sessoes.e2e-spec.ts` | 1 | 7 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 7) |
| `test/e2e/super-admin.e2e-spec.ts` | 1 | 5 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 5) |
| `test/e2e/swagger-validation.e2e-spec.ts` | 1 | 2 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 2) |
| `test/e2e/tenant.e2e-spec.ts` | 4 | 2 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 2); @typescript-eslint/no-unsafe-call (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 1, A 0); @typescript-eslint/restrict-plus-operands (E 1, A 0) |
| `test/e2e/uploads.e2e-spec.ts` | 13 | 8 | @typescript-eslint/no-unsafe-argument (E 0, A 8); @typescript-eslint/no-unsafe-assignment (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 10, A 0) |
| `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` | 0 | 1 | @typescript-eslint/no-unsafe-argument (E 0, A 1) |
| `test/e2e/whatsapp-queue-demo.e2e-spec.ts` | 0 | 1 | @typescript-eslint/no-unsafe-argument (E 0, A 1) |
| `test/env-test.guard.ts` | 0 | 0 | - |
| `test/helpers/auth.helper.ts` | 0 | 0 | - |
| `test/helpers/prisma.helper.ts` | 0 | 0 | - |
| `test/helpers/queue.helper.ts` | 0 | 0 | - |
| `test/helpers/tenant.helper.ts` | 7 | 1 | @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 1); @typescript-eslint/no-unsafe-assignment (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 4, A 0); @typescript-eslint/no-unsafe-return (E 1, A 0) |
| `test/helpers/upload.helper.ts` | 0 | 0 | - |
| `test/integration/r2-storage.live.spec.ts` | 0 | 0 | - |
| `test/jest-e2e.setup.ts` | 0 | 0 | - |
| `test/seeds/test-seed.ts` | 0 | 0 | - |
| `test/setup-e2e.ts` | 0 | 0 | - |
| `test/unit/agendamentos-concurrency.spec.ts` | 6 | 0 | @typescript-eslint/no-unsafe-assignment (E 1, A 0); @typescript-eslint/no-unsafe-call (E 2, A 0); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/unit/agendamentos-options.spec.ts` | 0 | 0 | - |
| `test/unit/agendamentos-query.dto.spec.ts` | 0 | 0 | - |
| `test/unit/analytics-performance-limits.spec.ts` | 3 | 2 | @typescript-eslint/no-unsafe-argument (E 0, A 2); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/unit/area-cliente-privacy.spec.ts` | 13 | 0 | @typescript-eslint/no-unsafe-assignment (E 4, A 0); @typescript-eslint/no-unsafe-call (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 6, A 0) |
| `test/unit/auth-guards.coverage.spec.ts` | 15 | 3 | @typescript-eslint/no-require-imports (E 3, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 3); @typescript-eslint/no-unsafe-assignment (E 6, A 0); @typescript-eslint/no-unsafe-call (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 3, A 0) |
| `test/unit/backup-external-upload.spec.ts` | 1 | 0 | @typescript-eslint/no-require-imports (E 1, A 0) |
| `test/unit/chat03-bullmq-retention.spec.ts` | 1 | 0 | @typescript-eslint/unbound-method (E 1, A 0) |
| `test/unit/chat03-retention-runtime.spec.ts` | 0 | 0 | - |
| `test/unit/chat36-backup.coverage.spec.ts` | 0 | 0 | - |
| `test/unit/chat36-lgpd.coverage.spec.ts` | 0 | 0 | - |
| `test/unit/cliente-area-compatibility.spec.ts` | 3 | 0 | @typescript-eslint/unbound-method (E 3, A 0) |
| `test/unit/clientes-pacotes-concurrency.spec.ts` | 1 | 8 | @typescript-eslint/no-unsafe-argument (E 0, A 8); @typescript-eslint/no-unsafe-assignment (E 1, A 0) |
| `test/unit/controllers-expanded.coverage.spec.ts` | 0 | 0 | - |
| `test/unit/coverage-under-70-branch-matrix.generated.spec.ts` | 0 | 0 | - |
| `test/unit/coverage-under-70-final-target.generated.spec.ts` | 0 | 0 | - |
| `test/unit/coverage-under-70-targeted.generated.spec.ts` | 0 | 0 | - |
| `test/unit/env-validation-cors.spec.ts` | 0 | 0 | - |
| `test/unit/env-validation-required.spec.ts` | 0 | 0 | - |
| `test/unit/financeiro-list-movimentacoes-query.dto.spec.ts` | 0 | 0 | - |
| `test/unit/helpers/coverage-smoke.helper.ts` | 0 | 0 | - |
| `test/unit/infrastructure-expanded.coverage.spec.ts` | 14 | 1 | @typescript-eslint/no-require-imports (E 2, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 1); @typescript-eslint/no-unsafe-assignment (E 2, A 0); @typescript-eslint/no-unsafe-call (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 1, A 0); no-empty (E 6, A 0) |
| `test/unit/meta-whatsapp-cloud.provider.spec.ts` | 0 | 0 | - |
| `test/unit/meta-whatsapp-cloud-provider-retry.spec.ts` | 0 | 0 | - |
| `test/unit/meta-whatsapp-worker-flow.spec.ts` | 1 | 0 | @typescript-eslint/no-unsafe-assignment (E 1, A 0) |
| `test/unit/micro-boost.coverage.spec.ts` | 0 | 0 | - |
| `test/unit/modules/usuarios/usuarios-role-filter.spec.ts` | 0 | 0 | - |
| `test/unit/modules-services-expanded.coverage.spec.ts` | 0 | 0 | - |
| `test/unit/queues-utils.coverage.spec.ts` | 12 | 4 | @typescript-eslint/no-require-imports (E 2, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 4); @typescript-eslint/no-unsafe-assignment (E 6, A 0); @typescript-eslint/no-unsafe-call (E 4, A 0) |
| `test/unit/queue-utils.spec.ts` | 14 | 4 | @typescript-eslint/no-require-imports (E 2, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 4); @typescript-eslint/no-unsafe-assignment (E 6, A 0); @typescript-eslint/no-unsafe-call (E 4, A 0); @typescript-eslint/no-unused-vars (E 2, A 0) |
| `test/unit/s3-storage.service.spec.ts` | 7 | 0 | @typescript-eslint/no-unsafe-assignment (E 5, A 0); @typescript-eslint/no-unsafe-return (E 2, A 0) |
| `test/unit/sanity.spec.ts` | 0 | 0 | - |
| `test/unit/services-critical.coverage.spec.ts` | 0 | 0 | - |
| `test/unit/storage-roundtrip.spec.ts` | 0 | 0 | - |
| `test/unit/tenant-services.coverage.spec.ts` | 7 | 2 | @typescript-eslint/no-require-imports (E 2, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 2); @typescript-eslint/no-unsafe-assignment (E 3, A 0); @typescript-eslint/no-unsafe-call (E 1, A 0); @typescript-eslint/no-unsafe-member-access (E 1, A 0) |
| `test/unit/tenant-validator.spec.ts` | 0 | 0 | - |
| `test/unit/usuario-role-policy.coverage.spec.ts` | 16 | 7 | @typescript-eslint/await-thenable (E 1, A 0); @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 7); @typescript-eslint/no-unsafe-assignment (E 3, A 0); @typescript-eslint/no-unsafe-call (E 4, A 0); @typescript-eslint/no-unsafe-function-type (E 3, A 0); @typescript-eslint/no-unsafe-member-access (E 4, A 0) |
| `test/unit/usuario-role-policy.spec.ts` | 19 | 7 | @typescript-eslint/await-thenable (E 1, A 0); @typescript-eslint/no-require-imports (E 1, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 7); @typescript-eslint/no-unsafe-assignment (E 5, A 0); @typescript-eslint/no-unsafe-call (E 4, A 0); @typescript-eslint/no-unsafe-function-type (E 4, A 0); @typescript-eslint/no-unsafe-member-access (E 4, A 0) |
| `test/unit/utils.coverage.spec.ts` | 18 | 8 | @typescript-eslint/no-require-imports (E 4, A 0); @typescript-eslint/no-unsafe-argument (E 0, A 8); @typescript-eslint/no-unsafe-assignment (E 5, A 0); @typescript-eslint/no-unsafe-call (E 8, A 0); @typescript-eslint/no-unused-vars (E 1, A 0) |

## Proximo arquivo recomendado

`test/unit/usuario-role-policy.spec.ts` - 19 erros e 7 avisos; maior quantidade atual de erros.

## Integridade

- Inventario B151 preservado; este e um novo relatorio.
- Auditoria somente leitura do codigo; nenhum `--fix` ou alteracao de codigo foi executada.
- A tabela inclui os 70 arquivos processados, inclusive os sem diagnosticos.

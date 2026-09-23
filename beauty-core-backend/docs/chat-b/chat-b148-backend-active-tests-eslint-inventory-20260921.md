# Inventário ESLint — testes ativos do backend

- Data: 2026-09-21 16:43:13 -03:00
- Escopo: todos os arquivos ``.ts`` sob ``test/`` (testes, helpers, setup e seeds usados pelos testes).
- Exclusões: ``node_modules``, ``coverage`` e ``dist``.
- ESLint: ``--format json --no-cache``; sem ``--fix``.
- Arquivos candidatos encontrados: 70
- Arquivos realmente processados pelo ESLint: 70
- Exit code ESLint: 1
- Tempo: 20.3 s
- Diagnósticos: 385 (270 erros, 115 avisos)
- Arquivos com problemas: 38
- Arquivos sem problemas: 32

## Diagnósticos por arquivo e regra

| Arquivo | Erros | Avisos | Regras e contagens |
|---|---:|---:|---|
| `test/app.e2e-spec.ts` | 0 | 0 | — |
| `test/e2e/auditoria.e2e-spec.ts` | 6 | 1 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 1); @typescript-eslint/no-unsafe-assignment (erros 1, avisos 0); @typescript-eslint/no-unsafe-call (erros 1, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 3, avisos 0) |
| `test/e2e/auth-admin.e2e-spec.ts` | 4 | 6 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 6); @typescript-eslint/no-unsafe-member-access (erros 3, avisos 0) |
| `test/e2e/auth-cliente.e2e-spec.ts` | 15 | 5 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 5); @typescript-eslint/no-unsafe-assignment (erros 2, avisos 0); @typescript-eslint/no-unsafe-call (erros 1, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 10, avisos 0); @typescript-eslint/restrict-plus-operands (erros 1, avisos 0) |
| `test/e2e/cliente-area.e2e-spec.ts` | 1 | 2 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 2) |
| `test/e2e/health.e2e-spec.ts` | 1 | 5 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 5) |
| `test/e2e/lgpd-runtime.e2e-spec.ts` | 0 | 3 | @typescript-eslint/no-unsafe-argument (erros 0, avisos 3) |
| `test/e2e/meta-whatsapp-webhook.e2e-spec.ts` | 3 | 5 | @typescript-eslint/no-unsafe-argument (erros 0, avisos 5); @typescript-eslint/no-unsafe-member-access (erros 3, avisos 0) |
| `test/e2e/metrics.e2e-spec.ts` | 1 | 4 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 4) |
| `test/e2e/multiempresa.e2e-spec.ts` | 10 | 4 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 4); @typescript-eslint/no-unsafe-assignment (erros 3, avisos 0); @typescript-eslint/no-unsafe-call (erros 2, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 4, avisos 0) |
| `test/e2e/queues.e2e-spec.ts` | 1 | 3 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 3) |
| `test/e2e/refresh-throttle.e2e-spec.ts` | 1 | 2 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 2) |
| `test/e2e/roles.e2e-spec.ts` | 1 | 2 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 2) |
| `test/e2e/scheduler.e2e-spec.ts` | 1 | 2 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 2) |
| `test/e2e/sessoes.e2e-spec.ts` | 1 | 4 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 4) |
| `test/e2e/super-admin.e2e-spec.ts` | 1 | 4 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 4) |
| `test/e2e/swagger-validation.e2e-spec.ts` | 1 | 2 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 2) |
| `test/e2e/tenant.e2e-spec.ts` | 4 | 2 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 2); @typescript-eslint/no-unsafe-call (erros 1, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 1, avisos 0); @typescript-eslint/restrict-plus-operands (erros 1, avisos 0) |
| `test/e2e/uploads-strict-roundtrip.e2e-spec.ts` | 0 | 0 | — |
| `test/e2e/uploads.e2e-spec.ts` | 13 | 6 | @typescript-eslint/no-unsafe-argument (erros 0, avisos 6); @typescript-eslint/no-unsafe-assignment (erros 3, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 10, avisos 0) |
| `test/e2e/whatsapp-queue-demo.e2e-spec.ts` | 0 | 0 | — |
| `test/env-test.guard.ts` | 0 | 0 | — |
| `test/helpers/auth.helper.ts` | 26 | 3 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 3); @typescript-eslint/no-unsafe-assignment (erros 10, avisos 0); @typescript-eslint/no-unsafe-call (erros 1, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 14, avisos 0) |
| `test/helpers/prisma.helper.ts` | 0 | 0 | — |
| `test/helpers/queue.helper.ts` | 0 | 0 | — |
| `test/helpers/tenant.helper.ts` | 7 | 1 | @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 1); @typescript-eslint/no-unsafe-assignment (erros 1, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 4, avisos 0); @typescript-eslint/no-unsafe-return (erros 1, avisos 0) |
| `test/helpers/upload.helper.ts` | 0 | 0 | — |
| `test/integration/r2-storage.live.spec.ts` | 0 | 0 | — |
| `test/jest-e2e.setup.ts` | 0 | 0 | — |
| `test/seeds/test-seed.ts` | 0 | 0 | — |
| `test/setup-e2e.ts` | 0 | 0 | — |
| `test/unit/agendamentos-concurrency.spec.ts` | 6 | 0 | @typescript-eslint/no-unsafe-assignment (erros 1, avisos 0); @typescript-eslint/no-unsafe-call (erros 2, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 3, avisos 0) |
| `test/unit/agendamentos-options.spec.ts` | 0 | 0 | — |
| `test/unit/agendamentos-query.dto.spec.ts` | 0 | 0 | — |
| `test/unit/analytics-performance-limits.spec.ts` | 3 | 2 | @typescript-eslint/no-unsafe-argument (erros 0, avisos 2); @typescript-eslint/no-unsafe-member-access (erros 3, avisos 0) |
| `test/unit/area-cliente-privacy.spec.ts` | 13 | 0 | @typescript-eslint/no-unsafe-assignment (erros 4, avisos 0); @typescript-eslint/no-unsafe-call (erros 3, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 6, avisos 0) |
| `test/unit/auth-guards.coverage.spec.ts` | 15 | 3 | @typescript-eslint/no-require-imports (erros 3, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 3); @typescript-eslint/no-unsafe-assignment (erros 6, avisos 0); @typescript-eslint/no-unsafe-call (erros 3, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 3, avisos 0) |
| `test/unit/backup-external-upload.spec.ts` | 1 | 0 | @typescript-eslint/no-require-imports (erros 1, avisos 0) |
| `test/unit/chat03-bullmq-retention.spec.ts` | 1 | 0 | @typescript-eslint/unbound-method (erros 1, avisos 0) |
| `test/unit/chat03-retention-runtime.spec.ts` | 0 | 0 | — |
| `test/unit/chat36-backup.coverage.spec.ts` | 0 | 0 | — |
| `test/unit/chat36-lgpd.coverage.spec.ts` | 0 | 0 | — |
| `test/unit/cliente-area-compatibility.spec.ts` | 3 | 0 | @typescript-eslint/unbound-method (erros 3, avisos 0) |
| `test/unit/clientes-pacotes-concurrency.spec.ts` | 1 | 8 | @typescript-eslint/no-unsafe-argument (erros 0, avisos 8); @typescript-eslint/no-unsafe-assignment (erros 1, avisos 0) |
| `test/unit/controllers-expanded.coverage.spec.ts` | 0 | 0 | — |
| `test/unit/coverage-under-70-branch-matrix.generated.spec.ts` | 0 | 0 | — |
| `test/unit/coverage-under-70-final-target.generated.spec.ts` | 0 | 0 | — |
| `test/unit/coverage-under-70-targeted.generated.spec.ts` | 0 | 0 | — |
| `test/unit/env-validation-cors.spec.ts` | 0 | 0 | — |
| `test/unit/env-validation-required.spec.ts` | 0 | 0 | — |
| `test/unit/financeiro-list-movimentacoes-query.dto.spec.ts` | 0 | 0 | — |
| `test/unit/helpers/coverage-smoke.helper.ts` | 0 | 0 | — |
| `test/unit/infrastructure-expanded.coverage.spec.ts` | 14 | 1 | @typescript-eslint/no-require-imports (erros 2, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 1); @typescript-eslint/no-unsafe-assignment (erros 2, avisos 0); @typescript-eslint/no-unsafe-call (erros 3, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 1, avisos 0); no-empty (erros 6, avisos 0) |
| `test/unit/meta-whatsapp-cloud-provider-retry.spec.ts` | 0 | 0 | — |
| `test/unit/meta-whatsapp-cloud.provider.spec.ts` | 0 | 0 | — |
| `test/unit/meta-whatsapp-worker-flow.spec.ts` | 1 | 0 | @typescript-eslint/no-unsafe-assignment (erros 1, avisos 0) |
| `test/unit/micro-boost.coverage.spec.ts` | 21 | 3 | @typescript-eslint/no-require-imports (erros 3, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 3); @typescript-eslint/no-unsafe-assignment (erros 5, avisos 0); @typescript-eslint/no-unsafe-call (erros 6, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 3, avisos 0); no-empty (erros 4, avisos 0) |
| `test/unit/modules-services-expanded.coverage.spec.ts` | 0 | 0 | — |
| `test/unit/modules/usuarios/usuarios-role-filter.spec.ts` | 0 | 0 | — |
| `test/unit/queue-utils.spec.ts` | 14 | 4 | @typescript-eslint/no-require-imports (erros 2, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 4); @typescript-eslint/no-unsafe-assignment (erros 6, avisos 0); @typescript-eslint/no-unsafe-call (erros 4, avisos 0); @typescript-eslint/no-unused-vars (erros 2, avisos 0) |
| `test/unit/queues-utils.coverage.spec.ts` | 12 | 4 | @typescript-eslint/no-require-imports (erros 2, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 4); @typescript-eslint/no-unsafe-assignment (erros 6, avisos 0); @typescript-eslint/no-unsafe-call (erros 4, avisos 0) |
| `test/unit/s3-storage.service.spec.ts` | 7 | 0 | @typescript-eslint/no-unsafe-assignment (erros 5, avisos 0); @typescript-eslint/no-unsafe-return (erros 2, avisos 0) |
| `test/unit/sanity.spec.ts` | 0 | 0 | — |
| `test/unit/services-critical.coverage.spec.ts` | 0 | 0 | — |
| `test/unit/storage-roundtrip.spec.ts` | 0 | 0 | — |
| `test/unit/tenant-services.coverage.spec.ts` | 7 | 2 | @typescript-eslint/no-require-imports (erros 2, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 2); @typescript-eslint/no-unsafe-assignment (erros 3, avisos 0); @typescript-eslint/no-unsafe-call (erros 1, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 1, avisos 0) |
| `test/unit/tenant-validator.spec.ts` | 0 | 0 | — |
| `test/unit/usuario-role-policy.coverage.spec.ts` | 16 | 7 | @typescript-eslint/await-thenable (erros 1, avisos 0); @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 7); @typescript-eslint/no-unsafe-assignment (erros 3, avisos 0); @typescript-eslint/no-unsafe-call (erros 4, avisos 0); @typescript-eslint/no-unsafe-function-type (erros 3, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 4, avisos 0) |
| `test/unit/usuario-role-policy.spec.ts` | 19 | 7 | @typescript-eslint/await-thenable (erros 1, avisos 0); @typescript-eslint/no-require-imports (erros 1, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 7); @typescript-eslint/no-unsafe-assignment (erros 5, avisos 0); @typescript-eslint/no-unsafe-call (erros 4, avisos 0); @typescript-eslint/no-unsafe-function-type (erros 4, avisos 0); @typescript-eslint/no-unsafe-member-access (erros 4, avisos 0) |
| `test/unit/utils.coverage.spec.ts` | 18 | 8 | @typescript-eslint/no-require-imports (erros 4, avisos 0); @typescript-eslint/no-unsafe-argument (erros 0, avisos 8); @typescript-eslint/no-unsafe-assignment (erros 5, avisos 0); @typescript-eslint/no-unsafe-call (erros 8, avisos 0); @typescript-eslint/no-unused-vars (erros 1, avisos 0) |

## Diagnósticos individuais

- `test/e2e/auditoria.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/auditoria.e2e-spec.ts`:26:30 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .auditoriaSistema on an `any` value.
- `test/e2e/auditoria.e2e-spec.ts`:30:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/auditoria.e2e-spec.ts`:30:30 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/e2e/auditoria.e2e-spec.ts`:30:50 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .auditoriaSistema on an `any` value.
- `test/e2e/auditoria.e2e-spec.ts`:34:23 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .length on an `any` value.
- `test/e2e/auditoria.e2e-spec.ts`:40:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-admin.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/auth-admin.e2e-spec.ts`:23:36 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-admin.e2e-spec.ts`:34:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .access_token on an `any` value.
- `test/e2e/auth-admin.e2e-spec.ts`:35:23 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .accessToken on an `any` value.
- `test/e2e/auth-admin.e2e-spec.ts`:36:23 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .token on an `any` value.
- `test/e2e/auth-admin.e2e-spec.ts`:41:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-admin.e2e-spec.ts`:59:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-admin.e2e-spec.ts`:72:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-admin.e2e-spec.ts`:83:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-admin.e2e-spec.ts`:97:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-cliente.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/auth-cliente.e2e-spec.ts`:23:36 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-cliente.e2e-spec.ts`:25:22 — erro, `@typescript-eslint/restrict-plus-operands`: Invalid operand for a '+' operation. Operands must each be a number or string, allowing a string + any of: `any`, `boolean`, `null`, `RegExp`, `undefined`. Got `unknown`.
- `test/e2e/auth-cliente.e2e-spec.ts`:34:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:35:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigoDesenvolvimento on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:36:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigo on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:37:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .devCode on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:38:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .code on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:40:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:40:28 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/e2e/auth-cliente.e2e-spec.ts`:40:48 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigoAcessoCliente on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:51:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigo on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:52:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigoHash on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:53:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigoHash on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:56:23 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigo on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:57:23 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigoHash on an `any` value.
- `test/e2e/auth-cliente.e2e-spec.ts`:82:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-cliente.e2e-spec.ts`:99:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-cliente.e2e-spec.ts`:112:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/auth-cliente.e2e-spec.ts`:130:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/cliente-area.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/cliente-area.e2e-spec.ts`:33:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/cliente-area.e2e-spec.ts`:40:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/health.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/health.e2e-spec.ts`:24:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/health.e2e-spec.ts`:28:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/health.e2e-spec.ts`:36:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/health.e2e-spec.ts`:49:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/health.e2e-spec.ts`:63:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/lgpd-runtime.e2e-spec.ts`:75:36 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/lgpd-runtime.e2e-spec.ts`:91:36 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/lgpd-runtime.e2e-spec.ts`:112:39 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`:25:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`:34:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`:83:33 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`:89:23 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .received on an `any` value.
- `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`:90:23 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .duplicates on an `any` value.
- `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`:92:37 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`:98:27 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .duplicates on an `any` value.
- `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`:107:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/metrics.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/metrics.e2e-spec.ts`:42:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/metrics.e2e-spec.ts`:46:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/metrics.e2e-spec.ts`:53:36 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/metrics.e2e-spec.ts`:62:36 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/multiempresa.e2e-spec.ts`:2:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/multiempresa.e2e-spec.ts`:25:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/multiempresa.e2e-spec.ts`:25:26 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/e2e/multiempresa.e2e-spec.ts`:25:46 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .usuario on an `any` value.
- `test/e2e/multiempresa.e2e-spec.ts`:36:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/multiempresa.e2e-spec.ts`:36:28 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/e2e/multiempresa.e2e-spec.ts`:36:48 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .cliente on an `any` value.
- `test/e2e/multiempresa.e2e-spec.ts`:48:5 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/multiempresa.e2e-spec.ts`:48:34 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .id on an `any` value.
- `test/e2e/multiempresa.e2e-spec.ts`:49:48 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `string`.
- `test/e2e/multiempresa.e2e-spec.ts`:49:55 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .email on an `any` value.
- `test/e2e/multiempresa.e2e-spec.ts`:58:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/multiempresa.e2e-spec.ts`:67:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/multiempresa.e2e-spec.ts`:76:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/queues.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/queues.e2e-spec.ts`:24:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/queues.e2e-spec.ts`:31:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/queues.e2e-spec.ts`:40:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/refresh-throttle.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/refresh-throttle.e2e-spec.ts`:24:38 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/refresh-throttle.e2e-spec.ts`:44:38 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/roles.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/roles.e2e-spec.ts`:23:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/roles.e2e-spec.ts`:35:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/scheduler.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/scheduler.e2e-spec.ts`:24:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/scheduler.e2e-spec.ts`:35:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/sessoes.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/sessoes.e2e-spec.ts`:29:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/sessoes.e2e-spec.ts`:37:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/sessoes.e2e-spec.ts`:53:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/sessoes.e2e-spec.ts`:64:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/super-admin.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/super-admin.e2e-spec.ts`:24:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/super-admin.e2e-spec.ts`:31:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/super-admin.e2e-spec.ts`:38:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/super-admin.e2e-spec.ts`:45:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/swagger-validation.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/swagger-validation.e2e-spec.ts`:21:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/swagger-validation.e2e-spec.ts`:32:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/tenant.e2e-spec.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/e2e/tenant.e2e-spec.ts`:26:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/tenant.e2e-spec.ts`:34:11 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/e2e/tenant.e2e-spec.ts`:34:31 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .empresa on an `any` value.
- `test/e2e/tenant.e2e-spec.ts`:39:19 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/tenant.e2e-spec.ts`:40:32 — erro, `@typescript-eslint/restrict-plus-operands`: Invalid operand for a '+' operation. Operands must each be a number or string, allowing a string + any of: `any`, `boolean`, `null`, `RegExp`, `undefined`. Got `unknown`.
- `test/e2e/uploads.e2e-spec.ts`:51:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/uploads.e2e-spec.ts`:67:36 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/uploads.e2e-spec.ts`:79:13 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:79:37 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .id on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:79:55 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .arquivo on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:83:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/uploads.e2e-spec.ts`:90:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/uploads.e2e-spec.ts`:112:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .id on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:113:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .createdAt on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:114:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .updatedAt on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:128:7 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:140:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .id on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:141:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .createdAt on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:142:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .updatedAt on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:143:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .ultimoAcessoEm on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:145:17 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .empresaId on an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:157:7 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/e2e/uploads.e2e-spec.ts`:177:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/e2e/uploads.e2e-spec.ts`:213:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/helpers/auth.helper.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/helpers/auth.helper.ts`:22:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:22:28 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .access_token on an `any` value.
- `test/helpers/auth.helper.ts`:22:49 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .accessToken on an `any` value.
- `test/helpers/auth.helper.ts`:22:69 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .token on an `any` value.
- `test/helpers/auth.helper.ts`:23:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:23:29 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .refresh_token on an `any` value.
- `test/helpers/auth.helper.ts`:23:51 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .refreshToken on an `any` value.
- `test/helpers/auth.helper.ts`:28:5 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:29:5 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:30:5 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:30:22 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .expires_in on an `any` value.
- `test/helpers/auth.helper.ts`:30:41 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .expiresIn on an `any` value.
- `test/helpers/auth.helper.ts`:31:5 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:47:34 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/helpers/auth.helper.ts`:91:35 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/helpers/auth.helper.ts`:110:7 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:111:20 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigoDesenvolvimento on an `any` value.
- `test/helpers/auth.helper.ts`:112:20 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigo on an `any` value.
- `test/helpers/auth.helper.ts`:113:20 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .devCode on an `any` value.
- `test/helpers/auth.helper.ts`:114:20 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .code on an `any` value.
- `test/helpers/auth.helper.ts`:116:44 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigoAcessoCliente on an `any` value.
- `test/helpers/auth.helper.ts`:117:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:117:23 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/helpers/auth.helper.ts`:117:39 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigoAcessoCliente on an `any` value.
- `test/helpers/auth.helper.ts`:126:5 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/auth.helper.ts`:126:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .codigo on an `any` value.
- `test/helpers/auth.helper.ts`:131:35 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/helpers/auth.helper.ts`:135:7 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/tenant.helper.ts`:1:18 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/helpers/tenant.helper.ts`:5:34 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `App`.
- `test/helpers/tenant.helper.ts`:9:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/helpers/tenant.helper.ts`:10:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .slug on an `any` value.
- `test/helpers/tenant.helper.ts`:11:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .data on an `any` value.
- `test/helpers/tenant.helper.ts`:12:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .empresa on an `any` value.
- `test/helpers/tenant.helper.ts`:13:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .data on an `any` value.
- `test/helpers/tenant.helper.ts`:17:3 — erro, `@typescript-eslint/no-unsafe-return`: Unsafe return of a value of type `any`.
- `test/unit/agendamentos-concurrency.spec.ts`:17:7 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/agendamentos-concurrency.spec.ts`:17:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .assertNoScheduleConflict on an `any` value.
- `test/unit/agendamentos-concurrency.spec.ts`:27:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/agendamentos-concurrency.spec.ts`:48:7 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/agendamentos-concurrency.spec.ts`:48:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .assertNoScheduleConflict on an `any` value.
- `test/unit/agendamentos-concurrency.spec.ts`:57:46 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access [0] on an `any` value.
- `test/unit/analytics-performance-limits.spec.ts`:53:36 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `PrismaService`.
- `test/unit/analytics-performance-limits.spec.ts`:53:44 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `TenantValidatorService`.
- `test/unit/analytics-performance-limits.spec.ts`:75:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .clientePacote on an `any` value.
- `test/unit/analytics-performance-limits.spec.ts`:85:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .fidelidade on an `any` value.
- `test/unit/analytics-performance-limits.spec.ts`:95:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .eventoSistema on an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:4:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:7:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:7:20 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/area-cliente-privacy.spec.ts`:7:28 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .toPortalAppointment on an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:33:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .servico on an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:34:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .profissional on an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:35:19 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .unidade on an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:39:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:39:19 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/area-cliente-privacy.spec.ts`:39:27 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .toPortalPointMovement on an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:48:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/area-cliente-privacy.spec.ts`:48:21 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/area-cliente-privacy.spec.ts`:48:29 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .toPortalWhatsappMessage on an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:3:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:3:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/auth-guards.coverage.spec.ts`:6:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:7:11 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .JwtAuthGuard on an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:8:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } \\| ArrayLike<unknown>`.
- `test/unit/auth-guards.coverage.spec.ts`:12:7 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe construction of an `any` typed value.
- `test/unit/auth-guards.coverage.spec.ts`:17:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:17:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/auth-guards.coverage.spec.ts`:20:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:21:11 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .ClienteAuthGuard on an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:22:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } \\| ArrayLike<unknown>`.
- `test/unit/auth-guards.coverage.spec.ts`:26:7 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe construction of an `any` typed value.
- `test/unit/auth-guards.coverage.spec.ts`:31:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:31:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/auth-guards.coverage.spec.ts`:34:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:35:11 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .JwtOrClienteAuthGuard on an `any` value.
- `test/unit/auth-guards.coverage.spec.ts`:36:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } \\| ArrayLike<unknown>`.
- `test/unit/auth-guards.coverage.spec.ts`:40:7 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe construction of an `any` typed value.
- `test/unit/backup-external-upload.spec.ts`:7:16 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/chat03-bullmq-retention.spec.ts`:73:12 — erro, `@typescript-eslint/unbound-method`: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object. Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value.  If a function does not access `this`, it can be annotated with `this: void`.
- `test/unit/cliente-area-compatibility.spec.ts`:28:12 — erro, `@typescript-eslint/unbound-method`: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object. Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value.  If a function does not access `this`, it can be annotated with `this: void`.
- `test/unit/cliente-area-compatibility.spec.ts`:37:12 — erro, `@typescript-eslint/unbound-method`: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object. Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value.  If a function does not access `this`, it can be annotated with `this: void`.
- `test/unit/cliente-area-compatibility.spec.ts`:42:12 — erro, `@typescript-eslint/unbound-method`: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object. Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value.  If a function does not access `this`, it can be annotated with `this: void`.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:48:7 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `PrismaService`.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:49:7 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `AutomacoesService`.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:50:7 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `AuditoriaService`.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:51:7 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `TenantValidatorService`.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:61:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:92:7 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `PrismaService`.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:93:7 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `AutomacoesService`.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:94:7 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `AuditoriaService`.
- `test/unit/clientes-pacotes-concurrency.spec.ts`:95:7 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `TenantValidatorService`.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:55:15 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:55:21 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:60:15 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:60:21 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:61:46 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } \\| ArrayLike<unknown>`.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:68:45 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .name on an `any` value.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:90:25 — erro, `no-empty`: Empty block statement.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:106:25 — erro, `no-empty`: Empty block statement.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:123:25 — erro, `no-empty`: Empty block statement.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:134:15 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:142:19 — erro, `no-empty`: Empty block statement.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:145:40 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:146:19 — erro, `no-empty`: Empty block statement.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:149:40 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/infrastructure-expanded.coverage.spec.ts`:150:19 — erro, `no-empty`: Empty block statement.
- `test/unit/meta-whatsapp-worker-flow.spec.ts`:90:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:14:13 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:14:19 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/micro-boost.coverage.spec.ts`:16:41 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } \\| ArrayLike<unknown>`.
- `test/unit/micro-boost.coverage.spec.ts`:19:40 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of a `Function` typed value.
- `test/unit/micro-boost.coverage.spec.ts`:20:19 — erro, `no-empty`: Empty block statement.
- `test/unit/micro-boost.coverage.spec.ts`:32:13 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:32:19 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/micro-boost.coverage.spec.ts`:33:13 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:34:13 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .HttpExceptionFilter on an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:35:23 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } \\| ArrayLike<unknown>`.
- `test/unit/micro-boost.coverage.spec.ts`:38:15 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:38:31 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe construction of an `any` typed value.
- `test/unit/micro-boost.coverage.spec.ts`:40:29 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .catch on an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:54:13 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/micro-boost.coverage.spec.ts`:54:22 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .catch on an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:77:15 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/micro-boost.coverage.spec.ts`:77:21 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/micro-boost.coverage.spec.ts`:79:43 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } \\| ArrayLike<unknown>`.
- `test/unit/micro-boost.coverage.spec.ts`:83:17 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of a `Function` typed value.
- `test/unit/micro-boost.coverage.spec.ts`:85:21 — erro, `no-empty`: Empty block statement.
- `test/unit/micro-boost.coverage.spec.ts`:88:42 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of a `Function` typed value.
- `test/unit/micro-boost.coverage.spec.ts`:89:21 — erro, `no-empty`: Empty block statement.
- `test/unit/micro-boost.coverage.spec.ts`:92:42 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of a `Function` typed value.
- `test/unit/micro-boost.coverage.spec.ts`:93:21 — erro, `no-empty`: Empty block statement.
- `test/unit/queue-utils.spec.ts`:3:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queue-utils.spec.ts`:3:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/queue-utils.spec.ts`:7:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/queue-utils.spec.ts`:11:19 — erro, `@typescript-eslint/no-unused-vars`: 'name' is assigned a value but never used.
- `test/unit/queue-utils.spec.ts`:11:47 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/queue-utils.spec.ts`:16:19 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queue-utils.spec.ts`:16:29 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/queue-utils.spec.ts`:29:21 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queue-utils.spec.ts`:29:31 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/queue-utils.spec.ts`:51:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queue-utils.spec.ts`:51:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/queue-utils.spec.ts`:55:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/queue-utils.spec.ts`:59:19 — erro, `@typescript-eslint/no-unused-vars`: 'name' is assigned a value but never used.
- `test/unit/queue-utils.spec.ts`:59:47 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/queue-utils.spec.ts`:64:19 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queue-utils.spec.ts`:64:29 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/queue-utils.spec.ts`:70:21 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queue-utils.spec.ts`:70:31 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/queues-utils.coverage.spec.ts`:3:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queues-utils.coverage.spec.ts`:3:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/queues-utils.coverage.spec.ts`:7:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/queues-utils.coverage.spec.ts`:11:46 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/queues-utils.coverage.spec.ts`:16:19 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queues-utils.coverage.spec.ts`:16:29 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/queues-utils.coverage.spec.ts`:27:21 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queues-utils.coverage.spec.ts`:27:31 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/queues-utils.coverage.spec.ts`:47:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queues-utils.coverage.spec.ts`:47:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/queues-utils.coverage.spec.ts`:51:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/queues-utils.coverage.spec.ts`:55:46 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/queues-utils.coverage.spec.ts`:60:19 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queues-utils.coverage.spec.ts`:60:29 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/queues-utils.coverage.spec.ts`:66:21 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/queues-utils.coverage.spec.ts`:66:31 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/s3-storage.service.spec.ts`:16:67 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/s3-storage.service.spec.ts`:17:64 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/s3-storage.service.spec.ts`:18:65 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/s3-storage.service.spec.ts`:19:64 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/s3-storage.service.spec.ts`:167:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/s3-storage.service.spec.ts`:191:29 — erro, `@typescript-eslint/no-unsafe-return`: Unsafe return of a value of type error.
- `test/unit/s3-storage.service.spec.ts`:202:29 — erro, `@typescript-eslint/no-unsafe-return`: Unsafe return of a value of type error.
- `test/unit/tenant-services.coverage.spec.ts`:3:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/tenant-services.coverage.spec.ts`:3:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/tenant-services.coverage.spec.ts`:5:24 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/tenant-services.coverage.spec.ts`:9:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/tenant-services.coverage.spec.ts`:9:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/tenant-services.coverage.spec.ts`:12:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/tenant-services.coverage.spec.ts`:13:11 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .TenantValidatorService on an `any` value.
- `test/unit/tenant-services.coverage.spec.ts`:14:21 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } \\| ArrayLike<unknown>`.
- `test/unit/tenant-services.coverage.spec.ts`:34:7 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe construction of an `any` typed value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:2:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:2:15 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/usuario-role-policy.coverage.spec.ts`:4:64 — erro, `@typescript-eslint/no-unsafe-function-type`: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- `test/unit/usuario-role-policy.coverage.spec.ts`:5:37 — erro, `@typescript-eslint/no-unsafe-function-type`: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- `test/unit/usuario-role-policy.coverage.spec.ts`:7:62 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/usuario-role-policy.coverage.spec.ts`:11:24 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- `test/unit/usuario-role-policy.coverage.spec.ts`:16:28 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access [staticName] on an `any` value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:17:28 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- `test/unit/usuario-role-policy.coverage.spec.ts`:19:15 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:19:21 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access [staticName] on an `any` value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:25:17 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:25:28 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe construction of an `any` typed value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:32:33 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access [methodName] on an `any` value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:33:30 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- `test/unit/usuario-role-policy.coverage.spec.ts`:35:17 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:35:26 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access [methodName] on an `any` value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:45:59 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/usuario-role-policy.coverage.spec.ts`:47:28 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- `test/unit/usuario-role-policy.coverage.spec.ts`:53:36 — erro, `@typescript-eslint/no-unsafe-function-type`: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- `test/unit/usuario-role-policy.coverage.spec.ts`:64:24 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/usuario-role-policy.coverage.spec.ts`:71:7 — erro, `@typescript-eslint/await-thenable`: Unexpected `await` of a non-Promise (non-"Thenable") value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:94:19 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/usuario-role-policy.coverage.spec.ts`:94:28 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of a `Function` typed value.
- `test/unit/usuario-role-policy.spec.ts`:2:9 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:2:15 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/usuario-role-policy.spec.ts`:4:66 — erro, `@typescript-eslint/no-unsafe-function-type`: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- `test/unit/usuario-role-policy.spec.ts`:5:35 — erro, `@typescript-eslint/no-unsafe-function-type`: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- `test/unit/usuario-role-policy.spec.ts`:7:62 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/usuario-role-policy.spec.ts`:12:22 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- `test/unit/usuario-role-policy.spec.ts`:18:17 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:18:37 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access [staticName] on an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:21:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- `test/unit/usuario-role-policy.spec.ts`:23:15 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/usuario-role-policy.spec.ts`:23:27 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .bind on an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:30:17 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:30:28 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe construction of an `any` typed value.
- `test/unit/usuario-role-policy.spec.ts`:37:19 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:37:37 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access [methodName] on an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:40:28 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- `test/unit/usuario-role-policy.spec.ts`:42:17 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/usuario-role-policy.spec.ts`:42:24 — erro, `@typescript-eslint/no-unsafe-member-access`: Unsafe member access .bind on an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:52:59 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/usuario-role-policy.spec.ts`:54:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`.
- `test/unit/usuario-role-policy.spec.ts`:60:36 — erro, `@typescript-eslint/no-unsafe-function-type`: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- `test/unit/usuario-role-policy.spec.ts`:69:32 — erro, `@typescript-eslint/no-unsafe-function-type`: The `Function` type accepts any function-like value. Prefer explicitly defining any function parameters and return type.
- `test/unit/usuario-role-policy.spec.ts`:97:15 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/usuario-role-policy.spec.ts`:97:24 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of a `Function` typed value.
- `test/unit/usuario-role-policy.spec.ts`:112:24 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/usuario-role-policy.spec.ts`:131:7 — erro, `@typescript-eslint/await-thenable`: Unexpected `await` of a non-Promise (non-"Thenable") value.
- `test/unit/utils.coverage.spec.ts`:3:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/utils.coverage.spec.ts`:3:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/utils.coverage.spec.ts`:7:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/utils.coverage.spec.ts`:11:19 — erro, `@typescript-eslint/no-unused-vars`: 'name' is assigned a value but never used.
- `test/unit/utils.coverage.spec.ts`:11:50 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/utils.coverage.spec.ts`:16:14 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/utils.coverage.spec.ts`:19:16 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/utils.coverage.spec.ts`:22:18 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/utils.coverage.spec.ts`:34:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/utils.coverage.spec.ts`:34:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/utils.coverage.spec.ts`:38:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/utils.coverage.spec.ts`:42:46 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/utils.coverage.spec.ts`:47:14 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/utils.coverage.spec.ts`:50:16 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/utils.coverage.spec.ts`:61:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/utils.coverage.spec.ts`:61:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/utils.coverage.spec.ts`:65:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/utils.coverage.spec.ts`:69:46 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/utils.coverage.spec.ts`:74:19 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/utils.coverage.spec.ts`:74:29 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/utils.coverage.spec.ts`:92:11 — erro, `@typescript-eslint/no-unsafe-assignment`: Unsafe assignment of an `any` value.
- `test/unit/utils.coverage.spec.ts`:92:17 — erro, `@typescript-eslint/no-require-imports`: A `require()` style import is forbidden.
- `test/unit/utils.coverage.spec.ts`:96:26 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `{}`.
- `test/unit/utils.coverage.spec.ts`:100:46 — aviso, `@typescript-eslint/no-unsafe-argument`: Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> \\| { [s: string]: unknown; }`.
- `test/unit/utils.coverage.spec.ts`:105:14 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.
- `test/unit/utils.coverage.spec.ts`:110:16 — erro, `@typescript-eslint/no-unsafe-call`: Unsafe call of an `any` typed value.

## Arquivos sem problemas

- ``test/app.e2e-spec.ts``
- ``test/e2e/uploads-strict-roundtrip.e2e-spec.ts``
- ``test/e2e/whatsapp-queue-demo.e2e-spec.ts``
- ``test/env-test.guard.ts``
- ``test/helpers/prisma.helper.ts``
- ``test/helpers/queue.helper.ts``
- ``test/helpers/upload.helper.ts``
- ``test/integration/r2-storage.live.spec.ts``
- ``test/jest-e2e.setup.ts``
- ``test/seeds/test-seed.ts``
- ``test/setup-e2e.ts``
- ``test/unit/agendamentos-options.spec.ts``
- ``test/unit/agendamentos-query.dto.spec.ts``
- ``test/unit/chat03-retention-runtime.spec.ts``
- ``test/unit/chat36-backup.coverage.spec.ts``
- ``test/unit/chat36-lgpd.coverage.spec.ts``
- ``test/unit/controllers-expanded.coverage.spec.ts``
- ``test/unit/coverage-under-70-branch-matrix.generated.spec.ts``
- ``test/unit/coverage-under-70-final-target.generated.spec.ts``
- ``test/unit/coverage-under-70-targeted.generated.spec.ts``
- ``test/unit/env-validation-cors.spec.ts``
- ``test/unit/env-validation-required.spec.ts``
- ``test/unit/financeiro-list-movimentacoes-query.dto.spec.ts``
- ``test/unit/helpers/coverage-smoke.helper.ts``
- ``test/unit/meta-whatsapp-cloud-provider-retry.spec.ts``
- ``test/unit/meta-whatsapp-cloud.provider.spec.ts``
- ``test/unit/modules-services-expanded.coverage.spec.ts``
- ``test/unit/modules/usuarios/usuarios-role-filter.spec.ts``
- ``test/unit/sanity.spec.ts``
- ``test/unit/services-critical.coverage.spec.ts``
- ``test/unit/storage-roundtrip.spec.ts``
- ``test/unit/tenant-validator.spec.ts``

## Próximo arquivo recomendado

`test/helpers/auth.helper.ts` — 26 erro(s), 3 aviso(s); selecionado pelo maior número de erros atuais.

## Integridade da execução

- Nenhum arquivo de código foi alterado; nenhum ``--fix`` foi executado.

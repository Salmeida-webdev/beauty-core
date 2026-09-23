### Git baseline branch
- Diretorio: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- Comando: `npm -C C:UserscmtedDesktopPlataformas SaasBeauty-Core symbolic-ref --short -q HEAD`
- Exit code: 0
- Ultimas linhas da saida:
  - main

### Git baseline HEAD
- Diretorio: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- Comando: `npm -C C:UserscmtedDesktopPlataformas SaasBeauty-Core rev-parse --short HEAD`
- Exit code: 0
- Ultimas linhas da saida:
  - 7da9794

### Git baseline status
- Diretorio: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- Comando: `npm -C C:UserscmtedDesktopPlataformas SaasBeauty-Core status --porcelainv1`
- Exit code: 0
- Ultimas linhas da saida:
  -  M beauty-core-backend/[sensitive data omitted]
  -  M beauty-core-backend/package-lock.json
  -  M beauty-core-backend/package.json
  -  M beauty-core-backend/prisma/schema.prisma
  -  M beauty-core-backend/src/backup/backup.service.ts
  -  M beauty-core-backend/src/modules/arquivos/arquivos.module.ts
  -  M beauty-core-backend/src/modules/arquivos/storage/storage.factory.ts
  -  M beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
  -  M beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
  -  M beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
  -  M beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
  -  M beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts
  - ?? beauty-core-backend/docs/chat-a-bloco00-baseline-20260911-190953.md
  - ?? beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-191539.md
  - ?? beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-192225.md
  - ?? beauty-core-backend/docs/chat-a-meta/
  - ?? beauty-core-backend/docs/chat-a-storage/
  - ?? beauty-core-backend/docs/chat-b-baseline/
  - ?? beauty-core-backend/docs/chat-b-storage-backup/
  - ?? beauty-core-backend/docs/chat-b-whatsapp/
  - ?? beauty-core-backend/docs/chat-b/
  - ?? beauty-core-backend/docs/meta-whatsapp/
  - ?? beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
  - ?? beauty-core-backend/scripts/backup/backup-external-upload.js
  - ?? beauty-core-backend/scripts/backup/backup-external-upload.sh
  - ?? beauty-core-backend/scripts/backup/redis-backup.sh
  - ?? beauty-core-backend/scripts/backup/redis-restore.sh
  - ?? beauty-core-backend/scripts/backup/validate-restore.sh
  - ?? beauty-core-backend/scripts/uploads/uploads-backup.sh
  - ?? beauty-core-backend/scripts/uploads/uploads-restore.sh
  - ?? beauty-core-backend/src/modules/arquivos/storage/providers/s3-storage.service.ts
  - ?? beauty-core-backend/test/integration/
  - ?? beauty-core-backend/test/unit/backup-external-upload.spec.ts
  - ?? beauty-core-backend/test/unit/s3-storage.service.spec.ts
  - ?? beauty-core-ui/public/images/portal/states/source/portal-offline.webp

# Beauty Core - Chat B - B10 - Gates de qualidade

- Inicio: 2026-09-13T11:28:56.5999754-03:00
- Fim: 2026-09-13T11:28:56.8334249-03:00
- Script: B10-v1
- Modo: validacao controlada; o relatorio e o unico artefato criado pelo script.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Escopo

- Executar lint e typecheck quando declarados nos manifestos.
- Executar testes unitarios do backend e frontend quando declarados.
- Registrar exit code e diagnostico resumido, sem expor segredos.
- Nao executar build, E2E, migration, escrita em banco/Redis, workflow, Git mutavel, release ou deploy.

## Baseline

- Branch e HEAD foram consultados antes dos gates.
- Entradas locais observadas: 35

### Backend lint
- Diretorio: `beauty-core-backend`
- Comando: `npm run lint`
- Exit code: 1
- Ultimas linhas da saida:
  -     2:15  error    A `require()` style import is forbidden                                                                                  @typescript-eslint/no-require-imports
  -     4:66  error    The `Function` type accepts any function-like value.
  - Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
  -     5:35  error    The `Function` type accepts any function-like value.
  - Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
  -     7:62  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`           @typescript-eslint/no-unsafe-argument
  -    12:22  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
  -    18:17  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  -    18:37  error    Unsafe member access [staticName] on an `any` value                                                                      @typescript-eslint/no-unsafe-member-access
  -    21:26  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
  -    23:15  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
  -    23:27  error    Unsafe member access .bind on an `any` value                                                                             @typescript-eslint/no-unsafe-member-access
  -    30:17  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  -    30:28  error    Unsafe construction of an `any` typed value                                                                              @typescript-eslint/no-unsafe-call
  -    37:19  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  -    37:37  error    Unsafe member access [methodName] on an `any` value                                                                      @typescript-eslint/no-unsafe-member-access
  -    40:28  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
  -    42:17  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
  -    42:24  error    Unsafe member access .bind on an `any` value                                                                             @typescript-eslint/no-unsafe-member-access
  -    52:59  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`           @typescript-eslint/no-unsafe-argument
  -    54:26  warning  Unsafe argument of type `[string, any]` assigned to a parameter of type `[string, Function]`                             @typescript-eslint/no-unsafe-argument
  -    60:36  error    The `Function` type accepts any function-like value.
  - Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
  -    69:32  error    The `Function` type accepts any function-like value.
  - Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
  -    97:15  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  -    97:24  error    Unsafe call of a `Function` typed value                                                                                  @typescript-eslint/no-unsafe-call
  -   112:24  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                                       @typescript-eslint/no-unsafe-argument
  -   131:7   error    Unexpected `await` of a non-Promise (non-"Thenable") value                                                               @typescript-eslint/await-thenable
  - C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\utils.coverage.spec.ts
  -     3:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  -     3:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  -     7:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  -    11:19  error    'name' is assigned a value but never used                                                                       @typescript-eslint/no-unused-vars
  -    11:50  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  -    16:14  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  -    19:16  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  -    22:18  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  -    34:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  -    34:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  -    38:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  -    42:46  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  -    47:14  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  -    50:16  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  -    61:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  -    61:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  -    65:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  -    69:46  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  -    74:19  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  -    74:29  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  -    92:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  -    92:17  error    A `require()` style import is forbidden                                                                         @typescript-eslint/no-require-imports
  -    96:26  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                              @typescript-eslint/no-unsafe-argument
  -   100:46  warning  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  -   105:14  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  -   110:16  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  - Ô£û 1035 problems (876 errors, 159 warnings)
- Saida limitada as ultimas 60 linhas.

### Backend testes unitarios
- Diretorio: `beauty-core-backend`
- Comando: `npm test -- --runInBand`
- Exit code: 1
- Ultimas linhas da saida:
  - PASS test/unit/storage-roundtrip.spec.ts
  - PASS test/unit/meta-whatsapp-cloud.provider.spec.ts
  - PASS test/unit/meta-whatsapp-cloud-provider-retry.spec.ts
  - PASS test/unit/tenant-validator.spec.ts
  - PASS test/unit/analytics-performance-limits.spec.ts
  - PASS test/unit/utils.coverage.spec.ts
  - PASS test/unit/usuario-role-policy.spec.ts
  - PASS test/unit/tenant-services.coverage.spec.ts
  - PASS test/unit/usuario-role-policy.coverage.spec.ts
  - PASS test/unit/auth-guards.coverage.spec.ts
  - PASS test/unit/env-validation-required.spec.ts
  - PASS test/unit/env-validation-cors.spec.ts
  - PASS test/unit/sanity.spec.ts
  - PASS test/unit/queues-utils.coverage.spec.ts
  - PASS test/unit/queue-utils.spec.ts
  - System.Management.Automation.RemoteException
  - Summary of all failing tests
  - FAIL test/unit/chat36-backup.coverage.spec.ts
  -   ÔùÅ Chat 36 Backup Coverage ÔÇ║ deve executar script real de postgres quando BACKUP_EXECUTION_ENABLED=true
  - System.Management.Automation.RemoteException
  -     expect(received).toHaveLength(expected)
  - System.Management.Automation.RemoteException
  -     Expected length: 1
  -     Received length: 2
  -     Received array:  [{"output": "Backup PostgreSQL concluido", "script": "scripts/backup/postgres-backup.sh", "status": "SUCESSO"}, {"output": "Backup PostgreSQL concluido", "script": "scripts/backup/backup-external-upload.sh", "status": "SUCESSO"}]
  - System.Management.Automation.RemoteException
  -     [0m [90m 72 |[39m     expect(result[33m.[39mstatus)[33m.[39mtoBe([32m'SUCESSO'[39m)[33m;[39m
  -      [90m 73 |[39m     expect(result[33m.[39mexecutionEnabled)[33m.[39mtoBe([36mtrue[39m)[33m;[39m
  -     [31m[1m>[22m[39m[90m 74 |[39m     expect(result[33m.[39mresults)[33m.[39mtoHaveLength([35m1[39m)[33m;[39m
  -      [90m    |[39m                            [31m[1m^[22m[39m
  -      [90m 75 |[39m     expect(result[33m.[39mresults[[35m0[39m][33m.[39mscript)[33m.[39mtoBe([32m'scripts/backup/postgres-backup.sh'[39m)[33m;[39m
  -      [90m 76 |[39m     expect(execFileSync)[33m.[39mtoHaveBeenCalledTimes([35m1[39m)[33m;[39m
  -      [90m 77 |[39m   })[33m;[39m[0m
  - System.Management.Automation.RemoteException
  -       at Object.<anonymous> (test/unit/chat36-backup.coverage.spec.ts:74:28)
  - System.Management.Automation.RemoteException
  -   ÔùÅ Chat 36 Backup Coverage ÔÇ║ deve executar scripts reais de backup completo quando habilitado
  - System.Management.Automation.RemoteException
  -     expect(received).toHaveLength(expected)
  - System.Management.Automation.RemoteException
  -     Expected length: 3
  -     Received length: 4
  -     Received array:  [{"output": "OK", "script": "scripts/backup/postgres-backup.sh", "status": "SUCESSO"}, {"output": "OK", "script": "scripts/uploads/uploads-backup.sh", "status": "SUCESSO"}, {"output": "OK", "script": "scripts/backup/redis-backup.sh", "status": "SUCESSO"}, {"output": "OK", "script": "scripts/backup/backup-external-upload.sh", "status": "SUCESSO"}]
  - System.Management.Automation.RemoteException
  -     [0m [90m 84 |[39m
  -      [90m 85 |[39m     expect(result[33m.[39mstatus)[33m.[39mtoBe([32m'SUCESSO'[39m)[33m;[39m
  -     [31m[1m>[22m[39m[90m 86 |[39m     expect(result[33m.[39mresults)[33m.[39mtoHaveLength([35m3[39m)[33m;[39m
  -      [90m    |[39m                            [31m[1m^[22m[39m
  -      [90m 87 |[39m     expect([33mJSON[39m[33m.[39mstringify(result))[33m.[39mtoContain(
  -      [90m 88 |[39m       [32m'scripts/backup/postgres-backup.sh'[39m[33m,[39m
  -      [90m 89 |[39m     )[33m;[39m[0m
  - System.Management.Automation.RemoteException
  -       at Object.<anonymous> (test/unit/chat36-backup.coverage.spec.ts:86:28)
  - System.Management.Automation.RemoteException
  - System.Management.Automation.RemoteException
  - Test Suites: 1 failed, 37 passed, 38 total
  - Tests:       2 failed, 1496 passed, 1498 total
  - Snapshots:   0 total
  - Time:        54.255 s
  - Ran all test suites.
- Saida limitada as ultimas 60 linhas.

### Frontend lint
- Diretorio: `beauty-core-ui`
- Comando: `npm run lint`
- Exit code: 0
- Ultimas linhas da saida:
  - > beauty-core-ui@0.1.0 lint
  - > eslint --max-warnings=0

### Frontend typecheck
- Diretorio: `beauty-core-ui`
- Comando: `npm run typecheck`
- Exit code: 0
- Ultimas linhas da saida:
  - > beauty-core-ui@0.1.0 typecheck
  - > tsc --noEmit

### Frontend testes unitarios
- Diretorio: `beauty-core-ui`
- Comando: `npm test -- --run`
- Exit code: 0
- Ultimas linhas da saida:
  -  [32mÔ£ô[39m src/features/portal/query/portal-client-query-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/configuracoes/utils/configuracoes-logo.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 17[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/forms/comissao-payload.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 35[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/arquivos/utils/arquivos-query-access.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 19[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/utils/dashboard-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 13[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/forms/categoria-financeira-payload.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/configuracoes/utils/tenant-runtime-branding.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/permissions/financeiro-permissions.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 33[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/arquivos/utils/arquivos-action-error.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 15[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/clientes/permissions/clientes-permissions.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/profissionais/utils/profissionais-list-url.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/auth/navigation/admin-login-navigation-state.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 14[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/utils/relatorios-financeiros-periodo.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/portal/query/portal-dashboard-query-options.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 14[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/pacotes/permissions/pacotes-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/forms/movimentacao-financeira-payload.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 21[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/queries/dashboard-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 20[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/utils/dashboard-chart-data.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 13[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/utils/financeiro-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 13[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/services/financeiro-api.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 19[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/portal/components/portal-service-worker.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 16[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 13[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/profissionais/profissionais-navigation.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 11[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/pacotes/queries/pacotes-query-keys.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 17[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/agendamentos/agendamentos-navigation.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 34[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/queries/categorias-financeiras-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 15[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/fidelidade/utils/fidelidade-formatters.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 16[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/permissions/dashboard-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 11[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/servicos/forms/servico-payload.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 15[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/pacotes/utils/pacotes-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 11[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/portal/security/portal-security-audit.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/financeiro-navigation.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 11[2mms[22m[39m
  -  [32mÔ£ô[39m src/services/auth/access-events.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 14[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/queries/dashboard-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 32[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/unidades/forms/unidade-payload.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/utils/movimentacao-financeira-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 11[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/agendamentos/queries/agendamentos-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/utils/dashboard-distributions.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 13[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/servicos/utils/servicos-formatters.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/utils/movimentacoes-pagination.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/arquivos/utils/arquivo-relations.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 16[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/clientes/queries/cliente-profile-keys.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 16[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/unidades/utils/unidades-formatters.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 13[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/profissionais/utils/profissionais-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/portal/states/portal-performance-audit.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/permissions/financeiro-module-access.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/fidelidade/utils/fidelidade-historico-formatters.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/utils/dashboard-error-reference.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 22[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/utils/dashboard-period-url.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/dashboard/utils/dashboard-summary.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 11[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/chat56/admin-sessions-query-gating.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 5[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/arquivos/utils/arquivo-tipo.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 5[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/financeiro/utils/comissao-actions.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
  -  [32mÔ£ô[39m src/features/portal/query/portal-messages-query.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 4[2mms[22m[39m
  - [2m Test Files [22m [1m[32m310 passed[39m[22m[90m (310)[39m
  - [2m      Tests [22m [1m[32m1393 passed[39m[22m[90m (1393)[39m
  - [2m   Start at [22m 11:31:40
  - [2m   Duration [22m 232.55s[2m (transform 16.59s, setup 97.61s, import 288.81s, tests 67.56s, environment 1009.68s)[22m
- Saida limitada as ultimas 60 linhas.

## Resumo dos gates

| Gate | Exit code | Resultado |
|---|---:|---|
| Backend lint | 1 | FAIL ou indisponivel |
| Backend testes unitarios | 1 | FAIL ou indisponivel |
| Frontend lint | 0 | PASS |
| Frontend typecheck | 0 | PASS |
| Frontend testes unitarios | 0 | PASS |

- ATENCAO: 2 gate(s) retornaram exit code diferente de zero ou ficaram indisponiveis.
- Nenhuma correcao automatica foi aplicada; os arquivos afetados devem ser definidos a partir da saida acima.

## Operacoes nao executadas

- Build backend/frontend: nao executado neste bloco.
- E2E de navegador: nao executado neste bloco.
- Migration ou escrita em PostgreSQL/Redis: nao executada.
- Workflow CI/CD: nao iniciado.
- Stage/commit/push/merge/tag/release/deploy: nao executados.
- Segredos e valores de ambiente: nao lidos nem impressos.

## Classificacao final do B10

- `PASS_WITH_ATTENTION` - gates executados e falhas registradas; a proxima etapa deve corrigir somente os problemas confirmados.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B10.
- O script nao corrige arquivos e nao altera o historico Git.
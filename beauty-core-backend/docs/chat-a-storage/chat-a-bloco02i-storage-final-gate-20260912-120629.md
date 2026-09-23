# Beauty Core - Chat A - Bloco 02I - Gate final do storage R2

- **Status:** EM EXECUCAO
- **Inicio:** 2026-09-12T12:06:29.3638148-03:00
- **Projeto:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`

## Diagnostico

Este bloco consolida a validacao unitaria, o round-trip real no R2 e o fluxo HTTP E2E com STORAGE_PROVIDER=S3.

## Escopo preservado

- Nenhum arquivo de codigo sera alterado por este bloco.
- O .env local sera apenas lido; a chave secreta nao sera solicitada, exibida ou gravada no relatorio.
- O teste somente sera executado com DATABASE_URL_TEST configurada; nenhum banco de desenvolvimento sera usado como fallback.
- Nenhuma migration, stage, commit, push, merge, tag, release ou deploy sera executado.

## Preflight

- **PASS** - Backend encontrado.
- **PASS** - .env local encontrado e ignorado pelo Git.
- **PASS** - Testes unitario, live R2 e E2E HTTP encontrados.
- **PASS** - Credenciais carregadas do .env sem exibicao.
- **PASS** - Executaveis git e node encontrados.
- **PASS** - CLIs locais do Jest e Nest encontrados.
- **PASS** - DATABASE_URL_TEST encontrada sem exibicao.

## Comandos e resultados

### Teste unitario do provider S3
ExitCode: 0
```text
Comando: node node_modules/jest/bin/jest.js --config ./jest.config.js --runInBand --testMatch <rootDir>/test/unit/**/*.spec.ts --runTestsByPath test/unit/s3-storage.service.spec.ts
PASS test/unit/s3-storage.service.spec.ts

  S3StorageService

    ÔêÜ faz upload privado com chave por empresa, checksum, MIME e tamanho (7 ms)

    ÔêÜ faz download e delete usando a chave privada normalizada (3 ms)

    ÔêÜ diferencia objeto existente, inexistente e erro de bucket (7 ms)

    ÔêÜ rejeita chaves inseguras antes de chamar o bucket (24 ms)

    ÔêÜ gera URL assinada da aplicacao com empresa, arquivo e expiracao limitada (3 ms)

    ÔêÜ falha de forma fechada quando faltam bucket ou segredo de assinatura (2 ms)

System.Management.Automation.RemoteException

Test Suites: 1 passed, 1 total

Tests:       6 passed, 6 total

Snapshots:   0 total

Time:        1.156 s

Ran all test suites within paths "test/unit/s3-storage.service.spec.ts".
```

### Round-trip real no Cloudflare R2
ExitCode: 0
```text
Comando: node node_modules/jest/bin/jest.js --config ./jest.config.js --runInBand --testMatch <rootDir>/test/integration/**/*.spec.ts --runTestsByPath test/integration/r2-storage.live.spec.ts
PASS test/integration/r2-storage.live.spec.ts

  Cloudflare R2 live integration

    ÔêÜ faz round-trip real com checksum, isolamento de chave e limpeza (2065 ms)

System.Management.Automation.RemoteException

Test Suites: 1 passed, 1 total

Tests:       1 passed, 1 total

Snapshots:   0 total

Time:        2.917 s, estimated 3 s

Ran all test suites within paths "test/integration/r2-storage.live.spec.ts".
```

### Teste E2E HTTP de upload/download protegido com R2
ExitCode: 0
```text
Comando: node node_modules/jest/bin/jest.js --config ./test/jest-e2e.js --runInBand --testMatch <rootDir>/test/e2e/**/*.e2e-spec.ts --runTestsByPath test/e2e/uploads-strict-roundtrip.e2e-spec.ts
[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[NestFactory] [39m[32mStarting Nest application...[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mPrismaModule dependencies initialized[39m[38;5;3m +68ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mRequestContextModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mPassportModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mConfigHostModule dependencies initialized[39m[38;5;3m +6ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mThrottlerModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mDiscoveryModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mStructuredLoggerModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mSessoesModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mTenantModule dependencies initialized[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mConfigModule dependencies initialized[39m[38;5;3m +33ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mScheduleModule dependencies initialized[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mTenantPublicoModule dependencies initialized[39m[38;5;3m +2ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mJwtModule dependencies initialized[39m[38;5;3m +5ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mJwtModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mAppModule dependencies initialized[39m[38;5;3m +5ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mLgpdModule dependencies initialized[39m[38;5;3m +4ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mMetricsModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mAuditoriaModule dependencies initialized[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mEmpresasModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mCategoriasFinanceirasModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mUsuariosModule dependencies initialized[39m[38;5;3m +4ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mNotificacoesModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mConfiguracoesNotificacaoModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mServicosModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mUnidadesModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mCuponsModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mBeneficiosModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mNiveisFidelidadeModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mConfiguracaoFidelidadeModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mConfiguracaoWhatsappModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mTemplatesWhatsappModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mAnalyticsModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mBackupModule dependencies initialized[39m[38;5;3m +9ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mCampanhasWhatsappModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mArquivosModule dependencies initialized[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mMensagensWhatsappModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mAutomacoesModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mAuthModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mAuthClienteModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mQueuesModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mFidelidadeModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mSchedulerModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mClientesModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mAgendamentosModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mPacotesModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mClientesPacotesModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mFinanceiroModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mComissoesModule dependencies initialized[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mHealthModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mClienteAreaModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[InstanceLoader] [39m[32mAreaClienteModule dependencies initialized[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mLgpdController {/lgpd}:[39m[38;5;3m +14ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/lgpd/exportar-cliente/:clienteId, GET} route[39m[38;5;3m +3ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/lgpd/anonimizar-cliente/:clienteId, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mMetricsController {/}:[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/metrics, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mHealthController {/health}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/health, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/health/database, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/health/redis, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/health/summary, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/health/queues, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mEnterpriseHealthController {/health}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/health/live, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/health/ready, GET} route[39m[38;5;3m +2ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/health/full, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthController {/auth}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth/login, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth/refresh, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth/logout, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth/logout-all, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth/sessoes, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth/sessoes/:sessaoId, DELETE} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth/me, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuditoriaController {/auditoria}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auditoria, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auditoria/recurso/:recurso/:recursoId, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auditoria/usuario/:usuarioId, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auditoria/cliente/:clienteId, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auditoria/modulo/:modulo, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auditoria/acao/:acao, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auditoria/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mEmpresasController {/empresas}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/empresas, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/empresas, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/empresas/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/empresas/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/empresas/:id, DELETE} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mUsuariosController {/usuarios}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/usuarios, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/usuarios, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/usuarios/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/usuarios/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/usuarios/:id/inativar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mClientesController {/clientes}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes/:id/inativar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAutomacoesController {/[REDACTED]macoes}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/[REDACTED]macoes/eventos, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/[REDACTED]macoes/teste-aniversario, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/[REDACTED]macoes/teste-relatorio, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/[REDACTED]macoes/eventos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mNotificacoesController {/notificacoes}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/notificacoes, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/notificacoes, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/notificacoes/nao-lidas, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/notificacoes/resumo, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/notificacoes/:id, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/notificacoes/:id/arquivar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/notificacoes/:id, DELETE} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mConfiguracoesNotificacaoController {/configuracoes-notificacao}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracoes-notificacao, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracoes-notificacao, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracoes-notificacao, PATCH} route[39m[38;5;3m +11ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mServicosController {/servicos}:[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/servicos, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/servicos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/servicos/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/servicos/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/servicos/:id/inativar, PATCH} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mUnidadesController {/unidades}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/unidades, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/unidades, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/unidades/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/unidades/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/unidades/:id/inativar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAgendamentosController {/agendamentos}:[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/agendamentos, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/agendamentos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/agendamentos/opcoes/profissionais, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/agendamentos/opcoes/unidades, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/agendamentos/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/agendamentos/:id, PATCH} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/agendamentos/:id/cancelar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mFidelidadeController {/fidelidade}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/fidelidade, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/fidelidade/cliente/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/fidelidade/adicionar-pontos, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/fidelidade/resgatar-pontos, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/fidelidade/historico/:clienteId, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/fidelidade/pontuar-por-valor, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/fidelidade/beneficio-disponivel/:clienteId, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/fidelidade/nivel-atual/:clienteId, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mCuponsController {/cupons}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cupons, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cupons, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cupons/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cupons/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cupons/:id/inativar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cupons/validar, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mBeneficiosController {/beneficios}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/beneficios, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/beneficios, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/beneficios/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/beneficios/:id, PATCH} route[39m[38;5;3m +2ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/beneficios/:id/inativar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mNiveisFidelidadeController {/niveis-fidelidade}:[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/niveis-fidelidade, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/niveis-fidelidade, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/niveis-fidelidade/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/niveis-fidelidade/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/niveis-fidelidade/:id, DELETE} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mConfiguracaoFidelidadeController {/configuracao-fidelidade}:[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracao-fidelidade, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracao-fidelidade, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracao-fidelidade, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mPacotesController {/pacotes}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/pacotes, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/pacotes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/pacotes/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/pacotes/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/pacotes/:id/inativar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mClientesPacotesController {/clientes-pacotes}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes-pacotes, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes-pacotes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes-pacotes/cliente/:clienteId, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes-pacotes/:id/usar-sessao, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/clientes-pacotes/:id/cancelar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mCategoriasFinanceirasController {/categorias-financeiras}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/categorias-financeiras, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/categorias-financeiras, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/categorias-financeiras/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/categorias-financeiras/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/categorias-financeiras/:id/inativar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mFinanceiroController {/financeiro}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro/resumo, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro/fluxo-caixa, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro/receitas-mes, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro/despesas-mes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro/:id/cancelar, PATCH} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/financeiro/:id/pagar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mComissoesController {/comissoes}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/comissoes, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/comissoes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/comissoes/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/comissoes/:id/pagar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mConfiguracaoWhatsappController {/configuracao-whatsapp}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracao-whatsapp, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracao-whatsapp, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracao-whatsapp, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/configuracao-whatsapp/link, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mTemplatesWhatsappController {/templates-whatsapp}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/templates-whatsapp, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/templates-whatsapp, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/templates-whatsapp/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/templates-whatsapp/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/templates-whatsapp/:id/inativar, PATCH} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mMensagensWhatsappController {/mensagens-whatsapp}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/mensagens-whatsapp, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/mensagens-whatsapp/enviar, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/mensagens-whatsapp, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/mensagens-whatsapp/:id, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/mensagens-whatsapp/:id/cancelar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mMetaWhatsappWebhookController {/webhooks/meta/whatsapp}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/webhooks/meta/whatsapp, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/webhooks/meta/whatsapp, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mCampanhasWhatsappController {/campanhas-whatsapp}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/campanhas-whatsapp, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/campanhas-whatsapp, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/campanhas-whatsapp/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/campanhas-whatsapp/:id, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/campanhas-whatsapp/:id/cancelar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mQueuesController {/queues}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/queues/status, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/queues/metrics, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/queues/dlq, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/queues/dlq/:jobId/reprocessar, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAnalyticsController {/analytics}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/dashboard, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/clientes, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/agendamentos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/financeiro, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/servicos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/profissionais, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/unidades, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/fidelidade, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/pacotes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/whatsapp, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/notificacoes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/analytics/eventos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mArquivosController {/arquivos}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/logo, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/clientes/:clienteId/foto, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/usuarios/:usuarioId/foto, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/profissionais/:usuarioId/foto, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/servicos/:servicoId/imagem, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/galeria, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/galeria, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/documentos, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/tipo/:tipo, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id, DELETE} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/private/documentos, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mArquivosDownloadController {/arquivos}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/signed/:token, GET} route[39m[38;5;3m +12ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id/download, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id/signed-url, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAreaClienteController {/area-cliente}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/perfil, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/perfil, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/proximos-agendamentos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/ultimo-agendamento, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos/:id/reagendar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos/:id/cancelar, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/fidelidade, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pontos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/beneficios, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/documentos/:id/signed-url, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/documentos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes/:pacoteId/usar-sessao, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes/:pacoteId, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes/nao-lidas, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/mensagens-whatsapp/enviar, POST} route[39m[38;5;3m +19ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/mensagens-whatsapp, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/dashboard, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/historico, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mClienteAreaController {/cliente-area}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/dashboard, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/agendamentos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/proximos-agendamentos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/ultimo-agendamento, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/fidelidade, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pontos, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/beneficios, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pacotes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pacotes/:pacoteId, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes/nao-lidas, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/mensagens-whatsapp, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/historico, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthClienteController {/auth-cliente}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/solicitar-codigo, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/verificar-codigo, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/refresh, POST} route[39m[38;5;3m +15ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/logout, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/logout-all, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/sessoes, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/me, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/aceitar-termos, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthClientePublicoController {/public/:slug/auth-cliente}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/:slug/auth-cliente/solicitar-codigo, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/:slug/auth-cliente/verificar-codigo, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mTenantPublicoController {/tenant-publico}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/slug/:slug, GET} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/dominio, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/resolver, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mPublicTenantController {/public/tenant}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/tenant/:slug, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mSchedulerController {/scheduler}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/status, GET} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/aniversarios, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/lembretes, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/pacotes-vencidos, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/campanhas, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/relatorios, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/limpeza-sessoes, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mBackupController {/backup}:[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/status, GET} route[39m[38;5;3m +15ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/postgres, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/uploads, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/completo, POST} route[39m[38;5;3m +0ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/limpeza, POST} route[39m[38;5;3m +1ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:41 [32m    LOG[39m [38;5;3m[NestApplication] [39m[32mNest application successfully started[39m[38;5;3m +211ms[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:42 [32m    LOG[39m [38;5;3m[AuthService] [39m[32m[AUTH] login admin sucesso empresaId=d8130f05-283a-4e80-bf2b-4a9e40d04b53 usuarioId=d8c26779-5652-40ab-8339-36a242b06209 sessaoId=49caa04d-32c7-4225-8c34-bd924ad18c23 status=SUCESSO tempoMs=352[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:42 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=907e3e3a-c127-4c79-a361-96867d65b6bf correlationId=907e3e3a-c127-4c79-a361-96867d65b6bf metodo=POST rota=/auth/login empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=390[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:43 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=9aede6f5-8c6a-4a22-a962-b7eb789ff2b7 correlationId=9aede6f5-8c6a-4a22-a962-b7eb789ff2b7 metodo=POST rota=/arquivos/private/documentos empresaId=d8130f05-283a-4e80-bf2b-4a9e40d04b53 usuarioId=d8c26779-5652-40ab-8339-36a242b06209 clienteId=- status=SUCESSO tempoMs=814[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:43 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=f5f24164-657f-40f6-9fc7-1c9990f1df80 correlationId=f5f24164-657f-40f6-9fc7-1c9990f1df80 metodo=GET rota=/arquivos/d9b7511d-19f9-4634-9acd-6c123df8366d/download empresaId=d8130f05-283a-4e80-bf2b-4a9e40d04b53 usuarioId=d8c26779-5652-40ab-8339-36a242b06209 clienteId=- status=SUCESSO tempoMs=743[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:43 [32m    LOG[39m [38;5;3m[ArquivosService] [39m[32m[ARQUIVOS] arquivo removido empresaId=d8130f05-283a-4e80-bf2b-4a9e40d04b53 arquivoId=d9b7511d-19f9-4634-9acd-6c123df8366d status=SUCESSO tempoMs=28[39m

[32m[Nest] 18620  - [39m12/09/2026, 12:06:43 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=f46b6a6d-695a-45b2-af48-862c086d29dc correlationId=f46b6a6d-695a-45b2-af48-862c086d29dc metodo=DELETE rota=/arquivos/d9b7511d-19f9-4634-9acd-6c123df8366d empresaId=d8130f05-283a-4e80-bf2b-4a9e40d04b53 usuarioId=d8c26779-5652-40ab-8339-36a242b06209 clienteId=- status=SUCESSO tempoMs=39[39m

PASS test/e2e/uploads-strict-roundtrip.e2e-spec.ts (7.946 s)

  Uploads strict HTTP round-trip E2E

    ÔêÜ faz upload, baixa o mesmo conteudo, compara checksum e remove o fixture (1701 ms)

System.Management.Automation.RemoteException

Test Suites: 1 passed, 1 total

Tests:       1 passed, 1 total

Snapshots:   0 total

Time:        8.202 s, estimated 29 s

Ran all test suites within paths "test/e2e/uploads-strict-roundtrip.e2e-spec.ts".
```

### Build do backend com Nest CLI direto
ExitCode: 0
```text
Comando: node node_modules/@nestjs/cli/bin/nest.js build
(sem saida)
```

### Diff check dos arquivos rastreados
ExitCode: 0
```text
Comando: git diff --check -- arquivos do escopo
warning: in the working copy of 'beauty-core-backend/.env.example', LF will be replaced by CRLF the next time Git touches it
```

### Status local preservado
ExitCode: 0
```text
Comando: git status --short --branch
## main...origin/main

 M beauty-core-backend/.env.example

 M beauty-core-backend/package-lock.json

 M beauty-core-backend/package.json

 M beauty-core-backend/prisma/schema.prisma

 M beauty-core-backend/src/modules/arquivos/arquivos.module.ts

 M beauty-core-backend/src/modules/arquivos/storage/storage.factory.ts

 M beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts

 M beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts

 M beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts

 M beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts

?? beauty-core-backend/docs/chat-a-bloco00-baseline-20260911-190953.md

?? beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-191539.md

?? beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-192225.md

?? beauty-core-backend/docs/chat-a-meta/

?? beauty-core-backend/docs/chat-a-storage/

?? beauty-core-backend/docs/meta-whatsapp/

?? beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/

?? beauty-core-backend/src/modules/arquivos/storage/providers/s3-storage.service.ts

?? beauty-core-backend/test/integration/

?? beauty-core-backend/test/unit/s3-storage.service.spec.ts

?? beauty-core-ui/public/images/portal/states/source/portal-offline.webp
```

## Decisao do gate

Status do bloco: PASS
- Nenhuma migration, stage, commit, push, merge, tag, release ou deploy foi executado.
- O .env local nao foi incluido no relatorio e deve permanecer ignorado pelo Git.

- **Termino:** 2026-09-12T12:06:57.4217000-03:00

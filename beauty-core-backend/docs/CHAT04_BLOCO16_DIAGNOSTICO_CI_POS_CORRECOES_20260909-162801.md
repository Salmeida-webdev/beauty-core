# Chat 04 - Bloco 16 - Diagnostico CI pos-correcoes V2
Data da execucao: 2026-09-09 16:28:01 -03:00

Diagnostico somente leitura dos bloqueios E2E Meta e npm audit do Vitest.
## Identidade e preservacao
- Branch: `main`
- HEAD local: `cce9e47c268c79ffd01edbc7502556f5eb413422`
- origin/main: `cce9e47c268c79ffd01edbc7502556f5eb413422`
- Alteracoes preservadas: 274
- Tracked modificados: 258
- Staged: 0
- Untracked: 16
- git diff --check: 0
- git diff --cached --check: 0
## Corpo bruto Meta
- main.ts habilita rawBody: True
- setup-e2e configura rawBody: True
- controller consome request.rawBody: True
### E2E focado Meta WhatsApp
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" run test:e2e -- --runTestsByPath test/e2e/meta-whatsapp-webhook.e2e-spec.ts"`
- Saida limitada as ultimas 100 linhas.
```text
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/servicos/:servicoId/imagem, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/galeria, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/galeria, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/documentos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/tipo/:tipo, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id, DELETE} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/private/documentos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mArquivosDownloadController {/arquivos}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/signed/:token, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id/download, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id/signed-url, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAreaClienteController {/area-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/perfil, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/perfil, PATCH} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/proximos-agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/ultimo-agendamento, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos/:id/reagendar, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos/:id/cancelar, PATCH} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/fidelidade, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pontos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/beneficios, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/documentos/:id/signed-url, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/documentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes/:pacoteId/usar-sessao, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes/:pacoteId, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes/nao-lidas, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/mensagens-whatsapp/enviar, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/mensagens-whatsapp, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/dashboard, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/historico, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mClienteAreaController {/cliente-area}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/dashboard, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/proximos-agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/ultimo-agendamento, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/fidelidade, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pontos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/beneficios, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pacotes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pacotes/:pacoteId, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes/nao-lidas, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/mensagens-whatsapp, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/historico, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthClienteController {/auth-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/solicitar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/verificar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/refresh, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/logout, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/logout-all, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/sessoes, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/me, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/aceitar-termos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthClientePublicoController {/public/:slug/auth-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/:slug/auth-cliente/solicitar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/:slug/auth-cliente/verificar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mTenantPublicoController {/tenant-publico}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/slug/:slug, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/dominio, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/resolver, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mPublicTenantController {/public/tenant}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/tenant/:slug, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mSchedulerController {/scheduler}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/status, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/aniversarios, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/lembretes, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/pacotes-vencidos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/campanhas, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/relatorios, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/limpeza-sessoes, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mBackupController {/backup}:[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/status, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/postgres, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/uploads, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/completo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/limpeza, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[NestApplication] [39m[32mNest application successfully started[39m[38;5;3m +164ms[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=8bf8a0f5-9c0f-492f-997a-390dae708be2 correlationId=8bf8a0f5-9c0f-492f-997a-390dae708be2 metodo=GET rota=/webhooks/meta/whatsapp?hub.mode=subscribe&hub.verify_token=chat03-meta-verify-token&hub.challenge=challenge-123 empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=24[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:34 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=315affe3-8c8e-4c23-be6f-8ba652aaa0e1 correlationId=315affe3-8c8e-4c23-be6f-8ba652aaa0e1 metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=12[39m
[32m[Nest] 8508  - [39m09/09/2026, 16:28:35 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=66f643dd-7bd0-4202-a5b5-e60efd4f7771 correlationId=66f643dd-7bd0-4202-a5b5-e60efd4f7771 metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=144[39m
[31m[Nest] 8508  - [39m09/09/2026, 16:28:34 [31m  ERROR[39m [38;5;3m[AuditLogInterceptor] [39m[31m[HTTP] requestId=3fd6ddd4-1d94-449b-b171-f918db2388bb correlationId=3fd6ddd4-1d94-449b-b171-f918db2388bb metodo=GET rota=/webhooks/meta/whatsapp?hub.mode=subscribe&hub.verify_token=token-incorreto&hub.challenge=challenge-123 empresaId=- usuarioId=- clienteId=- status=FALHA tempoMs=2 erro=Challenge Meta invalido.[39m
[31m[Nest] 8508  - [39m09/09/2026, 16:28:35 [31m  ERROR[39m [38;5;3m[AuditLogInterceptor] [39m[31m[HTTP] requestId=29fdf6d3-a57f-4e45-8bcb-080b85034d73 correlationId=29fdf6d3-a57f-4e45-8bcb-080b85034d73 metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=FALHA tempoMs=1 erro=Assinatura Meta invalida.[39m
PASS test/e2e/meta-whatsapp-webhook.e2e-spec.ts (25.732 s)
  Meta WhatsApp webhook E2E
    ÔêÜ valida challenge GET e rejeita token incorreto (137 ms)
    ÔêÜ valida assinatura, atualiza status e deduplica evento (567 ms)
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        27.043 s
Ran all test suites within paths "test/e2e/meta-whatsapp-webhook.e2e-spec.ts".
```
## Dependencias Vitest
- Vitest declarado: `^4.1.10`
- @vitest/coverage-v8 declarado: `^4.1.10`
### Arvore instalada Vitest
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" ls vitest @vitest/mocker @vitest/coverage-v8 --all --json"`
```text
{
  "version": "0.1.0",
  "name": "beauty-core-ui",
  "dependencies": {
    "@vitest/coverage-v8": {
      "version": "4.1.10",
      "resolved": "https://registry.npmjs.org/@vitest/coverage-v8/-/coverage-v8-4.1.10.tgz",
      "overridden": false,
      "dependencies": {
        "vitest": {
          "version": "4.1.10"
        }
      }
    },
    "vitest": {
      "version": "4.1.10",
      "resolved": "https://registry.npmjs.org/vitest/-/vitest-4.1.10.tgz",
      "overridden": false,
      "dependencies": {
        "@vitest/coverage-v8": {
          "version": "4.1.10"
        },
        "@vitest/mocker": {
          "version": "4.1.10",
          "resolved": "https://registry.npmjs.org/@vitest/mocker/-/mocker-4.1.10.tgz",
          "overridden": false
        }
      }
    }
  }
}
```
### npm audit completo
- Exit code: 1
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" audit --json"`
```text
{
  "auditReportVersion": 2,
  "vulnerabilities": {
    "@vitest/coverage-v8": {
      "name": "@vitest/coverage-v8",
      "severity": "moderate",
      "isDirect": true,
      "via": [
        "vitest"
      ],
      "effects": [
        "vitest"
      ],
      "range": "2.1.0-beta.1 - 4.1.10",
      "nodes": [
        "node_modules/@vitest/coverage-v8"
      ],
      "fixAvailable": true
    },
    "@vitest/mocker": {
      "name": "@vitest/mocker",
      "severity": "moderate",
      "isDirect": false,
      "via": [
        {
          "source": 1193684,
          "name": "@vitest/mocker",
          "dependency": "@vitest/mocker",
          "title": "Vitest: Path Traversal / Arbitrary File Read via @vitest/mocker Redirect Mock",
          "url": "https://github.com/advisories/GHSA-82fw-gwwq-j7x9",
          "severity": "moderate",
          "cwe": [
            "CWE-22"
          ],
          "cvss": {
            "score": 5.9,
            "vectorString": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
          },
          "range": ">=2.1.0 <4.1.11"
        }
      ],
      "effects": [
        "vitest"
      ],
      "range": "2.1.0 - 4.1.10",
      "nodes": [
        "node_modules/@vitest/mocker"
      ],
      "fixAvailable": true
    },
    "vitest": {
      "name": "vitest",
      "severity": "moderate",
      "isDirect": true,
      "via": [
        "@vitest/coverage-v8",
        "@vitest/mocker",
        {
          "source": 1193683,
          "name": "vitest",
          "dependency": "vitest",
          "title": "Vitest: Path Traversal / Arbitrary File Read via @vitest/mocker Redirect Mock",
          "url": "https://github.com/advisories/GHSA-82fw-gwwq-j7x9",
          "severity": "moderate",
          "cwe": [
            "CWE-22"
          ],
          "cvss": {
            "score": 5.9,
            "vectorString": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
          },
          "range": ">=2.1.0 <4.1.11"
        }
      ],
      "effects": [
        "@vitest/coverage-v8"
      ],
      "range": "2.1.0-beta.1 - 4.1.10",
      "nodes": [
        "node_modules/vitest"
      ],
      "fixAvailable": true
    }
  },
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 3,
      "high": 0,
      "critical": 0,
      "total": 3
    },
    "dependencies": {
      "prod": 476,
      "dev": 407,
      "optional": 114,
      "peer": 9,
      "peerOptional": 0,
      "total": 920
    }
  }
}
```
### npm audit --omit=dev
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" audit --omit=dev --json"`
```text
{
  "auditReportVersion": 2,
  "vulnerabilities": {},
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 0,
      "high": 0,
      "critical": 0,
      "total": 0
    },
    "dependencies": {
      "prod": 476,
      "dev": 407,
      "optional": 114,
      "peer": 9,
      "peerOptional": 0,
      "total": 920
    }
  }
}
```
### Versao publicada do Vitest
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" view vitest version"`
```text
5.0.0
```
### Versao publicada de @vitest/mocker
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" view @vitest/mocker version"`
```text
5.0.0
```

## Resultado
- Gate: **NO-GO-CI-CORRECTIONS-PENDING**
- Alteracoes preservadas diferentes de 258: 274
- Arquivos untracked antes do diagnostico: 16
- npm audit completo ainda retorna vulnerabilidades.

Nenhuma alteracao Git, de codigo ou dependencia foi executada.

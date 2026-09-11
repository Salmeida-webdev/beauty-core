# Chat 04 - Bloco 17 - Correcao CI rawBody e Vitest
Data da execucao: 2026-09-09 16:50:00 -03:00

Correcao autorizada somente para os quatro caminhos definidos; alteracoes locais nao autorizadas permanecem preservadas.
## Preflight
- Branch: `main`
- HEAD antes: `cce9e47c268c79ffd01edbc7502556f5eb413422`
- origin/main antes: `cce9e47c268c79ffd01edbc7502556f5eb413422`
- Alteracoes preservadas antes: 281
- Tracked modificados antes: 260
- Tracked preservados fora da autorizacao: 256
- Untracked antes: 21
- Staged antes: 0
- git diff --check: 0
- git diff --cached --check: 0
- Untracked preservados (nao serao staged):
  - beauty-core-backend/docs/CHAT04_BLOCO17_CORRECAO_CI_RAWBODY_VITEST_PUSH_20260909-163319.md
  - beauty-core-backend/docs/CHAT04_BLOCO14_DIAGNOSTICO_LINT_GLOBAL_LEGADO_20260909-160903.md
  - beauty-core-backend/docs/CHAT04_BLOCO06_TRIAGEM_SEGREDOS_COMMIT_20260909-144044.md
  - beauty-core-backend/docs/CHAT04_BLOCO05_PREFLIGHT_SINCRONIZACAO_20260909-143527.md
  - beauty-core-backend/docs/CHAT04_BLOCO11_CORRECAO_PRISMA_PUSH_20260909-154755.md
  - beauty-core-backend/docs/CHAT04_BLOCO03_AUDITORIA_SEMANTICA_HIGH_20260909-142130.md
  - beauty-core-backend/docs/CHAT04_BLOCO07_REVISAO_ESCOPO_CI_20260909-144442.md
  - beauty-core-backend/docs/CHAT04_BLOCO12_DIAGNOSTICO_MULTER_20260909-155402.md
  - beauty-core-backend/docs/CHAT04_BLOCO05_PREFLIGHT_SINCRONIZACAO_20260909-143339.md
  - beauty-core-backend/docs/CHAT04_BLOCO15_CORRECAO_BOM_JSYAML_PUSH_20260909-161419.md
  - beauty-core-backend/docs/CHAT04_BLOCO01_BASELINE_FINAL_20260909-135604.md
  - beauty-core-backend/docs/CHAT04_BLOCO09_DIAGNOSTICO_CI_PRISMA_20260909-153326.md
  - beauty-core-backend/docs/CHAT04_BLOCO13_CORRECAO_MULTER_PUSH_20260909-155854.md
  - beauty-core-backend/docs/CHAT04_BLOCO02_RECONCILIACAO_261_CAMINHOS_20260909-135948.md
  - beauty-core-backend/docs/CHAT04_BLOCO17_CORRECAO_CI_RAWBODY_VITEST_PUSH_20260909-164834.md
  - beauty-core-backend/docs/CHAT04_BLOCO04_REVISAO_ESCOPO_SEGREDOS_20260909-142636.md
  - beauty-core-backend/docs/CHAT04_BLOCO16_DIAGNOSTICO_CI_POS_CORRECOES_20260909-162801.md
  - beauty-core-backend/docs/CHAT04_BLOCO17_CORRECAO_CI_RAWBODY_VITEST_PUSH_20260909-163601.md
  - beauty-core-backend/docs/CHAT04_BLOCO04_REVISAO_ESCOPO_SEGREDOS_20260909-143016.md
  - beauty-core-backend/docs/CHAT04_BLOCO17_CORRECAO_CI_RAWBODY_VITEST_PUSH_20260909-163757.md
  - beauty-core-backend/docs/CHAT04_BLOCO10_VALIDACAO_CANDIDATOS_PRISMA_20260909-153700.md
## Contrato backend
- main.ts habilita rawBody: True
- setup-e2e configura rawBody: True
- controller consome request.rawBody: True
- package.json ja estava fixado em Vitest 4.1.11; instalacao dos pacotes pulada.
- Vitest declarado apos atualizacao: `4.1.11`
- @vitest/coverage-v8 declarado apos atualizacao: `4.1.11`
### Reconciliacao normal do package-lock com peers
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" install --package-lock-only --ignore-scripts --no-audit --force --include=dev --include=peer"`
```text
up to date in 1s
295 packages are looking for funding
  run `npm fund` for details
npm warn using --force Recommended protections disabled.
```
### Reinstalacao limpa das dependencias frontend
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" ci --ignore-scripts --no-audit"`
```text
added 821 packages in 59s
258 packages are looking for funding
  run `npm fund` for details
```
### Backend build
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" run build"`
```text
> beauty-core-backend@0.0.1 build
> nest build
```
### E2E focado Meta WhatsApp
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" run test:e2e -- --runTestsByPath test/e2e/meta-whatsapp-webhook.e2e-spec.ts"`
- Saida limitada as ultimas 100 linhas.
```text
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/servicos/:servicoId/imagem, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/galeria, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/galeria, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/documentos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/tipo/:tipo, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id, DELETE} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/private/documentos, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mArquivosDownloadController {/arquivos}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/signed/:token, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id/download, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id/signed-url, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAreaClienteController {/area-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/perfil, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/perfil, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/proximos-agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/ultimo-agendamento, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos/:id/reagendar, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos/:id/cancelar, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/fidelidade, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pontos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/beneficios, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/documentos/:id/signed-url, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/documentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes/:pacoteId/usar-sessao, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes/:pacoteId, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes/nao-lidas, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/mensagens-whatsapp/enviar, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/mensagens-whatsapp, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/dashboard, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/historico, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mClienteAreaController {/cliente-area}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/dashboard, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/agendamentos, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/proximos-agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/ultimo-agendamento, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/fidelidade, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pontos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/beneficios, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pacotes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pacotes/:pacoteId, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes/nao-lidas, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/mensagens-whatsapp, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/historico, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthClienteController {/auth-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/solicitar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/verificar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/refresh, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/logout, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/logout-all, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/sessoes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/me, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/aceitar-termos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthClientePublicoController {/public/:slug/auth-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/:slug/auth-cliente/solicitar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/:slug/auth-cliente/verificar-codigo, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mTenantPublicoController {/tenant-publico}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/slug/:slug, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/dominio, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/resolver, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mPublicTenantController {/public/tenant}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/tenant/:slug, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mSchedulerController {/scheduler}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/status, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/aniversarios, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/lembretes, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/pacotes-vencidos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/campanhas, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/relatorios, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/limpeza-sessoes, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mBackupController {/backup}:[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/status, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/postgres, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/uploads, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/completo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:44 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/limpeza, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:45 [32m    LOG[39m [38;5;3m[NestApplication] [39m[32mNest application successfully started[39m[38;5;3m +123ms[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:45 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=4f4beb44-52aa-4168-ad4e-71e1aefec92c correlationId=4f4beb44-52aa-4168-ad4e-71e1aefec92c metodo=GET rota=/webhooks/meta/whatsapp?hub.mode=subscribe&hub.verify_token=chat03-meta-verify-token&hub.challenge=challenge-123 empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=26[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:45 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=7bb64f51-da25-4215-b8c7-76d97dea2a4a correlationId=7bb64f51-da25-4215-b8c7-76d97dea2a4a metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=13[39m
[32m[Nest] 19428  - [39m09/09/2026, 16:51:45 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=9065fdfa-e924-4008-9568-00b2a7189186 correlationId=9065fdfa-e924-4008-9568-00b2a7189186 metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=169[39m
[31m[Nest] 19428  - [39m09/09/2026, 16:51:45 [31m  ERROR[39m [38;5;3m[AuditLogInterceptor] [39m[31m[HTTP] requestId=9874b939-653d-43db-8a69-6abc6bb9a643 correlationId=9874b939-653d-43db-8a69-6abc6bb9a643 metodo=GET rota=/webhooks/meta/whatsapp?hub.mode=subscribe&hub.verify_token=token-incorreto&hub.challenge=challenge-123 empresaId=- usuarioId=- clienteId=- status=FALHA tempoMs=1 erro=Challenge Meta invalido.[39m
[31m[Nest] 19428  - [39m09/09/2026, 16:51:45 [31m  ERROR[39m [38;5;3m[AuditLogInterceptor] [39m[31m[HTTP] requestId=b3793a52-98a5-4484-aaa9-13ae9d0b518a correlationId=b3793a52-98a5-4484-aaa9-13ae9d0b518a metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=FALHA tempoMs=3 erro=Assinatura Meta invalida.[39m
PASS test/e2e/meta-whatsapp-webhook.e2e-spec.ts (15.098 s)
  Meta WhatsApp webhook E2E
    ÔêÜ valida challenge GET e rejeita token incorreto (144 ms)
    ÔêÜ valida assinatura, atualiza status e deduplica evento (446 ms)
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        15.63 s
Ran all test suites within paths "test/e2e/meta-whatsapp-webhook.e2e-spec.ts".
```
### Frontend testes
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" run test"`
- Saida limitada as ultimas 80 linhas.
```text
 [32mÔ£ô[39m src/features/arquivos/queries/arquivos-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/config/admin-navigation.chat55.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/queries/dashboard-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/components/comissao-form.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[33m 571[2mms[22m[39m
     [33m[2mÔ£ô[22m[39m bloqueia submit durante mutation [33m 347[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivo-relations.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/components/portal-asset-image.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[32m 97[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-query-performance-policy.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/contracts/portal-loyalty-contracts.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/agendamentos-navigation.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/pagamento-movimentacao-form.schema.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/components/dashboard-section-states.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 363[2mms[22m[39m
     [33m[2mÔ£ô[22m[39m permite retry isolado [33m 346[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/schemas/categorias-financeiras.schemas.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/components/portal-shell.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 527[2mms[22m[39m
     [33m[2mÔ£ô[22m[39m renders shell landmarks with real tenant branding [33m 524[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/movimentacao-financeira-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/queries/dashboard-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/components/pagamento-movimentacao-form.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 434[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-notifications-messages.integration.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/movimentacoes-pagination.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/assets/portal-assets.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/queries/clientes-keys.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 23[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/components/branding-capabilities-card.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[32m 119[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/financeiro-query-options.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-error-reference.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/queries/fidelidade-query-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/components/financeiro-operacional-cards.test.tsx [2m([22m[2m1 test[22m[2m)[22m[32m 100[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/utils/pacotes-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-dashboard-query-options.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/constants/roles.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivos-pagination.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/components/ui/status-badge.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[32m 103[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/categoria-financeira-payload.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/categoria-financeira-form.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/unidades/utils/unidades-formatters.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/usuarios/utils/usuarios-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 24[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/relatorios-financeiros-periodo.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/movimentacao-financeira-actions.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/components/agenda-status-badge.test.tsx [2m([22m[2m6 tests[22m[2m)[22m[32m 160[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/financeiro-navigation.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivos-query-access.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/financeiro-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/queries/cliente-profile-keys.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/permissions/dashboard-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/components/configuracoes-navigation-card.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 410[2mms[22m[39m
     [33m[2mÔ£ô[22m[39m liga Configuracoes ao Branding real [33m 349[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/movimentacoes-financeiras-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/components/dashboard-accessibility.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 326[2mms[22m[39m
     [33m[2mÔ£ô[22m[39m associa a se├º├úo ao t├¡tulo e ├á descri├º├úo [33m 323[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/financeiro-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/relatorios-financeiros-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/states/portal-performance-audit.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-distributions.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivo-tipo.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32mÔ£ô[39m src/features/profissionais/utils/profissionais-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/categorias-financeiras-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/servicos/utils/servicos-formatters.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 24[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/utils/fidelidade-historico-formatters.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/queries/pacotes-query-keys.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/profissionais/profissionais-navigation.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/permissions/financeiro-module-access.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/financeiro-query.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/chat56/admin-sessions-query-gating.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-period-url.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/comissao-input.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/services/auth/access-events.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/components/configuracoes-readonly-notice.test.tsx [2m([22m[2m1 test[22m[2m)[22m[32m 129[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/comissoes-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/utils/fidelidade-formatters.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-messages-query.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/comissao-actions.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 3[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/components/portal-page-container.test.tsx [2m([22m[2m1 test[22m[2m)[22m[32m 160[2mms[22m[39m
[2m Test Files [22m [1m[32m310 passed[39m[22m[90m (310)[39m
[2m      Tests [22m [1m[32m1393 passed[39m[22m[90m (1393)[39m
[2m   Start at [22m 16:51:47
[2m   Duration [22m 230.35s[2m (transform 19.43s, setup 93.30s, import 294.51s, tests 71.75s, environment 987.57s)[22m
```
### Frontend typecheck
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" run typecheck"`
```text
> beauty-core-ui@0.1.0 typecheck
> tsc --noEmit
```
### Frontend lint
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" run lint"`
```text
> beauty-core-ui@0.1.0 lint
> eslint --max-warnings=0
```
### Frontend build
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" run build"`
```text
> beauty-core-ui@0.1.0 build
> next build
Ôû▓ Next.js 16.3.3 (Turbopack)
Ô£ô Running next.config.ts took 175ms
  Creating an optimized production build ...
Ô£ô Compiled successfully in 10.2s
  Running TypeScript ...
  Finished TypeScript in 4.7s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/37) ...
  Generating static pages using 7 workers (9/37)
  Generating static pages using 7 workers (18/37)
  Generating static pages using 7 workers (27/37)
Ô£ô Generating static pages using 7 workers (37/37) in 1041ms
  Finalizing page optimization ...
Route (app)
Ôöî Ôùï /
Ôö£ Ôùï /_not-found
Ôö£ Ôùï /acesso-negado
Ôö£ Ôùï /agenda
Ôö£ Ôùï /arquivos
Ôö£ Ôùï /automacoes
Ôö£ Ôùï /clientes
Ôö£ ãÆ /clientes/[id]
Ôö£ Ôùï /configuracoes
Ôö£ Ôùï /configuracoes/branding
Ôö£ Ôùï /dashboard
Ôö£ Ôùï /design-system
Ôö£ Ôùï /fidelidade
Ôö£ Ôùï /financeiro
Ôö£ ãÆ /login
Ôö£ Ôùï /manifest.webmanifest
Ôö£ Ôùï /notificacoes
Ôö£ Ôùï /pacotes
Ôö£ Ôùï /portal
Ôö£ Ôùï /portal/agendamentos
Ôö£ Ôùï /portal/beneficios
Ôö£ Ôùï /portal/documentos
Ôö£ Ôùï /portal/fidelidade
Ôö£ Ôùï /portal/historico
Ôö£ Ôùï /portal/mensagens
Ôö£ Ôùï /portal/mensagens/enviar
Ôö£ Ôùï /portal/notificacoes
Ôö£ Ôùï /portal/pacotes
Ôö£ Ôùï /portal/perfil
Ôö£ Ôùï /portal/primeiro-acesso
Ôö£ Ôùï /profissionais
Ôö£ Ôùï /servicos
Ôö£ Ôùï /sessoes
Ôö£ Ôùï /unidades
Ôö£ Ôùï /usuarios
Ôöö Ôùï /whatsapp
Ôùï  (Static)   prerendered as static content
ãÆ  (Dynamic)  server-rendered on demand
```
### Frontend npm audit completo
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" audit --json"`
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
### git add seletivo
- Exit code: 0
- Comando: `C:\Program Files\Git\cmd\git.exe add -- beauty-core-backend/src/main.ts beauty-core-backend/test/setup-e2e.ts beauty-core-ui/package.json beauty-core-ui/package-lock.json`
```text
warning: in the working copy of 'beauty-core-backend/src/main.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'beauty-core-backend/test/setup-e2e.ts', LF will be replaced by CRLF the next time Git touches it
```
- Arquivos staged: beauty-core-backend/src/main.ts, beauty-core-backend/test/setup-e2e.ts, beauty-core-ui/package-lock.json, beauty-core-ui/package.json
### Commit corretivo
- Exit code: 0
- Comando: `C:\Program Files\Git\cmd\git.exe commit -m "fix(ci): preserve Meta webhook raw body and update Vitest"`
```text
[main 219dd06] fix(ci): preserve Meta webhook raw body and update Vitest
 4 files changed, 71 insertions(+), 78 deletions(-)
```
### Push seletivo
- Exit code: 0
- Comando: `C:\Program Files\Git\cmd\git.exe push origin HEAD:main`
```text
To https://github.com/Salmeida-webdev/beauty-core.git
   cce9e47..219dd06  HEAD -> main
```
- Novo SHA: `219dd066492ea23eadab10cb089957dd521cb816`
- origin/main confirmado: `219dd066492ea23eadab10cb089957dd521cb816`
- Entradas preservadas apos push: 277
- Staged final: 0
- Untracked preservados sem stage.

## Resultado: **PASS-CI-RAWBODY-VITEST-CORRECTION-PUSHED-LINT-GROUPS-PENDING**
- Nenhuma alteracao fora dos 4 caminhos autorizados foi staged, commitada ou enviada.
- Nenhuma alteracao preservada foi descartada.

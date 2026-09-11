# Chat 04 - Bloco 17 - Correcao CI rawBody e Vitest
Data da execucao: 2026-09-09 16:37:57 -03:00

Correcao autorizada somente para os quatro caminhos definidos; alteracoes locais nao autorizadas permanecem preservadas.
## Preflight
- Branch: `main`
- HEAD antes: `cce9e47c268c79ffd01edbc7502556f5eb413422`
- origin/main antes: `cce9e47c268c79ffd01edbc7502556f5eb413422`
- Alteracoes preservadas antes: 277
- Tracked modificados antes: 258
- Untracked antes: 19
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
  - beauty-core-backend/docs/CHAT04_BLOCO04_REVISAO_ESCOPO_SEGREDOS_20260909-142636.md
  - beauty-core-backend/docs/CHAT04_BLOCO16_DIAGNOSTICO_CI_POS_CORRECOES_20260909-162801.md
  - beauty-core-backend/docs/CHAT04_BLOCO17_CORRECAO_CI_RAWBODY_VITEST_PUSH_20260909-163601.md
  - beauty-core-backend/docs/CHAT04_BLOCO04_REVISAO_ESCOPO_SEGREDOS_20260909-143016.md
  - beauty-core-backend/docs/CHAT04_BLOCO10_VALIDACAO_CANDIDATOS_PRISMA_20260909-153700.md
## Contrato backend
- main.ts habilita rawBody: True
- setup-e2e configura rawBody: True
- controller consome request.rawBody: True
### Atualizacao seletiva Vitest 4.1.11
- Exit code: 0
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" install --save-dev --save-exact vitest@4.1.11 @vitest/coverage-v8@4.1.11 --ignore-scripts --no-audit --legacy-peer-deps --force"`
```text
removed 9 packages, and changed 10 packages in 4s
257 packages are looking for funding
  run `npm fund` for details
npm warn using --force Recommended protections disabled.
```
- Vitest declarado apos atualizacao: `4.1.11`
- @vitest/coverage-v8 declarado apos atualizacao: `4.1.11`
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
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/servicos/:servicoId/imagem, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/galeria, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/galeria, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/documentos, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/tipo/:tipo, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id, DELETE} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/private/documentos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mArquivosDownloadController {/arquivos}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/signed/:token, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id/download, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/arquivos/:id/signed-url, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAreaClienteController {/area-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/perfil, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/perfil, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/proximos-agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/ultimo-agendamento, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos/:id/reagendar, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/agendamentos/:id/cancelar, PATCH} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/fidelidade, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pontos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/beneficios, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/documentos/:id/signed-url, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/documentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes/:pacoteId/usar-sessao, PATCH} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/pacotes/:pacoteId, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes/nao-lidas, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/mensagens-whatsapp/enviar, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/mensagens-whatsapp, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/dashboard, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/area-cliente/me/historico, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mClienteAreaController {/cliente-area}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/dashboard, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/proximos-agendamentos, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/ultimo-agendamento, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/fidelidade, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pontos, GET} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/beneficios, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pacotes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/pacotes/:pacoteId, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes/nao-lidas, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/notificacoes/:id/lida, PATCH} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/mensagens-whatsapp, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/cliente-area/me/historico, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthClienteController {/auth-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/solicitar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/verificar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/refresh, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/logout, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/logout-all, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/sessoes, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/me, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/auth-cliente/aceitar-termos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mAuthClientePublicoController {/public/:slug/auth-cliente}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/:slug/auth-cliente/solicitar-codigo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/:slug/auth-cliente/verificar-codigo, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mTenantPublicoController {/tenant-publico}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/slug/:slug, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/dominio, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/tenant-publico/resolver, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mPublicTenantController {/public/tenant}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/public/tenant/:slug, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mSchedulerController {/scheduler}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/status, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/aniversarios, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/lembretes, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/pacotes-vencidos, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/campanhas, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/relatorios, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/scheduler/teste/limpeza-sessoes, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RoutesResolver] [39m[32mBackupController {/backup}:[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/status, GET} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/postgres, POST} route[39m[38;5;3m +1ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/uploads, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/executar/completo, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[RouterExplorer] [39m[32mMapped {/backup/limpeza, POST} route[39m[38;5;3m +0ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[NestApplication] [39m[32mNest application successfully started[39m[38;5;3m +182ms[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=90374728-b8ef-46b3-b936-6fcbf88b538c correlationId=90374728-b8ef-46b3-b936-6fcbf88b538c metodo=GET rota=/webhooks/meta/whatsapp?hub.mode=subscribe&hub.verify_token=chat03-meta-verify-token&hub.challenge=challenge-123 empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=26[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:33 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=c14b8427-0f53-4676-989c-604f26dc9dde correlationId=c14b8427-0f53-4676-989c-604f26dc9dde metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=15[39m
[32m[Nest] 12476  - [39m09/09/2026, 16:38:34 [32m    LOG[39m [38;5;3m[AuditLogInterceptor] [39m[32m[HTTP] requestId=e65e0873-01be-4633-8070-b49cec82c54d correlationId=e65e0873-01be-4633-8070-b49cec82c54d metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=SUCESSO tempoMs=131[39m
[31m[Nest] 12476  - [39m09/09/2026, 16:38:33 [31m  ERROR[39m [38;5;3m[AuditLogInterceptor] [39m[31m[HTTP] requestId=aed96193-35f9-4280-a3f6-ab83b4251f07 correlationId=aed96193-35f9-4280-a3f6-ab83b4251f07 metodo=GET rota=/webhooks/meta/whatsapp?hub.mode=subscribe&hub.verify_token=token-incorreto&hub.challenge=challenge-123 empresaId=- usuarioId=- clienteId=- status=FALHA tempoMs=2 erro=Challenge Meta invalido.[39m
[31m[Nest] 12476  - [39m09/09/2026, 16:38:34 [31m  ERROR[39m [38;5;3m[AuditLogInterceptor] [39m[31m[HTTP] requestId=f04476df-1036-4daa-8ee3-20aaf73f52c4 correlationId=f04476df-1036-4daa-8ee3-20aaf73f52c4 metodo=POST rota=/webhooks/meta/whatsapp empresaId=- usuarioId=- clienteId=- status=FALHA tempoMs=1 erro=Assinatura Meta invalida.[39m
PASS test/e2e/meta-whatsapp-webhook.e2e-spec.ts (8.315 s)
  Meta WhatsApp webhook E2E
    ÔêÜ valida challenge GET e rejeita token incorreto (156 ms)
    ÔêÜ valida assinatura, atualiza status e deduplica evento (447 ms)
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        8.705 s, estimated 26 s
Ran all test suites within paths "test/e2e/meta-whatsapp-webhook.e2e-spec.ts".
```
### Frontend testes
- Exit code: 1
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" run test"`
- Saida limitada as ultimas 80 linhas.
```text
[41m[1m FAIL [22m[49m src/features/automacoes/forms/automacao-evento-form.test.tsx[2m [ src/features/automacoes/forms/automacao-evento-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/auth/components/admin-login-boundary.test.tsx[2m [ src/features/auth/components/admin-login-boundary.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/branding-capabilities-card.test.tsx[2m [ src/features/configuracoes/components/branding-capabilities-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/branding-logo-upload-card.test.tsx[2m [ src/features/configuracoes/components/branding-logo-upload-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/branding-preview-a11y.test.tsx[2m [ src/features/configuracoes/components/branding-preview-a11y.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/branding-preview-card.test.tsx[2m [ src/features/configuracoes/components/branding-preview-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/configuracoes-gerais-card.test.tsx[2m [ src/features/configuracoes/components/configuracoes-gerais-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/configuracoes-navigation-card.test.tsx[2m [ src/features/configuracoes/components/configuracoes-navigation-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/configuracoes-readonly-notice.test.tsx[2m [ src/features/configuracoes/components/configuracoes-readonly-notice.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/cliente-form-dialog.integration.test.tsx[2m [ src/features/clientes/components/cliente-form-dialog.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/cliente-lgpd-actions.integration.test.tsx[2m [ src/features/clientes/components/cliente-lgpd-actions.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/cliente-profile-extras.integration.test.tsx[2m [ src/features/clientes/components/cliente-profile-extras.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/cliente-profile-view.integration.test.tsx[2m [ src/features/clientes/components/cliente-profile-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/clientes-view.integration.test.tsx[2m [ src/features/clientes/components/clientes-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/hooks/use-debounced-value.test.tsx[2m [ src/features/clientes/hooks/use-debounced-value.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/forms/cliente-form.test.tsx[2m [ src/features/clientes/forms/cliente-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/clients-overview.test.tsx[2m [ src/features/dashboard/components/clients-overview.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-accessibility.test.tsx[2m [ src/features/dashboard/components/dashboard-accessibility.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-filters.test.tsx[2m [ src/features/dashboard/components/dashboard-filters.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-kpi-grid.test.tsx[2m [ src/features/dashboard/components/dashboard-kpi-grid.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-section-states.test.tsx[2m [ src/features/dashboard/components/dashboard-section-states.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-summary-states.test.tsx[2m [ src/features/dashboard/components/dashboard-summary-states.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-view.integration.test.tsx[2m [ src/features/dashboard/components/dashboard-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/engagement-overview.test.tsx[2m [ src/features/dashboard/components/engagement-overview.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/rankings-overview.test.tsx[2m [ src/features/dashboard/components/rankings-overview.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/beneficios/beneficios-view.test.tsx[2m [ src/features/fidelidade/beneficios/beneficios-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/cupons/cupons-view.test.tsx[2m [ src/features/fidelidade/cupons/cupons-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/components/fidelidade-operacional-view.test.tsx[2m [ src/features/fidelidade/components/fidelidade-operacional-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/components/fidelidade-programa-view.test.tsx[2m [ src/features/fidelidade/components/fidelidade-programa-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx[2m [ src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/cancelar-movimentacao-dialog.test.tsx[2m [ src/features/financeiro/components/cancelar-movimentacao-dialog.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/categoria-financeira-form.test.tsx[2m [ src/features/financeiro/components/categoria-financeira-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/comissao-form.test.tsx[2m [ src/features/financeiro/components/comissao-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/comissoes-list.test.tsx[2m [ src/features/financeiro/components/comissoes-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/financeiro-operacional-cards.test.tsx[2m [ src/features/financeiro/components/financeiro-operacional-cards.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/financeiro-view.test.tsx[2m [ src/features/financeiro/components/financeiro-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/movimentacao-financeira-form.test.tsx[2m [ src/features/financeiro/components/movimentacao-financeira-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/movimentacoes-financeiras-filters.test.tsx[2m [ src/features/financeiro/components/movimentacoes-financeiras-filters.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/movimentacoes-financeiras-list.test.tsx[2m [ src/features/financeiro/components/movimentacoes-financeiras-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/pagamento-movimentacao-form.test.tsx[2m [ src/features/financeiro/components/pagamento-movimentacao-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/notificacoes/components/notificacoes-list.test.tsx[2m [ src/features/notificacoes/components/notificacoes-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/notificacoes/settings/notificacoes-settings-form.test.tsx[2m [ src/features/notificacoes/settings/notificacoes-settings-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx[2m [ src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx[2m [ src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-auth-context-session.test.tsx[2m [ src/features/portal/auth/portal-auth-context-session.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-auth-context.test.tsx[2m [ src/features/portal/auth/portal-auth-context.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-auth-route-orchestrator.test.tsx[2m [ src/features/portal/auth/portal-auth-route-orchestrator.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-otp-request.test.tsx[2m [ src/features/portal/auth/portal-otp-request.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-otp-verification.test.tsx[2m [ src/features/portal/auth/portal-otp-verification.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-private-route.test.tsx[2m [ src/features/portal/auth/portal-private-route.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-asset-image.test.tsx[2m [ src/features/portal/components/portal-asset-image.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-branding.test.tsx[2m [ src/features/portal/components/portal-branding.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-dashboard-data-boundary.test.tsx[2m [ src/features/portal/components/portal-dashboard-data-boundary.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-navigation.test.tsx[2m [ src/features/portal/components/portal-navigation.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-page-container.test.tsx[2m [ src/features/portal/components/portal-page-container.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-responsive-a11y.test.tsx[2m [ src/features/portal/components/portal-responsive-a11y.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-shell.test.tsx[2m [ src/features/portal/components/portal-shell.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pwa/portal-offline-indicator.test.tsx[2m [ src/features/portal/pwa/portal-offline-indicator.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-auth-ux.test.tsx[2m [ src/features/portal/pages/portal-auth-ux.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-authenticated-surface.test.tsx[2m [ src/features/portal/pages/portal-authenticated-surface.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-first-access-experience.test.tsx[2m [ src/features/portal/pages/portal-first-access-experience.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-first-access-page.test.tsx[2m [ src/features/portal/pages/portal-first-access-page.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-terms-consent.test.tsx[2m [ src/features/portal/pages/portal-terms-consent.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/query/portal-query-gate.test.tsx[2m [ src/features/portal/query/portal-query-gate.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/states/portal-state-views.test.tsx[2m [ src/features/portal/states/portal-state-views.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/profissionais/components/profissionais-view.integration.test.tsx[2m [ src/features/profissionais/components/profissionais-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/profissionais/components/profissional-form-dialog.integration.test.tsx[2m [ src/features/profissionais/components/profissional-form-dialog.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/unidades/forms/unidade-form.test.tsx[2m [ src/features/unidades/forms/unidade-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/servicos/forms/servico-form.test.tsx[2m [ src/features/servicos/forms/servico-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/usuarios/components/usuario-form-dialog.integration.test.tsx[2m [ src/features/usuarios/components/usuario-form-dialog.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/usuarios/components/usuarios-view.integration.test.tsx[2m [ src/features/usuarios/components/usuarios-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/usuarios/forms/usuario-form.test.tsx[2m [ src/features/usuarios/forms/usuario-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/whatsapp/components/campanhas-whatsapp-list.test.tsx[2m [ src/features/whatsapp/components/campanhas-whatsapp-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/whatsapp/components/mensagens-whatsapp-list.test.tsx[2m [ src/features/whatsapp/components/mensagens-whatsapp-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/whatsapp/components/templates-whatsapp-list.test.tsx[2m [ src/features/whatsapp/components/templates-whatsapp-list.test.tsx ][22m
[31m[1mError[22m: Cannot find module '@testing-library/dom'
Require stack:
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-ui\node_modules\@testing-library\react\dist\pure.js[39m
[90m [2mÔØ»[22m Object.<anonymous> node_modules/@testing-library/react/dist/pure.js:[2m46:12[22m[39m
[31m[2mÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»[1/105]ÔÄ»[22m[39m
```

## Resultado: **NO-GO-CI-CORRECTION**
- Erro: Frontend testes falhou (exit code 1).
> beauty-core-ui@0.1.0 test
> vitest run


[1m[30m[46m RUN [49m[39m[22m [36mv4.1.11 [39m[90mC:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-ui[39m

 [31mÔØ»[39m src/features/clientes/components/cliente-lgpd-actions.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/clientes/components/clientes-view.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/dashboard-view.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/clientes/components/cliente-profile-view.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/usuarios/components/usuarios-view.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/usuarios/components/usuario-form-dialog.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/arquivos/components/arquivo-upload-dialog.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/pages/portal-terms-consent.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agendamento-status-actions.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/profissionais/components/profissionais-view.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/pages/portal-first-access-experience.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/profissionais/components/profissional-form-dialog.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/forms/agendamento-create-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agenda-calendar.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/servicos/forms/servico-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/notificacoes/settings/notificacoes-settings-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/configuracoes/chat55-transversal.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/clientes/components/cliente-profile-extras.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/clientes/components/cliente-form-dialog.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/fidelidade/cupons/cupons-view.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/auth/portal-otp-verification.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/pages/portal-authenticated-surface.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/clientes/forms/cliente-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/arquivos/components/arquivos-view.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/unidades/forms/unidade-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/usuarios/forms/usuario-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/automacoes/forms/automacao-evento-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/components/portal-dashboard-data-boundary.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/arquivos/components/arquivo-remove-dialog.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/dashboard-filters.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agenda-list.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/pages/portal-auth-ux.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/app/portal/mensagens/page.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/components/portal-responsive-a11y.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/auth/portal-otp-request.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/movimentacoes-financeiras-list.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/fidelidade/beneficios/beneficios-view.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/states/portal-state-views.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/portal-foundation.integration.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/pages/portal-first-access-page.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/arquivos/components/arquivos-actions.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/auth/portal-auth-context.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/components/layout/admin-sidebar.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agenda-option-picker.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/categoria-financeira-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/fidelidade/components/fidelidade-programa-view.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/components/portal-navigation.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/components/portal-shell.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/whatsapp/components/campanhas-whatsapp-list.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/rankings-overview.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/notificacoes/components/notificacoes-list.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/configuracoes/components/branding-logo-upload-card.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/whatsapp/components/templates-whatsapp-list.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/auth/portal-auth-context-session.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/auth/portal-auth-route-orchestrator.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/providers/tenant-provider.chat55.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/configuracoes/components/configuracoes-navigation-card.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/dashboard-summary-states.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/comissao-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/fidelidade/components/fidelidade-operacional-view.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/arquivos/components/arquivos-list.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/components/states/feedback-states.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/app/portal/portal-routing.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/components/layout/admin-shell-boundary.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/cancelar-movimentacao-dialog.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/auth/portal-private-route.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/movimentacoes-financeiras-filters.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agenda-calendar-toolbar.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agenda-detail-openers.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/pagamento-movimentacao-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/comissoes-list.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/auth/components/admin-login-boundary.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/components/layout/page-header.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/app/portal/portal-private-routing.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/components/forms/form-foundation.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/components/portal-page-container.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/dashboard-accessibility.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/app/portal/notificacoes/page.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/pwa/portal-offline-indicator.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/movimentacao-financeira-form.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/dashboard-section-states.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/dashboard-kpi-grid.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/agendamentos/components/agenda-status-badge.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/financeiro-view.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [32mÔ£ô[39m src/features/chat50/chat50-cross-module.integration.test.ts [2m([22m[2m26 tests[22m[2m)[22m[32m 246[2mms[22m[39m
 [31mÔØ»[39m src/features/configuracoes/components/branding-preview-card.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/engagement-overview.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/dashboard/components/clients-overview.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/arquivos/components/arquivos-filters.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/configuracoes/components/branding-preview-a11y.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/components/portal-branding.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/whatsapp/components/mensagens-whatsapp-list.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/configuracoes/components/configuracoes-gerais-card.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/components/ui/status-badge.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/configuracoes/components/branding-capabilities-card.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/financeiro/components/financeiro-operacional-cards.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/portal/components/portal-asset-image.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [32mÔ£ô[39m src/features/financeiro/chat52-financeiro-flow.integration.test.ts [2m([22m[2m15 tests[22m[2m)[22m[32m 62[2mms[22m[39m
 [31mÔØ»[39m src/features/portal/query/portal-query-gate.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [31mÔØ»[39m src/features/configuracoes/components/configuracoes-readonly-notice.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [32mÔ£ô[39m src/features/chat50/chat50-ui-hardening.test.ts [2m([22m[2m27 tests[22m[2m)[22m[32m 73[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/arquivos-foundations.test.ts [2m([22m[2m11 tests[22m[2m)[22m[32m 75[2mms[22m[39m
 [31mÔØ»[39m src/features/clientes/hooks/use-debounced-value.test.tsx [2m([22m[2m0 test[22m[2m)[22m
 [32mÔ£ô[39m src/features/chat54/chat54-cross-integration.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 70[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/financeiro-ux-hardening.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 37[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/services/agendamentos-options-api.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 21[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/services/dashboard-api.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 43[2mms[22m[39m
 [32mÔ£ô[39m src/features/notificacoes/services/notificacoes-settings-api.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/whatsapp/services/whatsapp-campaigns-api.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 33[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/chat53-transversal.integration.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/services/portal-client-api.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 34[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/forms/cliente-form.schema.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 25[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/agendamentos-contract-hardening.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 28[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/components/agenda-visual-audit.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 33[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivos-download.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 40[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/services/clientes-api.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 31[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/catalogo/pacotes-catalogo-api.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 28[2mms[22m[39m
 [32mÔ£ô[39m src/config/admin-navigation.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 31[2mms[22m[39m
 [32mÔ£ô[39m src/features/notificacoes/schemas/notificacoes-history-schema.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 26[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/services/arquivos-api.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 50[2mms[22m[39m
 [32mÔ£ô[39m src/features/whatsapp/services/whatsapp-messages-api.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 39[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/schemas/dashboard.schemas.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 34[2mms[22m[39m
 [32mÔ£ô[39m src/features/usuarios/usuarios-foundation.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 26[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/services/configuracoes-api.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 26[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/clientes-pacotes/clientes-pacotes-api.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 35[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/services/agendamentos-api.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 27[2mms[22m[39m
 [32mÔ£ô[39m src/features/notificacoes/services/notificacoes-history-api.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 25[2mms[22m[39m
 [32mÔ£ô[39m src/features/automacoes/services/automacoes-operacionais-api.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 25[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/schemas/movimentacoes-financeiras.schemas.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/services/comissoes-api.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 25[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/beneficios/beneficios-api.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/services/cliente-profile-extras-api.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 24[2mms[22m[39m
 [32mÔ£ô[39m src/features/whatsapp/schemas/mensagem-whatsapp-schema.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 29[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/comissao-form.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/services/fidelidade-programa-api.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 23[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/forms/agendamento-create-form.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/services/movimentacoes-financeiras-api.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 27[2mms[22m[39m
 [32mÔ£ô[39m src/features/profissionais/profissionais-foundation.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 35[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/cupons/cupons-api.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 26[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/chat53-ux-hardening.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 29[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/schemas/pacotes.schemas.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/tenant/schemas/tenant.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 23[2mms[22m[39m
 [32mÔ£ô[39m src/features/whatsapp/services/whatsapp-templates-api.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 26[2mms[22m[39m
 [32mÔ£ô[39m src/features/unidades/forms/unidade-form.schema.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 21[2mms[22m[39m
 [32mÔ£ô[39m src/features/auth/services/auth-session.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 23[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/services/categorias-financeiras-api.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 20[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/forms/agendamento-edit-payload.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 19[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/schemas/clientes.schemas.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 23[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/auth/portal-auth-session.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 19[2mms[22m[39m
 [32mÔ£ô[39m src/features/unidades/unidades-foundation.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/services/fidelidade-api.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 20[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/schemas/cliente-profile-extras.schemas.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 27[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/services/clientes-lgpd-api.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/forms/agendamento-create-payload.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 49[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/portal-transversal.integration.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 38[2mms[22m[39m
 [32mÔ£ô[39m src/features/servicos/servicos-foundation.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 28[2mms[22m[39m
 [32mÔ£ô[39m src/features/automacoes/chat54-foundations.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 20[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/movimentacao-financeira-form.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/services/portal-messages-api.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 25[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-query.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 19[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/agendamentos-foundation.test.ts [2m([22m[2m11 tests[22m[2m)[22m[32m 26[2mms[22m[39m
 [32mÔ£ô[39m src/features/servicos/forms/servico-form.schema.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 21[2mms[22m[39m
 [32mÔ£ô[39m src/features/whatsapp/schemas/campanha-whatsapp-schema.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 20[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/testing/financeiro-ordering-contract.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/services/agendamentos-create-api.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/schemas/financeiro.schemas.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 21[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/auth/portal-auth-api.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/usuarios/forms/usuario-form.schema.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/configuracoes-foundations.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/whatsapp/schemas/template-whatsapp-schema.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 19[2mms[22m[39m
 [32mÔ£ô[39m src/features/auth/schemas/login.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 30[2mms[22m[39m
 [32mÔ£ô[39m src/features/whatsapp/chat54-foundations.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/services/pacotes-api.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 21[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/operacoes/fidelidade-operacoes.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 30[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/schemas/fidelidade.schemas.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 32[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/services/agendamentos-status-api.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/schemas/relatorios-financeiros.schemas.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/automacoes/schemas/automacoes-operacionais-schema.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/schemas/comissoes.schemas.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/financeiro-query-options.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/contracts/portal-loyalty-contracts.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/utils/agenda-calendar.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/agendamentos-url-hardening.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/queries/clientes-keys.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/auth/portal-auth-cache.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/services/agendamentos-update-api.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 20[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-chart-data.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/notificacoes/chat54-foundations.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/cupons/cupom-form.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/utils/clientes-list-url.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/agendamentos-cache-hardening.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/errors/portal-resource-errors.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/financeiro-query.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 28[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/schemas/categorias-financeiras.schemas.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/services/cliente-profile-actions-api.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/notificacoes/schemas/notificacoes-settings-schema.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/forms/nivel-fidelidade-form.schema.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/services/relatorios-financeiros-api.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/components/portal-prerelease-hardening.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 32[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/permissions/chat55-rbac.test.ts [2m([22m[2m17 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/chat51-agenda-flow.integration.test.ts [2m([22m[2m11 tests[22m[2m)[22m[32m 24[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivo-relations.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/permissions/financeiro-permissions.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/movimentacoes-financeiras-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/queries/clientes-query-options.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/auth/portal-auth-errors.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/catalogo/pacote-form.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/pagamento-movimentacao-form.schema.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/constants/roles.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/forms/configuracao-fidelidade-form.schema.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/forms/cliente-form-error.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/movimentacoes-list-url.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivos-list-url.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/assets/portal-assets.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-periods.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/operacoes/fidelidade-operacoes-api.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/utils/agenda-filters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/security/portal-security-audit.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/stores/auth-store.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 34[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/financeiro-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/config/admin-navigation.chat53.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/queries/dashboard-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/beneficios/beneficio-form.schema.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/usuarios/utils/usuarios-list-url.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/config/admin-navigation.chat55.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/utils/fidelidade-historico-formatters.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/unidades/forms/unidade-payload.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/auth/navigation/admin-return-to.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivos-query-access.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/permissions/clientes-permissions.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/permissions/dashboard-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-client-query-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/profissionais/profissionais-navigation.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/security/portal-safe-return-to.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/usuarios/utils/usuarios-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/comissao-input.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/categoria-financeira-form.schema.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/utils/configuracoes-logo.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/auth/portal-auth-routing.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/movimentacao-financeira-payload.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/queries/dashboard-query-policy.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/servicos/forms/servico-payload.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/app/manifest.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/agendamentos-permissions-hardening.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/auth/permissions/admin-permissions.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/utils/fidelidade-formatters.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/financeiro-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivos-api-error.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/clientes-pacotes/cliente-pacote-form.schema.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/profissionais/utils/profissionais-list-url.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/stores/ui-store.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/categoria-financeira-payload.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/comissoes-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/usuarios/forms/usuario-payload.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-period-url.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/navigation/portal-navigation.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-notifications-messages.integration.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/forms/comissao-payload.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/services/financeiro-api.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/movimentacao-financeira-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-dashboard-data.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/components/portal-service-worker.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/relatorios-financeiros-periodo.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/utils/tenant-runtime-branding.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/forms/cliente-payload.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivo-tipo.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/queries/agendamentos-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/queries/fidelidade-query-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/relatorios-financeiros-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/permissions/pacotes-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/queries/arquivos-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/auth/navigation/admin-login-navigation-state.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-messages-query.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/queries/dashboard-keys.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/movimentacoes-pagination.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivos-action-error.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/financeiro-navigation.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/states/portal-performance-audit.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/unidades/utils/unidades-formatters.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/utils/configuracoes-branding.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/queries/categorias-financeiras-query-options.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-query-performance-policy.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/fidelidade/permissions/fidelidade-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/configuracoes/utils/configuracoes-gerais.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/utils/pacotes-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/services/auth/access-events.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/queries/pacotes-query-keys.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/movimentacao-financeira-actions.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/pacotes/clientes-pacotes/clientes-pacotes-permissions.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/servicos/utils/servicos-formatters.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/permissions/financeiro-module-access.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/agendamentos/agendamentos-navigation.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/arquivos/utils/arquivos-pagination.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32mÔ£ô[39m src/features/profissionais/utils/profissionais-formatters.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/queries/cliente-profile-keys.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-distributions.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-error-reference.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/financeiro/utils/comissao-actions.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 7[2mms[22m[39m
 [32mÔ£ô[39m src/features/dashboard/utils/dashboard-summary.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32mÔ£ô[39m src/features/portal/query/portal-dashboard-query-options.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32mÔ£ô[39m src/features/chat56/admin-sessions-query-gating.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
 [32mÔ£ô[39m src/features/clientes/queries/cliente-profile-query-options.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 3[2mms[22m[39m

[2m Test Files [22m [1m[31m105 failed[39m[22m[2m | [22m[1m[32m205 passed[39m[22m[90m (310)[39m
[2m      Tests [22m [1m[32m1002 passed[39m[22m[90m (1002)[39m
[2m   Start at [22m 16:38:36
[2m   Duration [22m 208.77s[2m (transform 11.54s, setup 106.39s, import 70.00s, tests 3.91s, environment 1085.61s)[22m



[31mÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»[39m[1m[41m Failed Suites 105 [49m[22m[31mÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»[39m

[41m[1m FAIL [22m[49m src/providers/tenant-provider.chat55.test.tsx[2m [ src/providers/tenant-provider.chat55.test.tsx ][22m
[41m[1m FAIL [22m[49m src/app/portal/portal-private-routing.test.tsx[2m [ src/app/portal/portal-private-routing.test.tsx ][22m
[41m[1m FAIL [22m[49m src/app/portal/portal-routing.test.tsx[2m [ src/app/portal/portal-routing.test.tsx ][22m
[41m[1m FAIL [22m[49m src/components/forms/form-foundation.test.tsx[2m [ src/components/forms/form-foundation.test.tsx ][22m
[41m[1m FAIL [22m[49m src/components/layout/admin-shell-boundary.test.tsx[2m [ src/components/layout/admin-shell-boundary.test.tsx ][22m
[41m[1m FAIL [22m[49m src/components/layout/admin-sidebar.test.tsx[2m [ src/components/layout/admin-sidebar.test.tsx ][22m
[41m[1m FAIL [22m[49m src/components/layout/page-header.test.tsx[2m [ src/components/layout/page-header.test.tsx ][22m
[41m[1m FAIL [22m[49m src/components/states/feedback-states.test.tsx[2m [ src/components/states/feedback-states.test.tsx ][22m
[41m[1m FAIL [22m[49m src/components/ui/status-badge.test.tsx[2m [ src/components/ui/status-badge.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/chat55-transversal.integration.test.tsx[2m [ src/features/configuracoes/chat55-transversal.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/portal-foundation.integration.test.tsx[2m [ src/features/portal/portal-foundation.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/app/portal/notificacoes/page.test.tsx[2m [ src/app/portal/notificacoes/page.test.tsx ][22m
[41m[1m FAIL [22m[49m src/app/portal/mensagens/page.test.tsx[2m [ src/app/portal/mensagens/page.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx[2m [ src/features/agendamentos/components/agenda-calendar-accessibility.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agenda-calendar-toolbar.test.tsx[2m [ src/features/agendamentos/components/agenda-calendar-toolbar.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agenda-calendar.test.tsx[2m [ src/features/agendamentos/components/agenda-calendar.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agenda-detail-openers.test.tsx[2m [ src/features/agendamentos/components/agenda-detail-openers.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agenda-list.test.tsx[2m [ src/features/agendamentos/components/agenda-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agenda-option-picker.test.tsx[2m [ src/features/agendamentos/components/agenda-option-picker.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agenda-status-badge.test.tsx[2m [ src/features/agendamentos/components/agenda-status-badge.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx[2m [ src/features/agendamentos/components/agendamento-create-dialog.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx[2m [ src/features/agendamentos/components/agendamento-detail-dialog.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/components/agendamento-status-actions.test.tsx[2m [ src/features/agendamentos/components/agendamento-status-actions.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/agendamentos/forms/agendamento-create-form.test.tsx[2m [ src/features/agendamentos/forms/agendamento-create-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/arquivos/components/arquivo-remove-dialog.test.tsx[2m [ src/features/arquivos/components/arquivo-remove-dialog.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/arquivos/components/arquivo-upload-dialog.test.tsx[2m [ src/features/arquivos/components/arquivo-upload-dialog.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/arquivos/components/arquivos-actions.test.tsx[2m [ src/features/arquivos/components/arquivos-actions.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/arquivos/components/arquivos-filters.test.tsx[2m [ src/features/arquivos/components/arquivos-filters.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/arquivos/components/arquivos-list.test.tsx[2m [ src/features/arquivos/components/arquivos-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/arquivos/components/arquivos-view.integration.test.tsx[2m [ src/features/arquivos/components/arquivos-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/automacoes/forms/automacao-evento-form.test.tsx[2m [ src/features/automacoes/forms/automacao-evento-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/auth/components/admin-login-boundary.test.tsx[2m [ src/features/auth/components/admin-login-boundary.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/branding-capabilities-card.test.tsx[2m [ src/features/configuracoes/components/branding-capabilities-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/branding-logo-upload-card.test.tsx[2m [ src/features/configuracoes/components/branding-logo-upload-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/branding-preview-a11y.test.tsx[2m [ src/features/configuracoes/components/branding-preview-a11y.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/branding-preview-card.test.tsx[2m [ src/features/configuracoes/components/branding-preview-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/configuracoes-gerais-card.test.tsx[2m [ src/features/configuracoes/components/configuracoes-gerais-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/configuracoes-navigation-card.test.tsx[2m [ src/features/configuracoes/components/configuracoes-navigation-card.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/configuracoes/components/configuracoes-readonly-notice.test.tsx[2m [ src/features/configuracoes/components/configuracoes-readonly-notice.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/cliente-form-dialog.integration.test.tsx[2m [ src/features/clientes/components/cliente-form-dialog.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/cliente-lgpd-actions.integration.test.tsx[2m [ src/features/clientes/components/cliente-lgpd-actions.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/cliente-profile-extras.integration.test.tsx[2m [ src/features/clientes/components/cliente-profile-extras.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/cliente-profile-view.integration.test.tsx[2m [ src/features/clientes/components/cliente-profile-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/components/clientes-view.integration.test.tsx[2m [ src/features/clientes/components/clientes-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/hooks/use-debounced-value.test.tsx[2m [ src/features/clientes/hooks/use-debounced-value.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/clientes/forms/cliente-form.test.tsx[2m [ src/features/clientes/forms/cliente-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/clients-overview.test.tsx[2m [ src/features/dashboard/components/clients-overview.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-accessibility.test.tsx[2m [ src/features/dashboard/components/dashboard-accessibility.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-filters.test.tsx[2m [ src/features/dashboard/components/dashboard-filters.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-kpi-grid.test.tsx[2m [ src/features/dashboard/components/dashboard-kpi-grid.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-section-states.test.tsx[2m [ src/features/dashboard/components/dashboard-section-states.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-summary-states.test.tsx[2m [ src/features/dashboard/components/dashboard-summary-states.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/dashboard-view.integration.test.tsx[2m [ src/features/dashboard/components/dashboard-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/engagement-overview.test.tsx[2m [ src/features/dashboard/components/engagement-overview.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/dashboard/components/rankings-overview.test.tsx[2m [ src/features/dashboard/components/rankings-overview.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/beneficios/beneficios-view.test.tsx[2m [ src/features/fidelidade/beneficios/beneficios-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/cupons/cupons-view.test.tsx[2m [ src/features/fidelidade/cupons/cupons-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/components/fidelidade-operacional-view.test.tsx[2m [ src/features/fidelidade/components/fidelidade-operacional-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/components/fidelidade-programa-view.test.tsx[2m [ src/features/fidelidade/components/fidelidade-programa-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx[2m [ src/features/fidelidade/operacoes/fidelidade-operacoes-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/cancelar-movimentacao-dialog.test.tsx[2m [ src/features/financeiro/components/cancelar-movimentacao-dialog.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/categoria-financeira-form.test.tsx[2m [ src/features/financeiro/components/categoria-financeira-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/comissao-form.test.tsx[2m [ src/features/financeiro/components/comissao-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/comissoes-list.test.tsx[2m [ src/features/financeiro/components/comissoes-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/financeiro-operacional-cards.test.tsx[2m [ src/features/financeiro/components/financeiro-operacional-cards.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/financeiro-view.test.tsx[2m [ src/features/financeiro/components/financeiro-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/movimentacao-financeira-form.test.tsx[2m [ src/features/financeiro/components/movimentacao-financeira-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/movimentacoes-financeiras-filters.test.tsx[2m [ src/features/financeiro/components/movimentacoes-financeiras-filters.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/movimentacoes-financeiras-list.test.tsx[2m [ src/features/financeiro/components/movimentacoes-financeiras-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/financeiro/components/pagamento-movimentacao-form.test.tsx[2m [ src/features/financeiro/components/pagamento-movimentacao-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/notificacoes/components/notificacoes-list.test.tsx[2m [ src/features/notificacoes/components/notificacoes-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/notificacoes/settings/notificacoes-settings-form.test.tsx[2m [ src/features/notificacoes/settings/notificacoes-settings-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx[2m [ src/features/pacotes/clientes-pacotes/clientes-pacotes-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx[2m [ src/features/pacotes/catalogo/pacotes-catalogo-view.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-auth-context-session.test.tsx[2m [ src/features/portal/auth/portal-auth-context-session.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-auth-context.test.tsx[2m [ src/features/portal/auth/portal-auth-context.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-auth-route-orchestrator.test.tsx[2m [ src/features/portal/auth/portal-auth-route-orchestrator.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-otp-request.test.tsx[2m [ src/features/portal/auth/portal-otp-request.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-otp-verification.test.tsx[2m [ src/features/portal/auth/portal-otp-verification.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/auth/portal-private-route.test.tsx[2m [ src/features/portal/auth/portal-private-route.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-asset-image.test.tsx[2m [ src/features/portal/components/portal-asset-image.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-branding.test.tsx[2m [ src/features/portal/components/portal-branding.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-dashboard-data-boundary.test.tsx[2m [ src/features/portal/components/portal-dashboard-data-boundary.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-navigation.test.tsx[2m [ src/features/portal/components/portal-navigation.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-page-container.test.tsx[2m [ src/features/portal/components/portal-page-container.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-responsive-a11y.test.tsx[2m [ src/features/portal/components/portal-responsive-a11y.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/components/portal-shell.test.tsx[2m [ src/features/portal/components/portal-shell.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pwa/portal-offline-indicator.test.tsx[2m [ src/features/portal/pwa/portal-offline-indicator.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-auth-ux.test.tsx[2m [ src/features/portal/pages/portal-auth-ux.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-authenticated-surface.test.tsx[2m [ src/features/portal/pages/portal-authenticated-surface.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-first-access-experience.test.tsx[2m [ src/features/portal/pages/portal-first-access-experience.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-first-access-page.test.tsx[2m [ src/features/portal/pages/portal-first-access-page.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/pages/portal-terms-consent.test.tsx[2m [ src/features/portal/pages/portal-terms-consent.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/query/portal-query-gate.test.tsx[2m [ src/features/portal/query/portal-query-gate.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/portal/states/portal-state-views.test.tsx[2m [ src/features/portal/states/portal-state-views.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/profissionais/components/profissionais-view.integration.test.tsx[2m [ src/features/profissionais/components/profissionais-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/profissionais/components/profissional-form-dialog.integration.test.tsx[2m [ src/features/profissionais/components/profissional-form-dialog.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/unidades/forms/unidade-form.test.tsx[2m [ src/features/unidades/forms/unidade-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/servicos/forms/servico-form.test.tsx[2m [ src/features/servicos/forms/servico-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/usuarios/components/usuario-form-dialog.integration.test.tsx[2m [ src/features/usuarios/components/usuario-form-dialog.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/usuarios/components/usuarios-view.integration.test.tsx[2m [ src/features/usuarios/components/usuarios-view.integration.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/usuarios/forms/usuario-form.test.tsx[2m [ src/features/usuarios/forms/usuario-form.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/whatsapp/components/campanhas-whatsapp-list.test.tsx[2m [ src/features/whatsapp/components/campanhas-whatsapp-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/whatsapp/components/mensagens-whatsapp-list.test.tsx[2m [ src/features/whatsapp/components/mensagens-whatsapp-list.test.tsx ][22m
[41m[1m FAIL [22m[49m src/features/whatsapp/components/templates-whatsapp-list.test.tsx[2m [ src/features/whatsapp/components/templates-whatsapp-list.test.tsx ][22m
[31m[1mError[22m: Cannot find module '@testing-library/dom'
Require stack:
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-ui\node_modules\@testing-library\react\dist\pure.js[39m
[90m [2mÔØ»[22m Object.<anonymous> node_modules/@testing-library/react/dist/pure.js:[2m46:12[22m[39m

[31m[2mÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»ÔÄ»[1/105]ÔÄ»[22m[39m
- O fluxo foi interrompido; nenhuma operacao posterior foi executada.

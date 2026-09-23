# Beauty Core - Chat B - B04 - Auditoria de staging e E2E

- Inicio: 2026-09-13T11:03:14.3429637-03:00
- Fim: 2026-09-13T11:03:14.4093517-03:00
- Script: B04-v1
- Modo: somente leitura; o relatorio e o unico artefato criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Escopo

- Verificar Compose e containers locais relacionados ao Beauty Core.
- Consultar estados de API, PostgreSQL, Redis, BullMQ e scheduler sem ler ambiente.
- Consultar `/health` somente em portas publicadas por containers do projeto.
- Verificar artefatos de build, migrations, frontend e navegador disponivel.
- Nenhuma migration, escrita em banco/Redis, deploy ou E2E de navegador sera executado.

## Baseline da execucao

- Branch: `main`
- HEAD curto: `7da9794`
- Git status exit code: 0
- Entradas locais antes da auditoria: 35

### Arquivos Docker Compose
- `beauty-core-backend\.chat34-backup-20260620-115659\docker-compose.yml`
- `beauty-core-backend\.chat35-backup-alerting-prometheus-20260620212615\docker-compose.observability.yml`
- `beauty-core-backend\.chat35-backup-compose-20260620190732\docker-compose.prod.yml`
- `beauty-core-backend\.chat35-backup-compose-20260620190732\docker-compose.staging.yml`
- `beauty-core-backend\.chat35-backup-observability-auto-port-20260620211914\docker-compose.observability.yml`
- `beauty-core-backend\.chat35-backup-observability-port-fix-20260620211635\docker-compose.observability.yml`
- `beauty-core-backend\docker-compose.chat03-candidate.override.yml`
- `beauty-core-backend\docker-compose.dev.yml`
- `beauty-core-backend\docker-compose.observability.yml`
- `beauty-core-backend\docker-compose.prod.yml`
- `beauty-core-backend\docker-compose.staging.yml`
- `beauty-core-backend\docker-compose.yml`

## Artefatos e estrutura

- Diretorio backend dist existe: True
- Diretorio frontend .next existe: True
- Diretorios de migration localizados: 5
- Migration: `20260620132053_initial_current_schema`
- Migration: `20260621184000_chat39_secure_otp`
- Migration: `20260907030000_align_auditoria_enum`
- Migration: `20260909150000_meta_whatsapp_webhook`
- Migration: `20260911150000_meta_whatsapp_tenant_connection`

## Docker e runtime

- Docker ps exit code: 0
- Containers relacionados encontrados: 15
- `beauty-core-staging-api|Up 51 minutes (healthy)|127.0.0.1:3001->3000/tcp`
- `beauty-core-prod-api|Up 51 minutes (healthy)|127.0.0.1:3002->3000/tcp`
- `beauty-core-prod-redis|Up 51 minutes (healthy)|6379/tcp`
- `beauty-core-staging-redis|Up 51 minutes (healthy)|6379/tcp`
- `beauty-core-dev-api|Up 51 minutes (healthy)|0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp`
- `beauty-core-chat43-compose-api|Exited (255) 6 days ago|0.0.0.0:30043->3000/tcp`
- `beauty-core-chat43-compose-redis|Exited (255) 6 days ago|0.0.0.0:56380->6379/tcp`
- `beauty-core-chat43-compose-postgres|Exited (255) 6 days ago|0.0.0.0:55433->5432/tcp`
- `beauty-core-chat43-redis|Exited (255) 6 days ago|0.0.0.0:56379->6379/tcp`
- `beauty-core-chat43-postgres|Exited (255) 6 days ago|0.0.0.0:55432->5432/tcp`
- `beauty-core-dev-redis|Up 51 minutes (healthy)|0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp`
- `beauty-core-test-postgres|Up 52 minutes|0.0.0.0:5433->5432/tcp, [::]:5433->5432/tcp`
- `beauty-core-prod-postgres|Up 52 minutes (healthy)|5432/tcp`
- `beauty-core-staging-postgres|Up 52 minutes (healthy)|5432/tcp`
- `beauty-core-dev-postgres|Up 52 minutes (healthy)|0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp`

## Health HTTP local

- `beauty-core-staging-api` `/health` porta 3001: HTTP 200
- `beauty-core-prod-api` `/health` porta 3002: HTTP 200
- `beauty-core-dev-api` `/health` porta 3000: HTTP 200
- `beauty-core-dev-api` `/health` porta 3000: HTTP 200
- `beauty-core-chat43-compose-api` `/health` porta 30043: falhou sem corpo de resposta; erro controlado.
- Consultas realizadas: 5; respostas HTTP 2xx: 4
- O corpo das respostas nao foi impresso.

## Navegador e E2E

- Nenhum navegador suportado foi encontrado no PATH.
- Playwright backend instalado: False
- Playwright frontend instalado: True
- E2E de navegador nao foi iniciado neste bloco.

## Leitura dos gates

- Containers relacionados foram inventariados sem leitura de ambiente.
- Pelo menos uma consulta `/health` respondeu 2xx; isso nao comprova banco, Redis, filas ou scheduler.
- ATENCAO: ambiente de navegador/E2E nao esta comprovado.
- Migrations, logs, filas, scheduler, storage e restore nao foram alterados nem considerados aprovados sem evidencias proprias.

## Operacoes nao executadas

- Migrations: nao executadas.
- Escritas em PostgreSQL ou Redis: nao executadas.
- Worker, BullMQ ou scheduler: nao iniciados por este script.
- E2E de navegador: nao executado.
- Stage/commit/push/merge/tag/release: nao executados.
- Deploy: nao executado.
- Segredos e valores de ambiente: nao lidos nem impressos.

## Classificacao final do B04

- `PASS_WITH_ATTENTION` - preflight de staging e E2E concluido; a validacao real depende de runtime controlado, navegador funcional, banco/Redis, filas, migrations, logs e fluxos criticos.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B04.
- O script nao altera codigo e grava o relatorio na pasta unica do Chat B.
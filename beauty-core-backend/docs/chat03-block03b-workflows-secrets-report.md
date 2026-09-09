# Chat 03 - Bloco 03B - Auditoria de workflows e segredos V3

Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
Auditoria somente leitura. Valores de segredos nao foram exibidos.

## Resultado

| Status | Verificacao | Evidencia |
|---|---|---|
| PASS | Workflows rastreados | 6 arquivo(s) |
| BLOCKER | Segredos fora do Git | 0 arquivo(s) real(is), 16 literal(is) |
| PASS | Navegador ou Playwright | Chrome: C:\Program Files\Google\Chrome\Application\chrome.exe; Edge x86: C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe; Playwright UI: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-ui\node_modules\.bin\playwright.cmd |
| PASS | Integridade whitespace | 0 alerta(s) |

## Arquivos env rastreados

- beauty-core-backend/.env.dev.example [template] - chaves literais: DATABASE_URL@line9, JWT_CLIENT_REFRESH_SECRET@line19, JWT_CLIENT_SECRET@line18, JWT_REFRESH_SECRET@line17, JWT_SECRET@line16, POSTGRES_PASSWORD@line6, REDIS_PASSWORD@line13, REDIS_URL@line14, SIGNED_URL_SECRET@line33
- beauty-core-backend/.env.example [template] - chaves literais: SEED_ADMIN_PASSWORD@line88
- beauty-core-backend/.env.prod.example [template] - chaves literais: DATABASE_URL@line10, REDIS_URL@line15
- beauty-core-backend/.env.production.example [template] - chaves literais: DATABASE_URL@line5, REDIS_URL@line11
- beauty-core-backend/.env.staging.example [template] - chaves literais: DATABASE_URL@line10, REDIS_URL@line15

## Workflows e secrets

- .github/workflows/ci.yml:
- .github/workflows/codeql.yml:
- .github/workflows/docker.yml:
- .github/workflows/production.yml: DATABASE_URL_PRODUCTION, JWT_CLIENT_REFRESH_SECRET, JWT_CLIENT_SECRET, JWT_REFRESH_SECRET, JWT_SECRET, REDIS_URL_PRODUCTION
- .github/workflows/security-audit.yml:
- .github/workflows/staging.yml: DATABASE_URL_STAGING, JWT_CLIENT_REFRESH_SECRET, JWT_CLIENT_SECRET, JWT_REFRESH_SECRET, JWT_SECRET, REDIS_URL_STAGING

## Literais sensiveis

- beauty-core-backend/.env.dev.example:6:POSTGRES_PASSWORD
- beauty-core-backend/.env.dev.example:9:DATABASE_URL
- beauty-core-backend/.env.dev.example:13:REDIS_PASSWORD
- beauty-core-backend/.env.dev.example:14:REDIS_URL
- beauty-core-backend/.env.dev.example:16:JWT_SECRET
- beauty-core-backend/.env.dev.example:17:JWT_REFRESH_SECRET
- beauty-core-backend/.env.dev.example:18:JWT_CLIENT_SECRET
- beauty-core-backend/.env.dev.example:19:JWT_CLIENT_REFRESH_SECRET
- beauty-core-backend/.env.dev.example:33:SIGNED_URL_SECRET
- beauty-core-backend/.env.example:88:SEED_ADMIN_PASSWORD
- beauty-core-backend/.env.prod.example:10:DATABASE_URL
- beauty-core-backend/.env.prod.example:15:REDIS_URL
- beauty-core-backend/.env.production.example:5:DATABASE_URL
- beauty-core-backend/.env.production.example:11:REDIS_URL
- beauty-core-backend/.env.staging.example:10:DATABASE_URL
- beauty-core-backend/.env.staging.example:15:REDIS_URL

## Navegador

- Chrome: C:\Program Files\Google\Chrome\Application\chrome.exe
- Edge x86: C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
- Playwright UI: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-ui\node_modules\.bin\playwright.cmd

Nenhum valor de segredo foi gravado neste relatorio.

## Estado Git

```text
 M beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.module.ts
 M beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
 M beauty-core-backend/src/queues/workers/whatsapp.worker.ts
?? beauty-core-backend/docker-compose.chat03-candidate.override.yml
?? beauty-core-backend/docs/chat03-block01-baseline-report.md
?? beauty-core-backend/docs/chat03-block02-whatsapp-meta.md
?? beauty-core-backend/docs/chat03-block03a-infra-workflows-report.md
?? beauty-core-backend/src/modules/mensagens-whatsapp/providers/
?? beauty-core-backend/test/e2e/uploads-strict-roundtrip.e2e-spec.ts
?? beauty-core-backend/test/e2e/whatsapp-queue-demo.e2e-spec.ts
?? beauty-core-backend/test/unit/meta-whatsapp-cloud.provider.spec.ts
?? beauty-core-backend/test/unit/storage-roundtrip.spec.ts
```

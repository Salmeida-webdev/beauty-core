# Manual CI/CD — Beauty Core 1.0

## 1. Objetivo
Este documento descreve a camada CI/CD do Beauty Core 1.0, incluindo GitHub Actions, quality gates, coverage, migrations, Docker, staging, produção e smoke tests.

## 2. Workflows
Workflows identificados:
- .github/workflows/ci.yml.
- .github/workflows/docker.yml.
- .github/workflows/staging.yml.
- .github/workflows/production.yml.

## 3. CI
O CI deve validar instalação, Prisma, build, testes e coverage.

Quality gates comuns: npm run prisma:validate, npm run build, npm run test, npm run test:all:cov e npm run coverage:check.

## 4. Docker
O workflow Docker deve validar build de imagem, Dockerfile, contexto de build e ausência de segredos na imagem.

## 5. Staging
Staging deve validar deploy antes da produção, com env separado, migrations controladas, health checks e smoke tests.

## 6. Produção
Produção deve executar apenas após gates aprovados, usando secrets seguros, backup prévio, deploy controlado, smoke tests e monitoramento.

## 7. Migrations
Migrations devem usar comando controlado, preferencialmente npm run prisma:migrate:deploy em ambientes preparados.

Nunca alterar banco manualmente fora do fluxo versionado.

## 8. Coverage
Coverage é quality gate para impedir regressão de qualidade.

Scripts relacionados: npm run test:all:cov e npm run coverage:check.

## 9. Smoke Tests
Smoke tests validam a aplicação após deploy.

Devem cobrir health, readiness, documentação, métricas e endpoints críticos sem causar dano operacional.

## 10. Secrets
Secrets devem ficar no GitHub Secrets ou no provedor de infraestrutura, nunca versionados.

## 11. Checklist CI/CD
- Workflows versionados.
- Prisma validate.
- Build.
- Testes.
- Coverage.
- Docker build.
- Staging.
- Produção.
- Smoke tests.
- Secrets protegidos.

## 12. Conclusão
A camada CI/CD do Beauty Core 1.0 reduz risco de deploy, protege qualidade e prepara a plataforma para operação profissional.

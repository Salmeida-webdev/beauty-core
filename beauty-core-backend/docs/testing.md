# Testes — Beauty Core 1.0

## 1. Objetivo

Este documento consolida a estrategia de testes do backend Beauty Core 1.0.

A camada de testes existe para proteger regras de negocio, seguranca, multiempresa, autenticacao, filas, scheduler, uploads, observabilidade, LGPD e operacao enterprise.

## 2. Stack de testes

- Jest para testes unitarios.
- Jest E2E para testes ponta a ponta.
- Supertest para validacao HTTP.
- Configuracoes separadas para unit, E2E e coverage combinado.

## 3. Scripts principais

| Script | Finalidade |
|---|---|
| npm run test | Executa testes unitarios |
| npm run test:e2e | Executa testes E2E |
| npm run test:all:cov | Executa coverage combinado unit + E2E |
| npm run coverage:check | Aplica quality gate de cobertura |
| npm run build | Valida compilacao TypeScript/NestJS |
| npm run prisma:validate | Valida schema Prisma |

## 4. Configuracoes Jest

| Arquivo | Uso |
|---|---|
| jest.config.js | Testes unitarios |
| test/jest-e2e.js | Testes E2E oficiais |
| test/jest-e2e.json | Config E2E compatibilidade |
| test/jest-all.coverage.js | Coverage combinado |
| test/jest-all-json.coverage.js | Coverage combinado com json-summary |

## 5. Escopo de testes versionado

Na auditoria Chat 41 foram identificados:

- 23 arquivos de testes unitarios.
- 16 arquivos de testes E2E.
- 5 helpers de teste.
- 11 arquivos HTTP de apoio.

## 6. Areas cobertas

- Auth Admin.
- Auth Cliente.
- Refresh token e sessoes.
- Roles e SUPER_ADMIN.
- Tenant e multiempresa.
- Portal Cliente.
- Uploads.
- Health checks.
- Metrics.
- BullMQ.
- Scheduler.
- Auditoria.
- LGPD.
- Backup.
- Env validation.
- Guards.
- Performance/limites de analytics.

## 7. Regras operacionais

- Nao desativar testes para passar build.
- Nao reduzir coverage gate sem justificativa formal.
- Testes E2E devem usar ambiente isolado.
- Testes que dependem de Redis/PostgreSQL devem rodar com variaveis de teste controladas.
- Falhas de autenticacao, tenant, roles, LGPD e uploads privados devem bloquear release.

## 8. Criterio de aceite

Antes de homologar uma release:

- npm run build deve passar.
- npm run test deve passar.
- npm run test:e2e deve passar em ambiente adequado.
- npm run test:all:cov deve gerar coverage-summary.json.
- npm run coverage:check deve passar.
- npm run security:audit:prod deve passar sem vulnerabilidades de producao.

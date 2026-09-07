# Beauty Core 1.0 - Prisma Migrations Strategy

Data de geracao: 2026-06-23 20:15:21 -03:00
Contexto: Chat 43 - Encerramento Operacional Definitivo + Release Oficial

## 1. Objetivo

Este documento define a estrategia oficial de migrations Prisma do Beauty Core 1.0.
A finalidade e garantir banco rastreavel, previsivel e seguro para ambientes limpos, staging e producao.

## 2. Estado validado no Chat 43

Total de migrations detectadas: 2

Migrations detectadas:
- 20260620132053_initial_current_schema
- 20260621184000_chat39_secure_otp

Status de prisma validate: APROVADO

## 3. Politica oficial

- Nunca usar prisma db push em producao.
- Nunca alterar banco de producao manualmente sem migration versionada.
- Toda mudanca de schema deve gerar migration Prisma revisavel.
- Toda migration deve ser aplicada primeiro em ambiente local limpo.
- Toda migration deve ser aplicada em staging antes de producao.
- Em producao, usar prisma migrate deploy.
- O schema Prisma deve ser validado antes de build, testes e release.
- DATABASE_URL, DIRECT_URL e dumps reais nao devem ser versionados.

## 4. Fluxo local

Comandos locais permitidos:
- npm run prisma:validate
- npm run prisma:generate
- npm run prisma:migrate
- npm run test
- npm run test:e2e
- npm run test:all:cov
- npm run coverage:check

## 5. Fluxo de staging

Em staging, aplicar somente migrations ja versionadas.

Comandos:
- npm run docker:staging:migrate
- npm run docker:staging:migrate:status

Criterios de aceite em staging:
- containers healthy
- migrate deploy sem erro
- migrate status sem pending migrations inesperadas
- API sobe sem erro
- smoke test passa

## 6. Fluxo de producao

Em producao, aplicar migrations com procedimento controlado:
- confirmar backup recente de PostgreSQL
- confirmar DATABASE_URL e DIRECT_URL corretas
- executar prisma migrate deploy
- validar prisma migrate status
- reiniciar API
- executar smoke test de producao
- validar health, metrics e logs

Comandos:
- npm run docker:prod:migrate
- npm run docker:prod:migrate:status

## 7. Rollback

Rollback de banco deve priorizar backup e deploy da versao anterior compativel.
Nao reverter migration manualmente em producao sem plano de recuperacao.

## 8. Evidencias Chat 43

- prisma validate aprovado.
- migrations aplicadas em banco limpo para E2E.
- migrations aplicadas em banco isolado do Docker release.
- testes E2E aprovados apos migrations.
- smoke operacional aprovado contra API release real.
- release package validado sem .env real, dumps, backups ou logs.

## 9. Criterios de aceite

- schema Prisma valida sem erro.
- migrations estao versionadas.
- banco limpo recebe todas as migrations sem falha.
- E2E passa apos aplicacao de migrations.
- Docker release sobe com banco migrado.
- smoke operacional passa.
- nenhum segredo de banco entra no Git.
- producao usa migrate deploy, nunca db push.

## 10. Resultado Chat 43

Status: APROVADO

Conclusao: a estrategia Prisma do Beauty Core 1.0 esta adequada para release controlado.

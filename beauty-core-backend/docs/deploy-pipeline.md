# Pipeline de Deploy — Beauty Core 1.0

## 1. Objetivo
Este documento descreve o pipeline de deploy do Beauty Core 1.0, conectando CI/CD, Docker, staging, produção, migrations, smoke tests, rollback e validação operacional.

## 2. Visão Geral
O pipeline deve garantir que somente versões validadas tecnicamente avancem para staging e produção.

Fluxo recomendado: commit -> CI -> testes -> coverage -> Docker build -> staging -> smoke tests -> produção -> monitoramento.

## 3. Etapa CI
A etapa CI valida qualidade técnica antes de qualquer deploy.

Validações esperadas:
- Instalação de dependências.
- Prisma validate.
- Build.
- Testes.
- Coverage.
- Quality gates.

## 4. Etapa Docker
A etapa Docker valida se a aplicação consegue gerar imagem executável e segura.

Regras: não incluir .env na imagem, não expor segredos, validar Dockerfile e garantir start de produção.

## 5. Staging
Staging é o ambiente de validação antes da produção.

Deve possuir env próprio, banco próprio, Redis próprio, migrations controladas, health checks e smoke tests.

## 6. Produção
Produção só deve receber versões aprovadas no pipeline.

Antes do deploy, validar backup recente, secrets, migrations, saúde da infraestrutura e plano de rollback.

## 7. Migrations
Migrations devem ser executadas com comando controlado e rastreável.

Recomendação: usar npm run prisma:migrate:deploy em ambiente preparado.

## 8. Smoke Tests
Smoke tests confirmam se a versão implantada está funcional.

Devem validar health, readiness, API docs, métricas e rotas críticas seguras.

## 9. Rollback
Rollback deve considerar código, imagem Docker, variáveis, migrations e compatibilidade do banco.

Nunca fazer rollback cego quando migrations irreversíveis foram aplicadas.

## 10. Monitoramento Pós-Deploy
- Health checks.
- Logs.
- Métricas.
- Banco.
- Redis.
- Filas.
- DLQ.
- Erros HTTP.

## 11. Checklist do Pipeline
- CI aprovado.
- Build aprovado.
- Testes aprovados.
- Coverage aprovado.
- Docker build aprovado.
- Backup validado.
- Migrations aplicadas.
- Staging aprovado.
- Smoke tests aprovados.
- Produção monitorada.

## 12. Conclusão
O pipeline de deploy do Beauty Core 1.0 reduz risco operacional e garante previsibilidade para operação SaaS profissional.

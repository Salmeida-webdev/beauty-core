# Manual de Deploy — Beauty Core 1.0

## 1. Objetivo
Este documento descreve o processo de deploy do Beauty Core 1.0 em ambiente local, VPS, Docker, staging e produção, incluindo rollback, smoke tests e health checks.

## 2. Princípios de Deploy
- Deploy deve ser reproduzível.
- Ambiente deve ter variáveis validadas.
- Migrations devem ser controladas.
- Build e testes devem passar antes de produção.
- Smoke tests devem validar o deploy.
- Rollback deve ser planejado.

## 3. Deploy Local
Usado para desenvolvimento e validação inicial.

Fluxo: instalar dependências, configurar .env, subir banco/Redis, validar Prisma, iniciar aplicação e acessar health.

## 4. Deploy em VPS
Requisitos: Docker, Docker Compose, Git, firewall, domínio, SSL, rede protegida, volumes persistentes e backup.

PostgreSQL e Redis devem ficar protegidos por rede privada ou firewall.

## 5. Deploy Docker
Fluxo recomendado: build da imagem, subida dos containers, migrations, health checks, smoke tests e monitoramento de logs.

## 6. Deploy Staging
Staging deve validar a versão antes da produção.

Checklist staging: env separado, banco separado, Redis separado, migrations, build, testes, smoke tests e health full.

## 7. Deploy Produção
Produção exige secrets seguros, backup validado, migrations controladas, health checks, observabilidade, logs e plano de rollback.

Fluxo: validar CI, gerar imagem, aplicar migrations, subir API, validar health, validar metrics, executar smoke tests e acompanhar logs.

## 8. Migrations
Migrations devem ser aplicadas com comando controlado e nunca manualmente no banco sem versionamento.

Antes de migrations em produção, validar backup recente.

## 9. Health Checks
Endpoints importantes: /health, /health/live, /health/ready, /health/full, /health/summary e /health/queues.

Health deve validar aplicação, banco, Redis, filas e dependências críticas conforme ambiente.

## 10. Smoke Tests
Smoke tests validam se a aplicação subiu corretamente após o deploy.

Devem cobrir health, documentação, autenticação básica quando possível e endpoints críticos sem alterar dados sensíveis.

## 11. Rollback
Rollback deve considerar imagem anterior, variáveis, migrations e compatibilidade de banco.

Não aplicar rollback de código sem avaliar se a migration é reversível.

## 12. Monitoramento Pós-Deploy
- Logs da API.
- Health checks.
- Métricas Prometheus.
- Filas BullMQ.
- DLQ.
- Banco.
- Redis.
- Erros HTTP.

## 13. Checklist de Deploy
- CI passou.
- Build passou.
- Testes passaram.
- Coverage validado.
- Backup recente disponível.
- Env validado.
- Docker build validado.
- Migrations aplicadas.
- Health checks OK.
- Smoke tests OK.
- Logs sem erros críticos.

## 14. Conclusão
O deploy do Beauty Core 1.0 deve ser tratado como processo controlado, validado por CI/CD, Docker, migrations, smoke tests e observabilidade.

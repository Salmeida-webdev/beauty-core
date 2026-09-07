# Beauty Core 1.0

Beauty Core 1.0 é uma plataforma SaaS white-label para gestão de negócios de estética, beleza e serviços recorrentes.

A plataforma foi construída com foco em backend enterprise, multiempresa forte, segurança, automação operacional, observabilidade, backup, LGPD, CI/CD e preparação para operação comercial com múltiplos clientes.

---

## 1. Visão Geral

O Beauty Core 1.0 consolida uma base backend profissional para produtos SaaS white-label.

Principais capacidades:

- Backend NestJS modular.
- Multiempresa forte com empresaId.
- SUPER_ADMIN global.
- Perfis ADMIN, GERENTE, RECEPCAO, PROFISSIONAL e CLIENTE.
- Portal Cliente.
- Auth público por tenant.
- JWT, refresh token, sessões e logout.
- Uploads privados.
- Storage avançado.
- BullMQ com workers, retry, backoff e DLQ.
- Scheduler com locks distribuídos.
- Idempotência em jobs críticos.
- Testes enterprise.
- Docker para desenvolvimento, staging e produção.
- Observabilidade com health checks, Prometheus e base Grafana.
- Backup, restore, LGPD e Disaster Recovery.
- CI/CD com GitHub Actions, quality gates e smoke tests.

---

## 2. Objetivo da Plataforma

O objetivo do Beauty Core é servir como base SaaS reutilizável para negócios de estética, beleza e serviços recorrentes.

A plataforma permite gerenciar clientes, usuários, serviços, unidades, agendamentos, financeiro, comissões, fidelidade, pacotes, arquivos, notificações, campanhas e rotinas operacionais.

Do ponto de vista comercial, o Beauty Core foi projetado para venda como solução premium white-label, com possibilidade de personalização por cliente, domínio próprio, identidade visual própria e evolução para frontend web e aplicativo mobile.

---

## 3. Arquitetura

Visão simplificada:

Admin Web Futuro -> Backend NestJS -> PostgreSQL
Portal Cliente Futuro -> Backend NestJS -> Redis/BullMQ
Mobile Futuro -> Backend NestJS -> Storage/Uploads
Scheduler -> BullMQ -> Workers
GitHub Actions -> Build/Test/Coverage -> Docker/Deploy

Documentação detalhada:

- docs/architecture.md
- docs/backend-guide.md
- docs/multi-tenant.md
- docs/security.md

---

## 4. Stack Tecnológica

- Backend: NestJS + TypeScript.
- ORM: Prisma.
- Banco de dados: PostgreSQL.
- Filas: BullMQ.
- Cache, locks e filas: Redis.
- Scheduler: Nest Schedule.
- Autenticação: JWT + Refresh Token + Sessões.
- Uploads: Multer + Storage Provider.
- Observabilidade: Health Checks + Prometheus.
- Documentação de API: Swagger / OpenAPI.
- Testes: Jest + Supertest.
- Containers: Docker + Docker Compose.
- CI/CD: GitHub Actions.

---

## 5. Estrutura do Projeto

- src/: código-fonte backend.
- prisma/: schema e migrations.
- test/: testes unitários e E2E.
- docs/: documentação técnica, operacional e comercial.
- scripts/: scripts de CI, smoke, backup e operação.
- .github/workflows/: pipelines GitHub Actions.
- Dockerfile: imagem da aplicação.
- docker-compose*.yml: stacks de execução.
- package.json: scripts e dependências.

Principais áreas do backend: Auth, Auth Cliente, Portal Cliente, Empresas, Usuários, Clientes, Serviços, Unidades, Agendamentos, Financeiro, Comissões, Fidelidade, Pacotes, Arquivos, Auditoria, WhatsApp, Queues, Scheduler, Health, Backup e LGPD.

---

## 6. Instalação

Instalar dependências:

npm install

Configurar ambiente a partir dos arquivos .env*.example.

Validar Prisma:

npm run prisma:validate

Aplicar migrations em ambiente preparado:

npm run prisma:migrate:deploy

---

## 7. Desenvolvimento

Executar em modo desenvolvimento:

npm run start:dev

Swagger: /api/docs

Health checks: /health, /health/live, /health/ready, /health/full e /health/summary.

Métricas: /metrics.

---

## 8. Docker

O projeto possui arquivos Docker Compose para desenvolvimento, staging, produção, observabilidade e backup.

Arquivos identificados:

- docker-compose.yml
- docker-compose.dev.yml
- docker-compose.staging.yml
- docker-compose.prod.yml
- docker-compose.observability.yml
- docker-compose.backup.chat26.yml

Documentação relacionada: docs/docker.md, docs/deployment.md e docs/production-checklist.md.

---

## 9. Testes e Coverage

Testes principais: npm run test.

Testes E2E: npm run test:e2e.

Coverage consolidado: npm run test:all:cov e npm run coverage:check.

---

## 10. Observabilidade

A plataforma possui logs operacionais, auditoria, health checks, readiness, liveness, health completo, métricas Prometheus, base Grafana ready, métricas HTTP, métricas de dependências e métricas de filas.

Documento principal: docs/observability.md.

---

## 11. Backup, Restore e Disaster Recovery

A plataforma contempla backup PostgreSQL, backup Redis, backup de uploads, restore, limpeza de backups, RPO, RTO, Disaster Recovery e continuidade operacional.

Documentos relacionados: docs/backup-recovery.md, docs/disaster-recovery.md e docs/business-continuity.md.

---

## 12. LGPD

O Beauty Core contempla exportação de dados, anonimização, retenção, auditoria, proteção contra vazamento entre tenants e preservação de integridade financeira e operacional.

Documento principal: docs/lgpd.md.

---

## 13. CI/CD

O projeto possui workflows GitHub Actions para CI, Docker, staging, produção, quality gates, build, testes, coverage e smoke tests.

Documentos relacionados: docs/ci-cd.md e docs/deploy-pipeline.md.

---

## 14. Deploy

Fluxo recomendado: validar ambiente, instalar dependências, validar Prisma, executar build, executar testes, subir Docker, aplicar migrations, validar health checks, executar smoke tests e monitorar logs/métricas.

Documento principal: docs/deployment.md.

---

## 15. Licenciamento

Beauty Core 1.0 é uma base proprietária para operação SaaS white-label.

O uso, revenda, sublicenciamento, implantação para terceiros e exploração comercial devem ser definidos por contrato próprio.

---

## 16. Roadmap

- Frontend administrativo web.
- Portal cliente web completo.
- Aplicativo mobile.
- Painel master comercial.
- Billing SaaS.
- Integração oficial WhatsApp.
- Gateway de pagamento.
- Temas white-label.
- Relatórios avançados.
- Recursos com IA.

---

## 17. Contato Técnico

- Responsável técnico/comercial: Segundo Almeida.
- Projeto: Beauty Core 1.0.
- Área: SaaS white-label para estética, beleza e serviços recorrentes.

---

## 18. Índice da Documentação

Consulte: docs/index.md.

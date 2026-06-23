# Arquitetura Completa — Beauty Core 1.0

## 1. Objetivo

Este documento descreve a arquitetura técnica do Beauty Core 1.0, consolidando a visão de backend enterprise, multiempresa forte, segurança, filas, scheduler, storage, observabilidade, backup, LGPD, CI/CD e preparação para frontend e mobile white-label.

A arquitetura foi desenhada para permitir operação SaaS real, com reaproveitamento comercial da base, isolamento entre empresas, automações assíncronas, deploy via Docker e evolução para múltiplos clientes.

---

## 2. Visão Geral da Arquitetura

Fluxo macro da plataforma:

Admin Web Futuro -> Backend NestJS -> PostgreSQL
Portal Cliente Futuro -> Backend NestJS -> Redis
Mobile Futuro -> Backend NestJS -> BullMQ
Backend NestJS -> Storage Provider -> Uploads privados
Scheduler -> Locks Redis -> Jobs BullMQ -> Workers
Backend NestJS -> Health Checks -> Prometheus -> Grafana
GitHub Actions -> Build -> Testes -> Coverage -> Docker -> Deploy

A API é o núcleo operacional. Todas as interfaces futuras, como painel administrativo web, portal cliente web e aplicativo mobile, devem consumir a mesma base de endpoints protegidos por autenticação, roles e validação de tenant.

---

## 3. Monorepo

A visão de produto considera uma estrutura de monorepo para separar backend, frontend, mobile, painel master, clientes white-label e documentação.

Estrutura planejada:

Beauty-Core/
  beauty-core-backend/
  beauty-core-ui/
  beauty-core-mobile/
  beauty-master-panel/
  clients/
  docs/

No estado atual do Beauty Core 1.0, o backend enterprise é a base consolidada. As demais aplicações podem ser adicionadas sem alterar os contratos centrais da API.

---

## 4. Backend

O backend é construído em NestJS com TypeScript e segue uma organização modular por domínio.

Módulos principais:

- Auth Admin.
- Auth Cliente.
- Cliente Area.
- Empresas.
- Usuários.
- Clientes.
- Serviços.
- Unidades.
- Agendamentos.
- Financeiro.
- Comissões.
- Fidelidade.
- Benefícios.
- Cupons.
- Pacotes.
- Arquivos.
- Auditoria.
- Notificações.
- WhatsApp.
- Queues.
- Scheduler.
- Health.
- Observabilidade.
- Backup.
- LGPD.

Cada módulo deve concentrar controller, service, DTOs, guards, policies, integrações Prisma e testes quando aplicável.

---

## 5. Frontend Planejado

O frontend administrativo planejado deve ser uma aplicação web premium, responsiva e preparada para white-label.

Responsabilidades esperadas:

- Login administrativo.
- Dashboard operacional.
- Gestão de clientes.
- Agenda.
- Serviços.
- Unidades.
- Financeiro.
- Comissões.
- Fidelidade.
- Pacotes.
- Campanhas.
- Arquivos.
- Auditoria.
- Relatórios.
- Configurações.
- Painel SUPER_ADMIN.

Stack sugerida: React, Next.js, TypeScript, design system próprio e consumo seguro dos tokens.

---

## 6. Mobile Planejado

O aplicativo mobile planejado deve consumir principalmente os endpoints do Portal Cliente.

Funcionalidades esperadas:

- Login por telefone e código.
- Dados do cliente.
- Próximos agendamentos.
- Histórico.
- Pacotes.
- Pontos.
- Benefícios.
- Notificações.
- Mensagens.
- Campanhas.

Stack sugerida: React Native ou Flutter, com suporte futuro a push notifications e personalização white-label.

---

## 7. Banco de Dados

O banco principal é PostgreSQL, acessado via Prisma ORM.

Características principais:

- Modelagem relacional.
- Multiempresa por empresaId.
- Índices por tenant.
- Uniques compostos por empresa quando necessário.
- Relações explícitas entre entidades.
- Auditoria operacional.
- Sessões.
- Entidades financeiras.
- Entidades de fidelidade.
- Entidades de pacotes.
- Entidades de comunicação.
- Entidades de backup e LGPD.

Regra crítica: toda entidade tenant-aware deve ser consultada com filtro de empresaId, exceto operações globais explicitamente autorizadas para SUPER_ADMIN.

---

## 8. Redis

Redis é usado como infraestrutura operacional para filas, locks e idempotência.

Usos principais:

- BullMQ.
- Locks distribuídos.
- Controle de idempotência.
- Health checks de dependência.
- Apoio a rotinas de scheduler.

Em produção, Redis deve operar protegido por senha, rede privada e política clara de persistência.

---

## 9. BullMQ

BullMQ processa tarefas assíncronas e desacopla operações demoradas da API HTTP.

Filas principais:

- notificacoes.
- whatsapp.
- campanhas.
- aniversarios.
- relatorios.
- dlq.

Recursos enterprise: retry, backoff, DLQ, idempotência por jobId, workers com concorrência configurável, limpeza de jobs e monitoramento.

---

## 10. Scheduler

O Scheduler executa rotinas recorrentes e deve usar locks distribuídos para evitar execução duplicada em ambientes com múltiplas instâncias.

Rotinas típicas:

- Aniversários.
- Lembretes.
- Pacotes vencidos.
- Relatórios diários.
- Limpeza de arquivos.
- Limpeza de sessões.
- Limpeza de filas.
- Backups quando configurados.

---

## 11. Storage

A arquitetura de arquivos usa abstração de storage provider.

Recursos:

- Upload público.
- Upload privado.
- Checksum.
- Download protegido.
- URL assinada.
- Controle de visibilidade.
- Caminhos separados por empresa.
- Preparação para S3, Cloudinary ou storage externo.

Arquivos privados não devem ser expostos diretamente por rota pública.

---

## 12. Observabilidade

A observabilidade contempla health checks, métricas, logs e auditoria.

Endpoints esperados:

- /health.
- /health/live.
- /health/ready.
- /health/full.
- /health/summary.
- /health/queues.
- /metrics.

A base é compatível com Prometheus e preparada para dashboards Grafana.

---

## 13. CI/CD

A camada de CI/CD usa GitHub Actions para validar qualidade e preparar deploy.

Workflows identificados:

- ci.yml.
- docker.yml.
- staging.yml.
- production.yml.

Quality gates esperados: build, testes, coverage, Prisma validate, Docker build e smoke tests.

---

## 14. Backup e Disaster Recovery

A arquitetura contempla backup e recuperação de componentes críticos.

Itens protegidos:

- PostgreSQL.
- Redis.
- Uploads.
- Configurações operacionais.

O processo de restore deve ser validado periodicamente, com documentação de RPO, RTO e plano de continuidade operacional.

---

## 15. Multiempresa

O isolamento multiempresa é um dos pilares da plataforma.

Camadas de proteção:

- empresaId nas entidades.
- Tenant Validation.
- JWT com contexto.
- Roles.
- SUPER_ADMIN global controlado.
- ADMIN restrito ao tenant.
- CLIENTE restrito ao próprio cadastro.
- Queries filtradas por empresa.
- Proteção contra IDOR.
- Auditoria.
- Uploads privados separados por empresa.

Fluxo conceitual:

Request autenticada -> JWT -> Role -> Tenant Validation -> Query por empresaId -> Resposta isolada

---

## 16. Conclusão

A arquitetura do Beauty Core 1.0 está preparada para operação SaaS real, com backend enterprise, segurança multiempresa, processamento assíncrono, observabilidade, backup, LGPD, CI/CD e caminho claro para expansão comercial white-label.

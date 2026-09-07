# ADR 0001 — Architecture Overview

## Status

Aceito.

## Contexto

O Beauty Core 1.0 foi construído como backend SaaS multiempresa para clínicas de estética, beleza e serviços recorrentes, com foco em operação white-label, segurança forte, escalabilidade operacional, observabilidade e futura expansão para web/mobile.

A arquitetura precisa suportar:

- múltiplas empresas isoladas logicamente;
- autenticação administrativa e autenticação de cliente final;
- agendamentos, financeiro, fidelidade, pacotes, notificações e WhatsApp;
- jobs assíncronos com BullMQ;
- auditoria, health checks e métricas;
- backup, restore, LGPD e disaster recovery;
- CI/CD e deploy controlado.

## Decisão

A arquitetura oficial do Beauty Core 1.0 utiliza:

- NestJS como framework backend;
- TypeScript como linguagem principal;
- PostgreSQL como banco relacional;
- Prisma ORM como camada de acesso ao banco;
- Redis como infraestrutura de cache, filas, locks e sessões operacionais;
- BullMQ para filas e workers;
- Docker para empacotamento e execução;
- GitHub Actions para CI/CD;
- Swagger para documentação técnica de API;
- Prometheus/Grafana como base de observabilidade;
- documentação operacional versionada no repositório.

A aplicação mantém arquitetura modular por domínio, com módulos independentes para autenticação, empresas, usuários, clientes, agendamentos, financeiro, fidelidade, arquivos, notificações, WhatsApp, filas, auditoria, LGPD, backup e health.

## Consequências

### Positivas

- Organização modular facilita manutenção e expansão.
- Prisma reduz inconsistência entre código e banco.
- Redis/BullMQ separa processamento assíncrono da API.
- Docker melhora repetibilidade de deploy.
- CI/CD reduz risco de regressão.
- Observabilidade e runbooks melhoram operação em produção.

### Negativas

- Redis passa a ser dependência operacional crítica.
- Multiempresa exige disciplina permanente em queries, validações e permissões.
- O custo de operação cresce conforme filas, backups, métricas e retenção aumentam.
- A documentação precisa ser mantida junto com alterações arquiteturais.

## Critérios de aceite

- `npm run prisma:validate` deve passar.
- `npm run build` deve passar.
- Testes unitários e e2e devem passar.
- Health checks devem cobrir dependências críticas.
- Novas decisões arquiteturais relevantes devem gerar ADR.

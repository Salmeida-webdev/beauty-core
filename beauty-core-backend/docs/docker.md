# Manual Docker — Beauty Core 1.0

## 1. Objetivo
Este documento descreve o uso de Docker no Beauty Core 1.0 para desenvolvimento, staging, produção, observabilidade, volumes, backup, restore e troubleshooting.

## 2. Arquivos Docker Identificados
- Dockerfile.
- docker-compose.yml.
- docker-compose.dev.yml.
- docker-compose.staging.yml.
- docker-compose.prod.yml.
- docker-compose.observability.yml.
- docker-compose.backup.chat26.yml.

## 3. Dockerfile
O Dockerfile deve gerar uma imagem production-ready, com build controlado, dependências adequadas e execução por usuário não-root quando configurado.

Boas práticas: não copiar .env para imagem, não expor segredos, reduzir superfície da imagem e validar start:prod.

## 4. Desenvolvimento
O ambiente de desenvolvimento deve facilitar execução local com API, PostgreSQL e Redis.

Comandos comuns: docker compose up -d --build, docker compose ps e docker compose logs.

## 5. Staging
Staging deve simular produção com variáveis próprias, banco separado, Redis separado, migrations controladas e smoke tests.

## 6. Produção
Produção deve usar compose próprio, secrets seguros, volumes persistentes, health checks, restart policy, logs e rede protegida.

PostgreSQL e Redis não devem ser expostos publicamente.

## 7. Volumes
Volumes importantes: banco PostgreSQL, Redis quando aplicável, uploads e backups.

Uploads privados devem ter persistência e política de backup.

## 8. Variáveis de Ambiente
Usar arquivos .env por ambiente apenas localmente ou secrets do provedor em produção.

Arquivos de exemplo identificados: .env.example, .env.dev.example, .env.staging.example e .env.prod.example.

## 9. Backup e Restore
Docker deve preservar volumes e permitir execução de scripts de backup/restore de PostgreSQL, Redis e uploads.

Restore deve ser testado em ambiente isolado antes de produção.

## 10. Observabilidade
A stack pode incluir Prometheus e Grafana via docker-compose.observability.yml.

Endpoints importantes: /health, /health/full, /health/queues e /metrics.

## 11. Troubleshooting
- Container não sobe.
- API sem conexão com banco.
- Redis recusando conexão.
- Migration não aplicada.
- Uploads não persistem.
- Health check falhando.
- Variável de ambiente ausente.

Ações: verificar docker compose ps, logs, env, volumes, rede, health e migrations.

## 12. Checklist Docker
- Dockerfile validado.
- Compose por ambiente.
- Redis protegido.
- PostgreSQL protegido.
- Volumes persistentes.
- Health checks.
- Logs acessíveis.
- .env fora do Git.
- Smoke tests após subida.

## 13. Conclusão
A camada Docker do Beauty Core 1.0 permite execução local, staging e produção com segurança operacional e previsibilidade.

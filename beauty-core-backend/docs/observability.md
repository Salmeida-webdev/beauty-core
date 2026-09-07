# Manual de Observabilidade — Beauty Core 1.0

## 1. Objetivo
Este documento descreve a observabilidade do Beauty Core 1.0, incluindo logs, request ID, correlation ID, Prometheus, métricas, alertas, Grafana e health checks.

## 2. Princípios
- Detectar falhas rapidamente.
- Diagnosticar problemas com rastreabilidade.
- Medir saúde da API, banco, Redis e filas.
- Apoiar operação SaaS em produção.
- Evitar logs com dados sensíveis.

## 3. Logs
Logs devem registrar eventos operacionais relevantes, erros, falhas de dependências, execuções de scheduler, jobs BullMQ e incidentes.

Nunca registrar senhas, tokens, refresh tokens, hashes, segredos, documentos sensíveis ou payloads privados completos.

## 4. Request ID e Correlation ID
Request ID identifica uma requisição individual. Correlation ID ajuda a rastrear uma operação que passa por API, fila, worker e scheduler.

Uso recomendado: incluir IDs em logs, auditoria, métricas e erros operacionais.

## 5. Health Checks
Endpoints principais:
- /health.
- /health/live.
- /health/ready.
- /health/full.
- /health/summary.
- /health/queues.

Health deve indicar status da aplicação, banco, Redis, filas e dependências críticas conforme ambiente.

## 6. Prometheus
Prometheus coleta métricas da aplicação pelo endpoint /metrics.

Métricas esperadas: requisições HTTP, erros HTTP, latência, dependências, filas, jobs, aplicação e saúde operacional.

## 7. Métricas
Métricas relevantes:
- Total de requisições.
- Total de erros.
- Duração de requisições.
- Latência de dependências.
- Saúde do banco.
- Saúde do Redis.
- Jobs ativos, aguardando e falhos.
- Tamanho da DLQ.

## 8. Alertas
Alertas recomendados:
- API indisponível.
- Banco indisponível.
- Redis indisponível.
- Aumento de erros 5xx.
- DLQ crescendo.
- Latência elevada.
- Falha de backup.
- Disco próximo do limite.

## 9. Grafana
Grafana deve exibir dashboards para API, banco, Redis, filas, jobs, erros, latência e disponibilidade.

A base está preparada para Prometheus/Grafana ready.

## 10. Auditoria
Auditoria complementa observabilidade registrando ações sensíveis, usuários, clientes, empresaId, rota, módulo, recurso, status e mensagem.

## 11. Troubleshooting
- Verificar /health/full.
- Verificar /metrics.
- Verificar logs da API.
- Verificar logs dos workers.
- Verificar banco e Redis.
- Verificar DLQ.
- Verificar último deploy.

## 12. Conclusão
A observabilidade do Beauty Core 1.0 fornece base de operação profissional para monitoramento, diagnóstico, auditoria e resposta a incidentes.

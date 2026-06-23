# Manual Operacional — Beauty Core 1.0

## 1. Objetivo
Este documento descreve rotinas diárias, semanais, mensais, monitoramento, backup, incidentes, recuperação e checklist operacional do Beauty Core 1.0.

## 2. Rotinas Diárias
- Verificar health checks.
- Verificar logs da API.
- Verificar logs dos workers.
- Verificar filas BullMQ.
- Verificar DLQ.
- Confirmar execução dos schedulers críticos.
- Verificar falhas de login ou erros 5xx.
- Confirmar status do backup quando houver rotina diária.

## 3. Rotinas Semanais
- Revisar auditoria de ações sensíveis.
- Revisar usuários administrativos.
- Revisar crescimento de uploads.
- Revisar uso de banco.
- Revisar uso de Redis.
- Revisar jobs falhos.
- Revisar alertas recorrentes.
- Testar smoke tests em staging.

## 4. Rotinas Mensais
- Testar restore em ambiente isolado.
- Revisar política de retenção.
- Revisar secrets e acessos.
- Revisar custos de infraestrutura.
- Revisar performance.
- Revisar documentação operacional.
- Revisar checklist de produção.

## 5. Monitoramento
Monitorar API, banco, Redis, filas, DLQ, uploads, backup, disco, CPU, memória, latência, erros HTTP e métricas Prometheus.

Endpoints principais: /health, /health/full, /health/queues e /metrics.

## 6. Backup
Backup deve cobrir PostgreSQL, Redis quando aplicável e uploads.

Rotinas de backup devem gerar logs e alertas de falha.

## 7. Incidentes
Tipos de incidente: API fora do ar, banco indisponível, Redis indisponível, filas paradas, DLQ crescente, falha de deploy, vazamento de dados, falha de backup e perda de uploads.

Processo: identificar, isolar, preservar logs, corrigir, validar, documentar e prevenir recorrência.

## 8. Recuperação
Recuperação pode envolver rollback, restore de banco, restore de uploads, limpeza de filas, reprocessamento de DLQ e correção de configuração.

Toda recuperação crítica deve ser documentada.

## 9. Checklist Operacional
- Health OK.
- Banco OK.
- Redis OK.
- Filas OK.
- DLQ controlada.
- Backups OK.
- Logs sem erro crítico.
- Métricas disponíveis.
- Uploads persistentes.
- CI/CD saudável.
- Smoke tests válidos.

## 10. Conclusão
A operação do Beauty Core 1.0 exige rotina, monitoramento, backup, resposta a incidentes e disciplina de deploy para manter nível enterprise.

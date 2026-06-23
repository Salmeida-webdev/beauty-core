# Beauty Core 1.0 — Plano de Continuidade Operacional

## Objetivo

Garantir retorno operacional do Beauty Core 1.0 após falhas técnicas, perda de infraestrutura ou corrupção de dados.

## Componentes críticos

| Componente | Criticidade | Estratégia |
|---|---:|---|
| PostgreSQL | Crítico | Backup diário e restore validado |
| Uploads private | Crítico | Backup diário |
| Uploads public | Importante | Backup diário |
| Redis | Importante | Backup documentado e recriação possível |
| API NestJS | Crítico | Docker e build versionado |
| Variáveis `.env` | Crítico | Armazenamento seguro externo |
| Docker Compose | Crítico | Versionado |
| Prometheus/Grafana | Importante | Observabilidade e alertas |

## Prioridade de recuperação

1. PostgreSQL.
2. Uploads privados.
3. Uploads públicos.
4. Redis.
5. API.
6. Observabilidade.
7. Logs históricos.

## Troca de VPS

1. Provisionar VPS.
2. Instalar Docker.
3. Clonar repositório.
4. Configurar `.env`.
5. Restaurar banco.
6. Restaurar uploads.
7. Subir Redis.
8. Subir API.
9. Validar health.
10. Atualizar DNS.

## Perda de Redis

Redis não deve ser fonte primária de verdade.

Procedimento:

1. Subir Redis limpo.
2. Reiniciar API/workers.
3. Validar filas.
4. Validar Scheduler.
5. Reprocessar DLQ quando necessário.

## Perda de container

1. Rebuild.
2. Recreate.
3. Validar volumes.
4. Validar health.
5. Validar logs.

---

## Scheduler de Backup e Retenção — Chat 36

| Rotina | Cron | Comportamento |
|---|---:|---|
| backup_postgres_diario | 0 2 * * * | Simulado por padrão |
| backup_uploads_diario | 30 2 * * * | Simulado por padrão |
| backup_semanal_completo | 0 3 * * 0 | Simulado por padrão |
| limpeza_operacional | 0 4 * * * | Executa limpeza de sessões, uploads temporários e retenção de jobs em modo seguro |

Backups continuam em modo seguro até habilitar explicitamente BACKUP_EXECUTION_ENABLED=true.

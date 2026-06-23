# Beauty Core 1.0 — Disaster Recovery Plan

## Objetivo

Definir procedimentos de recuperação para incidentes críticos no Beauty Core 1.0.

## Recovery Objectives

| Indicador | Valor inicial |
|---|---:|
| RPO | 24 horas |
| RTO | 4 horas |

## Banco PostgreSQL corrompido

Impacto: crítico.

Procedimento:

1. Parar API.
2. Validar backup mais recente.
3. Restaurar em banco vazio quando possível.
4. Executar migrations se necessário.
5. Validar health.
6. Validar login admin.
7. Validar empresas, clientes, agendamentos e financeiro.
8. Subir API.

Tempo estimado: 2 a 4 horas.

## Redis perdido

Impacto: médio.

Procedimento:

1. Subir Redis limpo ou restaurar backup.
2. Reiniciar API/workers.
3. Validar BullMQ.
4. Validar Scheduler.
5. Validar DLQ.
6. Validar health de filas.

Tempo estimado: 30 a 90 minutos.

## Uploads perdidos

Impacto: alto, principalmente uploads privados.

Procedimento:

1. Parar API.
2. Restaurar backup de uploads.
3. Validar permissões.
4. Validar download protegido.
5. Validar URL assinada.
6. Subir API.

Tempo estimado: 1 a 3 horas.

## VPS perdida

Impacto: crítico.

Procedimento:

1. Provisionar nova VPS.
2. Instalar Docker e Docker Compose.
3. Clonar repositório.
4. Configurar `.env`.
5. Restaurar PostgreSQL.
6. Restaurar uploads.
7. Restaurar Redis se aplicável.
8. Subir containers.
9. Validar health, métricas, Swagger e endpoints críticos.
10. Apontar domínio.

Tempo estimado: 3 a 8 horas.

## Container corrompido

Impacto: médio.

Procedimento:

1. Rebuild da imagem.
2. Recriar container.
3. Manter volumes.
4. Validar health.
5. Validar logs.

Tempo estimado: 30 a 120 minutos.

## Migration quebrada

Impacto: alto.

Procedimento:

1. Parar deploy.
2. Não aplicar novas migrations.
3. Restaurar backup pré-migration em ambiente de teste.
4. Corrigir migration.
5. Revalidar build e testes.
6. Aplicar novamente em janela controlada.

Tempo estimado: 2 a 6 horas.

---

## Scheduler de Backup e Retenção — Chat 36

| Rotina | Cron | Comportamento |
|---|---:|---|
| backup_postgres_diario | 0 2 * * * | Simulado por padrão |
| backup_uploads_diario | 30 2 * * * | Simulado por padrão |
| backup_semanal_completo | 0 3 * * 0 | Simulado por padrão |
| limpeza_operacional | 0 4 * * * | Executa limpeza de sessões, uploads temporários e retenção de jobs em modo seguro |

Backups continuam em modo seguro até habilitar explicitamente BACKUP_EXECUTION_ENABLED=true.

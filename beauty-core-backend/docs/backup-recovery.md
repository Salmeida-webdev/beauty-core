# Manual de Backup e Recuperação — Beauty Core 1.0

## 1. Objetivo
Este documento consolida backup PostgreSQL, backup Redis, backup de uploads, restore, RPO, RTO, Disaster Recovery e continuidade operacional.

## 2. Componentes Críticos
- PostgreSQL.
- Redis.
- Uploads públicos e privados.
- Arquivos de configuração de ambiente.
- Logs operacionais quando necessários.
- Documentação de restore.

## 3. Backup PostgreSQL
PostgreSQL é o componente mais crítico da plataforma.

Deve conter dados de empresas, usuários, clientes, agendamentos, financeiro, pacotes, sessões, auditoria, LGPD e configurações.

Recomendações: backup automatizado, retenção, verificação de integridade, armazenamento seguro e teste periódico de restore.

## 4. Backup Redis
Redis pode conter filas, locks, estados operacionais e dados temporários.

A criticidade depende da política de persistência e da tolerância a reprocessamento de jobs.

## 5. Backup de Uploads
Uploads privados e públicos devem ser preservados com política clara de retenção.

Uploads privados precisam de proteção adicional, pois podem conter dados pessoais ou documentos sensíveis.

## 6. Restore
Restore deve ser documentado, testado e executado inicialmente em ambiente isolado.

Fluxo: parar serviços, restaurar banco, restaurar uploads, restaurar Redis quando aplicável, aplicar env correto, subir aplicação, validar health e smoke tests.

## 7. RPO
RPO define a perda máxima aceitável de dados.

Para SaaS operacional, recomenda-se RPO baixo para PostgreSQL e uploads críticos.

## 8. RTO
RTO define o tempo máximo aceitável para restaurar a operação.

Deve considerar infraestrutura, volume de dados, DNS, containers, banco, uploads e validações.

## 9. Disaster Recovery
Plano de DR deve cobrir perda de banco, perda de VPS, corrupção de uploads, falha de deploy, indisponibilidade de Redis e incidente de segurança.

## 10. Continuidade Operacional
A continuidade operacional exige backups recentes, documentação atualizada, responsáveis definidos, restore testado e monitoramento ativo.

## 11. Checklist
- Backup PostgreSQL configurado.
- Backup Redis avaliado.
- Backup uploads configurado.
- Retenção definida.
- Restore testado.
- RPO definido.
- RTO definido.
- Logs de backup monitorados.
- Acesso restrito aos backups.

## 12. Conclusão
Backup e recuperação no Beauty Core 1.0 são parte central da confiabilidade operacional e da maturidade enterprise da plataforma.

## Validacao automatizada de restore - Chat 39

A validacao oficial de restore PostgreSQL deve ser executada em banco temporario isolado, sem sobrescrever o banco operacional.

Comando recomendado:

npm run backup:validate-restore

Comportamento:

- Localiza o backup PostgreSQL mais recente em backups/postgres quando BackupFile nao for informado.
- Cria um banco temporario beauty_core_restore_validation_YYYYMMDDHHMMSS.
- Restaura o backup no banco temporario.
- Valida se existem tabelas restauradas.
- Remove o banco temporario ao final.
- Registra evidencias em logs/backups/restore-validation.log.

Para ambientes sem backup ainda disponivel:

npm run backup:validate-restore:skip

Regra de aceite: nenhuma release deve ser homologada sem pelo menos uma validacao de restore em ambiente staging ou banco temporario isolado.

## Execucao real controlada de backup - Chat 39

Por seguranca, o BackupService nao executa scripts reais por padrao.

Modo padrao:

BACKUP_EXECUTION_ENABLED=false

Nesse modo, endpoints e schedulers registram execucao SIMULADA, sem chamar Docker, pg_dump, redis-cli ou tar.

Modo real controlado:

BACKUP_EXECUTION_ENABLED=true

Nesse modo, o BackupService executa os scripts oficiais:

- scripts/backup/postgres-backup.ps1
- scripts/uploads/uploads-backup.ps1
- scripts/backup/redis-backup.ps1
- scripts/backup/validate-restore.ps1

Regra operacional: habilitar BACKUP_EXECUTION_ENABLED=true apenas em staging/producao controlados, com Docker ativo, credenciais validas e storage de backup protegido.

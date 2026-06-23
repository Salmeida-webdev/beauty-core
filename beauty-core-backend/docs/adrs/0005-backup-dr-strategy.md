# ADR 0005 — Backup and Disaster Recovery Strategy

## Status

Aceito.

## Contexto

O Beauty Core gerencia dados sensíveis de clientes, empresas, agenda, financeiro, sessões, arquivos privados, auditoria e LGPD.

A plataforma precisa suportar backup, restore, disaster recovery, continuidade operacional e resposta a incidentes de perda ou corrupção de dados.

## Decisão

A estratégia oficial inclui:

- backup de PostgreSQL;
- backup de Redis quando aplicável;
- backup de uploads privados/públicos;
- documentação de restore;
- matriz de criticidade de dados;
- políticas de retenção LGPD;
- endpoints administrativos de backup quando disponíveis;
- validação operacional via health checks e runbooks;
- restore testado em ambiente controlado antes de produção.

## Consequências

### Positivas

- Redução de risco de perda definitiva de dados.
- Processo de recuperação mais previsível.
- Base para SLA/SLO de backup e restore.
- Melhor governança LGPD.

### Negativas

- Backups aumentam custo de armazenamento.
- Restore precisa ser testado periodicamente.
- Uploads podem crescer mais rápido que o banco.
- Retenção mal configurada pode gerar risco jurídico ou custo excessivo.

## Controles obrigatórios

- segredos não devem ser incluídos em backups versionados;
- backups devem ser armazenados fora do container;
- restore deve ser documentado e testado;
- falhas de backup devem gerar alerta;
- acesso a backup deve ser restrito;
- anonimização LGPD não deve quebrar integridade financeira/auditoria.

## Critérios de aceite

- Backup de PostgreSQL executável.
- Backup de uploads executável.
- Restore documentado.
- RPO e RTO definidos.
- Falha de backup possui playbook.

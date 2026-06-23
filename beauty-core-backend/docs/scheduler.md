# Manual Scheduler — Beauty Core 1.0

## 1. Objetivo
Este documento descreve o Scheduler do Beauty Core 1.0, incluindo cron jobs, rotinas, timezone, auditoria, integração BullMQ e troubleshooting.

## 2. Papel do Scheduler
O Scheduler executa rotinas recorrentes da plataforma e deve delegar tarefas pesadas para BullMQ sempre que necessário.

Fluxo conceitual: Cron -> Lock Redis -> Consulta segura -> Enfileira job -> Worker processa.

## 3. Rotinas Principais
- Aniversários de clientes.
- Lembretes de agendamento.
- Pacotes vencidos.
- Relatórios diários.
- Limpeza de arquivos órfãos.
- Limpeza de sessões expiradas.
- Limpeza de jobs BullMQ.
- Backups programados quando configurados.

## 4. Cron Jobs
Cron jobs devem ter frequência clara, escopo controlado e logs suficientes para diagnóstico.

Rotinas críticas não devem executar lógica pesada diretamente no processo do cron. Elas devem enfileirar jobs.

## 5. Timezone
Rotinas de negócio devem respeitar timezone operacional, principalmente aniversário, lembrete, relatório diário e campanhas.

A documentação operacional deve registrar o timezone usado em produção.

## 6. Locks Distribuídos
Scheduler em ambiente com múltiplas instâncias precisa de locks para evitar execução duplicada.

Regras: lock com TTL, liberação ao final, log de aquisição/liberação e tratamento para falhas.

## 7. Integração BullMQ
O Scheduler deve usar BullMQ para tarefas assíncronas, como mensagens, campanhas, aniversários, relatórios e limpezas demoradas.

Jobs enviados pelo Scheduler devem carregar empresaId quando forem tenant-aware.

## 8. Auditoria
Rotinas sensíveis devem gerar rastreabilidade.

Auditar quando aplicável: início, conclusão, falha, quantidade processada, empresaId, jobId e mensagem de erro.

## 9. Segurança Multiempresa
Scheduler não pode misturar dados de empresas diferentes.

Toda rotina tenant-aware deve consultar dados filtrando por empresaId e processar cada empresa de forma isolada.

## 10. Observabilidade
Indicadores úteis: última execução, duração, status, falhas, jobs gerados, registros processados e rotinas puladas por lock.

## 11. Troubleshooting
- Cron não executa.
- Lock preso ou expirando cedo.
- Rotina duplicada.
- Timezone incorreto.
- Jobs não chegam na fila.
- Worker não processa jobs gerados.

Ações: verificar logs, Redis, locks, variáveis de ambiente, health de filas e horário do servidor.

## 12. Checklist Scheduler
- Rotinas críticas com lock.
- Jobs pesados enviados para BullMQ.
- Timezone definido.
- Logs de início e fim.
- Falhas rastreáveis.
- empresaId respeitado.
- Health e métricas monitorados.

## 13. Conclusão
O Scheduler do Beauty Core 1.0 automatiza rotinas operacionais críticas com segurança, isolamento multiempresa e integração com BullMQ.

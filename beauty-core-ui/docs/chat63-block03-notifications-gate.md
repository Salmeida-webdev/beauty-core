# CHAT 63 — BLOCO 03/15

## Gate de Notificações do Portal Cliente

### Resultado

NOTIFICATIONS: BLOCKED

### Evidência
Foram encontrados módulos backend relacionados a notificações, incluindo serviços, DTOs, workers e controllers. A auditoria não comprovou contrato específico para usuário CLIENTE autenticado com ownership individual e tenant derivado com segurança.

### Decisão
Nenhuma página, query, mutation, endpoint ou navegação de notificações será implementada neste bloco.

### Motivo
Não é permitido transformar endpoint administrativo em endpoint do Portal Cliente nem inventar rotas como GET /portal/notificacoes, PATCH /portal/notificacoes/:id/lida ou similares.

### Capacidades
- Listar notificações: NOT IMPLEMENTABLE WITH CURRENT CONTRACT
- Contagem de não lidas: NOT IMPLEMENTABLE WITH CURRENT CONTRACT
- Marcar como lida: NOT IMPLEMENTABLE WITH CURRENT CONTRACT
- Marcar todas como lidas: NOT IMPLEMENTABLE WITH CURRENT CONTRACT
- Arquivar ou excluir: NOT IMPLEMENTABLE WITH CURRENT CONTRACT

### Segurança
Nenhum notificationId, clienteId ou empresaId será aceito pelo frontend como autoridade de acesso.

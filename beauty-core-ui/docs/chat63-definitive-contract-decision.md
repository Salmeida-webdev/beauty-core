# CHAT 63 — BLOCO 08/15

## Matriz definitiva de contratos do Portal Cliente

| Capacidade | Evidência real | Cliente autorizado | Decisão |
|---|---|---:|---|
| Listar notificações | Controller /notificacoes com roles administrativas | Não | BLOCKED |
| Notificações não lidas | Endpoint administrativo e filtro por usuarioId | Não comprovado | BLOCKED |
| Resumo de notificações | Endpoint administrativo | Não | BLOCKED |
| Marcar como lida | PATCH /notificacoes/:id/lida administrativo | Não | BLOCKED |
| Arquivar notificação | PATCH /notificacoes/:id/arquivar administrativo | Não | BLOCKED |
| Excluir notificação | DELETE /notificacoes/:id administrativo | Não | BLOCKED |
| Listar arquivos | Storage interno sem controller Portal comprovado | Não | BLOCKED |
| Download | Storage interno sem autorização CLIENTE comprovada | Não | BLOCKED |
| Preview | Nenhum contrato Portal comprovado | Não | BLOCKED |
| Upload | Upload administrativo/privado sem contrato CLIENTE | Não | BLOCKED |
| Listar mensagens | /mensagens-whatsapp com roles administrativas | Não | BLOCKED |
| Enviar WhatsApp | POST /mensagens-whatsapp/enviar administrativo | Não | BLOCKED |
| Templates WhatsApp | Roles ADMIN/GERENTE | Não | BLOCKED |
| Campanhas WhatsApp | Capacidade administrativa | Não | BLOCKED |
| Realtime/polling | Nenhum contrato Portal comprovado | Não | OUT OF SCOPE |

## Decisão arquitetural

Nenhuma feature funcional de notificações, arquivos, documentos, mensagens ou WhatsApp será adicionada ao Portal Cliente neste Chat 63, porque o backend atual não possui contratos autorizados ao papel CLIENTE.

## Não permitido

- Reutilizar endpoint Admin no Portal.
- Alterar roles apenas para liberar o frontend.
- Criar endpoint paralelo sem planejamento backend autorizado.
- Usar clienteId, usuarioId ou empresaId enviados pelo navegador como autoridade.
- Criar páginas vazias com aparência de funcionalidade existente.

## Resultado do Chat 63

A camada funcional pretendida está bloqueada pelo contrato backend. Os blocos restantes devem limitar-se a documentação, validação, regressão da foundation existente, quality gate e registro técnico da pendência.

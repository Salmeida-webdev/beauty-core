# CHAT 63 — CORREÇÃO DA AUDITORIA DE CONTRATOS

## Erro corrigido

A auditoria inicial analisou os módulos administrativos e não identificou inicialmente o módulo específico ClienteArea. A análise posterior confirmou contratos reais e seguros para o Portal Cliente.

## Contrato confirmado

- Controller: cliente-area.controller.ts
- Guard: ClienteAuthGuard
- Service: cliente-area.service.ts
- Ownership: clienteId derivado do token
- Tenant: empresaId derivada da autenticação
- Validação: cliente ativo e pertencente à empresa autenticada

## Capacidades suportadas

- GET /cliente-area/notificacoes
- GET /cliente-area/notificacoes/nao-lidas
- PATCH /cliente-area/notificacoes/:id/lida
- GET /cliente-area/mensagens-whatsapp
- GET /cliente-area/historico

## Capacidades ainda bloqueadas

- Envio de WhatsApp pelo cliente: BLOCKED
- Upload de arquivos pelo cliente: BLOCKED
- Download de documentos pelo cliente: BLOCKED

## Decisão

Os documentos anteriores que classificaram notificações e histórico de mensagens como BLOCKED devem ser considerados superados por esta evidência específica do ClienteArea. A implementação frontend deve reutilizar este contrato existente, sem alterar roles administrativas e sem criar endpoints paralelos.

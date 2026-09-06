# Chat 65 — Bloco 11 — Gate de Envio WhatsApp

## Resultado

- Evidências produtivas: 2448
- Métodos autoritativos de envio: 9
- Mutations Portal de envio: 0

## Decisão

READ-ONLY — envio pelo Portal permanece bloqueado até existir contrato autorizado.

O frontend não poderá enviar mensagens diretamente, alterar destinatários
ou fabricar um endpoint. A implementação deverá reutilizar regra autoritativa,
empresaId, clienteId e validação de conteúdo.

## Correção da evidência

A análise foi restringida aos módulos nominais de WhatsApp/mensagens.
Ocorrências genéricas em agendamentos, analytics e DTOs não são consideradas
contrato de envio.

- Módulos nominais localizados: 4
- Rotas produtivas localizadas: 74
- Assinaturas de serviços localizadas: 196
- Mutations Portal: 0

## Assinatura exata

O endpoint administrativo confirmado é:

- POST /mensagens-whatsapp/enviar

A integração Portal ficará condicionada aos campos obrigatórios do
EnviarMensagemWhatsAppDto e à derivação server-side de clienteId,
empresaId e destinatário quando aplicável.

## Campos pendentes

A integração Portal aguardará a confirmação completa de
CreateMensagemWhatsAppDto e do comportamento de simulação/fila.

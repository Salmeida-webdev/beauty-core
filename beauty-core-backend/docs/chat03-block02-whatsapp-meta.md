# Chat 03 - WhatsApp Meta Cloud API

## Estado

O adaptador oficial da Meta foi preparado, mas o envio real permanece desabilitado ate que as variaveis de ambiente sejam fornecidas com seguranca. Nenhum token, numero ou segredo deve ser commitado.

## Variaveis de ambiente

```text
META_WHATSAPP_ACCESS_TOKEN=
META_WHATSAPP_PHONE_NUMBER_ID=
META_WHATSAPP_API_VERSION=
META_WHATSAPP_GRAPH_BASE_URL=https://graph.facebook.com
```

`META_WHATSAPP_PHONE_NUMBER_ID` e o identificador tecnico do numero no WhatsApp Business Platform; nao e o numero de telefone exibido ao cliente. A versao da Graph API e obrigatoria para evitar que o codigo escolha silenciosamente uma versao desatualizada.

## Fluxo implementado

1. O endpoint registra a mensagem e cria um job idempotente na fila `whatsapp`.
2. O worker reutiliza `metadata.mensagemId` quando o job veio do endpoint.
3. Em modo demonstracao, nenhuma chamada externa e feita e o status permanece `SIMULADA`.
4. No canal `API_OFICIAL`, o adaptador chama `POST /{PHONE_NUMBER_ID}/messages` com token Bearer.
5. O status so vira `ENVIADA` quando a resposta contem `messages[0].id`; erros de provider viram `FALHOU` e fazem o job falhar para o mecanismo de retry/DLQ.

## Pendente para homologacao real

- criar/configurar o app e o WhatsApp Business Account na Meta;
- obter o `Phone Number ID`, o token apropriado e a versao vigente da Graph API;
- preencher as variaveis somente no ambiente local/secret manager;
- cadastrar destinatario de teste, se a Meta exigir para o ambiente de desenvolvimento;
- executar E2E com destinatario real e validar webhook/status de entrega em bloco posterior.

Sem esses itens, a integracao nao deve ser declarada como envio real homologado.
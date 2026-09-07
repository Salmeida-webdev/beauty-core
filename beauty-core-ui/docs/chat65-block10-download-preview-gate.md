# Chat 65 — Bloco 10 — Gate de Download e Preview

## Arquivos autoritativos

- Serviço de download localizado: SIM
- Controller de download localizado: SIM
- Política de acesso localizada: SIM
- Rotas Portal de download/preview: 0

## Regra

Toda solicitação deve validar empresaId e clienteId por meio da política
autoritativa antes de retornar arquivo físico, URL assinada ou preview.

O contrato Portal somente será criado após confirmar a assinatura exata dos
métodos do serviço de download.

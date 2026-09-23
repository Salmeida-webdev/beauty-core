# B181 — Correção de `meta-whatsapp-webhook.e2e-spec.ts`

- Data: 2026-09-22
- Baseline: B180
- Arquivo tratado exclusivamente: `test/e2e/meta-whatsapp-webhook.e2e-spec.ts`

## Contratos analisados

Foram lidos integralmente o teste, `test/setup-e2e.ts`, `test/helpers/auth.helper.ts`, `test/seeds/test-seed.ts`, `MetaWhatsappWebhookController`, `MetaWhatsappWebhookService`, `meta-whatsapp-webhook.types.ts`, `CreateMensagemWhatsAppDto` e os modelos Prisma `MensagemWhatsApp` e `MetaWhatsappWebhookEvent`.

O contrato confirmado exige challenge com token configurado, assinatura `sha256=` calculada sobre o corpo bruto, payload com `entry[].changes[].value.statuses[]`, retorno `{ received, accepted, duplicates }` e idempotência por `eventKey` único.

## Diagnósticos do baseline

O B180 registrava 3 erros e 5 avisos:

- 5 `@typescript-eslint/no-unsafe-argument` relacionados ao `ctx.app` e aos IDs `unknown` dos fixtures.
- 2 `@typescript-eslint/no-unsafe-member-access` e 1 diagnóstico adicional de acesso ao corpo SuperTest tipado como `any`.

## Correções semânticas

- Criado adaptador explícito para `INestApplication<Server>` usado pelo SuperTest.
- Adicionada validação tipada dos IDs `empresaA` e `cliente` dos fixtures antes da criação de `MensagemWhatsApp`.
- Adicionada leitura segura do corpo JSON do webhook como registro de valores desconhecidos.
- Preservados os cenários de challenge válido/inválido, assinatura válida/inválida, payload Meta, atualização para `ENVIADA`/`delivered` e deduplicação (`duplicates=1`).
- Não foram usados `any`, `Function`, `eslint-disable`, casts indiscriminados, assertions tautológicas ou catches silenciosos.

## Validações executadas

| Validação | Resultado |
|---|---|
| Prettier no arquivo | Aprovado |
| ESLint isolado, sem `--fix` e sem cache | 0 erros, 0 avisos |
| `git diff --check` no arquivo | Aprovado |
| E2E | Não executado |
| Jest | Não executado |

## Comparação

| Métrica | B180 | B181 | Variação |
|---|---:|---:|---:|
| Erros no arquivo | 3 | 0 | -3 |
| Avisos no arquivo | 5 | 0 | -5 |

Não executados: stage, commit, push, migration, build ou deploy.


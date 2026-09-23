# Beauty Core - Chat B - B128 - Correcao createModel

- Alvo exclusivo: `beauty-core-backend\test\seeds\test-seed.ts`.
- Escopo: retorno tipado e acesso dinamico do createModel.

## Alteracao aplicada

- Removido o async sem await de createModel.
- Acesso dinamico Prisma convertido para SeedModelClient.
- Dados e fluxo de seed preservados.
- Validacao falhou; arquivo restaurado automaticamente.

Status: BLOCKED

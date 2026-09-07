# Chat 65 — Bloco 12 — Segurança e Privacidade

## Validações

- ClienteAuthGuard: comprovado
- Rotas Portal avaliadas: 4
- Referências frontend de identidade: 70

## Regra

clienteId, empresaId e usuarioId não podem ser definidos pelo navegador como
autoridade de ownership. O backend deve derivar identidade do contexto
autenticado e validar empresa, cliente, recurso e permissão.

Documentos privados não podem expor caminho físico ou URL permanente.
Downloads devem utilizar autorização e URL temporária assinada.

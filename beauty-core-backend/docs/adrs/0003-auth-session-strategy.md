# ADR 0003 — Auth and Session Strategy

## Status

Aceito.

## Contexto

O Beauty Core possui autenticação para administração e cliente final. O sistema precisa suportar login seguro, refresh token, logout, revogação de sessões, auditoria e compatibilidade com web/mobile.

Também existe autenticação pública por tenant para cliente final via OTP.

## Decisão

A estratégia oficial usa:

- JWT access token curto;
- refresh token rotacionável;
- sessões persistidas no banco;
- hash seguro de refresh token;
- `sid` nos tokens para revalidação;
- logout individual;
- logout global;
- revogação de sessão;
- autenticação separada para Admin e Cliente;
- OTP para cliente final com fluxo público por tenant.

Segredos de JWT, refresh e OTP devem ser externos ao código e carregados por variáveis de ambiente.

## Consequências

### Positivas

- Revogação real de sessões.
- Suporte a múltiplos dispositivos.
- Melhor compatibilidade com mobile.
- Redução de risco em caso de vazamento de access token.
- Auditoria mais rastreável.

### Negativas

- Sessões adicionam dependência forte do banco.
- Rotação de refresh token aumenta complexidade.
- Erros em clock, expiração ou hash podem impactar login.

## Controles obrigatórios

- nunca persistir refresh token em texto puro;
- nunca logar secrets ou tokens;
- validar sessão ativa a cada refresh;
- invalidar sessão em logout;
- diferenciar claramente token Admin e Cliente;
- proteger endpoints de sessão por role e tenant.

## Critérios de aceite

- Login retorna access token e refresh token.
- Refresh rotaciona credenciais.
- Logout revoga sessão.
- Sessões expiradas/revogadas não renovam token.
- Cliente final não acessa rotas administrativas.

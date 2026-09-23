# Diagnóstico detalhado ESLint — auth.helper.ts

- Data: 2026-09-21 16:49:42 -03:00
- Alvo: ``test/helpers/auth.helper.ts`` (somente este arquivo).
- Comando: ESLint JSON com ``--no-cache``; sem ``--fix``.
- Arquivos processados: 1
- Exit code: 1
- Duração: 13 s
- Total: 29 diagnósticos — 26 erros e 3 avisos.

## Contagem por regra

| Regra | Erros | Avisos |
|---|---:|---:|
| `@typescript-eslint/no-require-imports` | 1 | 0 |
| `@typescript-eslint/no-unsafe-argument` | 0 | 3 |
| `@typescript-eslint/no-unsafe-assignment` | 10 | 0 |
| `@typescript-eslint/no-unsafe-call` | 1 | 0 |
| `@typescript-eslint/no-unsafe-member-access` | 14 | 0 |

## Cada diagnóstico com contexto

### Linha 1, coluna 18 — Erro: `@typescript-eslint/no-require-imports`

A `require()` style import is forbidden.

```ts
>    1: import request = require('supertest');
     2: import { INestApplication } from '@nestjs/common';
     3: import { PrismaClient } from '@prisma/client';
```

### Linha 22, coluna 9 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
    20: 
    21: function normalizeLogin(body: any): LoginResponse {
>   22:   const accessToken = body.access_token ?? body.accessToken ?? body.token;
    23:   const refreshToken = body.refresh_token ?? body.refreshToken;
    24: 
```

### Linha 22, coluna 28 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .access_token on an `any` value.

```ts
    20: 
    21: function normalizeLogin(body: any): LoginResponse {
>   22:   const accessToken = body.access_token ?? body.accessToken ?? body.token;
    23:   const refreshToken = body.refresh_token ?? body.refreshToken;
    24: 
```

### Linha 22, coluna 49 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .accessToken on an `any` value.

```ts
    20: 
    21: function normalizeLogin(body: any): LoginResponse {
>   22:   const accessToken = body.access_token ?? body.accessToken ?? body.token;
    23:   const refreshToken = body.refresh_token ?? body.refreshToken;
    24: 
```

### Linha 22, coluna 69 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .token on an `any` value.

```ts
    20: 
    21: function normalizeLogin(body: any): LoginResponse {
>   22:   const accessToken = body.access_token ?? body.accessToken ?? body.token;
    23:   const refreshToken = body.refresh_token ?? body.refreshToken;
    24: 
```

### Linha 23, coluna 9 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
    21: function normalizeLogin(body: any): LoginResponse {
    22:   const accessToken = body.access_token ?? body.accessToken ?? body.token;
>   23:   const refreshToken = body.refresh_token ?? body.refreshToken;
    24: 
    25:   expect(accessToken).toBeDefined();
```

### Linha 23, coluna 29 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .refresh_token on an `any` value.

```ts
    21: function normalizeLogin(body: any): LoginResponse {
    22:   const accessToken = body.access_token ?? body.accessToken ?? body.token;
>   23:   const refreshToken = body.refresh_token ?? body.refreshToken;
    24: 
    25:   expect(accessToken).toBeDefined();
```

### Linha 23, coluna 51 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .refreshToken on an `any` value.

```ts
    21: function normalizeLogin(body: any): LoginResponse {
    22:   const accessToken = body.access_token ?? body.accessToken ?? body.token;
>   23:   const refreshToken = body.refresh_token ?? body.refreshToken;
    24: 
    25:   expect(accessToken).toBeDefined();
```

### Linha 28, coluna 5 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
    26: 
    27:   return {
>   28:     access_token: accessToken,
    29:     refresh_token: refreshToken,
    30:     expires_in: body.expires_in ?? body.expiresIn,
```

### Linha 29, coluna 5 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
    27:   return {
    28:     access_token: accessToken,
>   29:     refresh_token: refreshToken,
    30:     expires_in: body.expires_in ?? body.expiresIn,
    31:     raw: body,
```

### Linha 30, coluna 5 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
    28:     access_token: accessToken,
    29:     refresh_token: refreshToken,
>   30:     expires_in: body.expires_in ?? body.expiresIn,
    31:     raw: body,
    32:   };
```

### Linha 30, coluna 22 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .expires_in on an `any` value.

```ts
    28:     access_token: accessToken,
    29:     refresh_token: refreshToken,
>   30:     expires_in: body.expires_in ?? body.expiresIn,
    31:     raw: body,
    32:   };
```

### Linha 30, coluna 41 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .expiresIn on an `any` value.

```ts
    28:     access_token: accessToken,
    29:     refresh_token: refreshToken,
>   30:     expires_in: body.expires_in ?? body.expiresIn,
    31:     raw: body,
    32:   };
```

### Linha 31, coluna 5 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
    29:     refresh_token: refreshToken,
    30:     expires_in: body.expires_in ?? body.expiresIn,
>   31:     raw: body,
    32:   };
    33: }
```

### Linha 47, coluna 34 — Aviso: `@typescript-eslint/no-unsafe-argument`

Unsafe argument of type `any` assigned to a parameter of type `App`.

```ts
    45:   }
    46: 
>   47:   const response = await request(app.getHttpServer())
    48:     .post('/auth/login')
    49:     .send({ email, senha })
```

### Linha 91, coluna 35 — Aviso: `@typescript-eslint/no-unsafe-argument`

Unsafe argument of type `any` assigned to a parameter of type `App`.

```ts
    89:   }
    90: 
>   91:   const solicitar = await request(app.getHttpServer())
    92:     .post('/public/' + slug + '/auth-cliente/solicitar-codigo')
    93:     .send({
```

### Linha 110, coluna 7 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
   108:   }
   109: 
>  110:   let codigo =
>  111:     solicitar.body.codigoDesenvolvimento ??
>  112:     solicitar.body.codigo ??
>  113:     solicitar.body.devCode ??
>  114:     solicitar.body.code;
   115: 
   116:   if (!codigo && prisma && (prisma as any).codigoAcessoCliente) {
```

### Linha 111, coluna 20 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .codigoDesenvolvimento on an `any` value.

```ts
   109: 
   110:   let codigo =
>  111:     solicitar.body.codigoDesenvolvimento ??
   112:     solicitar.body.codigo ??
   113:     solicitar.body.devCode ??
```

### Linha 112, coluna 20 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .codigo on an `any` value.

```ts
   110:   let codigo =
   111:     solicitar.body.codigoDesenvolvimento ??
>  112:     solicitar.body.codigo ??
   113:     solicitar.body.devCode ??
   114:     solicitar.body.code;
```

### Linha 113, coluna 20 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .devCode on an `any` value.

```ts
   111:     solicitar.body.codigoDesenvolvimento ??
   112:     solicitar.body.codigo ??
>  113:     solicitar.body.devCode ??
   114:     solicitar.body.code;
   115: 
```

### Linha 114, coluna 20 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .code on an `any` value.

```ts
   112:     solicitar.body.codigo ??
   113:     solicitar.body.devCode ??
>  114:     solicitar.body.code;
   115: 
   116:   if (!codigo && prisma && (prisma as any).codigoAcessoCliente) {
```

### Linha 116, coluna 44 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .codigoAcessoCliente on an `any` value.

```ts
   114:     solicitar.body.code;
   115: 
>  116:   if (!codigo && prisma && (prisma as any).codigoAcessoCliente) {
   117:     const row = await (prisma as any).codigoAcessoCliente.findFirst({
   118:       where: {
```

### Linha 117, coluna 11 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
   115: 
   116:   if (!codigo && prisma && (prisma as any).codigoAcessoCliente) {
>  117:     const row = await (prisma as any).codigoAcessoCliente.findFirst({
>  118:       where: {
>  119:         telefone: TEST_CLIENTE.telefone,
>  120:       },
>  121:       orderBy: {
>  122:         createdAt: 'desc',
>  123:       },
>  124:     });
   125: 
   126:     codigo = row?.codigo;
```

### Linha 117, coluna 23 — Erro: `@typescript-eslint/no-unsafe-call`

Unsafe call of an `any` typed value.

```ts
   115: 
   116:   if (!codigo && prisma && (prisma as any).codigoAcessoCliente) {
>  117:     const row = await (prisma as any).codigoAcessoCliente.findFirst({
   118:       where: {
   119:         telefone: TEST_CLIENTE.telefone,
```

### Linha 117, coluna 39 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .codigoAcessoCliente on an `any` value.

```ts
   115: 
   116:   if (!codigo && prisma && (prisma as any).codigoAcessoCliente) {
>  117:     const row = await (prisma as any).codigoAcessoCliente.findFirst({
   118:       where: {
   119:         telefone: TEST_CLIENTE.telefone,
```

### Linha 126, coluna 5 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
   124:     });
   125: 
>  126:     codigo = row?.codigo;
   127:   }
   128: 
```

### Linha 126, coluna 19 — Erro: `@typescript-eslint/no-unsafe-member-access`

Unsafe member access .codigo on an `any` value.

```ts
   124:     });
   125: 
>  126:     codigo = row?.codigo;
   127:   }
   128: 
```

### Linha 131, coluna 35 — Aviso: `@typescript-eslint/no-unsafe-argument`

Unsafe argument of type `any` assigned to a parameter of type `App`.

```ts
   129:   expect(codigo).toBeDefined();
   130: 
>  131:   const verificar = await request(app.getHttpServer())
   132:     .post('/public/' + slug + '/auth-cliente/verificar-codigo')
   133:     .send({
```

### Linha 135, coluna 7 — Erro: `@typescript-eslint/no-unsafe-assignment`

Unsafe assignment of an `any` value.

```ts
   133:     .send({
   134:       telefone: TEST_CLIENTE.telefone,
>  135:       codigo,
   136:     })
   137:     .expect((res) => {
```

## Avaliação: problema real ou tipagem de helpers

- Linha 1, ``no-require-imports``: uso explícito de ``import = require`` é um problema real contra a regra configurada. ``esModuleInterop`` está habilitado no ``tsconfig.json``; cabe testar import default na correção futura.
- Linhas 22–31 e 110–114, 135: as respostas HTTP do Supertest são expostas como ``any``. A regra acusa atribuições e acessos sem validar a forma do JSON. Não são falsos positivos de mocks: é uma fronteira externa sem tipo seguro. ``LoginResponse.raw`` também propaga ``any``.
- Linhas 47, 91 e 131, avisos ``no-unsafe-argument``: ``INestApplication`` usa o parâmetro genérico padrão ``TServer = any`` e ``getHttpServer()`` retorna esse ``any``; Supertest espera ``App``. É um problema de tipo na assinatura do helper/framework, não de mocks. Um tipo explícito de servidor compatível com Supertest deve resolver a fronteira.
- Linhas 116–126: o cast para ``any`` é evitável. ``CodigoAcessoCliente`` existe no schema (modelo por volta da linha 477) e no Prisma Client gerado (delegate ``codigoAcessoCliente``). O cast elimina a verificação real de tipos de ``findFirst`` e do campo ``codigo``.
- Linha 117, ``no-unsafe-call``: consequência direta do delegate Prisma convertido para ``any``; não aponta erro de execução independente.

## Correção mínima sugerida para o próximo bloco

1. Trocar o import de Supertest para import default tipado, preservando o uso da API.
2. Tipar a aplicação com o tipo concreto de servidor compatível com Supertest (o tipo padrão de ``INestApplication`` é ``any``).
3. Tratar os corpos HTTP como ``unknown`` e validar/narrow os campos de token, expiração e código antes de compor ``LoginResponse`` ou enviar a próxima requisição; tipar ``raw`` como ``unknown``.
4. Acessar ``prisma.codigoAcessoCliente.findFirst`` pelo delegate gerado, sem cast, e deixar o retorno inferido pelo Prisma.

## Integridade

- Nenhum arquivo de código foi alterado; nenhuma correção foi aplicada.
- Nenhum ``--fix``, stage, commit, push, migration ou deploy foi executado.

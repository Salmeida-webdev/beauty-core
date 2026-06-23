# Versionamento

## Estratégia

O Beauty Core adota versionamento semântico:

`MAJOR.MINOR.PATCH`

Exemplo:

`1.0.0`

## Regras

### MAJOR

Incrementar quando houver:

- quebra de compatibilidade de API;
- alteração incompatível de autenticação;
- migração destrutiva de banco;
- mudança estrutural de multi-tenancy;
- remoção de módulo público;
- mudança de contrato relevante para clientes white-label.

### MINOR

Incrementar quando houver:

- nova funcionalidade compatível;
- novo endpoint sem quebra;
- novo módulo;
- nova integração;
- melhoria operacional relevante;
- melhoria de observabilidade;
- expansão de documentação oficial.

### PATCH

Incrementar quando houver:

- correção de bug;
- ajuste de segurança sem quebra;
- melhoria interna;
- ajuste de documentação;
- ajuste de teste;
- melhoria de performance sem alteração de contrato.

## Pré-releases

Podem ser usados sufixos:

- `alpha`
- `beta`
- `rc`
- `premium-readiness`

Exemplo:

`1.0.0-rc.1`

## Política de release

Toda release deve conter:

- changelog atualizado;
- release notes atualizadas;
- migrations revisadas, quando existirem;
- testes aprovados;
- coverage aprovado;
- docker build aprovado;
- documentação operacional atualizada se houver impacto;
- checklist de deploy validado.

## Critério mínimo para release production-ready

- build aprovado;
- testes unitários aprovados;
- testes e2e aprovados;
- coverage gate aprovado;
- Prisma validado;
- Docker build aprovado;
- ausência de vulnerabilidades críticas conhecidas em dependências de produção;
- rollback documentado.

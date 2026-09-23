# Beauty Core - Chat B - B122 - Estrutura dos matchers chat36-lgpd

- Inicio: 2026-09-14T10:26:09.6669999-03:00
- Script: B122-v1
- Modo: somente leitura; somente `test/unit/chat36-lgpd.coverage.spec.ts` como arquivo de codigo analisado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend/docs/chat-b/`

## Objetivo

- Registrar o formato real dos tres helpers depois da divergencia estrutural do B121.
- Confirmar assinaturas e fechamentos sem expor literais.

## Ocorrencias

- tipo Chat36Matcher: 1
- funcao chat36ObjectContaining: 1
- funcao chat36StringContaining: 1
- funcao chat36StringMatching: 1
- retorno direto objectContaining: 1
- casts dos matchers de string: 2

### Contexto proximo da linha 33

- 31: type Chat36ControllerService = ConstructorParameters<typeof LgpdController>[0];
- 32: 
- 33: function chat36ObjectContaining<T extends Record<string, unknown>>(
- 34:   value: T,
- 35: ): T {
- 36:   return expect.objectContaining(value);
- 37: }
- 38: 
- 39: function chat36StringContaining(value: string): Chat36Matcher {
- 40:   return expect.stringContaining(value) as unknown as Chat36Matcher;
- 41: }
- 42: 
- 43: function chat36StringMatching(value: RegExp): Chat36Matcher {
- 44:   return expect.stringMatching(value) as unknown as Chat36Matcher;
- 45: }

### Contexto proximo da linha 39

- 37: }
- 38: 
- 39: function chat36StringContaining(value: string): Chat36Matcher {
- 40:   return expect.stringContaining(value) as unknown as Chat36Matcher;
- 41: }
- 42: 
- 43: function chat36StringMatching(value: RegExp): Chat36Matcher {
- 44:   return expect.stringMatching(value) as unknown as Chat36Matcher;
- 45: }
- 46: 
- 47: describe('<literal>', () => {
- 48:   const clienteId = '<literal>';
- 49:   const empresaId = '<literal>';
- 50: 
- 51:   let prisma: Chat36Prisma;

### Contexto proximo da linha 43

- 41: }
- 42: 
- 43: function chat36StringMatching(value: RegExp): Chat36Matcher {
- 44:   return expect.stringMatching(value) as unknown as Chat36Matcher;
- 45: }
- 46: 
- 47: describe('<literal>', () => {
- 48:   const clienteId = '<literal>';
- 49:   const empresaId = '<literal>';
- 50: 
- 51:   let prisma: Chat36Prisma;
- 52:   let service: LgpdService;
- 53: 
- 54:   const request: Chat36Request = {
- 55:     user: {

- Fim: 2026-09-14T10:26:28.2600104-03:00

## ESLint diagnostico

- ESLint exit code: 1
- Nenhuma correcao automatica foi executada.

## Operacoes nao executadas

- Nenhum arquivo de codigo foi alterado.
- Prettier, Jest, build, E2E, coverage, migration e workflow nao foram executados.
- Nenhum stage, commit, push, merge, tag, reset, checkout ou stash foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B122

- `PASS_WITH_ATTENTION` - estrutura real dos helpers registrada para a proxima correcao seletiva.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B122.
- O script e somente leitura para o codigo do projeto.

Status: PASS_WITH_ATTENTION
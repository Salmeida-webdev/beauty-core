# Beauty Core - Chat B - B116 - Tipos restantes chat36-lgpd

- Inicio: 2026-09-14T10:08:59.1424314-03:00
- Fim: 2026-09-14T10:09:07.8850520-03:00
- Script: B116-v1
- Modo: somente leitura; o relatorio e o unico artefato adicional criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Capturar os diagnosticos restantes depois do B115.
- Exibir contexto das linhas afetadas para a proxima correcao seletiva.
- Nao alterar o arquivo alvo nem executar Prettier, Jest, build, E2E ou workflow.

## Resultado do ESLint

- ESLint exit code: 1
- Diagnosticos analisados: 27
- Erros: 27
- Avisos: 0

## Regras predominantes

- `@typescript-eslint/no-unsafe-call`; ocorrencias 15
- `@typescript-eslint/unbound-method`; ocorrencias 6
- `@typescript-eslint/no-unsafe-assignment`; ocorrencias 4
- `@typescript-eslint/no-unnecessary-type-assertion`; ocorrencias 1
- `@typescript-eslint/no-unsafe-member-access`; ocorrencias 1

## Diagnosticos e contextos

- Linha 14, coluna 10; regra `@typescript-eslint/no-unnecessary-type-assertion`; severidade error; mensagem: This assertion is unnecessary since the receiver accepts the original type of the expression.
  - Contexto linhas 11-17:
    - 11: function chat36ObjectContaining<T extends Record<string, unknown>>(
    - 12:   value: T,
    - 13: ): T {
    - 14:   return expect.objectContaining(value) as unknown as T;
    - 15: }
    - 16: describe('Chat 36 LGPD Coverage', () => {
    - 17:   const clienteId = 'cliente-123456789';
- Linha 116, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 113-119:
    - 113:   }
    - 114: 
    - 115:   it('deve exportar dados LGPD removendo segredos tecnicos e registrando auditoria', async () => {
    - 116:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 117: 
    - 118:     const result = await service.exportarCliente(clienteId, request);
    - 119: 
- Linha 138, coluna 12; regra `@typescript-eslint/unbound-method`; severidade error; mensagem: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`.
  - Contexto linhas 135-141:
    - 135:     expect(result.arquivos[0].refreshTokenHash).toBeUndefined();
    - 136:     expect(result.sessoes[0].refreshTokenHash).toBeUndefined();
    - 137: 
    - 138:     expect(prisma.auditoriaSistema.create).toHaveBeenCalledWith(
    - 139:       chat36ObjectContaining({
    - 140:         data: chat36ObjectContaining({
    - 141:           empresaId,
- Linha 154, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 151-157:
    - 151:   });
    - 152: 
    - 153:   it('deve exportar como SUPER_ADMIN buscando cliente apenas por id', async () => {
    - 154:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 155: 
    - 156:     await service.exportarCliente(clienteId, {
    - 157:       ...request,
- Linha 164, coluna 12; regra `@typescript-eslint/unbound-method`; severidade error; mensagem: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`.
  - Contexto linhas 161-167:
    - 161:       originalUrl: undefined,
    - 162:     });
    - 163: 
    - 164:     expect(prisma.cliente.findFirst).toHaveBeenCalledWith({
    - 165:       where: { id: clienteId },
    - 166:     });
    - 167:   });
- Linha 170, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 167-173:
    - 167:   });
    - 168: 
    - 169:   it('deve usar fallback de findMany sem orderBy quando delegate falhar', async () => {
    - 170:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 171:     prisma.agendamento.findMany
    - 172:       .mockRejectedValueOnce(new Error('orderBy invalido'))
    - 173:       .mockResolvedValueOnce([{ id: 'agendamento-fallback' }]);
- Linha 171, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 168-174:
    - 168: 
    - 169:   it('deve usar fallback de findMany sem orderBy quando delegate falhar', async () => {
    - 170:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 171:     prisma.agendamento.findMany
    - 172:       .mockRejectedValueOnce(new Error('orderBy invalido'))
    - 173:       .mockResolvedValueOnce([{ id: 'agendamento-fallback' }]);
    - 174: 
- Linha 171, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 168-174:
    - 168: 
    - 169:   it('deve usar fallback de findMany sem orderBy quando delegate falhar', async () => {
    - 170:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 171:     prisma.agendamento.findMany
    - 172:       .mockRejectedValueOnce(new Error('orderBy invalido'))
    - 173:       .mockResolvedValueOnce([{ id: 'agendamento-fallback' }]);
    - 174: 
- Linha 173, coluna 8; regra `@typescript-eslint/no-unsafe-member-access`; severidade error; mensagem: Unsafe member access .mockResolvedValueOnce on a type that cannot be resolved.
  - Contexto linhas 170-176:
    - 170:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 171:     prisma.agendamento.findMany
    - 172:       .mockRejectedValueOnce(new Error('orderBy invalido'))
    - 173:       .mockResolvedValueOnce([{ id: 'agendamento-fallback' }]);
    - 174: 
    - 175:     const result = await service.exportarCliente(clienteId, request);
    - 176: 
- Linha 178, coluna 12; regra `@typescript-eslint/unbound-method`; severidade error; mensagem: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`.
  - Contexto linhas 175-181:
    - 175:     const result = await service.exportarCliente(clienteId, request);
    - 176: 
    - 177:     expect(result.agendamentos).toEqual([{ id: 'agendamento-fallback' }]);
    - 178:     expect(prisma.agendamento.findMany).toHaveBeenCalledTimes(2);
    - 179:   });
    - 180: 
    - 181:   it('deve retornar arrays vazios quando delegates opcionais nao existirem ou falharem', async () => {
- Linha 182, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 179-185:
    - 179:   });
    - 180: 
    - 181:   it('deve retornar arrays vazios quando delegates opcionais nao existirem ou falharem', async () => {
    - 182:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 183:     delete prisma.notificacao;
    - 184:     prisma.mensagemWhatsApp.findMany.mockRejectedValue(
    - 185:       new Error('indisponivel'),
- Linha 184, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 181-187:
    - 181:   it('deve retornar arrays vazios quando delegates opcionais nao existirem ou falharem', async () => {
    - 182:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 183:     delete prisma.notificacao;
    - 184:     prisma.mensagemWhatsApp.findMany.mockRejectedValue(
    - 185:       new Error('indisponivel'),
    - 186:     );
    - 187: 
- Linha 195, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 192-198:
    - 192:   });
    - 193: 
    - 194:   it('deve anonimizar dados pessoais diretos preservando integridade operacional', async () => {
    - 195:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 196:     prisma.cliente.update.mockResolvedValue({
    - 197:       id: clienteId,
    - 198:       empresaId,
- Linha 196, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 193-199:
    - 193: 
    - 194:   it('deve anonimizar dados pessoais diretos preservando integridade operacional', async () => {
    - 195:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 196:     prisma.cliente.update.mockResolvedValue({
    - 197:       id: clienteId,
    - 198:       empresaId,
    - 199:       nome: 'Cliente anonimizado cliente100123',
- Linha 222, coluna 12; regra `@typescript-eslint/unbound-method`; severidade error; mensagem: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`.
  - Contexto linhas 219-225:
    - 219:         'observacoes',
    - 220:       ]),
    - 221:     );
    - 222:     expect(prisma.cliente.update).toHaveBeenCalledWith({
    - 223:       where: { id: clienteId },
    - 224:       data: chat36ObjectContaining({
    - 225:         nome: expect.stringContaining('Cliente anonimizado'),
- Linha 225, coluna 9; regra `@typescript-eslint/no-unsafe-assignment`; severidade error; mensagem: Unsafe assignment of an `any` value.
  - Contexto linhas 222-228:
    - 222:     expect(prisma.cliente.update).toHaveBeenCalledWith({
    - 223:       where: { id: clienteId },
    - 224:       data: chat36ObjectContaining({
    - 225:         nome: expect.stringContaining('Cliente anonimizado'),
    - 226:         telefone: expect.stringContaining('anon-'),
    - 227:         email: expect.stringContaining('@anonimizado.local'),
    - 228:         cpf: expect.stringMatching(/^[0-9]{11}$/),
- Linha 226, coluna 9; regra `@typescript-eslint/no-unsafe-assignment`; severidade error; mensagem: Unsafe assignment of an `any` value.
  - Contexto linhas 223-229:
    - 223:       where: { id: clienteId },
    - 224:       data: chat36ObjectContaining({
    - 225:         nome: expect.stringContaining('Cliente anonimizado'),
    - 226:         telefone: expect.stringContaining('anon-'),
    - 227:         email: expect.stringContaining('@anonimizado.local'),
    - 228:         cpf: expect.stringMatching(/^[0-9]{11}$/),
    - 229:         dataNascimento: new Date('1900-01-01T00:00:00.000Z'),
- Linha 227, coluna 9; regra `@typescript-eslint/no-unsafe-assignment`; severidade error; mensagem: Unsafe assignment of an `any` value.
  - Contexto linhas 224-230:
    - 224:       data: chat36ObjectContaining({
    - 225:         nome: expect.stringContaining('Cliente anonimizado'),
    - 226:         telefone: expect.stringContaining('anon-'),
    - 227:         email: expect.stringContaining('@anonimizado.local'),
    - 228:         cpf: expect.stringMatching(/^[0-9]{11}$/),
    - 229:         dataNascimento: new Date('1900-01-01T00:00:00.000Z'),
    - 230:         endereco: 'ANONIMIZADO',
- Linha 228, coluna 9; regra `@typescript-eslint/no-unsafe-assignment`; severidade error; mensagem: Unsafe assignment of an `any` value.
  - Contexto linhas 225-231:
    - 225:         nome: expect.stringContaining('Cliente anonimizado'),
    - 226:         telefone: expect.stringContaining('anon-'),
    - 227:         email: expect.stringContaining('@anonimizado.local'),
    - 228:         cpf: expect.stringMatching(/^[0-9]{11}$/),
    - 229:         dataNascimento: new Date('1900-01-01T00:00:00.000Z'),
    - 230:         endereco: 'ANONIMIZADO',
    - 231:         observacoes: 'ANONIMIZADO',
- Linha 234, coluna 12; regra `@typescript-eslint/unbound-method`; severidade error; mensagem: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`.
  - Contexto linhas 231-237:
    - 231:         observacoes: 'ANONIMIZADO',
    - 232:       }),
    - 233:     });
    - 234:     expect(prisma.codigoAcessoCliente.updateMany).toHaveBeenCalledWith({
    - 235:       where: { clienteId, empresaId },
    - 236:       data: chat36ObjectContaining({
    - 237:         codigo: 'HASHED',
- Linha 242, coluna 12; regra `@typescript-eslint/unbound-method`; severidade error; mensagem: A method that is not declared with `this: void` may cause unintentional scoping of `this` when separated from its object.
Consider using an arrow function or explicitly `.bind()`ing the method to avoid calling the method with an unintended `this` value. 
If a function does not access `this`, it can be annotated with `this: void`.
  - Contexto linhas 239-245:
    - 239:         usado: true,
    - 240:       }),
    - 241:     });
    - 242:     expect(prisma.auditoriaSistema.create).toHaveBeenCalledWith(
    - 243:       chat36ObjectContaining({
    - 244:         data: chat36ObjectContaining({
    - 245:           acao: 'LGPD_ANONIMIZACAO',
- Linha 261, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 258-264:
    - 258:   });
    - 259: 
    - 260:   it('deve manter operacao LGPD mesmo se auditoria falhar', async () => {
    - 261:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 262:     prisma.cliente.update.mockResolvedValue(
    - 263:       mockCliente({ nome: 'Cliente anonimizado' }),
    - 264:     );
- Linha 262, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 259-265:
    - 259: 
    - 260:   it('deve manter operacao LGPD mesmo se auditoria falhar', async () => {
    - 261:     prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    - 262:     prisma.cliente.update.mockResolvedValue(
    - 263:       mockCliente({ nome: 'Cliente anonimizado' }),
    - 264:     );
    - 265:     prisma.auditoriaSistema.create.mockRejectedValue(
- Linha 265, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 262-268:
    - 262:     prisma.cliente.update.mockResolvedValue(
    - 263:       mockCliente({ nome: 'Cliente anonimizado' }),
    - 264:     );
    - 265:     prisma.auditoriaSistema.create.mockRejectedValue(
    - 266:       new Error('auditoria indisponivel'),
    - 267:     );
    - 268: 
- Linha 275, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 272-278:
    - 272:   });
    - 273: 
    - 274:   it('deve lancar NotFoundException quando cliente nao existir', async () => {
    - 275:     prisma.cliente.findFirst.mockResolvedValue(null);
    - 276: 
    - 277:     await expect(
    - 278:       service.exportarCliente(clienteId, request),
- Linha 283, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 280-286:
    - 280:   });
    - 281: 
    - 282:   it('deve lancar ForbiddenException quando cliente nao pertencer a empresa do usuario', async () => {
    - 283:     prisma.cliente.findFirst.mockResolvedValue(
    - 284:       mockCliente({ empresaId: 'empresa-errada' }),
    - 285:     );
    - 286: 
- Linha 293, coluna 5; regra `@typescript-eslint/no-unsafe-call`; severidade error; mensagem: Unsafe call of a type that could not be resolved.
  - Contexto linhas 290-296:
    - 290:   });
    - 291: 
    - 292:   it('deve lancar ForbiddenException quando nao houver campo anonimizavel', async () => {
    - 293:     prisma.cliente.findFirst.mockResolvedValue({ id: clienteId, empresaId });
    - 294: 
    - 295:     await expect(
    - 296:       service.anonimizarCliente(clienteId, request),

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Prettier, Jest, build, E2E, coverage, migration e workflow nao foram executados.
- Nenhum stage, commit, push, merge, tag, reset, checkout ou stash foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B116

- `PASS_WITH_ATTENTION` - diagnostico dos tipos restantes concluido para correcao seletiva.

## Integridade

- SHA256 do arquivo analisado: `6E8A421EA753BEF6FE8A3B2FD27DCA5EA96333882C703B4042CD76D96CB241DC`
- Este relatorio foi gerado automaticamente pelo script B116.
- O script nao altera o projeto.

Status: PASS_WITH_ATTENTION
Relatorio salvo em: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-b\chat-b116-context-chat36-lgpd-remaining-20260914-100859.md
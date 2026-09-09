# Chat 03 - Bloco 04W - Contexto do lint do Financeiro

- Arquivo: `src/modules/financeiro/financeiro.service.ts`
- Escopo: somente leitura; nenhum codigo foi alterado.
- Erros: 198
- Warnings: 2
- Exit code bruto do ESLint: 1

## Regras

- @typescript-eslint/no-unsafe-assignment: 97
- @typescript-eslint/no-unsafe-member-access: 93
- @typescript-eslint/no-unsafe-return: 8
- @typescript-eslint/no-unsafe-argument: 2

## Mensagens

- src/modules/financeiro/financeiro.service.ts:127:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return this.formatarMovimentacao(movimentacao);
- src/modules/financeiro/financeiro.service.ts:134:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an error typed value.
  Codigo: categoriaId: query['categoriaId'],
- src/modules/financeiro/financeiro.service.ts:135:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an error typed value.
  Codigo: clienteId: query['clienteId'],
- src/modules/financeiro/financeiro.service.ts:136:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an error typed value.
  Codigo: agendamentoId: query['agendamentoId'],
- src/modules/financeiro/financeiro.service.ts:179:26 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: data.map((item) => this.formatarMovimentacao(item)),
- src/modules/financeiro/financeiro.service.ts:201:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return this.formatarMovimentacao(movimentacao);
- src/modules/financeiro/financeiro.service.ts:209:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const movimentacaoAtual = await this.findOne(empresaId, id);
- src/modules/financeiro/financeiro.service.ts:212:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: descricao: movimentacaoAtual.descricao,
- src/modules/financeiro/financeiro.service.ts:212:36 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: descricao: movimentacaoAtual.descricao,
- src/modules/financeiro/financeiro.service.ts:213:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: movimentacaoAtual.tipo,
- src/modules/financeiro/financeiro.service.ts:213:31 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: movimentacaoAtual.tipo,
- src/modules/financeiro/financeiro.service.ts:214:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: valor: movimentacaoAtual.valor,
- src/modules/financeiro/financeiro.service.ts:214:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: movimentacaoAtual.valor,
- src/modules/financeiro/financeiro.service.ts:215:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: status: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:215:33 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: status: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:216:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaId: movimentacaoAtual.categoriaId,
- src/modules/financeiro/financeiro.service.ts:216:38 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoriaId on an `any` value.
  Codigo: categoriaId: movimentacaoAtual.categoriaId,
- src/modules/financeiro/financeiro.service.ts:217:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaNome: movimentacaoAtual.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:217:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoria on an `any` value.
  Codigo: categoriaNome: movimentacaoAtual.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:218:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoAtual.clienteId,
- src/modules/financeiro/financeiro.service.ts:218:36 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoAtual.clienteId,
- src/modules/financeiro/financeiro.service.ts:219:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: agendamentoId: movimentacaoAtual.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:219:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamentoId on an `any` value.
  Codigo: agendamentoId: movimentacaoAtual.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:220:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: formaPagamento: movimentacaoAtual.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:220:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .formaPagamento on an `any` value.
  Codigo: formaPagamento: movimentacaoAtual.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:221:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: observacoes: movimentacaoAtual.observacoes,
- src/modules/financeiro/financeiro.service.ts:221:38 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .observacoes on an `any` value.
  Codigo: observacoes: movimentacaoAtual.observacoes,
- src/modules/financeiro/financeiro.service.ts:225:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaId: dto.categoriaId ?? movimentacaoAtual.categoriaId,
- src/modules/financeiro/financeiro.service.ts:225:57 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoriaId on an `any` value.
  Codigo: categoriaId: dto.categoriaId ?? movimentacaoAtual.categoriaId,
- src/modules/financeiro/financeiro.service.ts:226:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: dto.clienteId ?? movimentacaoAtual.clienteId,
- src/modules/financeiro/financeiro.service.ts:226:53 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: dto.clienteId ?? movimentacaoAtual.clienteId,
- src/modules/financeiro/financeiro.service.ts:227:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: agendamentoId: dto.agendamentoId ?? movimentacaoAtual.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:227:61 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamentoId on an `any` value.
  Codigo: agendamentoId: dto.agendamentoId ?? movimentacaoAtual.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:228:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: dto.tipo ?? movimentacaoAtual.tipo,
- src/modules/financeiro/financeiro.service.ts:228:43 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: dto.tipo ?? movimentacaoAtual.tipo,
- src/modules/financeiro/financeiro.service.ts:243:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const movimentacaoAtualizada = await this.findOne(empresaId, id);
- src/modules/financeiro/financeiro.service.ts:248:108 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: `[FINANCEIRO] movimentacao atualizada empresaId=${empresaId} movimentacaoId=${movimentacaoAtualizada.id} status=SUCESSO tempoMs=${tempoMs}`,
- src/modules/financeiro/financeiro.service.ts:256:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: recursoId: movimentacaoAtualizada.id,
- src/modules/financeiro/financeiro.service.ts:256:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: recursoId: movimentacaoAtualizada.id,
- src/modules/financeiro/financeiro.service.ts:257:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoAtualizada.clienteId ?? undefined,
- src/modules/financeiro/financeiro.service.ts:257:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoAtualizada.clienteId ?? undefined,
- src/modules/financeiro/financeiro.service.ts:260:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: descricao: movimentacaoAtualizada.descricao,
- src/modules/financeiro/financeiro.service.ts:260:43 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: descricao: movimentacaoAtualizada.descricao,
- src/modules/financeiro/financeiro.service.ts:261:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: movimentacaoAtualizada.tipo,
- src/modules/financeiro/financeiro.service.ts:261:38 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: movimentacaoAtualizada.tipo,
- src/modules/financeiro/financeiro.service.ts:262:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: valor: movimentacaoAtualizada.valor,
- src/modules/financeiro/financeiro.service.ts:262:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: movimentacaoAtualizada.valor,
- src/modules/financeiro/financeiro.service.ts:263:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: status: movimentacaoAtualizada.status,
- src/modules/financeiro/financeiro.service.ts:263:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: status: movimentacaoAtualizada.status,
- src/modules/financeiro/financeiro.service.ts:264:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaId: movimentacaoAtualizada.categoriaId,
- src/modules/financeiro/financeiro.service.ts:264:45 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoriaId on an `any` value.
  Codigo: categoriaId: movimentacaoAtualizada.categoriaId,
- src/modules/financeiro/financeiro.service.ts:265:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaNome: movimentacaoAtualizada.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:265:47 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoria on an `any` value.
  Codigo: categoriaNome: movimentacaoAtualizada.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:266:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoAtualizada.clienteId,
- src/modules/financeiro/financeiro.service.ts:266:43 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoAtualizada.clienteId,
- src/modules/financeiro/financeiro.service.ts:267:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: agendamentoId: movimentacaoAtualizada.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:267:47 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamentoId on an `any` value.
  Codigo: agendamentoId: movimentacaoAtualizada.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:268:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: formaPagamento: movimentacaoAtualizada.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:268:48 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .formaPagamento on an `any` value.
  Codigo: formaPagamento: movimentacaoAtualizada.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:269:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: observacoes: movimentacaoAtualizada.observacoes,
- src/modules/financeiro/financeiro.service.ts:269:45 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .observacoes on an `any` value.
  Codigo: observacoes: movimentacaoAtualizada.observacoes,
- src/modules/financeiro/financeiro.service.ts:277:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return movimentacaoAtualizada;
- src/modules/financeiro/financeiro.service.ts:285:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const movimentacaoAtual = await this.findOne(empresaId, id);
- src/modules/financeiro/financeiro.service.ts:288:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: descricao: movimentacaoAtual.descricao,
- src/modules/financeiro/financeiro.service.ts:288:36 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: descricao: movimentacaoAtual.descricao,
- src/modules/financeiro/financeiro.service.ts:289:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: movimentacaoAtual.tipo,
- src/modules/financeiro/financeiro.service.ts:289:31 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: movimentacaoAtual.tipo,
- src/modules/financeiro/financeiro.service.ts:290:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: valor: movimentacaoAtual.valor,
- src/modules/financeiro/financeiro.service.ts:290:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: movimentacaoAtual.valor,
- src/modules/financeiro/financeiro.service.ts:291:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: status: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:291:33 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: status: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:292:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaId: movimentacaoAtual.categoriaId,
- src/modules/financeiro/financeiro.service.ts:292:38 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoriaId on an `any` value.
  Codigo: categoriaId: movimentacaoAtual.categoriaId,
- src/modules/financeiro/financeiro.service.ts:293:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaNome: movimentacaoAtual.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:293:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoria on an `any` value.
  Codigo: categoriaNome: movimentacaoAtual.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:294:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoAtual.clienteId,
- src/modules/financeiro/financeiro.service.ts:294:36 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoAtual.clienteId,
- src/modules/financeiro/financeiro.service.ts:295:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: agendamentoId: movimentacaoAtual.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:295:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamentoId on an `any` value.
  Codigo: agendamentoId: movimentacaoAtual.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:296:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: formaPagamento: movimentacaoAtual.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:296:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .formaPagamento on an `any` value.
  Codigo: formaPagamento: movimentacaoAtual.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:313:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const movimentacaoCancelada = await this.findOne(empresaId, id);
- src/modules/financeiro/financeiro.service.ts:315:27 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: if (movimentacaoAtual.status !== StatusPagamento.CANCELADO) {
- src/modules/financeiro/financeiro.service.ts:321:57 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: mensagem: `Movimentação ${movimentacaoCancelada.descricao} foi cancelada.`,
- src/modules/financeiro/financeiro.service.ts:322:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: referenciaId: movimentacaoCancelada.id,
- src/modules/financeiro/financeiro.service.ts:322:45 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: referenciaId: movimentacaoCancelada.id,
- src/modules/financeiro/financeiro.service.ts:324:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: movimentacaoId: movimentacaoCancelada.id,
- src/modules/financeiro/financeiro.service.ts:324:49 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: movimentacaoId: movimentacaoCancelada.id,
- src/modules/financeiro/financeiro.service.ts:325:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: descricao: movimentacaoCancelada.descricao,
- src/modules/financeiro/financeiro.service.ts:325:44 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: descricao: movimentacaoCancelada.descricao,
- src/modules/financeiro/financeiro.service.ts:326:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: movimentacaoCancelada.tipo,
- src/modules/financeiro/financeiro.service.ts:326:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: movimentacaoCancelada.tipo,
- src/modules/financeiro/financeiro.service.ts:327:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: valor: movimentacaoCancelada.valor,
- src/modules/financeiro/financeiro.service.ts:327:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: movimentacaoCancelada.valor,
- src/modules/financeiro/financeiro.service.ts:328:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: statusAnterior: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:328:45 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: statusAnterior: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:329:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: statusAtual: movimentacaoCancelada.status,
- src/modules/financeiro/financeiro.service.ts:329:46 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: statusAtual: movimentacaoCancelada.status,
- src/modules/financeiro/financeiro.service.ts:337:106 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: `[FINANCEIRO] movimentacao cancelada empresaId=${empresaId} movimentacaoId=${movimentacaoCancelada.id} status=SUCESSO tempoMs=${tempoMs}`,
- src/modules/financeiro/financeiro.service.ts:345:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: recursoId: movimentacaoCancelada.id,
- src/modules/financeiro/financeiro.service.ts:345:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: recursoId: movimentacaoCancelada.id,
- src/modules/financeiro/financeiro.service.ts:346:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoCancelada.clienteId ?? undefined,
- src/modules/financeiro/financeiro.service.ts:346:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoCancelada.clienteId ?? undefined,
- src/modules/financeiro/financeiro.service.ts:349:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: descricao: movimentacaoCancelada.descricao,
- src/modules/financeiro/financeiro.service.ts:349:42 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: descricao: movimentacaoCancelada.descricao,
- src/modules/financeiro/financeiro.service.ts:350:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: movimentacaoCancelada.tipo,
- src/modules/financeiro/financeiro.service.ts:350:37 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: movimentacaoCancelada.tipo,
- src/modules/financeiro/financeiro.service.ts:351:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: valor: movimentacaoCancelada.valor,
- src/modules/financeiro/financeiro.service.ts:351:38 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: movimentacaoCancelada.valor,
- src/modules/financeiro/financeiro.service.ts:352:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: status: movimentacaoCancelada.status,
- src/modules/financeiro/financeiro.service.ts:352:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: status: movimentacaoCancelada.status,
- src/modules/financeiro/financeiro.service.ts:353:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaId: movimentacaoCancelada.categoriaId,
- src/modules/financeiro/financeiro.service.ts:353:44 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoriaId on an `any` value.
  Codigo: categoriaId: movimentacaoCancelada.categoriaId,
- src/modules/financeiro/financeiro.service.ts:354:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaNome: movimentacaoCancelada.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:354:46 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoria on an `any` value.
  Codigo: categoriaNome: movimentacaoCancelada.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:355:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoCancelada.clienteId,
- src/modules/financeiro/financeiro.service.ts:355:42 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoCancelada.clienteId,
- src/modules/financeiro/financeiro.service.ts:356:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: agendamentoId: movimentacaoCancelada.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:356:46 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamentoId on an `any` value.
  Codigo: agendamentoId: movimentacaoCancelada.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:357:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: formaPagamento: movimentacaoCancelada.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:357:47 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .formaPagamento on an `any` value.
  Codigo: formaPagamento: movimentacaoCancelada.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:361:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: statusAnterior: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:361:43 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: statusAnterior: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:362:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: statusAtual: movimentacaoCancelada.status,
- src/modules/financeiro/financeiro.service.ts:362:44 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: statusAtual: movimentacaoCancelada.status,
- src/modules/financeiro/financeiro.service.ts:367:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return movimentacaoCancelada;
- src/modules/financeiro/financeiro.service.ts:375:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const movimentacaoAtual = await this.findOne(empresaId, id);
- src/modules/financeiro/financeiro.service.ts:378:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: descricao: movimentacaoAtual.descricao,
- src/modules/financeiro/financeiro.service.ts:378:36 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: descricao: movimentacaoAtual.descricao,
- src/modules/financeiro/financeiro.service.ts:379:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: movimentacaoAtual.tipo,
- src/modules/financeiro/financeiro.service.ts:379:31 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: movimentacaoAtual.tipo,
- src/modules/financeiro/financeiro.service.ts:380:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: valor: movimentacaoAtual.valor,
- src/modules/financeiro/financeiro.service.ts:380:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: movimentacaoAtual.valor,
- src/modules/financeiro/financeiro.service.ts:381:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: status: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:381:33 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: status: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:382:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaId: movimentacaoAtual.categoriaId,
- src/modules/financeiro/financeiro.service.ts:382:38 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoriaId on an `any` value.
  Codigo: categoriaId: movimentacaoAtual.categoriaId,
- src/modules/financeiro/financeiro.service.ts:383:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaNome: movimentacaoAtual.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:383:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoria on an `any` value.
  Codigo: categoriaNome: movimentacaoAtual.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:384:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoAtual.clienteId,
- src/modules/financeiro/financeiro.service.ts:384:36 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoAtual.clienteId,
- src/modules/financeiro/financeiro.service.ts:385:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: agendamentoId: movimentacaoAtual.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:385:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamentoId on an `any` value.
  Codigo: agendamentoId: movimentacaoAtual.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:386:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: formaPagamento: movimentacaoAtual.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:386:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .formaPagamento on an `any` value.
  Codigo: formaPagamento: movimentacaoAtual.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:404:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const movimentacaoPaga = await this.findOne(empresaId, id);
- src/modules/financeiro/financeiro.service.ts:406:27 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: if (movimentacaoAtual.status !== StatusPagamento.PAGO) {
- src/modules/financeiro/financeiro.service.ts:412:62 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: mensagem: `Pagamento de R$ ${Number(movimentacaoPaga.valor).toFixed(
- src/modules/financeiro/financeiro.service.ts:415:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: referenciaId: movimentacaoPaga.id,
- src/modules/financeiro/financeiro.service.ts:415:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: referenciaId: movimentacaoPaga.id,
- src/modules/financeiro/financeiro.service.ts:417:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: movimentacaoId: movimentacaoPaga.id,
- src/modules/financeiro/financeiro.service.ts:417:44 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: movimentacaoId: movimentacaoPaga.id,
- src/modules/financeiro/financeiro.service.ts:418:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: descricao: movimentacaoPaga.descricao,
- src/modules/financeiro/financeiro.service.ts:418:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: descricao: movimentacaoPaga.descricao,
- src/modules/financeiro/financeiro.service.ts:419:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: movimentacaoPaga.tipo,
- src/modules/financeiro/financeiro.service.ts:419:34 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: movimentacaoPaga.tipo,
- src/modules/financeiro/financeiro.service.ts:420:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: valor: movimentacaoPaga.valor,
- src/modules/financeiro/financeiro.service.ts:420:35 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: movimentacaoPaga.valor,
- src/modules/financeiro/financeiro.service.ts:421:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: formaPagamento: movimentacaoPaga.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:421:44 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .formaPagamento on an `any` value.
  Codigo: formaPagamento: movimentacaoPaga.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:422:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: statusAnterior: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:422:45 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: statusAnterior: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:423:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: statusAtual: movimentacaoPaga.status,
- src/modules/financeiro/financeiro.service.ts:423:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: statusAtual: movimentacaoPaga.status,
- src/modules/financeiro/financeiro.service.ts:431:99 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: `[FINANCEIRO] pagamento registrado empresaId=${empresaId} movimentacaoId=${movimentacaoPaga.id} status=SUCESSO tempoMs=${tempoMs}`,
- src/modules/financeiro/financeiro.service.ts:439:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: recursoId: movimentacaoPaga.id,
- src/modules/financeiro/financeiro.service.ts:439:35 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: recursoId: movimentacaoPaga.id,
- src/modules/financeiro/financeiro.service.ts:440:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoPaga.clienteId ?? undefined,
- src/modules/financeiro/financeiro.service.ts:440:35 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoPaga.clienteId ?? undefined,
- src/modules/financeiro/financeiro.service.ts:443:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: descricao: movimentacaoPaga.descricao,
- src/modules/financeiro/financeiro.service.ts:443:37 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .descricao on an `any` value.
  Codigo: descricao: movimentacaoPaga.descricao,
- src/modules/financeiro/financeiro.service.ts:444:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: tipo: movimentacaoPaga.tipo,
- src/modules/financeiro/financeiro.service.ts:444:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: tipo: movimentacaoPaga.tipo,
- src/modules/financeiro/financeiro.service.ts:445:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: valor: movimentacaoPaga.valor,
- src/modules/financeiro/financeiro.service.ts:445:33 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: movimentacaoPaga.valor,
- src/modules/financeiro/financeiro.service.ts:446:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: status: movimentacaoPaga.status,
- src/modules/financeiro/financeiro.service.ts:446:34 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: status: movimentacaoPaga.status,
- src/modules/financeiro/financeiro.service.ts:447:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaId: movimentacaoPaga.categoriaId,
- src/modules/financeiro/financeiro.service.ts:447:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoriaId on an `any` value.
  Codigo: categoriaId: movimentacaoPaga.categoriaId,
- src/modules/financeiro/financeiro.service.ts:448:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: categoriaNome: movimentacaoPaga.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:448:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .categoria on an `any` value.
  Codigo: categoriaNome: movimentacaoPaga.categoria?.nome,
- src/modules/financeiro/financeiro.service.ts:449:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: movimentacaoPaga.clienteId,
- src/modules/financeiro/financeiro.service.ts:449:37 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .clienteId on an `any` value.
  Codigo: clienteId: movimentacaoPaga.clienteId,
- src/modules/financeiro/financeiro.service.ts:450:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: agendamentoId: movimentacaoPaga.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:450:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamentoId on an `any` value.
  Codigo: agendamentoId: movimentacaoPaga.agendamentoId,
- src/modules/financeiro/financeiro.service.ts:451:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: formaPagamento: movimentacaoPaga.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:451:42 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .formaPagamento on an `any` value.
  Codigo: formaPagamento: movimentacaoPaga.formaPagamento,
- src/modules/financeiro/financeiro.service.ts:455:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: statusAnterior: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:455:43 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: statusAnterior: movimentacaoAtual.status,
- src/modules/financeiro/financeiro.service.ts:456:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: statusAtual: movimentacaoPaga.status,
- src/modules/financeiro/financeiro.service.ts:456:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .status on an `any` value.
  Codigo: statusAtual: movimentacaoPaga.status,
- src/modules/financeiro/financeiro.service.ts:461:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return movimentacaoPaga;
- src/modules/financeiro/financeiro.service.ts:553:9 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: this.formatarMovimentacao(item),
- src/modules/financeiro/financeiro.service.ts:698:18 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type error typed assigned to a parameter of type `string | number | Date`.
  Codigo: ? new Date(query['dataInicio'])
- src/modules/financeiro/financeiro.service.ts:701:49 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type error typed assigned to a parameter of type `string | number | Date`.
  Codigo: const dataFim = query['dataFim'] ? new Date(query['dataFim']) : undefined;
- src/modules/financeiro/financeiro.service.ts:711:36 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an error typed value.
  Codigo: ...(query['categoriaId'] ? { categoriaId: query['categoriaId'] } : {}),
- src/modules/financeiro/financeiro.service.ts:712:34 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an error typed value.
  Codigo: ...(query['clienteId'] ? { clienteId: query['clienteId'] } : {}),
- src/modules/financeiro/financeiro.service.ts:714:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an error typed value.
  Codigo: ? { agendamentoId: query['agendamentoId'] }
- src/modules/financeiro/financeiro.service.ts:810:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return {
- src/modules/financeiro/financeiro.service.ts:812:34 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .valor on an `any` value.
  Codigo: valor: Number(movimentacao.valor),

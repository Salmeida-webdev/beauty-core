# Chat 03 - Bloco 04U - Lint restante do Analytics

- Arquivo: `src/modules/analytics/analytics.service.ts`
- Escopo: somente leitura; nenhum codigo foi alterado.
- Erros restantes: 55
- Warnings restantes: 5
- Exit code bruto do ESLint: 1

## Mensagens por linha

- src/modules/analytics/analytics.service.ts:13:15 [error] prettier/prettier - Delete `┬À`
  Codigo: private db() : PrismaService {
- src/modules/analytics/analytics.service.ts:204:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: cliente.dataNascimento?.getMonth() === mesAtual ? total + 1 : total,
- src/modules/analytics/analytics.service.ts:204:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .dataNascimento on an `any` value.
  Codigo: cliente.dataNascimento?.getMonth() === mesAtual ? total + 1 : total,
- src/modules/analytics/analytics.service.ts:409:27 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: .map((item: any) => item.servicoId)
- src/modules/analytics/analytics.service.ts:409:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .servicoId on an `any` value.
  Codigo: .map((item: any) => item.servicoId)
- src/modules/analytics/analytics.service.ts:431:47 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: servicos.map((servico: any) => [servico.id, servico]),
- src/modules/analytics/analytics.service.ts:435:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const servico: any = servicosMap.get(item.servicoId);
- src/modules/analytics/analytics.service.ts:435:44 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `string`.
  Codigo: const servico: any = servicosMap.get(item.servicoId);
- src/modules/analytics/analytics.service.ts:435:49 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .servicoId on an `any` value.
  Codigo: const servico: any = servicosMap.get(item.servicoId);
- src/modules/analytics/analytics.service.ts:436:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const quantidade = item._count.id;
- src/modules/analytics/analytics.service.ts:436:31 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._count on an `any` value.
  Codigo: const quantidade = item._count.id;
- src/modules/analytics/analytics.service.ts:437:42 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .preco on an `any` value.
  Codigo: const preco = this.numero(servico?.preco);
- src/modules/analytics/analytics.service.ts:441:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: servico: servico?.nome ?? 'ServiÃƒÂ§o nÃƒÂ£o encontrado',
- src/modules/analytics/analytics.service.ts:441:27 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .nome on an `any` value.
  Codigo: servico: servico?.nome ?? 'ServiÃƒÂ§o nÃƒÂ£o encontrado',
- src/modules/analytics/analytics.service.ts:442:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: quantidade,
- src/modules/analytics/analytics.service.ts:474:27 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: .map((item: any) => item.profissionalId)
- src/modules/analytics/analytics.service.ts:474:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .profissionalId on an `any` value.
  Codigo: .map((item: any) => item.profissionalId)
- src/modules/analytics/analytics.service.ts:512:62 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: profissionais.map((profissional: any) => [profissional.id, profissional]),
- src/modules/analytics/analytics.service.ts:516:50 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .profissionalId on an `any` value.
  Codigo: comissoes.map((comissao: any) => [comissao.profissionalId, comissao]),
- src/modules/analytics/analytics.service.ts:520:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const profissional: any = profissionaisMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:520:54 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `string`.
  Codigo: const profissional: any = profissionaisMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:520:59 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .profissionalId on an `any` value.
  Codigo: const profissional: any = profissionaisMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:521:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const comissao: any = comissoesMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:521:46 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `string`.
  Codigo: const comissao: any = comissoesMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:521:51 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .profissionalId on an `any` value.
  Codigo: const comissao: any = comissoesMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:525:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: nome: profissional?.nome ?? 'Profissional nÃƒÂ£o encontrado',
- src/modules/analytics/analytics.service.ts:525:29 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .nome on an `any` value.
  Codigo: nome: profissional?.nome ?? 'Profissional nÃƒÂ£o encontrado',
- src/modules/analytics/analytics.service.ts:526:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: atendimentos: item._count.id,
- src/modules/analytics/analytics.service.ts:526:28 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._count on an `any` value.
  Codigo: atendimentos: item._count.id,
- src/modules/analytics/analytics.service.ts:527:40 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._sum on an `any` value.
  Codigo: receita: this.numero(comissao?._sum.valorServico),
- src/modules/analytics/analytics.service.ts:528:41 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._sum on an `any` value.
  Codigo: comissao: this.numero(comissao?._sum.valorComissao),
- src/modules/analytics/analytics.service.ts:554:27 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: .map((item: any) => item.unidadeId)
- src/modules/analytics/analytics.service.ts:554:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .unidadeId on an `any` value.
  Codigo: .map((item: any) => item.unidadeId)
- src/modules/analytics/analytics.service.ts:600:47 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  Codigo: unidades.map((unidade: any) => [unidade.id, unidade]),
- src/modules/analytics/analytics.service.ts:619:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const unidade: any = unidadesMap.get(item.unidadeId);
- src/modules/analytics/analytics.service.ts:619:44 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `string`.
  Codigo: const unidade: any = unidadesMap.get(item.unidadeId);
- src/modules/analytics/analytics.service.ts:619:49 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .unidadeId on an `any` value.
  Codigo: const unidade: any = unidadesMap.get(item.unidadeId);
- src/modules/analytics/analytics.service.ts:623:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: unidade: unidade?.nome ?? 'Unidade nÃƒÂ£o encontrada',
- src/modules/analytics/analytics.service.ts:623:27 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .nome on an `any` value.
  Codigo: unidade: unidade?.nome ?? 'Unidade nÃƒÂ£o encontrada',
- src/modules/analytics/analytics.service.ts:624:41 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `string`.
  Codigo: receita: receitasPorUnidade.get(item.unidadeId) ?? 0,
- src/modules/analytics/analytics.service.ts:624:46 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .unidadeId on an `any` value.
  Codigo: receita: receitasPorUnidade.get(item.unidadeId) ?? 0,
- src/modules/analytics/analytics.service.ts:625:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: agendamentos: item._count.id,
- src/modules/analytics/analytics.service.ts:625:28 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._count on an `any` value.
  Codigo: agendamentos: item._count.id,
- src/modules/analytics/analytics.service.ts:705:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: clienteId: item.cliente.id,
- src/modules/analytics/analytics.service.ts:705:25 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  Codigo: clienteId: item.cliente.id,
- src/modules/analytics/analytics.service.ts:706:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: nome: item.cliente.nome,
- src/modules/analytics/analytics.service.ts:706:20 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  Codigo: nome: item.cliente.nome,
- src/modules/analytics/analytics.service.ts:707:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: telefone: item.cliente.telefone,
- src/modules/analytics/analytics.service.ts:707:24 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  Codigo: telefone: item.cliente.telefone,
- src/modules/analytics/analytics.service.ts:708:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: pontos: item.saldoPontos,
- src/modules/analytics/analytics.service.ts:708:22 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .saldoPontos on an `any` value.
  Codigo: pontos: item.saldoPontos,
- src/modules/analytics/analytics.service.ts:766:62 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .pacote on an `any` value.
  Codigo: (total: number, item: any) => total + this.numero(item.pacote?.valor),
- src/modules/analytics/analytics.service.ts:918:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: acc[item.tipo] = item._count.id;
- src/modules/analytics/analytics.service.ts:918:13 [error] @typescript-eslint/no-unsafe-member-access - Computed name [item.tipo] resolves to an `any` value.
  Codigo: acc[item.tipo] = item._count.id;
- src/modules/analytics/analytics.service.ts:918:18 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .tipo on an `any` value.
  Codigo: acc[item.tipo] = item._count.id;
- src/modules/analytics/analytics.service.ts:918:31 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._count on an `any` value.
  Codigo: acc[item.tipo] = item._count.id;
- src/modules/analytics/analytics.service.ts:923:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: acc[item.modulo] = item._count.id;
- src/modules/analytics/analytics.service.ts:923:13 [error] @typescript-eslint/no-unsafe-member-access - Computed name [item.modulo] resolves to an `any` value.
  Codigo: acc[item.modulo] = item._count.id;
- src/modules/analytics/analytics.service.ts:923:18 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .modulo on an `any` value.
  Codigo: acc[item.modulo] = item._count.id;
- src/modules/analytics/analytics.service.ts:923:33 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._count on an `any` value.
  Codigo: acc[item.modulo] = item._count.id;

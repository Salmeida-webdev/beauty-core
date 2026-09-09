# Chat 03 - Bloco 04O - Contexto dos maiores bloqueadores

- Operacao somente leitura.
- Exit code bruto: 1

## Regras no recorte
- @typescript-eslint/no-unsafe-assignment: 220
- @typescript-eslint/no-unsafe-member-access: 202
- @typescript-eslint/no-unsafe-call: 66
- @typescript-eslint/no-unsafe-return: 19
- @typescript-eslint/no-unsafe-argument: 15

## Mensagens com contexto
- src/modules/analytics/analytics.service.ts:14:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  codigo: return this.prisma as any;
- src/modules/analytics/analytics.service.ts:99:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: totalClientes: clientes.totalClientes,
- src/modules/analytics/analytics.service.ts:100:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: clientesAtivos: clientes.ativos,
- src/modules/analytics/analytics.service.ts:101:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: clientesInativos: clientes.inativos,
- src/modules/analytics/analytics.service.ts:102:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: clientesAniversariantesMes: clientes.aniversariantesMes,
- src/modules/analytics/analytics.service.ts:105:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: totalAgendamentos: agendamentos.total,
- src/modules/analytics/analytics.service.ts:106:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: confirmados: agendamentos.confirmados,
- src/modules/analytics/analytics.service.ts:107:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: cancelados: agendamentos.cancelados,
- src/modules/analytics/analytics.service.ts:108:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: concluidos: agendamentos.concluidos,
- src/modules/analytics/analytics.service.ts:109:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: pendentes: agendamentos.pendentes,
- src/modules/analytics/analytics.service.ts:118:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: clientesComPontos: fidelidade.clientesComPontos,
- src/modules/analytics/analytics.service.ts:120:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: beneficiosLiberados: fidelidade.beneficiosLiberados,
- src/modules/analytics/analytics.service.ts:123:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: pacotesAtivos: pacotes.pacotesAtivos,
- src/modules/analytics/analytics.service.ts:124:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: pacotesFinalizados: pacotes.pacotesFinalizados,
- src/modules/analytics/analytics.service.ts:125:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: pacotesVencidos: pacotes.pacotesVencidos,
- src/modules/analytics/analytics.service.ts:128:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: mensagensCriadas: whatsapp.mensagensCriadas,
- src/modules/analytics/analytics.service.ts:129:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: mensagensEnviadas: whatsapp.mensagensEnviadas,
- src/modules/analytics/analytics.service.ts:130:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: campanhasCriadas: whatsapp.campanhasCriadas,
- src/modules/analytics/analytics.service.ts:142:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: totalClientes,
- src/modules/analytics/analytics.service.ts:143:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: ativos,
- src/modules/analytics/analytics.service.ts:144:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: inativos,
- src/modules/analytics/analytics.service.ts:145:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: novosUltimos30Dias,
- src/modules/analytics/analytics.service.ts:146:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: clientesAntes30Dias,
- src/modules/analytics/analytics.service.ts:147:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: clientesComNascimento,
- src/modules/analytics/analytics.service.ts:149:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:149:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:155:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:155:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:162:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:162:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:169:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:169:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:178:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:178:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  codigo: this.db().cliente.count({
- src/modules/analytics/analytics.service.ts:187:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().cliente.findMany({
- src/modules/analytics/analytics.service.ts:187:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .cliente on an `any` value.
  codigo: this.db().cliente.findMany({
- src/modules/analytics/analytics.service.ts:202:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const aniversariantesMes = clientesComNascimento.reduce(
- src/modules/analytics/analytics.service.ts:202:32 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: const aniversariantesMes = clientesComNascimento.reduce(
- src/modules/analytics/analytics.service.ts:202:54 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .reduce on an `any` value.
  codigo: const aniversariantesMes = clientesComNascimento.reduce(
- src/modules/analytics/analytics.service.ts:204:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: cliente.dataNascimento?.getMonth() === mesAtual ? total + 1 : total,
- src/modules/analytics/analytics.service.ts:204:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .dataNascimento on an `any` value.
  codigo: cliente.dataNascimento?.getMonth() === mesAtual ? total + 1 : total,
- src/modules/analytics/analytics.service.ts:209:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: totalClientes,
- src/modules/analytics/analytics.service.ts:210:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: ativos,
- src/modules/analytics/analytics.service.ts:211:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: inativos,
- src/modules/analytics/analytics.service.ts:212:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: novosUltimos30Dias,
- src/modules/analytics/analytics.service.ts:213:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: aniversariantesMes,
- src/modules/analytics/analytics.service.ts:215:9 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `number`.
  codigo: novosUltimos30Dias,
- src/modules/analytics/analytics.service.ts:216:9 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `number`.
  codigo: clientesAntes30Dias,
- src/modules/analytics/analytics.service.ts:235:12 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: const [total, confirmados, cancelados, concluidos, pendentes] =
- src/modules/analytics/analytics.service.ts:235:19 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: const [total, confirmados, cancelados, concluidos, pendentes] =
- src/modules/analytics/analytics.service.ts:235:32 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: const [total, confirmados, cancelados, concluidos, pendentes] =
- src/modules/analytics/analytics.service.ts:235:44 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: const [total, confirmados, cancelados, concluidos, pendentes] =
- src/modules/analytics/analytics.service.ts:235:56 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: const [total, confirmados, cancelados, concluidos, pendentes] =
- src/modules/analytics/analytics.service.ts:237:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:237:19 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamento on an `any` value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:241:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:241:19 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamento on an `any` value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:248:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:248:19 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamento on an `any` value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:255:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:255:19 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamento on an `any` value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:262:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:262:19 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamento on an `any` value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:271:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: total,
- src/modules/analytics/analytics.service.ts:272:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: confirmados,
- src/modules/analytics/analytics.service.ts:273:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: cancelados,
- src/modules/analytics/analytics.service.ts:274:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: concluidos,
- src/modules/analytics/analytics.service.ts:275:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: pendentes,
- src/modules/analytics/analytics.service.ts:303:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: receitasAgg,
- src/modules/analytics/analytics.service.ts:304:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: despesasAgg,
- src/modules/analytics/analytics.service.ts:305:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: receitasMesAgg,
- src/modules/analytics/analytics.service.ts:306:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: despesasMesAgg,
- src/modules/analytics/analytics.service.ts:307:7 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: agendamentosConcluidos,
- src/modules/analytics/analytics.service.ts:309:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().movimentacaoFinanceira.aggregate({
- src/modules/analytics/analytics.service.ts:309:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .movimentacaoFinanceira on an `any` value.
  codigo: this.db().movimentacaoFinanceira.aggregate({
- src/modules/analytics/analytics.service.ts:319:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().movimentacaoFinanceira.aggregate({
- src/modules/analytics/analytics.service.ts:319:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .movimentacaoFinanceira on an `any` value.
  codigo: this.db().movimentacaoFinanceira.aggregate({
- src/modules/analytics/analytics.service.ts:329:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().movimentacaoFinanceira.aggregate({
- src/modules/analytics/analytics.service.ts:329:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .movimentacaoFinanceira on an `any` value.
  codigo: this.db().movimentacaoFinanceira.aggregate({
- src/modules/analytics/analytics.service.ts:343:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().movimentacaoFinanceira.aggregate({
- src/modules/analytics/analytics.service.ts:343:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .movimentacaoFinanceira on an `any` value.
  codigo: this.db().movimentacaoFinanceira.aggregate({
- src/modules/analytics/analytics.service.ts:357:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:357:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamento on an `any` value.
  codigo: this.db().agendamento.count({
- src/modules/analytics/analytics.service.ts:366:46 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._sum on an `any` value.
  codigo: const receitas = this.numero(receitasAgg._sum.valor);
- src/modules/analytics/analytics.service.ts:367:46 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._sum on an `any` value.
  codigo: const despesas = this.numero(despesasAgg._sum.valor);
- src/modules/analytics/analytics.service.ts:368:52 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._sum on an `any` value.
  codigo: const receitasMes = this.numero(receitasMesAgg._sum.valor);
- src/modules/analytics/analytics.service.ts:369:52 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._sum on an `any` value.
  codigo: const despesasMes = this.numero(despesasMesAgg._sum.valor);
- src/modules/analytics/analytics.service.ts:390:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const agrupados = await this.db().agendamento.groupBy({
- src/modules/analytics/analytics.service.ts:390:29 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: const agrupados = await this.db().agendamento.groupBy({
- src/modules/analytics/analytics.service.ts:390:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamento on an `any` value.
  codigo: const agrupados = await this.db().agendamento.groupBy({
- src/modules/analytics/analytics.service.ts:408:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const servicoIds = agrupados
- src/modules/analytics/analytics.service.ts:408:24 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: const servicoIds = agrupados
- src/modules/analytics/analytics.service.ts:408:24 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: const servicoIds = agrupados
- src/modules/analytics/analytics.service.ts:409:8 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .map on an `any` value.
  codigo: .map((item: any) => item.servicoId)
- src/modules/analytics/analytics.service.ts:409:27 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  codigo: .map((item: any) => item.servicoId)
- src/modules/analytics/analytics.service.ts:409:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .servicoId on an `any` value.
  codigo: .map((item: any) => item.servicoId)
- src/modules/analytics/analytics.service.ts:410:8 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .filter on an `any` value.
  codigo: .filter(Boolean);
- src/modules/analytics/analytics.service.ts:412:21 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .length on an `any` value.
  codigo: if (!servicoIds.length) {
- src/modules/analytics/analytics.service.ts:416:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const servicos = await this.db().servico.findMany({
- src/modules/analytics/analytics.service.ts:416:28 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: const servicos = await this.db().servico.findMany({
- src/modules/analytics/analytics.service.ts:416:38 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .servico on an `any` value.
  codigo: const servicos = await this.db().servico.findMany({
- src/modules/analytics/analytics.service.ts:420:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: in: servicoIds,
- src/modules/analytics/analytics.service.ts:431:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: servicos.map((servico: any) => [servico.id, servico]),
- src/modules/analytics/analytics.service.ts:431:7 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `Iterable<readonly [string, any]> | null | undefined`.
  codigo: servicos.map((servico: any) => [servico.id, servico]),
- src/modules/analytics/analytics.service.ts:431:16 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .map on an `any` value.
  codigo: servicos.map((servico: any) => [servico.id, servico]),
- src/modules/analytics/analytics.service.ts:431:38 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any[]`.
  codigo: servicos.map((servico: any) => [servico.id, servico]),
- src/modules/analytics/analytics.service.ts:431:47 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  codigo: servicos.map((servico: any) => [servico.id, servico]),
- src/modules/analytics/analytics.service.ts:434:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  codigo: return agrupados.map((item: any, index: number) => {
- src/modules/analytics/analytics.service.ts:434:12 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: return agrupados.map((item: any, index: number) => {
- src/modules/analytics/analytics.service.ts:434:22 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .map on an `any` value.
  codigo: return agrupados.map((item: any, index: number) => {
- src/modules/analytics/analytics.service.ts:435:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const servico: any = servicosMap.get(item.servicoId);
- src/modules/analytics/analytics.service.ts:435:44 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `string`.
  codigo: const servico: any = servicosMap.get(item.servicoId);
- src/modules/analytics/analytics.service.ts:435:49 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .servicoId on an `any` value.
  codigo: const servico: any = servicosMap.get(item.servicoId);
- src/modules/analytics/analytics.service.ts:436:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const quantidade = item._count.id;
- src/modules/analytics/analytics.service.ts:436:31 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access ._count on an `any` value.
  codigo: const quantidade = item._count.id;
- src/modules/analytics/analytics.service.ts:437:42 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .preco on an `any` value.
  codigo: const preco = this.numero(servico?.preco);
- src/modules/analytics/analytics.service.ts:441:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: servico: servico?.nome ?? 'ServiÃƒÆ’Ã‚Â§o nÃƒÆ’Ã‚Â£o encontrado',
- src/modules/analytics/analytics.service.ts:441:27 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .nome on an `any` value.
  codigo: servico: servico?.nome ?? 'ServiÃƒÆ’Ã‚Â§o nÃƒÆ’Ã‚Â£o encontrado',
- src/modules/analytics/analytics.service.ts:442:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: quantidade,
- src/modules/analytics/analytics.service.ts:455:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const agrupados = await this.db().agendamento.groupBy({
- src/modules/analytics/analytics.service.ts:455:29 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: const agrupados = await this.db().agendamento.groupBy({
- src/modules/analytics/analytics.service.ts:455:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .agendamento on an `any` value.
  codigo: const agrupados = await this.db().agendamento.groupBy({
- src/modules/analytics/analytics.service.ts:473:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const profissionalIds = agrupados
- src/modules/analytics/analytics.service.ts:473:29 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: const profissionalIds = agrupados
- src/modules/analytics/analytics.service.ts:473:29 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: const profissionalIds = agrupados
- src/modules/analytics/analytics.service.ts:474:8 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .map on an `any` value.
  codigo: .map((item: any) => item.profissionalId)
- src/modules/analytics/analytics.service.ts:474:27 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  codigo: .map((item: any) => item.profissionalId)
- src/modules/analytics/analytics.service.ts:474:32 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .profissionalId on an `any` value.
  codigo: .map((item: any) => item.profissionalId)
- src/modules/analytics/analytics.service.ts:475:8 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .filter on an `any` value.
  codigo: .filter(Boolean);
- src/modules/analytics/analytics.service.ts:477:26 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .length on an `any` value.
  codigo: if (!profissionalIds.length) {
- src/modules/analytics/analytics.service.ts:481:12 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: const [profissionais, comissoes] = await Promise.all([
- src/modules/analytics/analytics.service.ts:481:27 [error] @typescript-eslint/no-unsafe-assignment - Unsafe array destructuring of a tuple element with an `any` value.
  codigo: const [profissionais, comissoes] = await Promise.all([
- src/modules/analytics/analytics.service.ts:482:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().usuario.findMany({
- src/modules/analytics/analytics.service.ts:482:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .usuario on an `any` value.
  codigo: this.db().usuario.findMany({
- src/modules/analytics/analytics.service.ts:486:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: in: profissionalIds,
- src/modules/analytics/analytics.service.ts:495:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: this.db().comissaoProfissional.groupBy({
- src/modules/analytics/analytics.service.ts:495:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .comissaoProfissional on an `any` value.
  codigo: this.db().comissaoProfissional.groupBy({
- src/modules/analytics/analytics.service.ts:500:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: in: profissionalIds,
- src/modules/analytics/analytics.service.ts:512:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: profissionais.map((profissional: any) => [profissional.id, profissional]),
- src/modules/analytics/analytics.service.ts:512:7 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `Iterable<readonly [string, any]> | null | undefined`.
  codigo: profissionais.map((profissional: any) => [profissional.id, profissional]),
- src/modules/analytics/analytics.service.ts:512:21 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .map on an `any` value.
  codigo: profissionais.map((profissional: any) => [profissional.id, profissional]),
- src/modules/analytics/analytics.service.ts:512:48 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any[]`.
  codigo: profissionais.map((profissional: any) => [profissional.id, profissional]),
- src/modules/analytics/analytics.service.ts:512:62 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .id on an `any` value.
  codigo: profissionais.map((profissional: any) => [profissional.id, profissional]),
- src/modules/analytics/analytics.service.ts:516:7 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: comissoes.map((comissao: any) => [comissao.profissionalId, comissao]),
- src/modules/analytics/analytics.service.ts:516:7 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `Iterable<readonly [string, any]> | null | undefined`.
  codigo: comissoes.map((comissao: any) => [comissao.profissionalId, comissao]),
- src/modules/analytics/analytics.service.ts:516:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .map on an `any` value.
  codigo: comissoes.map((comissao: any) => [comissao.profissionalId, comissao]),
- src/modules/analytics/analytics.service.ts:516:40 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any[]`.
  codigo: comissoes.map((comissao: any) => [comissao.profissionalId, comissao]),
- src/modules/analytics/analytics.service.ts:516:50 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .profissionalId on an `any` value.
  codigo: comissoes.map((comissao: any) => [comissao.profissionalId, comissao]),
- src/modules/analytics/analytics.service.ts:519:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  codigo: return agrupados.map((item: any, index: number) => {
- src/modules/analytics/analytics.service.ts:519:12 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  codigo: return agrupados.map((item: any, index: number) => {
- src/modules/analytics/analytics.service.ts:519:22 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .map on an `any` value.
  codigo: return agrupados.map((item: any, index: number) => {
- src/modules/analytics/analytics.service.ts:520:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const profissional: any = profissionaisMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:520:54 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `string`.
  codigo: const profissional: any = profissionaisMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:520:59 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .profissionalId on an `any` value.
  codigo: const profissional: any = profissionaisMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:521:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: const comissao: any = comissoesMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:521:46 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `string`.
  codigo: const comissao: any = comissoesMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:521:51 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .profissionalId on an `any` value.
  codigo: const comissao: any = comissoesMap.get(item.profissionalId);
- src/modules/analytics/analytics.service.ts:525:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: nome: profissional?.nome ?? 'Profissional nÃƒÆ’Ã‚Â£o encontrado',
- src/modules/analytics/analytics.service.ts:525:29 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .nome on an `any` value.
  codigo: nome: profissional?.nome ?? 'Profissional nÃƒÆ’Ã‚Â£o encontrado',
- src/modules/analytics/analytics.service.ts:526:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  codigo: atendimentos: item._count.id,

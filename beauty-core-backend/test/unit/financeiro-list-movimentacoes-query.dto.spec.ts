import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { StatusPagamento, TipoMovimentacaoFinanceira } from '@prisma/client';

import { ListMovimentacoesQueryDto } from '../../src/modules/financeiro/dto/list-movimentacoes-query.dto';

describe('ListMovimentacoesQueryDto', () => {
  const uuid = '550e8400-e29b-41d4-a716-446655440000';

  it('aceita os filtros financeiros suportados pelo service', async () => {
    const dto = plainToInstance(ListMovimentacoesQueryDto, {
      page: '2',
      limit: '30',
      categoriaId: uuid,
      clienteId: uuid,
      agendamentoId: uuid,
      tipo: TipoMovimentacaoFinanceira.RECEITA,
      status: StatusPagamento.PAGO,
    });

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    expect(errors).toHaveLength(0);

    expect(dto).toMatchObject({
      page: 2,
      limit: 30,
      categoriaId: uuid,
      clienteId: uuid,
      agendamentoId: uuid,
      tipo: TipoMovimentacaoFinanceira.RECEITA,
      status: StatusPagamento.PAGO,
    });
  });

  it('mantém empresaId fora do contrato público', async () => {
    const dto = plainToInstance(ListMovimentacoesQueryDto, {
      categoriaId: uuid,
      empresaId: uuid,
    });

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    expect(errors.some((error) => error.property === 'empresaId')).toBe(true);
  });

  it('rejeita UUID relacional inválido', async () => {
    const dto = plainToInstance(ListMovimentacoesQueryDto, {
      categoriaId: 'invalido',
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'categoriaId')).toBe(true);
  });

  it('rejeita tipo financeiro inexistente', async () => {
    const dto = plainToInstance(ListMovimentacoesQueryDto, {
      tipo: 'ENTRADA',
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'tipo')).toBe(true);
  });

  it('rejeita status financeiro inexistente', async () => {
    const dto = plainToInstance(ListMovimentacoesQueryDto, {
      status: 'CONCLUIDO',
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'status')).toBe(true);
  });
});

import { StatusAgendamento } from '@prisma/client';
import { validate } from 'class-validator';

import { ListAgendamentosQueryDto } from '../../src/modules/agendamentos/dto/list-agendamentos-query.dto';

describe('ListAgendamentosQueryDto', () => {
  const uuid = '550e8400-e29b-41d4-a716-446655440000';

  it('aceita os filtros server-side suportados pelo service', async () => {
    const dto = Object.assign(new ListAgendamentosQueryDto(), {
      dataInicio: '2026-08-24T00:00:00.000Z',
      dataFim: '2026-08-30T23:59:59.999Z',
      status: StatusAgendamento.CONFIRMADO,
      clienteId: uuid,
      profissionalId: uuid,
      servicoId: uuid,
      unidadeId: uuid,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('rejeita status fora do enum real', async () => {
    const dto = Object.assign(new ListAgendamentosQueryDto(), {
      status: 'AGENDADO',
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'status')).toBe(true);
  });

  it('rejeita período com data inválida', async () => {
    const dto = Object.assign(new ListAgendamentosQueryDto(), {
      dataInicio: '29/08/2026',
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'dataInicio')).toBe(true);
  });

  it('rejeita ids relacionais inválidos', async () => {
    const dto = Object.assign(new ListAgendamentosQueryDto(), {
      clienteId: 'cliente-invalido',
      profissionalId: 'profissional-invalido',
      servicoId: 'servico-invalido',
      unidadeId: 'unidade-invalida',
    });

    const errors = await validate(dto);
    const properties = errors.map((error) => error.property);

    expect(properties).toEqual(
      expect.arrayContaining([
        'clienteId',
        'profissionalId',
        'servicoId',
        'unidadeId',
      ]),
    );
  });
});

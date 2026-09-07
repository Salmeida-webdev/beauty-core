import { ConflictException } from '@nestjs/common';

import { AgendamentosService } from '../../src/modules/agendamentos/agendamentos.service';

describe('AgendamentosService concurrency guards', () => {
  it('detects only overlapping occupied intervals for the same professional', async () => {
    const service = Object.create(
      AgendamentosService.prototype,
    ) as AgendamentosService;
    const tx = {
      agendamento: {
        findFirst: jest.fn().mockResolvedValue({ id: 'existing' }),
      },
    };

    await expect(
      (service as any).assertNoScheduleConflict(tx, {
        empresaId: 'empresa-1',
        profissionalId: 'profissional-1',
        dataHoraInicio: new Date('2026-09-07T10:30:00.000Z'),
        dataHoraFim: new Date('2026-09-07T11:30:00.000Z'),
      }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(tx.agendamento.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          empresaId: 'empresa-1',
          profissionalId: 'profissional-1',
          dataHoraInicio: { lt: new Date('2026-09-07T11:30:00.000Z') },
          dataHoraFim: { gt: new Date('2026-09-07T10:30:00.000Z') },
        }),
      }),
    );
  });

  it('excludes cancelled appointments from the occupied status set', async () => {
    const service = Object.create(
      AgendamentosService.prototype,
    ) as AgendamentosService;
    const tx = {
      agendamento: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    };

    await expect(
      (service as any).assertNoScheduleConflict(tx, {
        empresaId: 'empresa-1',
        profissionalId: 'profissional-1',
        dataHoraInicio: new Date('2026-09-07T10:00:00.000Z'),
        dataHoraFim: new Date('2026-09-07T11:00:00.000Z'),
      }),
    ).resolves.toBeUndefined();

    expect(tx.agendamento.findFirst.mock.calls[0][0].where.status.in).not.toContain(
      'CANCELADO',
    );
  });
});

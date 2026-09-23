import { ConflictException } from '@nestjs/common';
import { Agendamento, StatusAgendamento } from '@prisma/client';

import { AgendamentosService } from '../../src/modules/agendamentos/agendamentos.service';

type ConflictParams = {
  empresaId: string;
  profissionalId: string;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  excludeId?: string;
};

type ConflictRecord = Pick<
  Agendamento,
  'id' | 'dataHoraInicio' | 'dataHoraFim'
>;

type ConflictWhere = {
  empresaId: string;
  profissionalId: string;
  status: {
    in: StatusAgendamento[];
  };
  dataHoraInicio: {
    lt: Date;
  };
  dataHoraFim: {
    gt: Date;
  };
  id?: {
    not: string;
  };
};

type ConflictQuery = {
  where: ConflictWhere;
  select: {
    id: true;
    dataHoraInicio: true;
    dataHoraFim: true;
  };
};

type ConflictFinder = (query: ConflictQuery) => Promise<ConflictRecord | null>;

type ConflictTransaction = {
  agendamento: {
    findFirst: jest.MockedFunction<ConflictFinder>;
  };
};

type ConflictService = {
  assertNoScheduleConflict: (
    tx: ConflictTransaction,
    params: ConflictParams,
  ) => Promise<void>;
};

type CreatedTransaction = {
  client: ConflictTransaction;
  getLastQuery: () => ConflictQuery | undefined;
};

function createService(): ConflictService {
  return Object.create(AgendamentosService.prototype) as ConflictService;
}

function createTransaction(
  conflict: ConflictRecord | null,
): CreatedTransaction {
  let lastQuery: ConflictQuery | undefined;
  const findFirst: jest.MockedFunction<ConflictFinder> = jest.fn(
    (query: ConflictQuery): Promise<ConflictRecord | null> => {
      lastQuery = query;
      return Promise.resolve(conflict);
    },
  );

  return {
    client: {
      agendamento: {
        findFirst,
      },
    },
    getLastQuery: () => lastQuery,
  };
}

describe('AgendamentosService concurrency guards', () => {
  it('detects only overlapping occupied intervals for the same professional', async () => {
    const service = createService();
    const transaction = createTransaction({
      id: 'existing',
      dataHoraInicio: new Date('2026-09-07T10:00:00.000Z'),
      dataHoraFim: new Date('2026-09-07T11:00:00.000Z'),
    });

    await expect(
      service.assertNoScheduleConflict(transaction.client, {
        empresaId: 'empresa-1',
        profissionalId: 'profissional-1',
        dataHoraInicio: new Date('2026-09-07T10:30:00.000Z'),
        dataHoraFim: new Date('2026-09-07T11:30:00.000Z'),
      }),
    ).rejects.toBeInstanceOf(ConflictException);

    const query = transaction.getLastQuery();

    if (!query) {
      throw new Error('A consulta de conflito não foi executada.');
    }

    expect(query.where.empresaId).toBe('empresa-1');
    expect(query.where.profissionalId).toBe('profissional-1');
    expect(query.where.dataHoraInicio).toEqual({
      lt: new Date('2026-09-07T11:30:00.000Z'),
    });
    expect(query.where.dataHoraFim).toEqual({
      gt: new Date('2026-09-07T10:30:00.000Z'),
    });
    expect(query.select).toEqual({
      id: true,
      dataHoraInicio: true,
      dataHoraFim: true,
    });
  });

  it('excludes cancelled appointments from the occupied status set', async () => {
    const service = createService();
    const transaction = createTransaction(null);

    await expect(
      service.assertNoScheduleConflict(transaction.client, {
        empresaId: 'empresa-1',
        profissionalId: 'profissional-1',
        dataHoraInicio: new Date('2026-09-07T10:00:00.000Z'),
        dataHoraFim: new Date('2026-09-07T11:00:00.000Z'),
      }),
    ).resolves.toBeUndefined();

    const query = transaction.getLastQuery();

    if (!query) {
      throw new Error('A consulta de conflito não foi executada.');
    }

    expect(query.where.status).toEqual({
      in: [
        StatusAgendamento.PENDENTE,
        StatusAgendamento.CONFIRMADO,
        StatusAgendamento.EM_ANDAMENTO,
      ],
    });
  });
});

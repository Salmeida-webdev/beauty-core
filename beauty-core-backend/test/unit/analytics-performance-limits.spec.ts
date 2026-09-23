import { PrismaService } from '../../src/database/prisma/prisma.service';
import { AnalyticsService } from '../../src/modules/analytics/analytics.service';
import { TenantValidatorService } from '../../src/shared/tenant';

type QueryArgs = Record<string, unknown>;
type CountMock = jest.MockedFunction<(args: QueryArgs) => Promise<number>>;
type FindManyMock = jest.MockedFunction<
  (args: QueryArgs) => Promise<unknown[]>
>;
type AggregateMock = jest.MockedFunction<
  (args: QueryArgs) => Promise<{ _sum: Record<string, number> }>
>;
type GroupByMock = jest.MockedFunction<(args: QueryArgs) => Promise<unknown[]>>;

type AnalyticsPrismaDouble = {
  clientePacote: {
    count: CountMock;
    findMany: FindManyMock;
  };
  fidelidade: {
    count: CountMock;
    findMany: FindManyMock;
  };
  movimentacaoPontos: {
    aggregate: AggregateMock;
  };
  beneficio: {
    count: CountMock;
  };
  eventoSistema: {
    count: CountMock;
    groupBy: GroupByMock;
    findMany: FindManyMock;
  };
};

type TenantValidatorDouble = {
  validarEmpresaAtiva: jest.MockedFunction<
    (empresaId: string) => Promise<unknown>
  >;
};

function createAnalyticsService(
  prisma: AnalyticsPrismaDouble,
  tenantValidator: TenantValidatorDouble,
): AnalyticsService {
  return new AnalyticsService(
    prisma as unknown as PrismaService,
    tenantValidator as unknown as TenantValidatorService,
  );
}

describe('Analytics performance limits - Chat 39', () => {
  let prisma: AnalyticsPrismaDouble;
  let tenantValidator: TenantValidatorDouble;
  let service: AnalyticsService;
  let originalTopLimit: string | undefined;
  let originalScanLimit: string | undefined;

  beforeEach(() => {
    originalTopLimit = process.env.ANALYTICS_TOP_LIMIT;
    originalScanLimit = process.env.ANALYTICS_SCAN_LIMIT;

    process.env.ANALYTICS_TOP_LIMIT = '7';
    process.env.ANALYTICS_SCAN_LIMIT = '1234';

    tenantValidator = {
      validarEmpresaAtiva: jest
        .fn<Promise<unknown>, [string]>()
        .mockResolvedValue(true),
    };

    prisma = {
      clientePacote: {
        count: jest
          .fn<ReturnType<CountMock>, Parameters<CountMock>>()
          .mockResolvedValue(0),
        findMany: jest
          .fn<ReturnType<FindManyMock>, Parameters<FindManyMock>>()
          .mockResolvedValue([]),
      },
      fidelidade: {
        count: jest
          .fn<ReturnType<CountMock>, Parameters<CountMock>>()
          .mockResolvedValue(0),
        findMany: jest
          .fn<ReturnType<FindManyMock>, Parameters<FindManyMock>>()
          .mockResolvedValue([]),
      },
      movimentacaoPontos: {
        aggregate: jest
          .fn<ReturnType<AggregateMock>, Parameters<AggregateMock>>()
          .mockResolvedValue({
            _sum: {
              pontos: 0,
              saldoPontos: 0,
            },
          }),
      },
      beneficio: {
        count: jest
          .fn<ReturnType<CountMock>, Parameters<CountMock>>()
          .mockResolvedValue(0),
      },
      eventoSistema: {
        count: jest
          .fn<ReturnType<CountMock>, Parameters<CountMock>>()
          .mockResolvedValue(0),
        groupBy: jest
          .fn<ReturnType<GroupByMock>, Parameters<GroupByMock>>()
          .mockResolvedValue([]),
        findMany: jest
          .fn<ReturnType<FindManyMock>, Parameters<FindManyMock>>()
          .mockResolvedValue([]),
      },
    };

    service = createAnalyticsService(prisma, tenantValidator);
  });

  afterEach(() => {
    if (originalTopLimit === undefined) {
      delete process.env.ANALYTICS_TOP_LIMIT;
    } else {
      process.env.ANALYTICS_TOP_LIMIT = originalTopLimit;
    }

    if (originalScanLimit === undefined) {
      delete process.env.ANALYTICS_SCAN_LIMIT;
    } else {
      process.env.ANALYTICS_SCAN_LIMIT = originalScanLimit;
    }

    jest.restoreAllMocks();
  });

  it('deve aplicar ANALYTICS_SCAN_LIMIT em analytics de pacotes', async () => {
    await service.pacotes('empresa-1');

    expect(prisma.clientePacote.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 1234,
      }),
    );
  });

  it('deve aplicar ANALYTICS_TOP_LIMIT em ranking de fidelidade', async () => {
    await service.fidelidade('empresa-1');

    expect(prisma.fidelidade.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 7,
      }),
    );
  });

  it('deve aplicar ANALYTICS_TOP_LIMIT em eventos recentes', async () => {
    await service.eventos('empresa-1');

    expect(prisma.eventoSistema.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 7,
      }),
    );
  });
});

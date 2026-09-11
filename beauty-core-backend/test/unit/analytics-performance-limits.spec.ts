import { AnalyticsService } from '../../src/modules/analytics/analytics.service';

describe('Analytics performance limits - Chat 39', () => {
  let prisma: any;
  let tenantValidator: any;
  let service: AnalyticsService;
  let originalTopLimit: string | undefined;
  let originalScanLimit: string | undefined;

  beforeEach(() => {
    originalTopLimit = process.env.ANALYTICS_TOP_LIMIT;
    originalScanLimit = process.env.ANALYTICS_SCAN_LIMIT;

    process.env.ANALYTICS_TOP_LIMIT = '7';
    process.env.ANALYTICS_SCAN_LIMIT = '1234';

    tenantValidator = {
      validarEmpresaAtiva: jest.fn().mockResolvedValue(true),
    };

    prisma = {
      clientePacote: {
        count: jest.fn().mockResolvedValue(0),
        findMany: jest.fn().mockResolvedValue([]),
      },
      fidelidade: {
        count: jest.fn().mockResolvedValue(0),
        aggregate: jest.fn().mockResolvedValue({
          _sum: {
            pontos: 0,
            saldoPontos: 0,
          },
        }),
        findMany: jest.fn().mockResolvedValue([]),
      },
      movimentacaoPontos: {
        aggregate: jest.fn().mockResolvedValue({
          _sum: {
            pontos: 0,
          },
        }),
      },
      beneficio: {
        count: jest.fn().mockResolvedValue(0),
      },
      eventoSistema: {
        count: jest.fn().mockResolvedValue(0),
        groupBy: jest.fn().mockResolvedValue([]),
        findMany: jest.fn().mockResolvedValue([]),
      },
    };

    service = new AnalyticsService(prisma, tenantValidator);
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

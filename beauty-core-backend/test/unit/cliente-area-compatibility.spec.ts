import { UnauthorizedException } from '@nestjs/common';

import { AreaClienteService } from '../../src/modules/area-cliente/area-cliente.service';
import { ClienteAreaService } from '../../src/modules/cliente-area/cliente-area.service';

type ProfileResult = {
  id: string;
};

type DashboardResult = {
  perfil: ProfileResult;
};

type PerfilMethod = (
  empresaId: string,
  clienteId: string,
) => Promise<ProfileResult>;

type DashboardMethod = (
  empresaId: string,
  clienteId: string,
) => Promise<DashboardResult>;

type CanonicalDouble = {
  perfil: jest.MockedFunction<PerfilMethod>;
  dashboard: jest.MockedFunction<DashboardMethod>;
};

function createFacade(canonical: CanonicalDouble): ClienteAreaService {
  return new ClienteAreaService(canonical as unknown as AreaClienteService);
}

describe('ClienteAreaService compatibility facade', () => {
  let canonical: CanonicalDouble;
  let perfilMock: CanonicalDouble['perfil'];
  let dashboardMock: CanonicalDouble['dashboard'];
  let service: ClienteAreaService;

  beforeEach(() => {
    jest.clearAllMocks();

    perfilMock = jest.fn<ReturnType<PerfilMethod>, Parameters<PerfilMethod>>();
    dashboardMock = jest.fn<
      ReturnType<DashboardMethod>,
      Parameters<DashboardMethod>
    >();
    canonical = {
      perfil: perfilMock,
      dashboard: dashboardMock,
    };
    service = createFacade(canonical);
  });

  it('delegates the legacy profile route to the canonical service', async () => {
    const profile: ProfileResult = { id: 'cliente-1' };
    perfilMock.mockResolvedValue(profile);

    await expect(
      service.me({ sub: 'cliente-1', empresaId: 'empresa-1' }),
    ).resolves.toEqual({ data: profile, meta: {} });

    expect(perfilMock).toHaveBeenCalledWith('empresa-1', 'cliente-1');
  });

  it('delegates dashboard without executing legacy persistence logic', async () => {
    const dashboard: DashboardResult = { perfil: { id: 'cliente-1' } };
    dashboardMock.mockResolvedValue(dashboard);

    await expect(
      service.dashboard({ clienteId: 'cliente-1', empresaId: 'empresa-1' }),
    ).resolves.toEqual({ data: dashboard, meta: {} });

    expect(dashboardMock).toHaveBeenCalledWith('empresa-1', 'cliente-1');
  });

  it('rejects legacy calls without JWT client identity or tenant', async () => {
    await expect(service.me({})).rejects.toBeInstanceOf(UnauthorizedException);
    expect(perfilMock).not.toHaveBeenCalled();
  });
});

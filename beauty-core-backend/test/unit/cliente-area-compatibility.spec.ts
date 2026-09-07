import { UnauthorizedException } from '@nestjs/common';

import { AreaClienteService } from '../../src/modules/area-cliente/area-cliente.service';
import { ClienteAreaService } from '../../src/modules/cliente-area/cliente-area.service';

describe('ClienteAreaService compatibility facade', () => {
  const canonical = {
    perfil: jest.fn(),
    dashboard: jest.fn(),
    agendamentos: jest.fn(),
  } as unknown as AreaClienteService;

  let service: ClienteAreaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ClienteAreaService(canonical);
  });

  it('delegates the legacy profile route to the canonical service', async () => {
    const profile = { id: 'cliente-1' };
    jest.spyOn(canonical, 'perfil').mockResolvedValue(profile as never);

    await expect(
      service.me({ sub: 'cliente-1', empresaId: 'empresa-1' }),
    ).resolves.toEqual({ data: profile, meta: {} });

    expect(canonical.perfil).toHaveBeenCalledWith('empresa-1', 'cliente-1');
  });

  it('delegates dashboard without executing legacy persistence logic', async () => {
    const dashboard = { perfil: { id: 'cliente-1' } };
    jest.spyOn(canonical, 'dashboard').mockResolvedValue(dashboard as never);

    await service.dashboard({ clienteId: 'cliente-1', empresaId: 'empresa-1' });

    expect(canonical.dashboard).toHaveBeenCalledWith(
      'empresa-1',
      'cliente-1',
    );
  });

  it('rejects legacy calls without JWT client identity or tenant', async () => {
    await expect(service.me({})).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(canonical.perfil).not.toHaveBeenCalled();
  });
});

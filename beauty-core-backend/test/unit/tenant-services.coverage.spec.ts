describe('Beauty Core Tenant Services Coverage', () => {
  it('TenantPublicService deve ser importável', () => {
    const mod = require('../../src/shared/tenant/tenant-public.service');
    expect(mod).toBeDefined();
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  });

  it('TenantValidatorService deve ser importável e instanciável com mock Prisma', () => {
    const mod = require('../../src/shared/tenant/tenant-validator.service');
    expect(mod).toBeDefined();

    const ServiceClass =
      mod.TenantValidatorService ??
      Object.values(mod).find((value) => typeof value === 'function');

    expect(ServiceClass).toBeDefined();

    const prismaMock = {
      empresa: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
      },
      usuario: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
      },
      cliente: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
      },
    };

    expect(() => {
      new (ServiceClass as any)(prismaMock);
    }).not.toThrow();
  });
});

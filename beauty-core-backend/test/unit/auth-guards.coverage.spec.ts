describe('Beauty Core Auth Guards Coverage', () => {
  it('JwtAuthGuard deve ser importável e instanciável', () => {
    const mod = require('../../src/modules/auth/guards/jwt-auth.guard');
    expect(mod).toBeDefined();

    const GuardClass = mod.JwtAuthGuard ?? Object.values(mod).find((value) => typeof value === 'function');
    expect(GuardClass).toBeDefined();

    expect(() => {
      new (GuardClass as any)();
    }).not.toThrow();
  });

  it('ClienteAuthGuard deve ser importável e instanciável', () => {
    const mod = require('../../src/modules/auth-cliente/guards/cliente-auth.guard');
    expect(mod).toBeDefined();

    const GuardClass = mod.ClienteAuthGuard ?? Object.values(mod).find((value) => typeof value === 'function');
    expect(GuardClass).toBeDefined();

    expect(() => {
      new (GuardClass as any)();
    }).not.toThrow();
  });

  it('JwtOrClienteAuthGuard deve ser importável e instanciável', () => {
    const mod = require('../../src/modules/arquivos/guards/jwt-or-cliente-auth.guard');
    expect(mod).toBeDefined();

    const GuardClass = mod.JwtOrClienteAuthGuard ?? Object.values(mod).find((value) => typeof value === 'function');
    expect(GuardClass).toBeDefined();

    expect(() => {
      new (GuardClass as any)();
    }).not.toThrow();
  });
});

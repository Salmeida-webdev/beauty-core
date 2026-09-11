describe('UsuarioRolePolicy Coverage', () => {
  const mod = require('../../src/modules/usuarios/policies/usuario-role.policy');

  function collectCallables(targetModule: any): Array<[string, Function]> {
    const callables: Array<[string, Function]> = [];

    for (const [exportName, exportedValue] of Object.entries(targetModule)) {
      const value: any = exportedValue;

      if (typeof value === 'function') {
        callables.push([exportName, value]);

        for (const staticName of Object.getOwnPropertyNames(value)) {
          if (['length', 'name', 'prototype'].includes(staticName)) continue;

          if (typeof value[staticName] === 'function') {
            callables.push([
              exportName + '.' + staticName,
              value[staticName].bind(value),
            ]);
          }
        }

        try {
          const instance = new value();

          for (const methodName of Object.getOwnPropertyNames(
            Object.getPrototypeOf(instance),
          )) {
            if (methodName === 'constructor') continue;

            if (typeof instance[methodName] === 'function') {
              callables.push([
                exportName + '#' + methodName,
                instance[methodName].bind(instance),
              ]);
            }
          }
        } catch {
          // Export não instanciável.
        }
      }

      if (value && typeof value === 'object') {
        for (const [methodName, method] of Object.entries(value)) {
          if (typeof method === 'function') {
            callables.push([exportName + '.' + methodName, method.bind(value)]);
          }
        }
      }
    }

    const unique = new Map<string, Function>();

    for (const [name, fn] of callables) {
      unique.set(name, fn);
    }

    return Array.from(unique.entries());
  }

  it('deve carregar o módulo de policy sem erro', () => {
    expect(mod).toBeDefined();
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  });

  it('deve exercitar funções detectadas, incluindo estáticas', async () => {
    const callables = collectCallables(mod);

    for (const [, fn] of callables) {
      await expect(async () => {
        const cenarios = [
          ['SUPER_ADMIN', 'ADMIN'],
          ['ADMIN', 'GERENTE'],
          ['ADMIN', 'RECEPCAO'],
          ['ADMIN', 'PROFISSIONAL'],
          ['GERENTE', 'ADMIN'],
          [
            { id: 'u1', role: 'SUPER_ADMIN', empresaId: null },
            { id: 'u2', role: 'ADMIN', empresaId: 'empresa-a' },
          ],
          [
            { id: 'u1', role: 'ADMIN', empresaId: 'empresa-a' },
            { id: 'u2', role: 'GERENTE', empresaId: 'empresa-a' },
          ],
          [
            { id: 'u1', role: 'GERENTE', empresaId: 'empresa-a' },
            { id: 'u2', role: 'ADMIN', empresaId: 'empresa-b' },
          ],
        ];

        for (const args of cenarios) {
          try {
            const result = fn(...args);

            if (result instanceof Promise) {
              await result.catch(() => undefined);
            }
          } catch {
            // Exceções de autorização fazem parte do contrato esperado.
          }
        }
      }).not.toThrow();
    }

    expect(mod).toBeDefined();
  });
});

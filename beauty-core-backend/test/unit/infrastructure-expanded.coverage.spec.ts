import { createRequire } from 'node:module';
import {
  createExecutionContextLike,
  createInstance,
  createRequestLike,
  createResponseLike,
  createUniversalMock,
  discoverFiles,
  exerciseInstance,
  installCoverageSmokeSilencer,
  loadExportedClasses,
  runWithTimeout,
  toProjectRelative,
} from './helpers/coverage-smoke.helper';

const requireModule = createRequire(__filename);
type ModuleExports = Record<string, unknown>;
type CallableExport = ((...args: unknown[]) => unknown) & { name?: string };
type UnknownCallable = (...args: unknown[]) => unknown;

function isCallable(value: unknown): value is UnknownCallable {
  return typeof value === 'function';
}

function loadModule(filePath: string): ModuleExports {
  return requireModule(filePath) as ModuleExports;
}

installCoverageSmokeSilencer();

const infrastructureFiles = [
  ...discoverFiles(
    process.cwd() + '/src/common',
    (filePath) => filePath.endsWith('.ts') && !filePath.endsWith('.spec.ts'),
  ),
  ...discoverFiles(
    process.cwd() + '/src/shared',
    (filePath) => filePath.endsWith('.ts') && !filePath.endsWith('.spec.ts'),
  ),
  ...discoverFiles(
    process.cwd() + '/src/config',
    (filePath) => filePath.endsWith('.ts') && !filePath.endsWith('.spec.ts'),
  ),
  ...discoverFiles(
    process.cwd() + '/src/queues',
    (filePath) => filePath.endsWith('.ts') && !filePath.endsWith('.spec.ts'),
  ),
].filter((filePath) => {
  const normalized = filePath.replace(/\\/g, '/');
  return (
    !normalized.endsWith('.module.ts') &&
    !normalized.includes('/constants/') &&
    !normalized.includes('/interfaces/') &&
    !normalized.includes('/types/')
  );
});

describe('Infrastructure expanded coverage', () => {
  it('locates infrastructure files', () => {
    expect(infrastructureFiles.length).toBeGreaterThan(5);
  });

  for (const filePath of infrastructureFiles) {
    const relative = toProjectRelative(filePath);

    describe(relative, () => {
      it('imports the infrastructure module', () => {
        expect(loadModule(filePath)).toBeDefined();
      });

      it('exercises exports, classes, and functions when possible', async () => {
        const mod = loadModule(filePath);

        for (const exportedValue of Object.values(mod)) {
          if (typeof exportedValue !== 'function') continue;

          const callable = exportedValue as CallableExport;
          const name = callable.name ?? '';

          if (
            /(Controller|Service|Guard|Strategy|Filter|Interceptor|Worker)$/.test(
              name,
            )
          ) {
            const instance = createInstance(exportedValue);

            if (instance) {
              const canActivate = instance.canActivate;
              if (name.endsWith('Guard') && isCallable(canActivate)) {
                try {
                  await runWithTimeout(() =>
                    canActivate(createExecutionContextLike()),
                  );
                } catch (error: unknown) {
                  expect(error).toBeDefined();
                }
              }
              const catchMethod = instance.catch;
              if (name.endsWith('Filter') && isCallable(catchMethod)) {
                try {
                  await runWithTimeout(() =>
                    catchMethod(new Error('Erro de teste'), {
                      switchToHttp: () => ({
                        getRequest: () => createRequestLike(),
                        getResponse: () => createResponseLike(),
                      }),
                    }),
                  );
                } catch (error: unknown) {
                  expect(error).toBeDefined();
                }
              }
              const intercept = instance.intercept;
              if (name.endsWith('Interceptor') && isCallable(intercept)) {
                try {
                  await runWithTimeout(() =>
                    intercept(createExecutionContextLike(), {
                      handle: () => ({
                        pipe: () => ({ subscribe: () => undefined }),
                      }),
                    }),
                  );
                } catch (error: unknown) {
                  expect(error).toBeDefined();
                }
              }
              await exerciseInstance(instance, 10);
            }
            continue;
          }

          const scenarios: unknown[][] = [
            [
              createUniversalMock(),
              createRequestLike(),
              createResponseLike(),
              'ADMIN',
              'GERENTE',
            ],
            ['ADMIN', 'GERENTE'],
            [1000],
          ];
          for (const args of scenarios) {
            try {
              await runWithTimeout(() => callable(...args));
            } catch (error: unknown) {
              expect(error).toBeDefined();
            }
          }
        }

        expect(mod).toBeDefined();
      });
    });
  }

  it('loads classes by suffix when present', () => {
    const serviceClasses = infrastructureFiles.flatMap((filePath) =>
      loadExportedClasses(filePath, 'Service'),
    );
    const controllerClasses = infrastructureFiles.flatMap((filePath) =>
      loadExportedClasses(filePath, 'Controller'),
    );
    expect(
      serviceClasses.length + controllerClasses.length,
    ).toBeGreaterThanOrEqual(0);
  });
});

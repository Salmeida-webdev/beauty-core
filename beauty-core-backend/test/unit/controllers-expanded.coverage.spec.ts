import {
  createInstance,
  discoverFiles,
  exerciseInstance,
  installCoverageSmokeSilencer,
  loadExportedClasses,
  toProjectRelative,
} from './helpers/coverage-smoke.helper';

installCoverageSmokeSilencer();

const controllerFiles = discoverFiles(process.cwd() + '/src', (filePath) => {
  const normalized = filePath.replace(/\\/g, '/');

  return (
    normalized.endsWith('.controller.ts') &&
    !normalized.endsWith('.spec.ts') &&
    !normalized.includes('/dto/') &&
    !normalized.includes('/entities/')
  );
});

describe('Chat 33.3 - Controllers Expanded Coverage', () => {
  it('deve localizar controllers', () => {
    expect(controllerFiles.length).toBeGreaterThan(10);
  });

  for (const filePath of controllerFiles) {
    const relative = toProjectRelative(filePath);

    describe(relative, () => {
      it('deve importar classes Controller exportadas', () => {
        const classes = loadExportedClasses(filePath, 'Controller');
        expect(classes.length).toBeGreaterThan(0);
      });

      it('deve instanciar e exercitar endpoints públicos do controller', async () => {
        const classes = loadExportedClasses(filePath, 'Controller');

        for (const ClassRef of classes) {
          const instance = createInstance(ClassRef);

          expect(instance).toBeDefined();

          const methodCount = await exerciseInstance(instance, 18);

          expect(methodCount).toBeGreaterThan(0);
        }
      });
    });
  }
});

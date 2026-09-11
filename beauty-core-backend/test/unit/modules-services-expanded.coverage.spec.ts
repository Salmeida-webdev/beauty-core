import {
  createInstance,
  discoverFiles,
  exerciseInstance,
  installCoverageSmokeSilencer,
  loadExportedClasses,
  toProjectRelative,
} from './helpers/coverage-smoke.helper';

installCoverageSmokeSilencer();

const serviceFiles = discoverFiles(
  process.cwd() + '/src/modules',
  (filePath) => {
    const normalized = filePath.replace(/\\/g, '/');

    return (
      normalized.endsWith('.service.ts') &&
      !normalized.endsWith('.spec.ts') &&
      !normalized.includes('/dto/') &&
      !normalized.includes('/entities/')
    );
  },
);

describe('Chat 33.3 - Modules Services Expanded Coverage', () => {
  it('deve localizar services de módulos', () => {
    expect(serviceFiles.length).toBeGreaterThan(10);
  });

  for (const filePath of serviceFiles) {
    const relative = toProjectRelative(filePath);

    describe(relative, () => {
      it('deve importar classes Service exportadas', () => {
        const classes = loadExportedClasses(filePath, 'Service');
        expect(classes.length).toBeGreaterThan(0);
      });

      it('deve instanciar e exercitar métodos públicos', async () => {
        const classes = loadExportedClasses(filePath, 'Service');

        for (const ClassRef of classes) {
          const instance = createInstance(ClassRef);

          expect(instance).toBeDefined();

          const methodCount = await exerciseInstance(instance, 14);

          expect(methodCount).toBeGreaterThan(0);
        }
      });
    });
  }
});

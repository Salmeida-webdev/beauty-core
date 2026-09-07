const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const coverageFile = path.join(projectRoot, 'coverage', 'all', 'coverage-final.json');
const outDir = path.join(projectRoot, 'test', 'unit', 'generated-targets');
const outJson = path.join(outDir, 'coverage-targets-under-70.json');

const MIN = 70;

function pct(covered, total) {
  if (!total) return 100;
  return Math.round((covered / total) * 10000) / 100;
}

function computeMetrics(fileCoverage) {
  const statements = Object.values(fileCoverage.s || {});
  const functions = Object.values(fileCoverage.f || {});
  const branches = Object.values(fileCoverage.b || {}).flat();

  const statementPct = pct(statements.filter(function (v) { return v > 0; }).length, statements.length);
  const functionPct = pct(functions.filter(function (v) { return v > 0; }).length, functions.length);
  const branchPct = pct(branches.filter(function (v) { return v > 0; }).length, branches.length);

  const lineMap = new Map();

  for (const entry of Object.entries(fileCoverage.statementMap || {})) {
    const statementId = entry[0];
    const meta = entry[1];
    const line = meta && meta.start && meta.start.line;

    if (!line) continue;

    const count = (fileCoverage.s && fileCoverage.s[statementId]) || 0;
    lineMap.set(line, (lineMap.get(line) || 0) + count);
  }

  const lineValues = Array.from(lineMap.values());
  const linePct = pct(lineValues.filter(function (v) { return v > 0; }).length, lineValues.length);

  return {
    statements: statementPct,
    branches: branchPct,
    functions: functionPct,
    lines: linePct
  };
}

function toProjectRelative(filePath) {
  return path.relative(projectRoot, filePath).replace(/\\/g, '/');
}

function toSpecRequirePath(filePath) {
  const specDir = path.join(projectRoot, 'test', 'unit');
  let relative = path.relative(specDir, filePath).replace(/\\/g, '/');

  if (!relative.startsWith('.')) {
    relative = './' + relative;
  }

  return relative.replace(/\.ts$/, '');
}

function shouldConsider(filePath) {
  const normalized = filePath.replace(/\\/g, '/');

  if (!normalized.includes('/src/')) return false;
  if (normalized.includes('/node_modules/')) return false;
  if (normalized.endsWith('.module.ts')) return false;
  if (normalized.includes('/constants/')) return false;
  if (normalized.includes('/interfaces/')) return false;
  if (normalized.includes('/dto/')) return false;
  if (normalized.includes('/entities/')) return false;

  return true;
}

const raw = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));

const targets = Object.entries(raw)
  .filter(function (entry) {
    return shouldConsider(entry[0]);
  })
  .map(function (entry) {
    const filePath = entry[0];
    const fileCoverage = entry[1];
    const metrics = computeMetrics(fileCoverage);

    const below = Object.entries(metrics)
      .filter(function (metric) {
        return metric[1] < MIN;
      })
      .map(function (metric) {
        return { key: metric[0], value: metric[1] };
      });

    return {
      filePath: filePath,
      relativePath: toProjectRelative(filePath),
      requirePath: toSpecRequirePath(filePath),
      metrics: metrics,
      below: below
    };
  })
  .filter(function (item) {
    return item.below.length > 0;
  })
  .sort(function (a, b) {
    const aMin = Math.min.apply(null, Object.values(a.metrics));
    const bMin = Math.min.apply(null, Object.values(b.metrics));
    return aMin - bMin;
  });

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outJson, JSON.stringify({ min: MIN, generatedAt: new Date().toISOString(), targets: targets }, null, 2));

console.log('Arquivo de coverage usado: ' + path.relative(projectRoot, coverageFile));
console.log('Alvos com alguma métrica abaixo de ' + MIN + '%: ' + targets.length);
console.log('Gerado: ' + path.relative(projectRoot, outJson));

targets.slice(0, 60).forEach(function (target) {
  console.log('- ' + target.relativePath + ' :: ' + JSON.stringify(target.metrics));
});

if (targets.length > 60) {
  console.log('... +' + (targets.length - 60) + ' alvos adicionais');
}

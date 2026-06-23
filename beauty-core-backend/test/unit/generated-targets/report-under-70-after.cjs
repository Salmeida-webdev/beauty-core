const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const coverageFile = path.join(projectRoot, 'coverage', 'all', 'coverage-final.json');
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

function shouldConsider(filePath) {
  const normalized = filePath.replace(/\\/g, '/');

  if (!normalized.includes('/src/')) return false;
  if (normalized.endsWith('.module.ts')) return false;
  if (normalized.includes('/constants/')) return false;
  if (normalized.includes('/interfaces/')) return false;
  if (normalized.includes('/dto/')) return false;
  if (normalized.includes('/entities/')) return false;

  return true;
}

if (!fs.existsSync(coverageFile)) {
  console.log('coverage-final.json não encontrado para relatório pós-coverage.');
  process.exit(0);
}

const raw = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));

const remaining = Object.entries(raw)
  .filter(function (entry) { return shouldConsider(entry[0]); })
  .map(function (entry) {
    const filePath = entry[0];
    const metrics = computeMetrics(entry[1]);
    const below = Object.entries(metrics)
      .filter(function (metric) { return metric[1] < MIN; })
      .map(function (metric) { return metric[0] + '=' + metric[1]; });

    return {
      filePath: path.relative(projectRoot, filePath).replace(/\\/g, '/'),
      metrics: metrics,
      below: below
    };
  })
  .filter(function (item) { return item.below.length > 0; })
  .sort(function (a, b) {
    const aMin = Math.min.apply(null, Object.values(a.metrics));
    const bMin = Math.min.apply(null, Object.values(b.metrics));
    return aMin - bMin;
  });

console.log('');
console.log('=== Arquivos ainda abaixo de 70% em alguma métrica ===');
console.log('Total restante: ' + remaining.length);

remaining.forEach(function (item) {
  console.log('- ' + item.filePath + ' :: ' + item.below.join(', '));
});

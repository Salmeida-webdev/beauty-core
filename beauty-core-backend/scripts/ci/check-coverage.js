const fs = require("fs");
const path = require("path");

const thresholds = {
  statements: 80,
  branches: 70,
  functions: 90,
  lines: 80,
};

function findCoverageSummary(dir) {
  if (!fs.existsSync(dir)) return null;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isFile() && entry.name === "coverage-summary.json") {
      return fullPath;
    }

    if (entry.isDirectory()) {
      const found = findCoverageSummary(fullPath);
      if (found) return found;
    }
  }

  return null;
}

const coveragePath = findCoverageSummary("coverage");

if (!coveragePath) {
  console.error("Coverage gate falhou: coverage-summary.json nao encontrado dentro de coverage/.");
  console.error("Execute antes: npm run test:all:cov");
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(coveragePath, "utf8"));

if (!summary.total) {
  console.error("Coverage gate falhou: chave total nao encontrada no coverage-summary.json.");
  process.exit(1);
}

let failed = false;

console.log(`Coverage summary usado: ${coveragePath}`);
console.log("");

for (const [metric, minimum] of Object.entries(thresholds)) {
  const actual = summary.total[metric]?.pct;

  if (typeof actual !== "number") {
    console.error(`Coverage gate falhou: metrica ausente: ${metric}`);
    failed = true;
    continue;
  }

  const status = actual >= minimum ? "OK" : "FAIL";
  console.log(`${metric}: ${actual}% / minimo ${minimum}% => ${status}`);

  if (actual < minimum) {
    failed = true;
  }
}

if (failed) {
  console.error("");
  console.error("Coverage abaixo do minimo exigido.");
  process.exit(1);
}

console.log("");
console.log("Coverage gate aprovado.");

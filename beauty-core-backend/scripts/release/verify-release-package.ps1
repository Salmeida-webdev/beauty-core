param(
  [Parameter(Mandatory = $true)]
  [string]$ZipPath
)

$ErrorActionPreference = "Stop"

Write-Host "=== VERIFY RELEASE PACKAGE ==="

if (!(Test-Path $ZipPath)) {
  throw "ZIP nao encontrado: $ZipPath"
}

Add-Type -AssemblyName System.IO.Compression.FileSystem

$resolvedZip = (Resolve-Path $ZipPath).Path
$zip = [System.IO.Compression.ZipFile]::OpenRead($resolvedZip)

$forbiddenRules = @(
  @{ Name = "env real"; Regex = "(^|/)\.env($|/)" },
  @{ Name = "env nao-example"; Regex = "(^|/)\.env\.(?!example$|dev\.example$|staging\.example$|prod\.example$|production\.example$)" },
  @{ Name = "git"; Regex = "(^|/)\.git(/|$)" },
  @{ Name = "node_modules"; Regex = "(^|/)node_modules(/|$)" },
  @{ Name = "dist"; Regex = "(^|/)dist(/|$)" },
  @{ Name = "coverage"; Regex = "(^|/)coverage(/|$)" },
  @{ Name = "logs"; Regex = "(^|/)logs(/|$)" },
  @{ Name = "backups"; Regex = "(^|/)backups(/|$)" },
  @{ Name = "uploads private"; Regex = "(^|/)uploads/private(/|$)" },
  @{ Name = "uploads temp"; Regex = "(^|/)uploads/temp(/|$)" },
  @{ Name = "uploads deleted"; Regex = "(^|/)uploads/deleted(/|$)" },
  @{ Name = "backup chat"; Regex = "(^|/)\.backup-chat" },
  @{ Name = "chat temp"; Regex = "(^|/)\.chat" },
  @{ Name = "bak"; Regex = "\.bak($|\.)" },
  @{ Name = "backup artifact"; Regex = "\.backup($|\.)" },
  @{ Name = "dump"; Regex = "\.dump$" },
  @{ Name = "sql nao migration"; Regex = "^(?!prisma/migrations/[^/]+/migration\.sql$).*\.sql$" },
  @{ Name = "tar gz"; Regex = "\.tar\.gz$" }
)

$hits = @()
$entries = @()

try {
  foreach ($entry in $zip.Entries) {
    $name = $entry.FullName -replace "\\", "/"
    $entries += [pscustomobject]@{ FullName = $name; Length = $entry.Length }

    foreach ($rule in $forbiddenRules) {
      if ($name -match $rule.Regex) {
        $hits += [pscustomobject]@{
          Entry = $name
          Rule = $rule.Name
        }
      }
    }
  }
} finally {
  $zip.Dispose()
}

if ($hits.Count -gt 0) {
  Write-Host ""
  Write-Host "ERRO: pacote contem entradas proibidas."
  $hits | Format-Table -AutoSize
  throw "Release reprovado: remova entradas proibidas antes de distribuir."
}

$requiredFiles = @(
  "package.json",
  "package-lock.json",
  "Dockerfile",
  ".env.example",
  ".gitignore",
  ".dockerignore"
)

foreach ($required in $requiredFiles) {
  if (!(($entries | Where-Object { $_.FullName -eq $required } | Select-Object -First 1))) {
    throw "Release reprovado: arquivo obrigatorio ausente: $required"
  }
}

$hasSrc = ($entries | Where-Object { $_.FullName -like "src/*" } | Select-Object -First 1)
$hasPrisma = ($entries | Where-Object { $_.FullName -like "prisma/*" } | Select-Object -First 1)
$hasDocs = ($entries | Where-Object { $_.FullName -like "docs/*" } | Select-Object -First 1)
$hasTests = ($entries | Where-Object { $_.FullName -like "test/*" } | Select-Object -First 1)
$hasMigration = ($entries | Where-Object { $_.FullName -match "^prisma/migrations/.+/migration\.sql$" } | Select-Object -First 1)

if (!$hasSrc) { throw "Release reprovado: pasta src ausente." }
if (!$hasPrisma) { throw "Release reprovado: pasta prisma ausente." }
if (!$hasDocs) { throw "Release reprovado: pasta docs ausente." }
if (!$hasTests) { throw "Release reprovado: pasta test ausente." }
if (!$hasMigration) { throw "Release reprovado: migrations Prisma ausentes." }

Write-Host ""
Write-Host "OK: pacote verificado sem entradas proibidas."
Write-Host "OK: arquivos obrigatorios presentes."
Write-Host "OK: migrations Prisma presentes."
Write-Host "ZIP:" $resolvedZip

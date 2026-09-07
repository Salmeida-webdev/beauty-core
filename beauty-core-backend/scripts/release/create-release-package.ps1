param(
  [string]$OutputDir = ".release",
  [string]$PackageName = ""
)

$ErrorActionPreference = "Stop"

Write-Host "=== CREATE RELEASE PACKAGE ==="

if (!(Test-Path "package.json") -or !(Test-Path "prisma/schema.prisma") -or !(Test-Path "src")) {
  throw "Execute este script na raiz do beauty-core-backend."
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"

if ([string]::IsNullOrWhiteSpace($PackageName)) {
  $PackageName = "beauty-core-backend-release-$stamp.zip"
}

$tmp = Join-Path $OutputDir "release-tmp-$stamp"
$zipPath = Join-Path $OutputDir $PackageName

if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

New-Item -ItemType Directory -Force -Path $tmp | Out-Null

function Copy-AllowedItem {
  param([string]$ItemPath)

  if (Test-Path $ItemPath) {
    $destination = Join-Path $tmp $ItemPath
    $destinationParent = Split-Path $destination -Parent

    if (!(Test-Path $destinationParent)) {
      New-Item -ItemType Directory -Force -Path $destinationParent | Out-Null
    }

    Copy-Item -LiteralPath $ItemPath -Destination $destinationParent -Recurse -Force
    Write-Host "Incluido:" $ItemPath
  } else {
    Write-Host "Ignorado, nao encontrado:" $ItemPath
  }
}

$rootItems = @(
  "src",
  "prisma",
  "docs",
  ".github",
  "test",
  "README.md",
  "package.json",
  "package-lock.json",
  "Dockerfile",
  ".env.example",
  ".env.dev.example",
  ".env.staging.example",
  ".env.prod.example",
  ".env.production.example",
  ".dockerignore",
  ".gitignore"
)

$composeItems = @(
  "docker-compose.yml",
  "docker-compose.dev.yml",
  "docker-compose.staging.yml",
  "docker-compose.prod.yml",
  "docker-compose.observability.yml"
)

$officialScriptFolders = @(
  "scripts/backup",
  "scripts/uploads",
  "scripts/smoke",
  "scripts/ci",
  "scripts/release"
)

foreach ($item in $rootItems) { Copy-AllowedItem $item }
foreach ($item in $composeItems) { Copy-AllowedItem $item }
foreach ($item in $officialScriptFolders) { Copy-AllowedItem $item }

$forbiddenDirs = @(
  ".git",
  "node_modules",
  "dist",
  "coverage",
  "logs",
  "backups",
  "uploads/private",
  "uploads/temp",
  "uploads/deleted"
)

foreach ($dir in $forbiddenDirs) {
  $target = Join-Path $tmp $dir
  if (Test-Path $target) {
    Remove-Item $target -Recurse -Force
    Write-Host "Removido proibido:" $dir
  }
}


Get-ChildItem -Path $tmp -Recurse -Force -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -eq "backups" } |
  ForEach-Object {
    Write-Host "Removido diretorio backups proibido:" $_.FullName
    Remove-Item $_.FullName -Recurse -Force
  }

Get-ChildItem -Path $tmp -Recurse -Force -File -Filter "*.sql" -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch "\\prisma\\migrations\\[^\\]+\\migration\.sql$" } |
  ForEach-Object {
    Write-Host "Removido SQL nao permitido:" $_.FullName
    Remove-Item $_.FullName -Force
  }

$safeEnvFiles = @(
  ".env.example",
  ".env.dev.example",
  ".env.staging.example",
  ".env.prod.example",
  ".env.production.example"
)

Get-ChildItem -Path $tmp -Recurse -Force -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like ".env*" -and ($safeEnvFiles -notcontains $_.Name) } |
  ForEach-Object {
    Write-Host "Removido env real/proibido:" $_.FullName
    Remove-Item $_.FullName -Force
  }

$artifactPatterns = @("*.bak", "*.bak.*", "*.backup", "*.backup.*", "*.dump", "*.tar.gz")

foreach ($pattern in $artifactPatterns) {
  Get-ChildItem -Path $tmp -Recurse -Force -File -Filter $pattern -ErrorAction SilentlyContinue |
    ForEach-Object {
      Write-Host "Removido artefato proibido:" $_.FullName
      Remove-Item $_.FullName -Force
    }
}

Add-Type -AssemblyName System.IO.Compression.FileSystem

$resolvedTmp = (Resolve-Path $tmp).Path
$resolvedOutputDir = (Resolve-Path $OutputDir).Path
$resolvedZipPath = Join-Path $resolvedOutputDir $PackageName

[System.IO.Compression.ZipFile]::CreateFromDirectory($resolvedTmp, $resolvedZipPath)

Remove-Item $tmp -Recurse -Force

Write-Host ""
Write-Host "OK: release criado com sucesso."
Write-Host "ZIP:" $resolvedZipPath

-- Chat 39 - Secure OTP
-- Adds hashed OTP storage and removes sensitive plain-code indexes.

ALTER TABLE "CodigoAcessoCliente"
ADD COLUMN IF NOT EXISTS "codigoHash" TEXT;

DROP INDEX IF EXISTS "CodigoAcessoCliente_codigo_idx";
DROP INDEX IF EXISTS "CodigoAcessoCliente_empresaId_codigo_idx";
DROP INDEX IF EXISTS "CodigoAcessoCliente_empresaId_telefone_codigo_usado_idx";

CREATE INDEX IF NOT EXISTS "CodigoAcessoCliente_empresaId_codigoHash_idx"
ON "CodigoAcessoCliente"("empresaId", "codigoHash");

CREATE INDEX IF NOT EXISTS "CodigoAcessoCliente_empresaId_telefone_codigoHash_usado_idx"
ON "CodigoAcessoCliente"("empresaId", "telefone", "codigoHash", "usado");

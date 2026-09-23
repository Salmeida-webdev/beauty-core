ALTER TYPE "CanalWhatsApp" ADD VALUE IF NOT EXISTS 'META_CLOUD_API';

ALTER TABLE "ConfiguracaoWhatsApp"
  ADD COLUMN "metaWabaId" TEXT,
  ADD COLUMN "metaPhoneNumberId" TEXT,
  ADD COLUMN "metaAccessTokenRef" TEXT,
  ADD COLUMN "metaApiVersion" TEXT;

CREATE INDEX "ConfiguracaoWhatsApp_metaPhoneNumberId_idx"
  ON "ConfiguracaoWhatsApp"("metaPhoneNumberId");
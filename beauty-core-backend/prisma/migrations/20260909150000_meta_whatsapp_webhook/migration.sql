ALTER TABLE "MensagemWhatsApp" ADD COLUMN "metaMessageId" TEXT;
ALTER TABLE "MensagemWhatsApp" ADD COLUMN "metaStatus" TEXT;
ALTER TABLE "MensagemWhatsApp" ADD COLUMN "metaStatusUpdatedAt" TIMESTAMP(3);

CREATE TABLE "MetaWhatsappWebhookEvent" (
    "id" TEXT NOT NULL,
    "eventKey" TEXT NOT NULL,
    "messageId" TEXT,
    "status" TEXT,
    "payloadHash" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "MetaWhatsappWebhookEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "MetaWhatsappWebhookEvent_eventKey_key" ON "MetaWhatsappWebhookEvent"("eventKey");
CREATE INDEX "MetaWhatsappWebhookEvent_messageId_idx" ON "MetaWhatsappWebhookEvent"("messageId");
CREATE INDEX "MetaWhatsappWebhookEvent_createdAt_idx" ON "MetaWhatsappWebhookEvent"("createdAt");
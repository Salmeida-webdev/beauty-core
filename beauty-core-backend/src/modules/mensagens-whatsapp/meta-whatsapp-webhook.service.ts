import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StatusMensagemWhatsApp } from '@prisma/client';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

import { PrismaService } from '../../database/prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import {
  MetaWhatsappStatus,
  MetaWhatsappWebhookPayload,
  MetaWhatsappWebhookResult,
} from './meta-whatsapp-webhook.types';

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return null;
  }
  return value as JsonRecord;
}

@Injectable()
export class MetaWhatsappWebhookService {
  private readonly logger = new Logger(MetaWhatsappWebhookService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  verificarChallenge(
    mode: string | undefined,
    verifyToken: string | undefined,
    challenge: string | undefined,
  ): string {
    const expected = this.configService
      .get<string>('META_WHATSAPP_VERIFY_TOKEN')
      ?.trim();

    if (
      mode !== 'subscribe' ||
      !expected ||
      verifyToken !== expected ||
      !challenge
    ) {
      throw new ForbiddenException('Challenge Meta invalido.');
    }

    return challenge;
  }

  validarAssinatura(
    rawBody: Buffer | string | undefined,
    signature: string | undefined,
  ): boolean {
    const secret = this.configService
      .get<string>('META_WHATSAPP_APP_SECRET')
      ?.trim();
    if (!secret || !rawBody || !signature?.startsWith('sha256=')) {
      return false;
    }

    const expected = Buffer.from(
      'sha256=' + createHmac('sha256', secret).update(rawBody).digest('hex'),
      'utf8',
    );
    const received = Buffer.from(signature, 'utf8');
    return (
      expected.length === received.length && timingSafeEqual(expected, received)
    );
  }

  async receber(
    payload: MetaWhatsappWebhookPayload,
    rawBody: Buffer | string,
  ): Promise<MetaWhatsappWebhookResult> {
    const statuses = this.extrairStatuses(payload);
    const payloadHash = createHash('sha256').update(rawBody).digest('hex');
    let duplicates = 0;

    for (const status of statuses) {
      const messageId = this.text(status.id);
      const statusName = this.text(status.status);
      if (!messageId || !statusName) {
        continue;
      }

      const eventKey = `status:${messageId}:${statusName}:${this.text(status.timestamp) ?? 'no-timestamp'}`;
      try {
        const event = await this.prisma.metaWhatsappWebhookEvent.create({
          data: {
            eventKey,
            messageId,
            status: statusName,
            payloadHash,
          },
        });
        void this.processarStatus(event.id, messageId, statusName, status);
      } catch (error) {
        if (this.isUniqueViolation(error)) {
          duplicates += 1;
          continue;
        }
        throw error;
      }
    }

    return {
      received: true,
      accepted: statuses.length,
      duplicates,
    };
  }

  private extrairStatuses(
    payload: MetaWhatsappWebhookPayload,
  ): MetaWhatsappStatus[] {
    const output: MetaWhatsappStatus[] = [];
    const root = asRecord(payload);
    const entries = root && Array.isArray(root.entry) ? root.entry : [];

    for (const entryValue of entries) {
      const entry = asRecord(entryValue);
      const changes =
        entry && Array.isArray(entry.changes) ? entry.changes : [];
      for (const changeValue of changes) {
        const change = asRecord(changeValue);
        const value = change ? asRecord(change.value) : null;
        const statuses =
          value && Array.isArray(value.statuses) ? value.statuses : [];
        for (const statusValue of statuses) {
          const status = asRecord(statusValue);
          if (status) output.push(status);
        }
      }
    }
    return output;
  }

  private async processarStatus(
    eventId: string,
    messageId: string,
    statusName: string,
    status: MetaWhatsappStatus,
  ): Promise<void> {
    try {
      const mensagem = await this.prisma.mensagemWhatsApp.findFirst({
        where: { metaMessageId: messageId },
      });
      if (!mensagem) {
        await this.prisma.metaWhatsappWebhookEvent.update({
          where: { id: eventId },
          data: { status: 'AGUARDANDO_MENSAGEM', processedAt: new Date() },
        });
        return;
      }

      const mapped = this.mapearStatus(statusName);
      if (!mapped) {
        await this.prisma.metaWhatsappWebhookEvent.update({
          where: { id: eventId },
          data: { status: 'IGNORADO', processedAt: new Date() },
        });
        return;
      }

      const before = mensagem.status;
      const data: {
        metaStatus: string;
        metaStatusUpdatedAt: Date;
        status?: StatusMensagemWhatsApp;
        erro?: string | null;
      } = {
        metaStatus: statusName,
        metaStatusUpdatedAt: this.statusDate(status.timestamp),
      };

      if (mensagem.status !== StatusMensagemWhatsApp.CANCELADA) {
        data.status = mapped;
        data.erro =
          mapped === StatusMensagemWhatsApp.FALHOU
            ? 'Meta WhatsApp informou falha no processamento.'
            : null;
      }

      await this.prisma.mensagemWhatsApp.update({
        where: { id: mensagem.id },
        data,
      });
      await this.prisma.metaWhatsappWebhookEvent.update({
        where: { id: eventId },
        data: { status: 'PROCESSADO', processedAt: new Date() },
      });
      await this.auditoriaService.registrarAtualizacao({
        empresaId: mensagem.empresaId,
        clienteId: mensagem.clienteId ?? undefined,
        modulo: 'WHATSAPP_WEBHOOK',
        recurso: 'MensagemWhatsApp',
        recursoId: mensagem.id,
        dadosAntes: { status: before },
        dadosDepois: { status: data.status ?? before, metaStatus: statusName },
        metadata: { provider: 'META', eventType: 'status' },
        mensagem: 'Status da mensagem WhatsApp atualizado por webhook Meta.',
      });
    } catch (error) {
      this.logger.error(
        `Falha ao processar status Meta eventId=${eventId}: ${
          error instanceof Error ? error.message : 'erro desconhecido'
        }`,
      );
      await this.prisma.metaWhatsappWebhookEvent.update({
        where: { id: eventId },
        data: { status: 'FALHOU', processedAt: new Date() },
      });
    }
  }

  private mapearStatus(status: string): StatusMensagemWhatsApp | null {
    if (status === 'failed') return StatusMensagemWhatsApp.FALHOU;
    if (status === 'sent' || status === 'delivered' || status === 'read') {
      return StatusMensagemWhatsApp.ENVIADA;
    }
    return null;
  }

  private statusDate(timestamp: unknown): Date {
    const numeric = Number(this.text(timestamp));
    return Number.isFinite(numeric) && numeric > 0
      ? new Date(numeric * 1000)
      : new Date();
  }

  private text(value: unknown): string | null {
    return typeof value === 'string' && value.trim() ? value.trim() : null;
  }

  private isUniqueViolation(error: unknown): boolean {
    return asRecord(error)?.code === 'P2002';
  }
}

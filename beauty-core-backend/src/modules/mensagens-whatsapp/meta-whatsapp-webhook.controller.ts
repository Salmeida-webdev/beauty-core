import {
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { MetaWhatsappWebhookService } from './meta-whatsapp-webhook.service';
import { MetaWhatsappWebhookPayload } from './meta-whatsapp-webhook.types';

type RawBodyRequest = Request & { rawBody?: Buffer };

@Controller('webhooks/meta/whatsapp')
export class MetaWhatsappWebhookController {
  constructor(private readonly webhookService: MetaWhatsappWebhookService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  verificar(
    @Query('hub.mode') mode: string | undefined,
    @Query('hub.verify_token') verifyToken: string | undefined,
    @Query('hub.challenge') challenge: string | undefined,
  ): string {
    return this.webhookService.verificarChallenge(mode, verifyToken, challenge);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async receber(@Req() request: RawBodyRequest) {
    const signature = request.get('x-hub-signature-256');
    if (!this.webhookService.validarAssinatura(request.rawBody, signature)) {
      throw new UnauthorizedException('Assinatura Meta invalida.');
    }

    if (!request.rawBody) {
      throw new ForbiddenException('Corpo bruto do webhook indisponivel.');
    }

    return this.webhookService.receber(
      request.body as MetaWhatsappWebhookPayload,
      request.rawBody,
    );
  }
}

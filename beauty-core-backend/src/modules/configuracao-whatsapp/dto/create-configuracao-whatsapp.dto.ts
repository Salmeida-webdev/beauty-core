import { CanalWhatsApp } from '@prisma/client';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateConfiguracaoWhatsAppDto {
  @ApiPropertyOptional({
    example: true,
    description:
      'Define se a configuração de WhatsApp estará ativa para a empresa.',
  })
  @IsOptional()
  @IsBoolean({
    message: 'O campo ativo deve ser verdadeiro ou falso.',
  })
  ativo?: boolean;

  @ApiPropertyOptional({
    enum: CanalWhatsApp,
    example: Object.values(CanalWhatsApp)[0],
    description:
      'Canal de WhatsApp utilizado pela empresa. Os valores disponíveis vêm do enum CanalWhatsApp do Prisma.',
  })
  @IsOptional()
  @IsEnum(CanalWhatsApp, {
    message: 'O canal de WhatsApp informado é inválido.',
  })
  canal?: CanalWhatsApp;

  @ApiPropertyOptional({
    example: '83999999999',
    description:
      'Número de WhatsApp da empresa com DDD. Usado para gerar links wa.me e preparar futuras integrações.',
  })
  @IsOptional()
  @IsString({
    message: 'O número de WhatsApp deve ser um texto.',
  })
  numeroWhatsApp?: string;

  @ApiPropertyOptional({
    example: 'Olá! Seja bem-vindo(a). Como podemos ajudar?',
    description:
      'Mensagem de saudação padrão usada no atendimento via WhatsApp.',
  })
  @IsOptional()
  @IsString({
    message: 'A mensagem de saudação deve ser um texto.',
  })
  mensagemSaudacao?: string;

  @ApiPropertyOptional({
    example:
      'No momento estamos fora do horário de atendimento. Retornaremos assim que possível.',
    description:
      'Mensagem automática de ausência usada quando a empresa não estiver disponível para atendimento.',
  })
  @IsOptional()
  @IsString({
    message: 'A mensagem de ausência deve ser um texto.',
  })
  mensagemAusencia?: string;

  @ApiPropertyOptional({
    example: true,
    description:
      'Define se o WhatsApp funcionará em modo demonstração, sem integração real com provedor externo.',
  })
  @IsOptional()
  @IsBoolean({
    message: 'O campo usarModoDemonstracao deve ser verdadeiro ou falso.',
  })
  usarModoDemonstracao?: boolean;
}

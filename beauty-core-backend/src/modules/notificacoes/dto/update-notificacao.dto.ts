import {
  StatusNotificacao,
  TipoNotificacao,
} from '@prisma/client';

import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateNotificacaoDto {
  @ApiPropertyOptional({
    enum: TipoNotificacao,
    example: Object.values(TipoNotificacao)[0],
    description:
      'Tipo atualizado da notificação. Os valores disponíveis vêm do enum TipoNotificacao do Prisma.',
  })
  @IsOptional()
  @IsEnum(TipoNotificacao, {
    message: 'O tipo da notificação informado é inválido.',
  })
  tipo?: TipoNotificacao;

  @ApiPropertyOptional({
    example: 'Agendamento atualizado',
    description:
      'Título atualizado da notificação exibido ao usuário no painel administrativo.',
  })
  @IsOptional()
  @IsString({
    message: 'O título da notificação deve ser um texto.',
  })
  titulo?: string;

  @ApiPropertyOptional({
    example: 'O agendamento foi atualizado no sistema.',
    description:
      'Mensagem atualizada da notificação exibida ao usuário.',
  })
  @IsOptional()
  @IsString({
    message: 'A mensagem da notificação deve ser um texto.',
  })
  mensagem?: string;

  @ApiPropertyOptional({
    enum: StatusNotificacao,
    example: Object.values(StatusNotificacao)[0],
    description:
      'Status atualizado da notificação. Os valores disponíveis vêm do enum StatusNotificacao do Prisma.',
  })
  @IsOptional()
  @IsEnum(StatusNotificacao, {
    message: 'O status da notificação informado é inválido.',
  })
  status?: StatusNotificacao;
}
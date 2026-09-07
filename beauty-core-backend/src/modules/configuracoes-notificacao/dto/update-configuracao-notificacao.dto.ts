import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateConfiguracaoNotificacaoDto {
  @ApiPropertyOptional({
    example: true,
    description:
      'Atualiza se notificações relacionadas a agendamentos estarão ativas para a empresa.',
  })
  @IsOptional()
  @IsBoolean({
    message: 'O campo notificarAgendamentos deve ser verdadeiro ou falso.',
  })
  notificarAgendamentos?: boolean;

  @ApiPropertyOptional({
    example: true,
    description:
      'Atualiza se notificações relacionadas ao financeiro estarão ativas para a empresa.',
  })
  @IsOptional()
  @IsBoolean({
    message: 'O campo notificarFinanceiro deve ser verdadeiro ou falso.',
  })
  notificarFinanceiro?: boolean;

  @ApiPropertyOptional({
    example: true,
    description:
      'Atualiza se notificações relacionadas ao programa de fidelidade estarão ativas para a empresa.',
  })
  @IsOptional()
  @IsBoolean({
    message: 'O campo notificarFidelidade deve ser verdadeiro ou falso.',
  })
  notificarFidelidade?: boolean;

  @ApiPropertyOptional({
    example: true,
    description:
      'Atualiza se notificações relacionadas a pacotes de clientes estarão ativas para a empresa.',
  })
  @IsOptional()
  @IsBoolean({
    message: 'O campo notificarPacotes deve ser verdadeiro ou falso.',
  })
  notificarPacotes?: boolean;

  @ApiPropertyOptional({
    example: true,
    description:
      'Atualiza se notificações relacionadas a clientes estarão ativas para a empresa.',
  })
  @IsOptional()
  @IsBoolean({
    message: 'O campo notificarClientes deve ser verdadeiro ou falso.',
  })
  notificarClientes?: boolean;

  @ApiPropertyOptional({
    example: true,
    description:
      'Atualiza se notificações relacionadas a marketing, campanhas e relacionamento estarão ativas para a empresa.',
  })
  @IsOptional()
  @IsBoolean({
    message: 'O campo notificarMarketing deve ser verdadeiro ou falso.',
  })
  notificarMarketing?: boolean;
}
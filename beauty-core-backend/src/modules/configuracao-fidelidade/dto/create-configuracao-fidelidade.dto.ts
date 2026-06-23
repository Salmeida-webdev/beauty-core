import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsBoolean,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateConfiguracaoFidelidadeDto {
  @ApiProperty({
    example: true,
    description:
      'Define se o programa de fidelidade estará ativo para a empresa.',
  })
  @IsBoolean({
    message: 'O campo fidelidadeAtiva deve ser verdadeiro ou falso.',
  })
  fidelidadeAtiva: boolean;

  @ApiProperty({
    example: true,
    description:
      'Define se a pontuação será aplicada automaticamente conforme as regras configuradas.',
  })
  @IsBoolean({
    message: 'O campo pontuacaoAutomatica deve ser verdadeiro ou falso.',
  })
  pontuacaoAutomatica: boolean;

  @ApiProperty({
    example: 10,
    description:
      'Quantidade de reais necessários para gerar 1 ponto no programa de fidelidade.',
    minimum: 1,
  })
  @IsInt({
    message: 'O campo reaisPorPonto deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'O campo reaisPorPonto deve ser no mínimo 1.',
  })
  reaisPorPonto: number;

  @ApiProperty({
    example: true,
    description:
      'Define se os níveis de fidelidade estarão ativos para a empresa.',
  })
  @IsBoolean({
    message: 'O campo niveisAtivos deve ser verdadeiro ou falso.',
  })
  niveisAtivos: boolean;

  @ApiProperty({
    example: true,
    description:
      'Define se os benefícios automáticos estarão ativos no programa de fidelidade.',
  })
  @IsBoolean({
    message: 'O campo beneficiosAutomaticos deve ser verdadeiro ou falso.',
  })
  beneficiosAutomaticos: boolean;

  @ApiProperty({
    example: true,
    description:
      'Define se o cliente receberá bônus de pontos no mês ou data de aniversário.',
  })
  @IsBoolean({
    message: 'O campo bonusAniversarioAtivo deve ser verdadeiro ou falso.',
  })
  bonusAniversarioAtivo: boolean;

  @ApiPropertyOptional({
    example: 50,
    description:
      'Quantidade opcional de pontos concedidos como bônus de aniversário quando o bônus estiver ativo.',
  })
  @IsOptional()
  @IsInt({
    message: 'O campo bonusAniversarioPontos deve ser um número inteiro.',
  })
  bonusAniversarioPontos?: number;
}
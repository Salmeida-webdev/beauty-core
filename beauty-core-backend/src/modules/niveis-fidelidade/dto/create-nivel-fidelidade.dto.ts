import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNivelFidelidadeDto {
  @ApiProperty({
    example: 'Prata',
    description:
      'Nome do nível de fidelidade. Usado para classificar clientes conforme pontuação acumulada.',
  })
  @IsString({
    message: 'O nome do nível de fidelidade deve ser um texto.',
  })
  nome: string;

  @ApiProperty({
    example: 500,
    description:
      'Quantidade de pontos mínimos necessária para o cliente atingir este nível de fidelidade.',
  })
  @IsInt({
    message: 'Os pontos mínimos devem ser um número inteiro.',
  })
  pontosMinimos: number;

  @ApiPropertyOptional({
    example: 'Prioridade no atendimento e desconto especial.',
    description:
      'Descrição opcional dos benefícios associados a este nível de fidelidade.',
  })
  @IsOptional()
  @IsString({
    message: 'Os benefícios devem ser um texto.',
  })
  beneficios?: string;
}
import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateNivelFidelidadeDto {
  @ApiPropertyOptional({
    example: 'Ouro',
    description:
      'Nome atualizado do nível de fidelidade. Campo opcional para atualização parcial.',
  })
  @IsOptional()
  @IsString({
    message: 'O nome do nível de fidelidade deve ser um texto.',
  })
  nome?: string;

  @ApiPropertyOptional({
    example: 1000,
    description:
      'Quantidade atualizada de pontos mínimos necessária para o cliente atingir este nível de fidelidade.',
  })
  @IsOptional()
  @IsInt({
    message: 'Os pontos mínimos devem ser um número inteiro.',
  })
  pontosMinimos?: number;

  @ApiPropertyOptional({
    example: 'Atendimento prioritário, desconto especial e bônus exclusivo.',
    description:
      'Descrição opcional atualizada dos benefícios associados a este nível de fidelidade.',
  })
  @IsOptional()
  @IsString({
    message: 'Os benefícios devem ser um texto.',
  })
  beneficios?: string;
}
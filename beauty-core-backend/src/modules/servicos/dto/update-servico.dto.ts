import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateServicoDto {
  @ApiPropertyOptional({
    example: 'Limpeza de Pele Premium',
    description:
      'Nome atualizado do serviço. Campo opcional para atualização parcial.',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString({
    message: 'O nome do serviço deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome do serviço deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome do serviço deve ter no máximo 120 caracteres.',
  })
  nome?: string;

  @ApiPropertyOptional({
    example:
      'Procedimento estético facial completo atualizado com higienização, esfoliação, hidratação e finalização.',
    description:
      'Descrição opcional atualizada do serviço, usada para explicar detalhes do procedimento, benefícios ou observações internas.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({
    message: 'A descrição do serviço deve ser um texto.',
  })
  @MaxLength(500, {
    message: 'A descrição do serviço deve ter no máximo 500 caracteres.',
  })
  descricao?: string;

  @ApiPropertyOptional({
    example: 75,
    description:
      'Duração atualizada do serviço em minutos. Usada para controle da agenda e disponibilidade de horários.',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'A duração do serviço deve ser um número.',
    },
  )
  @Min(1, {
    message: 'A duração do serviço deve ser no mínimo 1 minuto.',
  })
  duracaoMinutos?: number;

  @ApiPropertyOptional({
    example: 180,
    description: 'Preço atualizado do serviço. Deve ser maior ou igual a zero.',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'O preço do serviço deve ser um número.',
    },
  )
  @Min(0, {
    message: 'O preço do serviço deve ser maior ou igual a 0.',
  })
  preco?: number;

  @ApiPropertyOptional({
    example: '/uploads/servicos/limpeza-de-pele-premium.png',
    description:
      'Caminho ou URL opcional da imagem do serviço. Normalmente preenchido após upload de arquivo.',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({
    message: 'A imagem do serviço deve ser um texto.',
  })
  @MaxLength(255, {
    message: 'A imagem do serviço deve ter no máximo 255 caracteres.',
  })
  imagem?: string;
}

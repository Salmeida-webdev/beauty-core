import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateServicoDto {
  @ApiProperty({
    example: 'Limpeza de Pele',
    description:
      'Nome do serviço oferecido pela empresa. Usado em agendamentos, catálogo de serviços, relatórios e painel administrativo.',
  })
  @IsString({
    message: 'O nome do serviço deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O nome do serviço é obrigatório.',
  })
  nome: string;

  @ApiPropertyOptional({
    example: 'Procedimento estético facial completo com higienização, esfoliação e hidratação.',
    description:
      'Descrição opcional do serviço, usada para explicar detalhes do procedimento, benefícios ou observações internas.',
  })
  @IsOptional()
  @IsString({
    message: 'A descrição do serviço deve ser um texto.',
  })
  descricao?: string;

  @ApiProperty({
    example: 60,
    description:
      'Duração estimada do serviço em minutos. Usada para controle da agenda e disponibilidade de horários.',
    minimum: 1,
  })
  @IsNumber({}, {
    message: 'A duração do serviço deve ser um número.',
  })
  @Min(1, {
    message: 'A duração do serviço deve ser no mínimo 1 minuto.',
  })
  duracaoMinutos: number;

  @ApiProperty({
    example: 150,
    description:
      'Preço do serviço. Deve ser maior ou igual a zero.',
    minimum: 0,
  })
  @IsNumber({}, {
    message: 'O preço do serviço deve ser um número.',
  })
  @Min(0, {
    message: 'O preço do serviço deve ser maior ou igual a 0.',
  })
  preco: number;
}
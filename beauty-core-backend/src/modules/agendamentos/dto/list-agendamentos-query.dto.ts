import { StatusAgendamento } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';

import { PaginationDto } from '../../../shared/dto/pagination.dto';

export class ListAgendamentosQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Data/hora inicial do período consultado em formato ISO 8601.',
    example: '2026-08-24T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A dataInicio deve ser uma data ISO 8601 válida.',
    },
  )
  dataInicio?: string;

  @ApiPropertyOptional({
    description: 'Data/hora final do período consultado em formato ISO 8601.',
    example: '2026-08-30T23:59:59.999Z',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A dataFim deve ser uma data ISO 8601 válida.',
    },
  )
  dataFim?: string;

  @ApiPropertyOptional({
    enum: StatusAgendamento,
    description: 'Filtra os agendamentos pelo status real do domínio.',
  })
  @IsOptional()
  @IsEnum(StatusAgendamento, {
    message: 'O status do agendamento informado é inválido.',
  })
  status?: StatusAgendamento;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Filtra os agendamentos pelo cliente.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Filtra os agendamentos pelo profissional.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O profissionalId deve ser um UUID válido.',
  })
  profissionalId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Filtra os agendamentos pelo serviço.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O servicoId deve ser um UUID válido.',
  })
  servicoId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Filtra os agendamentos pela unidade.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O unidadeId deve ser um UUID válido.',
  })
  unidadeId?: string;
}

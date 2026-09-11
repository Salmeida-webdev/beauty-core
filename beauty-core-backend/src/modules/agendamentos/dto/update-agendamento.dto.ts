import { StatusAgendamento } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateAgendamentoDto {
  @IsOptional()
  @IsUUID()
  unidadeId?: string;

  @IsOptional()
  @IsUUID()
  clienteId?: string;

  @IsOptional()
  @IsUUID()
  servicoId?: string;

  @IsOptional()
  @IsUUID()
  profissionalId?: string;

  @IsOptional()
  @IsDateString()
  dataHoraInicio?: string;

  @IsOptional()
  @IsDateString()
  dataHoraFim?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  observacoes?: string;

  @IsOptional()
  @IsEnum(StatusAgendamento)
  status?: StatusAgendamento;
}

import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class ReschedulePortalAgendamentoDto {
  @IsOptional()
  @IsUUID()
  unidadeId?: string;

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
}

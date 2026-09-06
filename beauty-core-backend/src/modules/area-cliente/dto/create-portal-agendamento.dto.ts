import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreatePortalAgendamentoDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  unidadeId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  servicoId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  profissionalId: string;

  @ApiProperty()
  @IsDateString()
  dataHoraInicio: string;

  @ApiProperty()
  @IsDateString()
  dataHoraFim: string;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  observacoes?: string;
}

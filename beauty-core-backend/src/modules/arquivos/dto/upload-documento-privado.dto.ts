import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UploadDocumentoPrivadoDto {
  @ApiPropertyOptional({
    example: 'b8d1e4d2-1b5f-4a51-8f2d-7b4b4c8f41aa',
    description: 'ID do cliente vinculado ao documento, quando aplicável.',
  })
  @IsOptional()
  @IsUUID()
  clienteId?: string;

  @ApiPropertyOptional({
    example: 'Contrato assinado pelo cliente.',
    description: 'Observação interna sobre o documento.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  observacao?: string;
}

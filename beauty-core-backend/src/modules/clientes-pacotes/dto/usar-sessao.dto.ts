import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UsarSessaoDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  observacao?: string;
}

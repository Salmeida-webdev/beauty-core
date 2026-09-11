import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RefreshClienteTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description:
      'Refresh token Cliente recebido no login ou no refresh anterior.',
  })
  @IsString()
  @MinLength(20)
  refreshToken: string;
}

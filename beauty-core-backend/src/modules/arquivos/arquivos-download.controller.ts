import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { JwtOrClienteAuthGuard } from './guards/jwt-or-cliente-auth.guard';
import { ArquivosDownloadService } from './arquivos-download.service';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosDownloadController {
  constructor(
    private readonly arquivosDownloadService: ArquivosDownloadService,
  ) {}

  @Get('signed/:token')
  @ApiOperation({
    summary: 'Download por URL assinada',
    description:
      'Realiza download por URL temporária assinada. Não exige JWT, mas exige token assinado válido e não expirado.',
  })
  @ApiParam({
    name: 'token',
    description: 'Token assinado temporário.',
  })
  @ApiOkResponse({
    description: 'Stream do arquivo.',
  })
  async downloadPorSignedToken(@Param('token') token: string) {
    const { arquivo, stream } =
      await this.arquivosDownloadService.downloadPorSignedToken(token);

    return new StreamableFile(stream, {
      type: arquivo.mimeType || 'application/octet-stream',
      disposition: `attachment; filename="${encodeURIComponent(
        arquivo.nomeOriginal,
      )}"`,
    });
  }

  @Get(':id/download')
  @UseGuards(JwtOrClienteAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Download protegido de arquivo',
    description:
      'Realiza download após validar autenticação, empresa e permissão do usuário ou cliente.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Stream do arquivo.',
  })
  async downloadProtegido(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: any,
  ) {
    const { arquivo, stream } =
      await this.arquivosDownloadService.downloadProtegido(id, req.user);

    return new StreamableFile(stream, {
      type: arquivo.mimeType || 'application/octet-stream',
      disposition: `attachment; filename="${encodeURIComponent(
        arquivo.nomeOriginal,
      )}"`,
    });
  }

  @Get(':id/signed-url')
  @UseGuards(JwtOrClienteAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Gerar URL assinada temporária',
    description:
      'Gera uma URL temporária assinada para download. Validade padrão: 5 minutos.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'URL assinada gerada com sucesso.',
    schema: {
      example: {
        url: '/arquivos/signed/token-assinado',
        expiresIn: 300,
      },
    },
  })
  gerarSignedUrl(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    return this.arquivosDownloadService.gerarSignedUrl(id, req.user);
  }
}

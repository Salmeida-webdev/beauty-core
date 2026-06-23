import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role, TipoArquivo } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

import { ArquivosService } from './arquivos.service';
import {
  getUploadLimitBytes,
  multerMemoryConfig,
  multerStorageOptions,
} from './storage/multer.config';
import { UploadDocumentoPrivadoDto } from './dto/upload-documento-privado.dto';

@ApiTags('Arquivos')
@ApiBearerAuth('JWT')
@Controller('arquivos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArquivosController {
  constructor(private readonly arquivosService: ArquivosService) {}

  @Post('logo')
  @Roles(Role.ADMIN, Role.GERENTE)
  @UseInterceptors(
    FileInterceptor('file', multerStorageOptions('logos')),
  )
  @ApiOperation({
    summary: 'Fazer upload da logo da empresa',
    description:
      'Realiza o upload da logo da empresa autenticada. Endpoint usado para personalização white-label, identidade visual e exibição da marca no painel, site ou aplicativo.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de imagem enviado no campo file.',
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagem da logo da empresa.',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Logo enviada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nomeOriginal: 'logo.png',
        nomeArquivo: 'logo-uuid.png',
        tipo: 'LOGO',
        mimeType: 'image/png',
        tamanho: 204800,
        url: '/uploads/logos/logo-uuid.png',
        createdAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Arquivo inválido, ausente, tipo não permitido ou tamanho acima do limite configurado.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  uploadLogo(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.arquivosService.uploadLogo(
      getEmpresaId(req),
      file,
    );
  }

  @Post('clientes/:clienteId/foto')
  @Roles(Role.ADMIN, Role.GERENTE, Role.RECEPCAO)
  @UseInterceptors(
    FileInterceptor('file', multerStorageOptions('clientes')),
  )
  @ApiOperation({
    summary: 'Fazer upload da foto do cliente',
    description:
      'Realiza o upload da foto de um cliente específico da empresa autenticada. Endpoint usado para perfil do cliente, painel administrativo e futura área/app do cliente.',
  })
  @ApiParam({
    name: 'clienteId',
    description: 'ID do cliente que receberá a foto.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de imagem enviado no campo file.',
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagem de perfil do cliente.',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Foto do cliente enviada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        tipo: 'FOTO_CLIENTE',
        url: '/uploads/clientes/cliente-uuid.png',
        nomeOriginal: 'cliente.png',
        mimeType: 'image/png',
        tamanho: 180000,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'clienteId inválido, arquivo inválido ou tipo não permitido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE e RECEPCAO.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente não encontrado para a empresa autenticada.',
  })
  uploadFotoCliente(
    @Req() req: any,
    @Param('clienteId', ParseUUIDPipe) clienteId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.arquivosService.uploadFotoCliente(
      getEmpresaId(req),
      clienteId,
      file,
    );
  }

  @Post('usuarios/:usuarioId/foto')
  @Roles(Role.ADMIN, Role.GERENTE, Role.PROFISSIONAL)
  @UseInterceptors(
    FileInterceptor('file', multerStorageOptions('usuarios')),
  )
  @ApiOperation({
    summary: 'Fazer upload da foto do usuário',
    description:
      'Realiza o upload da foto de um usuário da empresa autenticada. Endpoint usado para perfil de usuários administrativos, gerenciais ou profissionais.',
  })
  @ApiParam({
    name: 'usuarioId',
    description: 'ID do usuário que receberá a foto.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de imagem enviado no campo file.',
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagem de perfil do usuário.',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Foto do usuário enviada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        usuarioId: '550e8400-e29b-41d4-a716-446655440000',
        tipo: 'FOTO_USUARIO',
        url: '/uploads/usuarios/usuario-uuid.png',
        nomeOriginal: 'usuario.png',
        mimeType: 'image/png',
        tamanho: 190000,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'usuarioId inválido, arquivo inválido ou tipo não permitido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado para a empresa autenticada.',
  })
  uploadFotoUsuario(
    @Req() req: any,
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.arquivosService.uploadFotoUsuario(
      getEmpresaId(req),
      usuarioId,
      file,
      req.user,
    );
  }

  @Post('profissionais/:usuarioId/foto')
  @Roles(Role.ADMIN, Role.GERENTE, Role.PROFISSIONAL)
  @UseInterceptors(
    FileInterceptor('file', multerStorageOptions('profissionais')),
  )
  @ApiOperation({
    summary: 'Fazer upload da foto do profissional',
    description:
      'Realiza o upload da foto de um profissional da empresa autenticada. Usa a mesma lógica de foto de usuário, com armazenamento separado para profissionais.',
  })
  @ApiParam({
    name: 'usuarioId',
    description: 'ID do usuário/profissional que receberá a foto.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de imagem enviado no campo file.',
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagem de perfil do profissional.',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Foto do profissional enviada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        usuarioId: '550e8400-e29b-41d4-a716-446655440000',
        tipo: 'FOTO_USUARIO',
        url: '/uploads/profissionais/profissional-uuid.png',
        nomeOriginal: 'profissional.png',
        mimeType: 'image/png',
        tamanho: 190000,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'usuarioId inválido, arquivo inválido ou tipo não permitido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description: 'Profissional não encontrado para a empresa autenticada.',
  })
  uploadFotoProfissional(
    @Req() req: any,
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.arquivosService.uploadFotoUsuario(
      getEmpresaId(req),
      usuarioId,
      file,
      req.user,
    );
  }

  @Post('servicos/:servicoId/imagem')
  @Roles(Role.ADMIN, Role.GERENTE)
  @UseInterceptors(
    FileInterceptor('file', multerStorageOptions('servicos')),
  )
  @ApiOperation({
    summary: 'Fazer upload da imagem do serviço',
    description:
      'Realiza o upload da imagem de um serviço da empresa autenticada. Endpoint usado para catálogo de serviços, site, landing page, painel e futura aplicação mobile.',
  })
  @ApiParam({
    name: 'servicoId',
    description: 'ID do serviço que receberá a imagem.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de imagem enviado no campo file.',
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagem do serviço.',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Imagem do serviço enviada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        servicoId: '550e8400-e29b-41d4-a716-446655440000',
        tipo: 'IMAGEM_SERVICO',
        url: '/uploads/servicos/servico-uuid.png',
        nomeOriginal: 'servico.png',
        mimeType: 'image/png',
        tamanho: 220000,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'servicoId inválido, arquivo inválido ou tipo não permitido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Serviço não encontrado para a empresa autenticada.',
  })
  uploadImagemServico(
    @Req() req: any,
    @Param('servicoId', ParseUUIDPipe) servicoId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.arquivosService.uploadImagemServico(
      getEmpresaId(req),
      servicoId,
      file,
    );
  }

  @Post('galeria')
  @Roles(Role.ADMIN, Role.GERENTE)
  @UseInterceptors(
    FilesInterceptor('files', 10, multerStorageOptions('galeria')),
  )
  @ApiOperation({
    summary: 'Fazer upload de arquivos para a galeria',
    description:
      'Realiza o upload múltiplo de imagens para a galeria da empresa autenticada. Permite até 10 arquivos no campo files.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Lista de arquivos enviados no campo files.',
    schema: {
      type: 'object',
      required: ['files'],
      properties: {
        files: {
          type: 'array',
          description: 'Imagens da galeria.',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Arquivos da galeria enviados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          tipo: 'GALERIA',
          url: '/uploads/galeria/galeria-uuid-1.png',
          nomeOriginal: 'antes-depois-1.png',
          mimeType: 'image/png',
          tamanho: 300000,
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description:
      'Arquivos inválidos, quantidade acima do limite, tipo não permitido ou tamanho acima do permitido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  uploadGaleria(
    @Req() req: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.arquivosService.uploadGaleria(
      getEmpresaId(req),
      files,
    );
  }

  @Get('galeria')
  @Roles(Role.ADMIN, Role.GERENTE, Role.RECEPCAO, Role.PROFISSIONAL)
  @ApiOperation({
    summary: 'Listar arquivos da galeria',
    description:
      'Lista os arquivos da galeria da empresa autenticada com suporte a paginação.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Página atual da listagem paginada.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Quantidade de registros por página.',
  })
  @ApiOkResponse({
    description: 'Arquivos da galeria retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            tipo: 'GALERIA',
            url: '/uploads/galeria/galeria-uuid.png',
            nomeOriginal: 'resultado.png',
            mimeType: 'image/png',
            tamanho: 300000,
            createdAt: '2026-06-14T10:00:00.000Z',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  listarGaleria(
    @Req() req: any,
    @Query() query: PaginationDto,
  ) {
    return this.arquivosService.listarGaleria(
      getEmpresaId(req),
      query,
    );
  }

  @Post('documentos')
  @Roles(Role.ADMIN, Role.GERENTE)
  @UseInterceptors(
    FileInterceptor('file', multerStorageOptions('documentos')),
  )
  @ApiOperation({
    summary: 'Fazer upload de documento',
    description:
      'Realiza o upload de um documento da empresa autenticada. Endpoint usado para arquivos administrativos, PDFs e documentos internos permitidos pela configuração de upload.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de documento enviado no campo file.',
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Documento enviado pela empresa.',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Documento enviado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        tipo: 'DOCUMENTO',
        url: '/uploads/documentos/documento-uuid.pdf',
        nomeOriginal: 'contrato.pdf',
        mimeType: 'application/pdf',
        tamanho: 500000,
        createdAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Arquivo inválido, tipo não permitido ou tamanho acima do limite.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  uploadDocumento(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.arquivosService.uploadDocumento(
      getEmpresaId(req),
      file,
    );
  }

  @Get()
  @Roles(Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Listar todos os arquivos',
    description:
      'Lista os arquivos da empresa autenticada com suporte a paginação. Endpoint administrativo para auditoria, gestão e rastreabilidade de uploads.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Página atual da listagem paginada.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Quantidade de registros por página.',
  })
  @ApiOkResponse({
    description: 'Arquivos retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            tipo: 'DOCUMENTO',
            url: '/uploads/documentos/documento-uuid.pdf',
            nomeOriginal: 'contrato.pdf',
            mimeType: 'application/pdf',
            tamanho: 500000,
            createdAt: '2026-06-14T10:00:00.000Z',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findAll(
    @Req() req: any,
    @Query() query: PaginationDto,
  ) {
    return this.arquivosService.findAll(
      getEmpresaId(req),
      query,
    );
  }

  @Get('tipo/:tipo')
  @Roles(Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Listar arquivos por tipo',
    description:
      'Lista os arquivos da empresa autenticada filtrando pelo tipo do arquivo, com suporte a paginação.',
  })
  @ApiParam({
    name: 'tipo',
    enum: TipoArquivo,
    description:
      'Tipo do arquivo conforme enum TipoArquivo do Prisma.',
    example: Object.values(TipoArquivo)[0],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Página atual da listagem paginada.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Quantidade de registros por página.',
  })
  @ApiOkResponse({
    description: 'Arquivos filtrados por tipo retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            tipo: 'DOCUMENTO',
            url: '/uploads/documentos/documento-uuid.pdf',
            nomeOriginal: 'contrato.pdf',
            mimeType: 'application/pdf',
            tamanho: 500000,
            createdAt: '2026-06-14T10:00:00.000Z',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Tipo de arquivo inválido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findByTipo(
    @Req() req: any,
    @Param('tipo') tipo: TipoArquivo,
    @Query() query: PaginationDto,
  ) {
    return this.arquivosService.findByTipo(
      getEmpresaId(req),
      tipo,
      query,
    );
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Buscar arquivo por ID',
    description:
      'Busca um arquivo específico da empresa autenticada pelo ID, respeitando o isolamento multiempresa.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do arquivo.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Arquivo encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        tipo: 'DOCUMENTO',
        url: '/uploads/documentos/documento-uuid.pdf',
        nomeOriginal: 'contrato.pdf',
        nomeArquivo: 'documento-uuid.pdf',
        mimeType: 'application/pdf',
        tamanho: 500000,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido. O parâmetro deve ser um UUID válido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Arquivo não encontrado para a empresa autenticada.',
  })
  findOne(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.arquivosService.findOne(
      getEmpresaId(req),
      id,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Remover arquivo',
    description:
      'Remove ou inativa um arquivo da empresa autenticada, conforme regra implementada no service. Endpoint administrativo para gestão de uploads.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do arquivo que será removido.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Arquivo removido com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        removido: true,
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido. O parâmetro deve ser um UUID válido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Arquivo não encontrado para a empresa autenticada.',
  })
  remove(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.arquivosService.remove(
      getEmpresaId(req),
      id,
    );
  }


  @Post('private/documentos')
  @Roles(Role.ADMIN, Role.GERENTE, Role.RECEPCAO)
  @UseInterceptors(
    FileInterceptor('file', {
      ...multerMemoryConfig,
      limits: {
        fileSize: getUploadLimitBytes('document'),
      },
    }),
  )
  @ApiOperation({
    summary: 'Upload privado de documento',
    description:
      'Envia documentos internos privados. O arquivo não fica acessível por /uploads.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        clienteId: {
          type: 'string',
          format: 'uuid',
        },
        observacao: {
          type: 'string',
          example: 'Contrato assinado pelo cliente.',
        },
      },
      required: ['file'],
    },
  })
  @ApiCreatedResponse({
    description: 'Documento privado enviado com sucesso.',
  })
  uploadPrivadoDocumento(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDocumentoPrivadoDto,
  ) {
    const empresaId = req.user.empresaId;
    const usuarioId = req.user.sub || req.user.id || req.user.usuarioId;

    return this.arquivosService.uploadPrivadoDocumento(
      empresaId,
      usuarioId,
      file,
      dto,
    );
  }

}
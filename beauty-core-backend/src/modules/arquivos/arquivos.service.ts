import { AcaoAuditoria, ArquivoVisibilidade, Prisma, Role, StatusArquivo, StatusAuditoria, TipoArquivo, TipoUsuarioAuditoria } from '@prisma/client';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { TenantValidatorService } from '../../shared/tenant';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../shared/utils/pagination.util';

import { LocalStorageService } from './storage/local-storage.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { StorageFactory } from './storage/storage.factory';
import { UploadDocumentoPrivadoDto } from './dto/upload-documento-privado.dto';

@Injectable()
export class ArquivosService {
  private readonly logger = new Logger(ArquivosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: LocalStorageService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
    private readonly storageFactory: StorageFactory,
  ) {}

  private validarArquivo(file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado.');
    }
  }

  private montarDadosArquivo(params: {
    empresaId: string;
    file: Express.Multer.File;
    tipo: TipoArquivo;
    clienteId?: string;
    usuarioId?: string;
    servicoId?: string;
  }) {
    const caminho = params.file.path.replace(/\\/g, '/');

    return {
      empresaId: params.empresaId,
      clienteId: params.clienteId,
      usuarioId: params.usuarioId,
      servicoId: params.servicoId,
      tipo: params.tipo,
      nomeOriginal: params.file.originalname,
      nomeArquivo: params.file.filename,
      mimeType: params.file.mimetype,
      tamanhoBytes: params.file.size,
      caminho,
      url: this.storage.gerarUrl(caminho),
    };
  }

  private montarDadosAuditoriaArquivo(arquivo: any) {
    return {
      id: arquivo.id,
      empresaId: arquivo.empresaId,
      clienteId: arquivo.clienteId,
      usuarioId: arquivo.usuarioId,
      servicoId: arquivo.servicoId,
      tipo: arquivo.tipo,
      status: arquivo.status,
      nomeOriginal: arquivo.nomeOriginal,
      nomeArquivo: arquivo.nomeArquivo,
      mimeType: arquivo.mimeType,
      tamanhoBytes: arquivo.tamanhoBytes,
      createdAt: arquivo.createdAt,
      updatedAt: arquivo.updatedAt,
    };
  }

  private async registrarUploadArquivo(
    arquivo: any,
    mensagem: string,
    tempoMs?: number,
  ) {
    await this.auditoriaService.registrarUpload({
      empresaId: arquivo.empresaId,
      usuarioId: arquivo.usuarioId ?? undefined,
      clienteId: arquivo.clienteId ?? undefined,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'ARQUIVOS',
      recurso: 'Arquivo',
      recursoId: arquivo.id,
      dadosDepois: this.montarDadosAuditoriaArquivo(arquivo),
      metadata: {
        tempoMs,
      },
      mensagem,
    });
  }

  async uploadLogo(empresaId: string, file: Express.Multer.File) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    this.validarArquivo(file);

    const arquivo = await this.prisma.arquivo.create({
      data: this.montarDadosArquivo({
        empresaId,
        file,
        tipo: TipoArquivo.LOGO_EMPRESA,
      }),
    });

    await this.prisma.empresa.update({
      where: { id: empresaId },
      data: { logo: arquivo.url },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[ARQUIVOS] upload logo empresaId=${empresaId} arquivoId=${arquivo.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.registrarUploadArquivo(
      arquivo,
      'Logo da empresa enviada com sucesso.',
      tempoMs,
    );

    

    return arquivo;
  }

  async uploadFotoCliente(
    empresaId: string,
    clienteId: string,
    file: Express.Multer.File,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    this.validarArquivo(file);

    await this.tenantValidator.validarCliente(empresaId, clienteId);

    const arquivo = await this.prisma.arquivo.create({
      data: this.montarDadosArquivo({
        empresaId,
        clienteId,
        file,
        tipo: TipoArquivo.FOTO_CLIENTE,
      }),
    });

    await this.prisma.cliente.updateMany({
      where: {
        id: clienteId,
        empresaId,
      },
      data: {
        foto: arquivo.url,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[ARQUIVOS] upload foto cliente empresaId=${empresaId} arquivoId=${arquivo.id} clienteId=${clienteId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.registrarUploadArquivo(
      arquivo,
      'Foto do cliente enviada com sucesso.',
      tempoMs,
    );

    return arquivo;
  }

  async uploadFotoUsuario(
    empresaId: string,
    usuarioId: string,
    file: Express.Multer.File,
    usuarioLogado: { sub?: string; id?: string; role: Role; empresaId: string },
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    this.validarArquivo(file);

    const usuario = await this.tenantValidator.validarUsuario(
      empresaId,
      usuarioId,
    );

    const usuarioLogadoId = usuarioLogado.sub ?? usuarioLogado.id;

    if (
      usuarioLogado.role === Role.PROFISSIONAL &&
      usuarioLogadoId !== usuarioId
    ) {
      throw new ForbiddenException(
        'Profissional só pode alterar a própria foto.',
      );
    }

    const tipo =
      usuario.role === Role.PROFISSIONAL
        ? TipoArquivo.FOTO_PROFISSIONAL
        : TipoArquivo.FOTO_USUARIO;

    const arquivo = await this.prisma.arquivo.create({
      data: this.montarDadosArquivo({
        empresaId,
        usuarioId,
        file,
        tipo,
      }),
    });

    await this.prisma.usuario.updateMany({
      where: {
        id: usuarioId,
        empresaId,
      },
      data: {
        foto: arquivo.url,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[ARQUIVOS] upload foto usuario empresaId=${empresaId} arquivoId=${arquivo.id} usuarioId=${usuarioId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarUpload({
      empresaId,
      usuarioId,
      tipoUsuario:
        usuarioLogado.role in TipoUsuarioAuditoria
          ? (usuarioLogado.role as unknown as TipoUsuarioAuditoria)
          : TipoUsuarioAuditoria.SISTEMA,
      modulo: 'ARQUIVOS',
      recurso: 'Arquivo',
      recursoId: arquivo.id,
      dadosDepois: {
        ...this.montarDadosAuditoriaArquivo(arquivo),
        usuarioAfetadoId: usuarioId,
        usuarioAfetadoNome: usuario.nome,
        usuarioLogadoId,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Foto do usuário enviada com sucesso.',
    });

    return arquivo;
  }

  async uploadImagemServico(
    empresaId: string,
    servicoId: string,
    file: Express.Multer.File,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    this.validarArquivo(file);

    const servico = await this.tenantValidator.validarServico(
      empresaId,
      servicoId,
    );

    const arquivo = await this.prisma.arquivo.create({
      data: this.montarDadosArquivo({
        empresaId,
        servicoId,
        file,
        tipo: TipoArquivo.IMAGEM_SERVICO,
      }),
    });

    await this.prisma.servico.updateMany({
      where: {
        id: servicoId,
        empresaId,
      },
      data: {
        imagem: arquivo.url,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[ARQUIVOS] upload imagem servico empresaId=${empresaId} arquivoId=${arquivo.id} servicoId=${servicoId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarUpload({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'ARQUIVOS',
      recurso: 'Arquivo',
      recursoId: arquivo.id,
      dadosDepois: {
        ...this.montarDadosAuditoriaArquivo(arquivo),
        servicoId,
        servicoNome: servico.nome,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Imagem do serviço enviada com sucesso.',
    });

    return arquivo;
  }

  async uploadGaleria(empresaId: string, files: Express.Multer.File[]) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    const arquivos = await this.prisma.$transaction(
      files.map((file) =>
        this.prisma.arquivo.create({
          data: this.montarDadosArquivo({
            empresaId,
            file,
            tipo: TipoArquivo.GALERIA_EMPRESA,
          }),
        }),
      ),
    );

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[ARQUIVOS] upload galeria empresaId=${empresaId} quantidade=${arquivos.length} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarUpload({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'ARQUIVOS',
      recurso: 'Arquivo',
      dadosDepois: {
        quantidade: arquivos.length,
        arquivos: arquivos.map((arquivo) =>
          this.montarDadosAuditoriaArquivo(arquivo),
        ),
      },
      metadata: {
        tipo: TipoArquivo.GALERIA_EMPRESA,
        quantidadeArquivos: arquivos.length,
        tempoMs,
      },
      mensagem: 'Arquivos da galeria enviados com sucesso.',
    });

    return arquivos;
  }

  async listarGaleria(
    empresaId: string,
    query: PaginationDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.buscarArquivosPaginados(empresaId, {
      ...query,
      tipo: TipoArquivo.GALERIA_EMPRESA,
      status: StatusArquivo.ATIVO,
    });
  }

  async uploadDocumento(empresaId: string, file: Express.Multer.File) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    this.validarArquivo(file);

    const arquivo = await this.prisma.arquivo.create({
      data: this.montarDadosArquivo({
        empresaId,
        file,
        tipo: TipoArquivo.DOCUMENTO,
      }),
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[ARQUIVOS] upload documento empresaId=${empresaId} arquivoId=${arquivo.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.registrarUploadArquivo(
      arquivo,
      'Documento enviado com sucesso.',
      tempoMs,
    );

    return arquivo;
  }

  async findAll(
    empresaId: string,
    query: PaginationDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.buscarArquivosPaginados(empresaId, query);
  }

  async findOne(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.buscarArquivoOuFalhar(empresaId, id);
  }

  async findByTipo(
    empresaId: string,
    tipo: TipoArquivo,
    query: PaginationDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.buscarArquivosPaginados(empresaId, {
      ...query,
      tipo,
    });
  }

  async remove(empresaId: string, id: string) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const arquivoAntes = await this.buscarArquivoOuFalhar(
      empresaId,
      id,
    );

    const resultado = await this.prisma.arquivo.updateMany({
      where: {
        id,
        empresaId,
        status: {
          not: StatusArquivo.EXCLUIDO,
        },
      },
      data: {
        status: StatusArquivo.EXCLUIDO,
      },
    });

    if (resultado.count === 0) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[ARQUIVOS] arquivo removido empresaId=${empresaId} arquivoId=${id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarExclusao({
      empresaId,
      usuarioId: arquivoAntes.usuarioId ?? undefined,
      clienteId: arquivoAntes.clienteId ?? undefined,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'ARQUIVOS',
      recurso: 'Arquivo',
      recursoId: id,
      dadosAntes: this.montarDadosAuditoriaArquivo(arquivoAntes),
      dadosDepois: {
        ...this.montarDadosAuditoriaArquivo(arquivoAntes),
        status: StatusArquivo.EXCLUIDO,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Arquivo removido com sucesso.',
    });

    return {
      message: 'Arquivo removido com sucesso.',
    };
  }

  private async buscarArquivosPaginados(
    empresaId: string,
    query: PaginationDto & {
      tipo?: TipoArquivo;
      status?: StatusArquivo;
      clienteId?: string;
      usuarioId?: string;
      servicoId?: string;
      unidadeId?: string;
    },
  ) {
    await this.validarFiltrosRelacionados(empresaId, {
      clienteId: query.clienteId,
      usuarioId: query.usuarioId,
      servicoId: query.servicoId,
      unidadeId: query.unidadeId,
    });

    const { page, limit, skip, take } = getPaginationParams(query);

    const orderByPermitidos = [
      'createdAt',
      'updatedAt',
      'tipo',
      'status',
      'nomeOriginal',
      'tamanhoBytes',
    ];

    const orderBy: keyof Prisma.ArquivoOrderByWithRelationInput =
      orderByPermitidos.includes(query.orderBy ?? '')
        ? (query.orderBy as keyof Prisma.ArquivoOrderByWithRelationInput)
        : 'createdAt';

    const orderDirection = query.orderDirection ?? 'desc';

    const dataInicio = query['dataInicio']
      ? new Date(query['dataInicio'])
      : undefined;

    const dataFim = query['dataFim']
      ? new Date(query['dataFim'])
      : undefined;

    const where: Prisma.ArquivoWhereInput = {
      empresaId,
      status: query.status ?? {
        not: StatusArquivo.EXCLUIDO,
      },
      ...(query.tipo ? { tipo: query.tipo } : {}),
      ...(query.clienteId ? { clienteId: query.clienteId } : {}),
      ...(query.usuarioId ? { usuarioId: query.usuarioId } : {}),
      ...(query.servicoId ? { servicoId: query.servicoId } : {}),
      ...(query.unidadeId ? { unidadeId: query.unidadeId } : {}),
      ...(dataInicio || dataFim
        ? {
            createdAt: {
              ...(dataInicio ? { gte: dataInicio } : {}),
              ...(dataFim ? { lte: dataFim } : {}),
            },
          }
        : {}),
      ...(query.search
        ? {
            OR: [
              {
                nomeOriginal: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                nomeArquivo: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                mimeType: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.arquivo.findMany({
        where,
        skip,
        take,
        orderBy: {
          [orderBy]: orderDirection,
        },
      }),
      this.prisma.arquivo.count({
        where,
      }),
    ]);

    return buildPaginatedResponse(data, total, page, limit);
  }

  private async buscarArquivoOuFalhar(
    empresaId: string,
    id: string,
  ) {
    await this.tenantValidator.validarArquivo(empresaId, id);

    const arquivo = await this.prisma.arquivo.findFirst({
      where: {
        id,
        empresaId,
        status: {
          not: StatusArquivo.EXCLUIDO,
        },
      },
    });

    if (!arquivo) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    return arquivo;
  }

  private async validarFiltrosRelacionados(
    empresaId: string,
    filtros: {
      clienteId?: string;
      usuarioId?: string;
      servicoId?: string;
      unidadeId?: string;
    },
  ) {
    const validacoes: Promise<unknown>[] = [];

    if (filtros.clienteId) {
      validacoes.push(
        this.tenantValidator.validarCliente(
          empresaId,
          filtros.clienteId,
        ),
      );
    }

    if (filtros.usuarioId) {
      validacoes.push(
        this.tenantValidator.validarUsuario(
          empresaId,
          filtros.usuarioId,
        ),
      );
    }

    if (filtros.servicoId) {
      validacoes.push(
        this.tenantValidator.validarServico(
          empresaId,
          filtros.servicoId,
        ),
      );
    }

    if (filtros.unidadeId) {
      validacoes.push(
        this.tenantValidator.validarUnidade(
          empresaId,
          filtros.unidadeId,
        ),
      );
    }

    await Promise.all(validacoes);
  }


  private validarDocumentoPdfPrivado(file: Express.Multer.File): void {
    const originalName = file.originalname || '';
    const lowerName = originalName.toLowerCase();

    if (!lowerName.endsWith('.pdf')) {
      throw new BadRequestException(
        'Upload privado de documentos exige extensão .pdf.',
      );
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException(
        'Upload privado de documentos aceita apenas MIME application/pdf.',
      );
    }

    if (!file.buffer || file.buffer.length < 5) {
      throw new BadRequestException(
        'Arquivo PDF inválido ou sem conteúdo para validação.',
      );
    }

    const magicNumber = file.buffer.subarray(0, 5).toString('ascii');

    if (magicNumber !== '%PDF-') {
      throw new BadRequestException(
        'Arquivo PDF inválido: assinatura interna não reconhecida.',
      );
    }
  }

  async uploadPrivadoDocumento(
    empresaId: string,
    usuarioId: string,
    file: Express.Multer.File,
    dto?: UploadDocumentoPrivadoDto,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado.');
    }

    this.validarDocumentoPdfPrivado(file);

    const clienteId = dto?.clienteId;

    if (clienteId) {
      await this.tenantValidator.validarCliente(empresaId, clienteId);
    }

    const storage = this.storageFactory.getProvider();

    const result = await storage.upload({
      file,
      empresaId,
      tipo: TipoArquivo.DOCUMENTO,
      visibilidade: ArquivoVisibilidade.PRIVADO,
      subdiretorio: 'documentos',
    });

    const arquivo = await this.prisma.arquivo.create({
      data: {
        empresaId,
        usuarioId,
        clienteId,

        tipo: TipoArquivo.DOCUMENTO,
        nomeOriginal: file.originalname,
        nomeArquivo: result.nomeArquivo,

        mimeType: result.mimeType,
        tamanhoBytes: result.tamanhoBytes,

        caminho: result.caminhoRelativo,
        url: null,

        status: StatusArquivo.ATIVO,
        visibilidade: ArquivoVisibilidade.PRIVADO,
        armazenamento: this.storageFactory.getTipoArmazenamento(),
        checksum: result.checksum,
        privado: true,
      },
    });



    await this.auditoriaService.registrar({
      empresaId,
      usuarioId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      acao: 'UPLOAD_ARQUIVO' as AcaoAuditoria,
      status: 'SUCESSO' as StatusAuditoria,
      modulo: 'ARQUIVOS',
      recurso: 'Arquivo',
      recursoId: arquivo.id,
      dadosDepois: {
        id: arquivo.id,
        empresaId: arquivo.empresaId,
        usuarioId: arquivo.usuarioId,
        clienteId: arquivo.clienteId,
        tipo: arquivo.tipo,
        nomeOriginal: arquivo.nomeOriginal,
        nomeArquivo: arquivo.nomeArquivo,
        mimeType: arquivo.mimeType,
        tamanhoBytes: arquivo.tamanhoBytes,
        caminho: arquivo.caminho,
        url: arquivo.url,
        visibilidade: arquivo.visibilidade,
        armazenamento: arquivo.armazenamento,
        privado: arquivo.privado,
        checksum: arquivo.checksum,
      },
      metadata: {
        origem: 'upload_privado_documento',
        observacao: dto?.observacao,
      },
      mensagem: 'Upload privado de documento realizado com sucesso.',
    });
    return arquivo;
  }

}

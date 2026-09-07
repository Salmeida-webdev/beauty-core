// Chat 54 — Blocos 05/10 — Notificações API

import {
  getApiClient,
} from "@/services/api/api-client";

import {
  configuracaoNotificacaoFormSchema,
  configuracaoNotificacaoSchema,
  notificacaoDeleteResultSchema,
  notificacaoResumoSchema,
  notificacoesListParamsSchema,
  notificacoesListResponseSchema,
  notificacoesResumoGeralSchema,
} from "../schemas/notificacoes.schemas";
import type {
  ConfiguracaoNotificacao,
NotificacaoDeleteResult,
  NotificacaoResumo,
  NotificacoesListParams,
  NotificacoesListResponse,
  NotificacoesResumoGeral,
} from "../types/notificacoes.types";
import type {
  ConfiguracaoNotificacaoFormValues,
} from "../schemas/notificacoes.schemas";

export const notificacoesApiPaths = {
  notificacoes: "/notificacoes",
  configuracao: "/configuracoes-notificacao",
} as const;

function buildNotificacoesParams(
  params: NotificacoesListParams = {},
) {
  const parsed =
    notificacoesListParamsSchema.parse(
      params,
    );

  return {
    page: parsed.page,
    limit: parsed.limit,
    orderBy: parsed.orderBy,
    orderDirection: parsed.orderDirection,
    ...(parsed.search
      ? {
          search: parsed.search,
        }
      : {}),
  };
}

export async function listNotificacoes(
  params: NotificacoesListParams = {},
): Promise<NotificacoesListResponse> {
  const response =
    await getApiClient().get<unknown>(
      notificacoesApiPaths.notificacoes,
      {
        params:
          buildNotificacoesParams(
            params,
          ),
      },
    );

  return notificacoesListResponseSchema.parse(
    response.data,
  );
}

export async function listNotificacoesNaoLidas(
  params: NotificacoesListParams = {},
): Promise<NotificacoesListResponse> {
  const response =
    await getApiClient().get<unknown>(
      `${notificacoesApiPaths.notificacoes}/nao-lidas`,
      {
        params:
          buildNotificacoesParams(
            params,
          ),
      },
    );

  return notificacoesListResponseSchema.parse(
    response.data,
  );
}

export async function getNotificacoesResumo(): Promise<
  NotificacoesResumoGeral
> {
  const response =
    await getApiClient().get<unknown>(
      `${notificacoesApiPaths.notificacoes}/resumo`,
    );

  return notificacoesResumoGeralSchema.parse(
    response.data,
  );
}

export async function getNotificacao(
  id: string,
): Promise<NotificacaoResumo> {
  const response =
    await getApiClient().get<unknown>(
      `${notificacoesApiPaths.notificacoes}/${encodeURIComponent(id)}`,
    );

  return notificacaoResumoSchema.parse(
    response.data,
  );
}

export async function markNotificacaoAsRead(
  id: string,
): Promise<NotificacaoResumo> {
  const response =
    await getApiClient().patch<unknown>(
      `${notificacoesApiPaths.notificacoes}/${encodeURIComponent(id)}/lida`,
    );

  return notificacaoResumoSchema.parse(
    response.data,
  );
}

export async function archiveNotificacao(
  id: string,
): Promise<NotificacaoResumo> {
  const response =
    await getApiClient().patch<unknown>(
      `${notificacoesApiPaths.notificacoes}/${encodeURIComponent(id)}/arquivar`,
    );

  return notificacaoResumoSchema.parse(
    response.data,
  );
}

export async function deleteNotificacao(
  id: string,
): Promise<NotificacaoDeleteResult> {
  const response =
    await getApiClient().delete<unknown>(
      `${notificacoesApiPaths.notificacoes}/${encodeURIComponent(id)}`,
    );

  return notificacaoDeleteResultSchema.parse(
    response.data,
  );
}
export async function getConfiguracaoNotificacao(): Promise<
  ConfiguracaoNotificacao
> {
  const response =
    await getApiClient().get<unknown>(
      notificacoesApiPaths.configuracao,
    );

  return configuracaoNotificacaoSchema.parse(
    response.data,
  );
}

export async function updateConfiguracaoNotificacao(
  values: ConfiguracaoNotificacaoFormValues,
): Promise<ConfiguracaoNotificacao> {
  const safePayload =
    configuracaoNotificacaoFormSchema.parse(
      values,
    );

  const response =
    await getApiClient().patch<unknown>(
      notificacoesApiPaths.configuracao,
      safePayload,
    );

  return configuracaoNotificacaoSchema.parse(
    response.data,
  );
}
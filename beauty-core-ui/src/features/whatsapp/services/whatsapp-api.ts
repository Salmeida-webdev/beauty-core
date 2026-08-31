// Chat 54 — Blocos 05–08 — WhatsApp API

import {
  getApiClient,
} from "@/services/api/api-client";

import {
  campanhaWhatsappCreateResultSchema,
  campanhaWhatsappFormSchema,
  campanhaWhatsappResumoSchema,
  campanhaWhatsappUpdateSchema,
  campanhasWhatsappSchema,
  templateWhatsappFormSchema,
  templateWhatsappSchema,
  templatesWhatsappSchema,
  whatsappMensagemPayloadSchema,
  whatsappMensagemSchema,
  whatsappMensagemSendFormSchema,
  whatsappMessagesListParamsSchema,
  whatsappMessagesListResponseSchema,
  whatsappSendResultSchema,
  type CampanhaWhatsappFormValues,
  type CampanhaWhatsappUpdateValues,
  type TemplateWhatsappFormValues,
  type WhatsappMensagemPayload,
  type WhatsappMensagemSendFormValues,
} from "../schemas/whatsapp.schemas";
import type {
  CampanhaWhatsappCreateResult,
  CampanhaWhatsappResumo,
  TemplateWhatsapp,
  WhatsappMensagemResumo,
  WhatsappMessagesListParams,
  WhatsappMessagesListResponse,
  WhatsappSendResult,
} from "../types/whatsapp.types";

export const whatsappApiPaths = {
  configuracao: "/configuracao-whatsapp",
  templates: "/templates-whatsapp",
  mensagens: "/mensagens-whatsapp",
  campanhas: "/campanhas-whatsapp",
} as const;

export async function listTemplatesWhatsapp(): Promise<
  TemplateWhatsapp[]
> {
  const response =
    await getApiClient().get<unknown>(
      whatsappApiPaths.templates,
    );

  return templatesWhatsappSchema.parse(
    response.data,
  );
}

export async function getTemplateWhatsapp(
  id: string,
): Promise<TemplateWhatsapp> {
  const response =
    await getApiClient().get<unknown>(
      `${whatsappApiPaths.templates}/${encodeURIComponent(id)}`,
    );

  return templateWhatsappSchema.parse(
    response.data,
  );
}

export async function createTemplateWhatsapp(
  values: TemplateWhatsappFormValues,
): Promise<TemplateWhatsapp> {
  const safePayload =
    templateWhatsappFormSchema.parse(values);

  const response =
    await getApiClient().post<unknown>(
      whatsappApiPaths.templates,
      safePayload,
    );

  return templateWhatsappSchema.parse(
    response.data,
  );
}

export async function updateTemplateWhatsapp(
  id: string,
  values: TemplateWhatsappFormValues,
): Promise<TemplateWhatsapp> {
  const safePayload =
    templateWhatsappFormSchema.parse(values);

  const response =
    await getApiClient().patch<unknown>(
      `${whatsappApiPaths.templates}/${encodeURIComponent(id)}`,
      safePayload,
    );

  return templateWhatsappSchema.parse(
    response.data,
  );
}

export async function inactivateTemplateWhatsapp(
  id: string,
): Promise<TemplateWhatsapp> {
  const response =
    await getApiClient().patch<unknown>(
      `${whatsappApiPaths.templates}/${encodeURIComponent(id)}/inativar`,
    );

  return templateWhatsappSchema.parse(
    response.data,
  );
}

function buildWhatsappMessagesParams(
  params: WhatsappMessagesListParams = {},
) {
  const parsed =
    whatsappMessagesListParamsSchema.parse(
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

export async function listWhatsappMessages(
  params: WhatsappMessagesListParams = {},
): Promise<WhatsappMessagesListResponse> {
  const response =
    await getApiClient().get<unknown>(
      whatsappApiPaths.mensagens,
      {
        params:
          buildWhatsappMessagesParams(
            params,
          ),
      },
    );

  return whatsappMessagesListResponseSchema.parse(
    response.data,
  );
}

export async function getWhatsappMessage(
  id: string,
): Promise<WhatsappMensagemResumo> {
  const response =
    await getApiClient().get<unknown>(
      `${whatsappApiPaths.mensagens}/${encodeURIComponent(id)}`,
    );

  return whatsappMensagemSchema.parse(
    response.data,
  );
}

export async function createWhatsappMessage(
  values: WhatsappMensagemPayload,
): Promise<WhatsappMensagemResumo> {
  const safePayload =
    whatsappMensagemPayloadSchema.parse(
      values,
    );

  const response =
    await getApiClient().post<unknown>(
      whatsappApiPaths.mensagens,
      safePayload,
    );

  return whatsappMensagemSchema.parse(
    response.data,
  );
}

export async function sendWhatsappMessage(
  values: WhatsappMensagemSendFormValues,
): Promise<WhatsappSendResult> {
  const safePayload =
    whatsappMensagemSendFormSchema.parse(
      values,
    );

  const response =
    await getApiClient().post<unknown>(
      `${whatsappApiPaths.mensagens}/enviar`,
      safePayload,
    );

  return whatsappSendResultSchema.parse(
    response.data,
  );
}

export async function listWhatsappCampaigns(): Promise<
  CampanhaWhatsappResumo[]
> {
  const response =
    await getApiClient().get<unknown>(
      whatsappApiPaths.campanhas,
    );

  return campanhasWhatsappSchema.parse(
    response.data,
  );
}

export async function getWhatsappCampaign(
  id: string,
): Promise<CampanhaWhatsappResumo> {
  const response =
    await getApiClient().get<unknown>(
      `${whatsappApiPaths.campanhas}/${encodeURIComponent(id)}`,
    );

  return campanhaWhatsappResumoSchema.parse(
    response.data,
  );
}

export async function createWhatsappCampaign(
  values: CampanhaWhatsappFormValues,
): Promise<CampanhaWhatsappCreateResult> {
  const safePayload =
    campanhaWhatsappFormSchema.parse(
      values,
    );

  const response =
    await getApiClient().post<unknown>(
      whatsappApiPaths.campanhas,
      safePayload,
    );

  return campanhaWhatsappCreateResultSchema.parse(
    response.data,
  );
}

export async function updateWhatsappCampaign(
  id: string,
  values: CampanhaWhatsappUpdateValues,
): Promise<CampanhaWhatsappResumo> {
  const safePayload =
    campanhaWhatsappUpdateSchema.parse(
      values,
    );

  const response =
    await getApiClient().patch<unknown>(
      `${whatsappApiPaths.campanhas}/${encodeURIComponent(id)}`,
      safePayload,
    );

  return campanhaWhatsappResumoSchema.parse(
    response.data,
  );
}
export async function cancelWhatsappCampaign(
  id: string,
): Promise<CampanhaWhatsappResumo> {
  const response =
    await getApiClient().patch<unknown>(
      `${whatsappApiPaths.campanhas}/${encodeURIComponent(id)}/cancelar`,
    );

  return campanhaWhatsappResumoSchema.parse(
    response.data,
  );
}
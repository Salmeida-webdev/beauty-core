import {
  agendamentoDetailSchema,
  agendamentoMutationResultSchema,
  agendamentosListParamsSchema,
  agendamentosListResponseSchema,
} from "@/features/agendamentos/schemas/agendamentos-api.schemas";
import type {
  AgendamentoDetail,
  AgendamentoMutationResult,
  AgendamentosListParams,
  AgendamentosListResponse,
  CreateAgendamentoPayload,
  UpdateAgendamentoPayload,
} from "@/features/agendamentos/types/agendamentos-api.types";
import type { AgendamentoStatus } from "@/features/agendamentos/types/agendamentos-types";
import { getApiClient } from "@/services/api/api-client";

export function buildAgendamentosRequestParams(
  params: AgendamentosListParams = {},
) {
  const parsed =
    agendamentosListParamsSchema.parse(
      params,
    );

  return {
    page: parsed.page,
    limit: parsed.limit,
    orderBy: parsed.orderBy,
    orderDirection:
      parsed.orderDirection,

    ...(parsed.dataInicio
      ? {
          dataInicio:
            parsed.dataInicio,
        }
      : {}),

    ...(parsed.dataFim
      ? {
          dataFim:
            parsed.dataFim,
        }
      : {}),

    ...(parsed.status
      ? {
          status: parsed.status,
        }
      : {}),

    ...(parsed.clienteId
      ? {
          clienteId:
            parsed.clienteId,
        }
      : {}),

    ...(parsed.profissionalId
      ? {
          profissionalId:
            parsed.profissionalId,
        }
      : {}),

    ...(parsed.servicoId
      ? {
          servicoId:
            parsed.servicoId,
        }
      : {}),

    ...(parsed.unidadeId
      ? {
          unidadeId:
            parsed.unidadeId,
        }
      : {}),
  };
}

export async function getAgendamentos(
  params: AgendamentosListParams = {},
): Promise<AgendamentosListResponse> {
  const response =
    await getApiClient().get<unknown>(
      "/agendamentos",
      {
        params:
          buildAgendamentosRequestParams(
            params,
          ),
      },
    );

  return agendamentosListResponseSchema.parse(
    response.data,
  );
}

export async function getAgendamentoById(
  agendamentoId: string,
): Promise<AgendamentoDetail> {
  const response =
    await getApiClient().get<unknown>(
      `/agendamentos/${agendamentoId}`,
    );

  return agendamentoDetailSchema.parse(
    response.data,
  );
}

export async function createAgendamento(
  payload: CreateAgendamentoPayload,
): Promise<AgendamentoMutationResult> {
  const response =
    await getApiClient().post<unknown>(
      "/agendamentos",
      payload,
    );

  return agendamentoMutationResultSchema.parse(
    response.data,
  );
}

export async function updateAgendamento(
  agendamentoId: string,
  payload: UpdateAgendamentoPayload,
): Promise<AgendamentoDetail> {
  const response =
    await getApiClient().patch<unknown>(
      `/agendamentos/${agendamentoId}`,
      payload,
    );

  return agendamentoDetailSchema.parse(
    response.data,
  );
}

export async function changeAgendamentoStatus(
  agendamentoId: string,
  status: AgendamentoStatus,
): Promise<AgendamentoDetail> {
  return updateAgendamento(
    agendamentoId,
    {
      status,
    },
  );
}

export async function cancelAgendamento(
  agendamentoId: string,
): Promise<AgendamentoDetail> {
  const response =
    await getApiClient().patch<unknown>(
      `/agendamentos/${agendamentoId}/cancelar`,
    );

  return agendamentoDetailSchema.parse(
    response.data,
  );
}

export const agendamentosApi = {
  list: getAgendamentos,
  detail: getAgendamentoById,
  create: createAgendamento,
  update: updateAgendamento,
  changeStatus:
    changeAgendamentoStatus,
  cancel: cancelAgendamento,
};
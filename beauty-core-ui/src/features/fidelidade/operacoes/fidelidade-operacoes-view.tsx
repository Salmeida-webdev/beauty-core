"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  useForm,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { z } from "zod";

import { useAuthStore } from "@/stores/auth-store";

import { canAdjustPoints } from "../permissions/fidelidade-permissions";
import { FIDELIDADE_OPERACAO_LIMITS } from "./fidelidade-operacao-limits";
import {
  adicionarPontosFormSchema,
  pontuarPorValorFormSchema,
  resgatarPontosFormSchema,
  toAdicionarPontosPayload,
  toPontuarPorValorPayload,
  toResgatarPontosPayload,
  type AdicionarPontosFormValues,
  type PontuarPorValorFormValues,
  type ResgatarPontosFormValues,
} from "./fidelidade-operacoes.schema";
import { useFidelidadeOperacoes } from "./use-fidelidade-operacoes";

const uuidSchema = z.string().uuid();

type SuccessKind =
  | "adicionar"
  | "resgatar"
  | "pontuar"
  | null;

type DescricaoFieldProps = {
  id: string;
  maxLength: number;
  registration: UseFormRegisterReturn;
};

function DescricaoField({
  id,
  maxLength,
  registration,
}: DescricaoFieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id}>
        Descrição ou motivo
      </label>

      <textarea
        id={id}
        maxLength={maxLength}
        rows={3}
        required
        {...registration}
        className="rounded-md border bg-background px-3 py-2"
      />

      <p className="text-xs text-muted-foreground">
        Obrigatório. Máximo de {maxLength} caracteres.
      </p>
    </div>
  );
}

export function FidelidadeOperacoesView() {
  const searchParams = useSearchParams();

  const role = useAuthStore(
    (state) => state.user?.role ?? null,
  );

  const canOperate =
    canAdjustPoints(role);

  const rawClienteId =
    searchParams.get("clienteId") ?? "";

  const parsedClienteId =
    uuidSchema.safeParse(rawClienteId);

  const clienteId =
    parsedClienteId.success
      ? parsedClienteId.data
      : "";

  const [successKind, setSuccessKind] =
    useState<SuccessKind>(null);

  const [
    confirmResgate,
    setConfirmResgate,
  ] = useState(false);

  const {
    adicionarMutation,
    resgatarMutation,
    pontuarMutation,
  } = useFidelidadeOperacoes(
    clienteId,
  );

  const adicionarForm =
    useForm<AdicionarPontosFormValues>({
      resolver: zodResolver(
        adicionarPontosFormSchema,
      ),
      defaultValues: {
        pontos: "",
        descricao: "",
      },
    });

  const resgatarForm =
    useForm<ResgatarPontosFormValues>({
      resolver: zodResolver(
        resgatarPontosFormSchema,
      ),
      defaultValues: {
        pontos: "",
        descricao: "",
      },
    });

  const pontuarForm =
    useForm<PontuarPorValorFormValues>({
      resolver: zodResolver(
        pontuarPorValorFormSchema,
      ),
      defaultValues: {
        valorGasto: "",
        descricao: "",
      },
    });

  if (!canOperate) {
    return null;
  }

  if (!clienteId) {
    return (
      <section className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
        <h2 className="text-lg font-semibold">
          Operações de pontos
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Selecione um cliente válido para adicionar,
          resgatar ou pontuar por valor gasto.
        </p>
      </section>
    );
  }

  const anyError =
    adicionarMutation.isError ||
    resgatarMutation.isError ||
    pontuarMutation.isError;

  return (
    <section className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold">
        Operações de pontos
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Saldo, histórico e cálculos permanecem sob
        autoridade do backend.
      </p>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <form
          className="grid content-start gap-4 rounded-lg border p-4"
          noValidate
          onSubmit={adicionarForm.handleSubmit(
            async (values) => {
              setSuccessKind(null);

              await adicionarMutation.mutateAsync(
                toAdicionarPontosPayload(
                  clienteId,
                  values,
                ),
              );

              setSuccessKind("adicionar");
            },
          )}
        >
          <div>
            <h3 className="font-semibold">
              Adicionar pontos
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Ajuste positivo manual previsto no contrato.
            </p>
          </div>

          <fieldset
            disabled={
              adicionarMutation.isPending
            }
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <label htmlFor="fidelidade-adicionar-pontos">
                Pontos
              </label>

              <input
                id="fidelidade-adicionar-pontos"
                type="number"
                min={
                  FIDELIDADE_OPERACAO_LIMITS
                    .adicionarPontosMin
                }
                step="1"
                required
                {...adicionarForm.register(
                  "pontos",
                )}
                className="min-h-10 rounded-md border bg-background px-3 py-2"
              />

              {adicionarForm.formState.errors
                .pontos ? (
                <p className="text-sm text-destructive">
                  {
                    adicionarForm.formState
                      .errors.pontos.message
                  }
                </p>
              ) : null}
            </div>

            <DescricaoField
              id="fidelidade-adicionar-descricao"
              maxLength={
                FIDELIDADE_OPERACAO_LIMITS
                  .adicionarDescricaoMax
              }
              registration={
                adicionarForm.register(
                  "descricao",
                )
              }
            />

            {adicionarForm.formState.errors
              .descricao ? (
              <p className="text-sm text-destructive">
                {
                  adicionarForm.formState
                    .errors.descricao.message
                }
              </p>
            ) : null}
          </fieldset>

          <button
            type="submit"
            disabled={
              adicionarMutation.isPending
            }
            className="min-h-10 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {adicionarMutation.isPending
              ? "Adicionando..."
              : "Adicionar pontos"}
          </button>
        </form>

        <form
          className="grid content-start gap-4 rounded-lg border p-4"
          noValidate
          onSubmit={resgatarForm.handleSubmit(
            async (values) => {
              if (!confirmResgate) {
                return;
              }

              setSuccessKind(null);

              await resgatarMutation.mutateAsync(
                toResgatarPontosPayload(
                  clienteId,
                  values,
                ),
              );

              setConfirmResgate(false);
              setSuccessKind("resgatar");
            },
          )}
        >
          <div>
            <h3 className="font-semibold">
              Resgatar pontos
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              O backend rejeita saldo insuficiente.
            </p>
          </div>

          <fieldset
            disabled={
              resgatarMutation.isPending
            }
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <label htmlFor="fidelidade-resgatar-pontos">
                Pontos
              </label>

              <input
                id="fidelidade-resgatar-pontos"
                type="number"
                min={
                  FIDELIDADE_OPERACAO_LIMITS
                    .resgatarPontosMin
                }
                step="1"
                required
                {...resgatarForm.register(
                  "pontos",
                )}
                className="min-h-10 rounded-md border bg-background px-3 py-2"
              />

              {resgatarForm.formState.errors
                .pontos ? (
                <p className="text-sm text-destructive">
                  {
                    resgatarForm.formState
                      .errors.pontos.message
                  }
                </p>
              ) : null}
            </div>

            <DescricaoField
              id="fidelidade-resgatar-descricao"
              maxLength={
                FIDELIDADE_OPERACAO_LIMITS
                  .resgatarDescricaoMax
              }
              registration={
                resgatarForm.register(
                  "descricao",
                )
              }
            />

            {resgatarForm.formState.errors
              .descricao ? (
              <p className="text-sm text-destructive">
                {
                  resgatarForm.formState
                    .errors.descricao.message
                }
              </p>
            ) : null}

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={confirmResgate}
                onChange={(event) => {
                  setConfirmResgate(
                    event.target.checked,
                  );
                }}
                className="mt-1"
              />

              <span>
                Confirmo a retirada dos pontos do saldo
                deste cliente.
              </span>
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={
              resgatarMutation.isPending ||
              !confirmResgate
            }
            className="min-h-10 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground disabled:opacity-60"
          >
            {resgatarMutation.isPending
              ? "Resgatando..."
              : "Resgatar pontos"}
          </button>
        </form>

        <form
          className="grid content-start gap-4 rounded-lg border p-4"
          noValidate
          onSubmit={pontuarForm.handleSubmit(
            async (values) => {
              setSuccessKind(null);

              await pontuarMutation.mutateAsync(
                toPontuarPorValorPayload(
                  clienteId,
                  values,
                ),
              );

              setSuccessKind("pontuar");
            },
          )}
        >
          <div>
            <h3 className="font-semibold">
              Pontuar por valor gasto
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              A conversão em pontos ocorre exclusivamente
              no backend.
            </p>
          </div>

          <fieldset
            disabled={
              pontuarMutation.isPending
            }
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <label htmlFor="fidelidade-valor-gasto">
                Valor gasto
              </label>

              <input
                id="fidelidade-valor-gasto"
                type="number"
                min={
                  FIDELIDADE_OPERACAO_LIMITS
                    .pontuarValorMin
                }
                step="any"
                required
                {...pontuarForm.register(
                  "valorGasto",
                )}
                className="min-h-10 rounded-md border bg-background px-3 py-2"
              />

              {pontuarForm.formState.errors
                .valorGasto ? (
                <p className="text-sm text-destructive">
                  {
                    pontuarForm.formState
                      .errors.valorGasto.message
                  }
                </p>
              ) : null}
            </div>

            <DescricaoField
              id="fidelidade-pontuar-descricao"
              maxLength={
                FIDELIDADE_OPERACAO_LIMITS
                  .pontuarDescricaoMax
              }
              registration={
                pontuarForm.register(
                  "descricao",
                )
              }
            />

            {pontuarForm.formState.errors
              .descricao ? (
              <p className="text-sm text-destructive">
                {
                  pontuarForm.formState
                    .errors.descricao.message
                }
              </p>
            ) : null}
          </fieldset>

          <button
            type="submit"
            disabled={
              pontuarMutation.isPending
            }
            className="min-h-10 rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {pontuarMutation.isPending
              ? "Pontuando..."
              : "Pontuar por valor"}
          </button>
        </form>
      </div>

      {successKind ? (
        <p
          role="status"
          className="mt-4 text-sm"
        >
          Operação concluída. Saldo e histórico foram
          solicitados novamente ao backend.
        </p>
      ) : null}

      {anyError ? (
        <p
          role="alert"
          className="mt-4 text-sm text-destructive"
        >
          Não foi possível concluir a operação. Verifique
          os dados e a regra retornada pelo backend.
        </p>
      ) : null}

      <p className="mt-4 text-xs text-muted-foreground">
        O contrato atual não expõe ajuste negativo
        genérico nem estorno de movimentação.
      </p>
    </section>
  );
}

"use client";

import {
  useMemo,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";

import { AgendaOptionPicker } from "@/features/agendamentos/components/agenda-option-picker";
import type {
  AgendaOption,
  AgendaRelatedField,
  AgendaRelatedValues,
} from "@/features/agendamentos/types/agendamentos-options.types";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import { agendamentosOptionsApi } from "@/features/agendamentos/services/agendamentos-options-api";
import { useDebouncedValue } from "@/features/clientes/hooks/use-debounced-value";

type InitialOptions = Partial<
  Record<
    AgendaRelatedField,
    AgendaOption
  >
>;

type AgendamentoEditRelatedSelectorsProps = {
  values: AgendaRelatedValues;
  initialOptions: InitialOptions;
  disabled?: boolean;
  onChange: (
    field: AgendaRelatedField,
    value: string,
  ) => void;
};

function mergeInitialOption(
  options: readonly AgendaOption[],
  initialOption:
    | AgendaOption
    | undefined,
): AgendaOption[] {
  if (!initialOption) {
    return [
      ...options,
    ];
  }

  return [
    initialOption,
    ...options.filter(
      (option) =>
        option.value !==
        initialOption.value,
    ),
  ];
}

export function AgendamentoEditRelatedSelectors({
  values,
  initialOptions,
  disabled = false,
  onChange,
}: AgendamentoEditRelatedSelectorsProps) {
  const [
    clienteSearch,
    setClienteSearch,
  ] = useState("");

  const [
    servicoSearch,
    setServicoSearch,
  ] = useState("");

  const [
    profissionalSearch,
    setProfissionalSearch,
  ] = useState("");

  const [
    unidadeSearch,
    setUnidadeSearch,
  ] = useState("");

  const debouncedCliente =
    useDebouncedValue(
      clienteSearch,
      350,
    );

  const debouncedProfissional =
    useDebouncedValue(
      profissionalSearch,
      350,
    );

  const debouncedUnidade =
    useDebouncedValue(
      unidadeSearch,
      350,
    );

  const clienteQuery = useQuery({
    queryKey: [
      ...agendamentosKeys.all,
      "edit-options",
      "clientes",
      debouncedCliente,
    ],

    queryFn: () =>
      agendamentosOptionsApi.clientes(
        debouncedCliente,
      ),

    staleTime: 60_000,
    retry: false,
    enabled: !disabled,
  });

  const servicoQuery = useQuery({
    queryKey: [
      ...agendamentosKeys.all,
      "edit-options",
      "servicos",
    ],

    queryFn: () =>
      agendamentosOptionsApi.servicos(),

    staleTime: 60_000,
    retry: false,
    enabled: !disabled,
  });

  const profissionalQuery = useQuery({
    queryKey: [
      ...agendamentosKeys.all,
      "edit-options",
      "profissionais",
      debouncedProfissional,
    ],

    queryFn: () =>
      agendamentosOptionsApi.profissionais(
        debouncedProfissional,
      ),

    staleTime: 60_000,
    retry: false,
    enabled: !disabled,
  });

  const unidadeQuery = useQuery({
    queryKey: [
      ...agendamentosKeys.all,
      "edit-options",
      "unidades",
      debouncedUnidade,
    ],

    queryFn: () =>
      agendamentosOptionsApi.unidades(
        debouncedUnidade,
      ),

    staleTime: 60_000,
    retry: false,
    enabled: !disabled,
  });

  const servicos = useMemo(() => {
    const normalized =
      servicoSearch
        .trim()
        .toLocaleLowerCase(
          "pt-BR",
        );

    const all =
      servicoQuery.data ?? [];

    if (!normalized) {
      return all;
    }

    return all.filter(
      (option) =>
        option.label
          .toLocaleLowerCase(
            "pt-BR",
          )
          .includes(normalized),
    );
  }, [
    servicoQuery.data,
    servicoSearch,
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <AgendaOptionPicker
        id="edit-agendamento-cliente"
        label="Cliente"
        value={values.clienteId}
        options={mergeInitialOption(
          clienteQuery.data ?? [],
          initialOptions.clienteId,
        )}
        searchValue={
          clienteSearch
        }
        onSearchChange={
          setClienteSearch
        }
        onChange={(value) =>
          onChange(
            "clienteId",
            value,
          )
        }
        placeholder="Selecionar cliente"
        searchPlaceholder="Buscar cliente"
        isLoading={
          clienteQuery.isPending
        }
        isFetching={
          clienteQuery.isFetching
        }
        errorMessage={
          clienteQuery.isError
            ? "Nao foi possivel carregar clientes."
            : undefined
        }
        onRetry={() => {
          void clienteQuery.refetch();
        }}
        disabled={disabled}
      />

      <AgendaOptionPicker
        id="edit-agendamento-servico"
        label="Servico"
        value={values.servicoId}
        options={mergeInitialOption(
          servicos,
          initialOptions.servicoId,
        )}
        searchValue={
          servicoSearch
        }
        onSearchChange={
          setServicoSearch
        }
        onChange={(value) =>
          onChange(
            "servicoId",
            value,
          )
        }
        placeholder="Selecionar servico"
        searchPlaceholder="Buscar servico"
        isLoading={
          servicoQuery.isPending
        }
        isFetching={
          servicoQuery.isFetching
        }
        errorMessage={
          servicoQuery.isError
            ? "Nao foi possivel carregar servicos."
            : undefined
        }
        onRetry={() => {
          void servicoQuery.refetch();
        }}
        disabled={disabled}
      />

      <AgendaOptionPicker
        id="edit-agendamento-profissional"
        label="Profissional"
        value={
          values.profissionalId
        }
        options={mergeInitialOption(
          profissionalQuery.data ??
            [],
          initialOptions.profissionalId,
        )}
        searchValue={
          profissionalSearch
        }
        onSearchChange={
          setProfissionalSearch
        }
        onChange={(value) =>
          onChange(
            "profissionalId",
            value,
          )
        }
        placeholder="Selecionar profissional"
        searchPlaceholder="Buscar profissional"
        isLoading={
          profissionalQuery.isPending
        }
        isFetching={
          profissionalQuery.isFetching
        }
        errorMessage={
          profissionalQuery.isError
            ? "Nao foi possivel carregar profissionais."
            : undefined
        }
        onRetry={() => {
          void profissionalQuery.refetch();
        }}
        disabled={disabled}
      />

      <AgendaOptionPicker
        id="edit-agendamento-unidade"
        label="Unidade"
        value={values.unidadeId}
        options={mergeInitialOption(
          unidadeQuery.data ?? [],
          initialOptions.unidadeId,
        )}
        searchValue={
          unidadeSearch
        }
        onSearchChange={
          setUnidadeSearch
        }
        onChange={(value) =>
          onChange(
            "unidadeId",
            value,
          )
        }
        placeholder="Selecionar unidade"
        searchPlaceholder="Buscar unidade"
        isLoading={
          unidadeQuery.isPending
        }
        isFetching={
          unidadeQuery.isFetching
        }
        errorMessage={
          unidadeQuery.isError
            ? "Nao foi possivel carregar unidades."
            : undefined
        }
        onRetry={() => {
          void unidadeQuery.refetch();
        }}
        disabled={disabled}
      />
    </div>
  );
}
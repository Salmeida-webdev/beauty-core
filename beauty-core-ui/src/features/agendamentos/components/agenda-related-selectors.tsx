"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { AgendaOptionPicker } from "@/features/agendamentos/components/agenda-option-picker";
import { agendamentosOptionsQueryOptions } from "@/features/agendamentos/queries/agendamentos-options-query-options";
import type {
  AgendaRelatedField,
  AgendaRelatedValues,
} from "@/features/agendamentos/types/agendamentos-options.types";
import { useDebouncedValue } from "@/features/clientes/hooks/use-debounced-value";

type AgendaRelatedSelectorsProps = {
  values: AgendaRelatedValues;
  onChange: (
    field: AgendaRelatedField,
    value: string,
  ) => void;
  disabled?: boolean;
};

export function AgendaRelatedSelectors({
  values,
  onChange,
  disabled = false,
}: AgendaRelatedSelectorsProps) {
  const [clienteSearch, setClienteSearch] =
    useState("");

  const [servicoSearch, setServicoSearch] =
    useState("");

  const [
    profissionalSearch,
    setProfissionalSearch,
  ] = useState("");

  const [unidadeSearch, setUnidadeSearch] =
    useState("");

  const debouncedClienteSearch =
    useDebouncedValue(clienteSearch, 350);

  const debouncedProfissionalSearch =
    useDebouncedValue(
      profissionalSearch,
      350,
    );

  const debouncedUnidadeSearch =
    useDebouncedValue(
      unidadeSearch,
      350,
    );

  const clienteQuery = useQuery(
    agendamentosOptionsQueryOptions.clientes(
      debouncedClienteSearch,
    ),
  );

  const servicoQuery = useQuery(
    agendamentosOptionsQueryOptions.servicos(),
  );

  const profissionalQuery = useQuery(
    agendamentosOptionsQueryOptions.profissionais(
      debouncedProfissionalSearch,
    ),
  );

  const unidadeQuery = useQuery(
    agendamentosOptionsQueryOptions.unidades(
      debouncedUnidadeSearch,
    ),
  );

  const filteredServicos = useMemo(() => {
    const normalized = servicoSearch
      .trim()
      .toLocaleLowerCase("pt-BR");

    const options = servicoQuery.data ?? [];

    if (!normalized) {
      return options;
    }

    return options.filter((option) =>
      option.label
        .toLocaleLowerCase("pt-BR")
        .includes(normalized),
    );
  }, [
    servicoQuery.data,
    servicoSearch,
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <AgendaOptionPicker
        id="agenda-cliente"
        label="Cliente"
        value={values.clienteId}
        options={clienteQuery.data ?? []}
        searchValue={clienteSearch}
        onSearchChange={setClienteSearch}
        onChange={(value) => {
          onChange("clienteId", value);
        }}
        placeholder="Selecionar cliente"
        searchPlaceholder="Buscar cliente"
        isLoading={clienteQuery.isPending}
        isFetching={clienteQuery.isFetching}
        errorMessage={
          clienteQuery.isError
            ? "Nao foi possivel carregar os clientes."
            : undefined
        }
        onRetry={() => {
          void clienteQuery.refetch();
        }}
        disabled={disabled}
      />

      <AgendaOptionPicker
        id="agenda-servico"
        label={"Servi\u00e7o"}
        value={values.servicoId}
        options={filteredServicos}
        searchValue={servicoSearch}
        onSearchChange={setServicoSearch}
        onChange={(value) => {
          onChange("servicoId", value);
        }}
        placeholder={"Selecionar servi\u00e7o"}
        searchPlaceholder={"Buscar servi\u00e7o"}
        isLoading={servicoQuery.isPending}
        isFetching={servicoQuery.isFetching}
        errorMessage={
          servicoQuery.isError
            ? "Nao foi possivel carregar os servicos."
            : undefined
        }
        onRetry={() => {
          void servicoQuery.refetch();
        }}
        disabled={disabled}
      />

      <AgendaOptionPicker
        id="agenda-profissional"
        label="Profissional"
        value={values.profissionalId}
        options={
          profissionalQuery.data ?? []
        }
        searchValue={profissionalSearch}
        onSearchChange={
          setProfissionalSearch
        }
        onChange={(value) => {
          onChange(
            "profissionalId",
            value,
          );
        }}
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
            ? "Nao foi possivel carregar os profissionais."
            : undefined
        }
        onRetry={() => {
          void profissionalQuery.refetch();
        }}
        disabled={disabled}
      />

      <AgendaOptionPicker
        id="agenda-unidade"
        label="Unidade"
        value={values.unidadeId}
        options={unidadeQuery.data ?? []}
        searchValue={unidadeSearch}
        onSearchChange={setUnidadeSearch}
        onChange={(value) => {
          onChange("unidadeId", value);
        }}
        placeholder="Selecionar unidade"
        searchPlaceholder="Buscar unidade"
        isLoading={unidadeQuery.isPending}
        isFetching={unidadeQuery.isFetching}
        errorMessage={
          unidadeQuery.isError
            ? "Nao foi possivel carregar as unidades."
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
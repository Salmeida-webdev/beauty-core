"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import {
  configuracaoNotificacaoFormSchema,
  type ConfiguracaoNotificacaoFormValues,
} from "../schemas/notificacoes.schemas";
import type {
  ConfiguracaoNotificacao,
} from "../types/notificacoes.types";

interface NotificacoesSettingsFormProps {
  configuracao: ConfiguracaoNotificacao;
  isSubmitting: boolean;
  onSubmit: (
    values: ConfiguracaoNotificacaoFormValues,
  ) => Promise<void> | void;
}

const options = [
  {
    name: "notificarAgendamentos",
    title: "Agendamentos",
    description:
      "Permite notificações relacionadas a agendamentos.",
  },
  {
    name: "notificarFinanceiro",
    title: "Financeiro",
    description:
      "Permite notificações relacionadas ao financeiro.",
  },
  {
    name: "notificarFidelidade",
    title: "Fidelidade",
    description:
      "Permite notificações do programa de fidelidade.",
  },
  {
    name: "notificarPacotes",
    title: "Pacotes",
    description:
      "Permite notificações relacionadas a pacotes de clientes.",
  },
  {
    name: "notificarClientes",
    title: "Clientes",
    description:
      "Permite notificações relacionadas aos clientes.",
  },
  {
    name: "notificarMarketing",
    title: "Marketing",
    description:
      "Permite notificações de marketing, campanhas e relacionamento.",
  },
] as const;

function getDefaultValues(
  configuracao: ConfiguracaoNotificacao,
): ConfiguracaoNotificacaoFormValues {
  return {
    notificarAgendamentos:
      configuracao.notificarAgendamentos,
    notificarFinanceiro:
      configuracao.notificarFinanceiro,
    notificarFidelidade:
      configuracao.notificarFidelidade,
    notificarPacotes:
      configuracao.notificarPacotes,
    notificarClientes:
      configuracao.notificarClientes,
    notificarMarketing:
      configuracao.notificarMarketing,
  };
}

export function NotificacoesSettingsForm({
  configuracao,
  isSubmitting,
  onSubmit,
}: NotificacoesSettingsFormProps) {
  const form =
    useForm<ConfiguracaoNotificacaoFormValues>({
      resolver: zodResolver(
        configuracaoNotificacaoFormSchema,
      ),
      defaultValues:
        getDefaultValues(configuracao),
    });

  useEffect(() => {
    form.reset(
      getDefaultValues(configuracao),
    );
  }, [configuracao, form]);

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-3">
        {options.map((option) => (
          <label
            key={option.name}
            className="flex cursor-pointer items-start gap-3 rounded-lg border p-4"
          >
            <input
              type="checkbox"
              disabled={isSubmitting}
              className="mt-1 size-4 shrink-0"
              {...form.register(option.name)}
            />

            <span className="min-w-0">
              <span className="block font-medium">
                {option.title}
              </span>

              <span className="mt-1 block text-sm text-muted-foreground">
                {option.description}
              </span>
            </span>
          </label>
        ))}
      </div>

      <div className="rounded-md border p-3 text-sm text-muted-foreground">
        Essas preferências controlam categorias
        globais de notificação da empresa.
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            !form.formState.isDirty
          }
          aria-busy={isSubmitting}
        >
          {isSubmitting
            ? "Salvando..."
            : "Salvar configurações"}
        </Button>
      </div>
    </form>
  );
}
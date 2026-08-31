"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  campanhaWhatsappFormSchema,
  type CampanhaWhatsappFormValues,
} from "../schemas/whatsapp.schemas";
import {
  tipoMensagemWhatsappValues,
  type CampanhaWhatsappResumo,
} from "../types/whatsapp.types";
import {
  formatWhatsappEnumLabel,
} from "../utils/whatsapp-formatters";

interface CampanhaWhatsappFormProps {
  campanha?: CampanhaWhatsappResumo | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (
    values: CampanhaWhatsappFormValues,
  ) => Promise<void> | void;
}

function getDefaultValues(
  campanha?: CampanhaWhatsappResumo | null,
): CampanhaWhatsappFormValues {
  return {
    nome: campanha?.nome ?? "",
    descricao:
      campanha?.descricao ?? "",
    tipo:
      campanha?.tipo ??
      tipoMensagemWhatsappValues[0],
    mensagem:
      campanha?.mensagem ?? "",
    totalDestinatarios:
      campanha?.totalDestinatarios ?? 0,
  };
}

export function CampanhaWhatsappForm({
  campanha,
  isSubmitting,
  onCancel,
  onSubmit,
}: CampanhaWhatsappFormProps) {
  const form =
    useForm<CampanhaWhatsappFormValues>({
      resolver: zodResolver(
        campanhaWhatsappFormSchema,
      ),
      defaultValues:
        getDefaultValues(campanha),
    });

  useEffect(() => {
    form.reset(
      getDefaultValues(campanha),
    );
  }, [campanha, form]);

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <Label htmlFor="campanha-whatsapp-nome">
          Nome
        </Label>

        <Input
          id="campanha-whatsapp-nome"
          autoComplete="off"
          disabled={isSubmitting}
          {...form.register("nome")}
        />

        {form.formState.errors.nome && (
          <p
            className="text-sm text-destructive"
            role="alert"
          >
            {form.formState.errors.nome.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="campanha-whatsapp-descricao">
          Descrição
        </Label>

        <Textarea
          id="campanha-whatsapp-descricao"
          rows={3}
          disabled={isSubmitting}
          {...form.register("descricao")}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="campanha-whatsapp-tipo">
            Tipo
          </Label>

          <select
            id="campanha-whatsapp-tipo"
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...form.register("tipo")}
          >
            {tipoMensagemWhatsappValues.map(
              (tipo) => (
                <option
                  key={tipo}
                  value={tipo}
                >
                  {formatWhatsappEnumLabel(
                    tipo,
                  )}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="campanha-whatsapp-total">
            Total previsto de destinatários
          </Label>

          <Input
            id="campanha-whatsapp-total"
            type="number"
            min={0}
            step={1}
            disabled={isSubmitting}
            {...form.register(
              "totalDestinatarios",
              {
                valueAsNumber: true,
              },
            )}
          />

          {form.formState.errors
            .totalDestinatarios && (
            <p
              className="text-sm text-destructive"
              role="alert"
            >
              {
                form.formState.errors
                  .totalDestinatarios.message
              }
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="campanha-whatsapp-mensagem">
          Mensagem
        </Label>

        <Textarea
          id="campanha-whatsapp-mensagem"
          rows={7}
          disabled={isSubmitting}
          {...form.register("mensagem")}
        />

        {form.formState.errors
          .mensagem && (
          <p
            className="text-sm text-destructive"
            role="alert"
          >
            {
              form.formState.errors
                .mensagem.message
            }
          </p>
        )}
      </div>

      {!campanha && (
        <div className="rounded-md border p-3 text-sm text-muted-foreground">
          Ao criar, o backend registra a campanha
          e aceita um processamento assíncrono.
          Isso não confirma envio a destinatários.
        </div>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting
            ? "Salvando..."
            : campanha
              ? "Salvar alterações"
              : "Criar campanha"}
        </Button>
      </div>
    </form>
  );
}
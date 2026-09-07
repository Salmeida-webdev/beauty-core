"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  templateWhatsappFormSchema,
  type TemplateWhatsappFormValues,
} from "../schemas/whatsapp.schemas";
import {
  tipoMensagemWhatsappValues,
  type TemplateWhatsapp,
} from "../types/whatsapp.types";
import {
  formatWhatsappEnumLabel,
} from "../utils/whatsapp-formatters";

interface TemplateWhatsappFormProps {
  template?: TemplateWhatsapp | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (
    values: TemplateWhatsappFormValues,
  ) => Promise<void> | void;
}

function getDefaultValues(
  template?: TemplateWhatsapp | null,
): TemplateWhatsappFormValues {
  return {
    nome: template?.nome ?? "",
    tipo:
      template?.tipo ??
      tipoMensagemWhatsappValues[0],
    titulo: template?.titulo ?? "",
    mensagem: template?.mensagem ?? "",
  };
}

export function TemplateWhatsappForm({
  template,
  isSubmitting,
  onCancel,
  onSubmit,
}: TemplateWhatsappFormProps) {
  const form =
    useForm<TemplateWhatsappFormValues>({
      resolver: zodResolver(
        templateWhatsappFormSchema,
      ),
      defaultValues:
        getDefaultValues(template),
    });

  useEffect(() => {
    form.reset(
      getDefaultValues(template),
    );
  }, [form, template]);

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <Label htmlFor="template-whatsapp-nome">
          Nome interno
        </Label>

        <Input
          id="template-whatsapp-nome"
          maxLength={120}
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
        <Label htmlFor="template-whatsapp-tipo">
          Tipo
        </Label>

        <select
          id="template-whatsapp-tipo"
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
        <Label htmlFor="template-whatsapp-titulo">
          Título
        </Label>

        <Input
          id="template-whatsapp-titulo"
          maxLength={150}
          autoComplete="off"
          disabled={isSubmitting}
          {...form.register("titulo")}
        />

        {form.formState.errors.titulo && (
          <p
            className="text-sm text-destructive"
            role="alert"
          >
            {form.formState.errors.titulo.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="template-whatsapp-mensagem">
          Mensagem
        </Label>

        <Textarea
          id="template-whatsapp-mensagem"
          rows={8}
          maxLength={1000}
          disabled={isSubmitting}
          {...form.register("mensagem")}
        />

        {form.formState.errors.mensagem && (
          <p
            className="text-sm text-destructive"
            role="alert"
          >
            {form.formState.errors.mensagem.message}
          </p>
        )}
      </div>

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
            : template
              ? "Salvar alterações"
              : "Criar template"}
        </Button>
      </div>
    </form>
  );
}
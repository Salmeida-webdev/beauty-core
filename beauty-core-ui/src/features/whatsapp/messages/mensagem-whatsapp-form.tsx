"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  whatsappMensagemSendFormSchema,
  type WhatsappMensagemSendFormValues,
} from "../schemas/whatsapp.schemas";
import {
  tipoMensagemWhatsappValues,
} from "../types/whatsapp.types";
import {
  formatWhatsappEnumLabel,
} from "../utils/whatsapp-formatters";

interface MensagemWhatsappFormProps {
  isSubmitting: boolean;
  onSubmit: (
    values: WhatsappMensagemSendFormValues,
  ) => Promise<void> | void;
}

export function MensagemWhatsappForm({
  isSubmitting,
  onSubmit,
}: MensagemWhatsappFormProps) {
  const form =
    useForm<WhatsappMensagemSendFormValues>({
      resolver: zodResolver(
        whatsappMensagemSendFormSchema,
      ),
      defaultValues: {
        tipo:
          tipoMensagemWhatsappValues[0],
        destinatario: "",
        mensagem: "",
      },
    });

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="whatsapp-mensagem-tipo">
            Tipo
          </Label>

          <select
            id="whatsapp-mensagem-tipo"
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
          <Label htmlFor="whatsapp-mensagem-destinatario">
            Destinatário
          </Label>

          <Input
            id="whatsapp-mensagem-destinatario"
            inputMode="tel"
            autoComplete="tel"
            placeholder="83999999999"
            maxLength={15}
            disabled={isSubmitting}
            {...form.register(
              "destinatario",
            )}
          />

          {form.formState.errors
            .destinatario && (
            <p
              className="text-sm text-destructive"
              role="alert"
            >
              {
                form.formState.errors
                  .destinatario.message
              }
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp-mensagem-conteudo">
          Mensagem
        </Label>

        <Textarea
          id="whatsapp-mensagem-conteudo"
          rows={6}
          maxLength={1000}
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

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting
            ? "Enviando..."
            : "Enviar mensagem"}
        </Button>
      </div>
    </form>
  );
}
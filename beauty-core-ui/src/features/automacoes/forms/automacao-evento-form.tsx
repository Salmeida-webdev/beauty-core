"use client";

import {
  useState,
} from "react";
import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  useForm,
} from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Button,
} from "@/components/ui/button";

import {
  automacaoEventoFormSchema,
} from "../schemas/automacoes.schemas";
import {
  tipoEventoSistemaValues,
  type AutomacaoEventoFormValues,
} from "../types/automacoes.types";
import {
  formatAutomacaoEnumLabel,
} from "../utils/automacoes-formatters";

interface AutomacaoEventoFormProps {
  isSubmitting: boolean;
  onSubmit: (
    values: AutomacaoEventoFormValues,
  ) => Promise<void> | void;
}

export function AutomacaoEventoForm({
  isSubmitting,
  onSubmit,
}: AutomacaoEventoFormProps) {
  const [pendingValues, setPendingValues] =
    useState<AutomacaoEventoFormValues | null>(
      null,
    );

  const form =
    useForm<AutomacaoEventoFormValues>({
      resolver: zodResolver(
        automacaoEventoFormSchema,
      ),
      defaultValues: {
        tipo:
          tipoEventoSistemaValues[0],
        modulo: "",
      },
    });

  return (
    <>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(
          (values) => {
            setPendingValues(values);
          },
        )}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium">
              Tipo do evento
            </span>

            <select
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
              disabled={isSubmitting}
              {...form.register("tipo")}
            >
              {tipoEventoSistemaValues.map(
                (tipo) => (
                  <option
                    key={tipo}
                    value={tipo}
                  >
                    {formatAutomacaoEnumLabel(
                      tipo,
                    )}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium">
              Módulo de origem
            </span>

            <input
              type="text"
              maxLength={80}
              placeholder="Ex.: clientes"
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
              disabled={isSubmitting}
              {...form.register("modulo")}
            />

            {form.formState.errors.modulo && (
              <span
                className="block text-sm text-destructive"
                role="alert"
              >
                Informe um módulo com até
                80 caracteres.
              </span>
            )}
          </label>
        </div>

        <div className="rounded-md border p-3 text-sm text-muted-foreground">
          Esta é uma operação administrativa.
          O backend decidirá se uma notificação
          deve ser gerada conforme as
          configurações da empresa.
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Processando..."
            : "Processar evento"}
        </Button>
      </form>

      <AlertDialog
        open={pendingValues !== null}
        onOpenChange={(open) => {
          if (!open && !isSubmitting) {
            setPendingValues(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirmar processamento?
            </AlertDialogTitle>

            <AlertDialogDescription>
              O evento será processado pelo
              backend e poderá enfileirar uma
              notificação real, conforme as
              configurações da empresa.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isSubmitting}
            >
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={
                isSubmitting ||
                pendingValues === null
              }
              onClick={(event) => {
                event.preventDefault();

                if (!pendingValues) {
                  return;
                }

                void Promise.resolve(
                  onSubmit(pendingValues),
                ).then(() => {
                  setPendingValues(null);
                });
              }}
            >
              {isSubmitting
                ? "Processando..."
                : "Confirmar processamento"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
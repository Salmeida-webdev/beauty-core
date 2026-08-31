"use client";

import type {
  WhatsappMensagemResumo,
} from "../types/whatsapp.types";
import {
  formatWhatsappDateTime,
  formatWhatsappEnumLabel,
} from "../utils/whatsapp-formatters";

interface MensagensWhatsappListProps {
  mensagens: readonly WhatsappMensagemResumo[];
}

function maskRecipient(
  value: string,
): string {
  const suffix = value.slice(-4);

  return `••••••${suffix}`;
}

export function MensagensWhatsappList({
  mensagens,
}: MensagensWhatsappListProps) {
  if (mensagens.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">
          Nenhuma mensagem encontrada
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          O histórico de comunicações
          aparecerá aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[920px] text-sm">
        <thead className="bg-muted/40 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">
              Destinatário
            </th>
            <th className="px-4 py-3 font-medium">
              Cliente
            </th>
            <th className="px-4 py-3 font-medium">
              Tipo
            </th>
            <th className="px-4 py-3 font-medium">
              Status
            </th>
            <th className="px-4 py-3 font-medium">
              Mensagem
            </th>
            <th className="px-4 py-3 font-medium">
              Criada em
            </th>
          </tr>
        </thead>

        <tbody>
          {mensagens.map(
            (mensagem) => (
              <tr
                key={mensagem.id}
                className="border-t"
              >
                <td className="px-4 py-3 align-top font-medium">
                  {maskRecipient(
                    mensagem.destinatario,
                  )}
                </td>

                <td className="px-4 py-3 align-top">
                  {mensagem.cliente?.nome ??
                    "—"}
                </td>

                <td className="px-4 py-3 align-top">
                  {formatWhatsappEnumLabel(
                    mensagem.tipo,
                  )}
                </td>

                <td className="px-4 py-3 align-top">
                  <span className="inline-flex rounded-full border px-2 py-1 text-xs font-medium">
                    {formatWhatsappEnumLabel(
                      mensagem.status,
                    )}
                  </span>
                </td>

                <td className="max-w-md whitespace-pre-wrap break-words px-4 py-3 align-top text-muted-foreground">
                  {mensagem.mensagem}
                </td>

                <td className="px-4 py-3 align-top">
                  {formatWhatsappDateTime(
                    mensagem.createdAt,
                  )}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";

import type {
  TemplateWhatsapp,
} from "../types/whatsapp.types";
import {
  formatWhatsappDateTime,
  formatWhatsappEnumLabel,
} from "../utils/whatsapp-formatters";

interface TemplatesWhatsappListProps {
  templates: readonly TemplateWhatsapp[];
  canManage: boolean;
  onEdit: (
    template: TemplateWhatsapp,
  ) => void;
  onInactivate: (
    template: TemplateWhatsapp,
  ) => void;
}

export function TemplatesWhatsappList({
  templates,
  canManage,
  onEdit,
  onInactivate,
}: TemplatesWhatsappListProps) {
  if (templates.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">
          Nenhum template ativo
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Os templates ativos cadastrados
          aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[880px] text-sm">
        <thead className="bg-muted/40 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">
              Nome
            </th>
            <th className="px-4 py-3 font-medium">
              Título
            </th>
            <th className="px-4 py-3 font-medium">
              Tipo
            </th>
            <th className="px-4 py-3 font-medium">
              Mensagem
            </th>
            <th className="px-4 py-3 font-medium">
              Atualização
            </th>

            {canManage && (
              <th className="px-4 py-3 text-right font-medium">
                Ações
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {templates.map((template) => (
            <tr
              key={template.id}
              className="border-t"
            >
              <td className="px-4 py-3 align-top font-medium">
                {template.nome}
              </td>

              <td className="px-4 py-3 align-top">
                {template.titulo}
              </td>

              <td className="px-4 py-3 align-top">
                {formatWhatsappEnumLabel(
                  template.tipo,
                )}
              </td>

              <td className="max-w-md whitespace-pre-wrap break-words px-4 py-3 align-top text-muted-foreground">
                {template.mensagem}
              </td>

              <td className="px-4 py-3 align-top">
                {formatWhatsappDateTime(
                  template.updatedAt,
                )}
              </td>

              {canManage && (
                <td className="px-4 py-3 align-top">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onEdit(template)
                      }
                    >
                      Editar
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onInactivate(
                          template,
                        )
                      }
                    >
                      Inativar
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
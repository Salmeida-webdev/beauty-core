"use client";

import { Button } from "@/components/ui/button";

import type {
  CampanhaWhatsappResumo,
} from "../types/whatsapp.types";
import {
  formatWhatsappDateTime,
  formatWhatsappEnumLabel,
} from "../utils/whatsapp-formatters";

interface CampanhasWhatsappListProps {
  campanhas: readonly CampanhaWhatsappResumo[];
  canManage: boolean;
  onEdit: (
    campanha: CampanhaWhatsappResumo,
  ) => void;
  onCancel: (
    campanha: CampanhaWhatsappResumo,
  ) => void;
}

export function CampanhasWhatsappList({
  campanhas,
  canManage,
  onEdit,
  onCancel,
}: CampanhasWhatsappListProps) {
  if (campanhas.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">
          Nenhuma campanha cadastrada
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          As campanhas da empresa autenticada
          aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[1040px] text-sm">
        <thead className="bg-muted/40 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">
              Campanha
            </th>
            <th className="px-4 py-3 font-medium">
              Tipo
            </th>
            <th className="px-4 py-3 font-medium">
              Status
            </th>
            <th className="px-4 py-3 font-medium">
              Destinatários
            </th>
            <th className="px-4 py-3 font-medium">
              Enviadas
            </th>
            <th className="px-4 py-3 font-medium">
              Falhas
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
          {campanhas.map(
            (campanha) => (
              <tr
                key={campanha.id}
                className="border-t"
              >
                <td className="max-w-sm px-4 py-3 align-top">
                  <p className="font-medium">
                    {campanha.nome}
                  </p>

                  {campanha.descricao && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {campanha.descricao}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3 align-top">
                  {formatWhatsappEnumLabel(
                    campanha.tipo,
                  )}
                </td>

                <td className="px-4 py-3 align-top">
                  <span className="inline-flex rounded-full border px-2 py-1 text-xs font-medium">
                    {formatWhatsappEnumLabel(
                      campanha.status,
                    )}
                  </span>
                </td>

                <td className="px-4 py-3 align-top">
                  {campanha.totalDestinatarios}
                </td>

                <td className="px-4 py-3 align-top">
                  {campanha.totalEnviadas}
                </td>

                <td className="px-4 py-3 align-top">
                  {campanha.totalFalhas}
                </td>

                <td className="px-4 py-3 align-top">
                  {formatWhatsappDateTime(
                    campanha.updatedAt,
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
                          onEdit(campanha)
                        }
                      >
                        Editar
                      </Button>

                      {campanha.status !==
                        "CANCELADA" && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            onCancel(campanha)
                          }
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
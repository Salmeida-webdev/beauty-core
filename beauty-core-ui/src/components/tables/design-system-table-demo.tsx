import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import {
  DataTableFrame,
  ResponsiveTableRegion,
  TableFooter,
  TableToolbar,
} from "@/components/tables/table-foundation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DEMO_ROWS = [
  {
    id: "BC-001",
    name: "Mariana Costa",
    service: "Limpeza de pele",
    status: "Confirmado",
    tone: "success" as const,
    time: "09:00",
  },
  {
    id: "BC-002",
    name: "Carla Mendes",
    service: "Design de sobrancelhas",
    status: "Pendente",
    tone: "warning" as const,
    time: "10:30",
  },
  {
    id: "BC-003",
    name: "Juliana Alves",
    service: "Massagem relaxante",
    status: "Em atendimento",
    tone: "info" as const,
    time: "14:00",
  },
  {
    id: "BC-004",
    name: "Fernanda Lima",
    service: "Procedimento demonstrativo",
    status: "Cancelado",
    tone: "neutral" as const,
    time: "16:30",
  },
];

export function DesignSystemTableDemo() {
  return (
    <DataTableFrame>
      <TableToolbar>
        <div className="relative w-full sm:max-w-xs">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
          />

          <Input
            type="search"
            aria-label="Buscar na tabela demonstrativa"
            placeholder="Buscar cliente..."
            className="pl-9"
          />
        </div>

        <Button
          type="button"
          size="sm"
        >
          Novo registro
        </Button>
      </TableToolbar>

      <ResponsiveTableRegion label="Agendamentos demonstrativos">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">
                Código
              </TableHead>
              <TableHead>
                Cliente
              </TableHead>
              <TableHead>
                Serviço
              </TableHead>
              <TableHead>
                Horário
              </TableHead>
              <TableHead>
                Status
              </TableHead>
              <TableHead className="text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {DEMO_ROWS.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-mono text-caption text-text-muted">
                  {row.id}
                </TableCell>

                <TableCell className="font-medium text-text-primary">
                  {row.name}
                </TableCell>

                <TableCell className="text-text-secondary">
                  {row.service}
                </TableCell>

                <TableCell className="text-text-secondary">
                  {row.time}
                </TableCell>

                <TableCell>
                  <StatusBadge tone={row.tone}>
                    {row.status}
                  </StatusBadge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                  >
                    Visualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ResponsiveTableRegion>

      <TableFooter>
        <span>
          4 registros demonstrativos
        </span>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled
            aria-label="Página anterior"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>

          <span>
            Página 1 de 1
          </span>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled
            aria-label="Próxima página"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </TableFooter>
    </DataTableFrame>
  );
}
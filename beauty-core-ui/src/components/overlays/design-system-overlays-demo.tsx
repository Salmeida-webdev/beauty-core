"use client";

import {
  Ellipsis,
  PanelRightOpen,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function DesignSystemOverlaysDemo() {
  return (
    <div className="grid grid-cols-1 gap-grid md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
        <p className="text-label font-semibold text-text-primary">
          Dialog
        </p>

        <p className="mt-1 text-body-small text-text-muted">
          Modal para edição ou criação de conteúdo.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full"
            >
              Abrir dialog
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Editar registro
              </DialogTitle>

              <DialogDescription>
                Exemplo técnico de modal administrativo.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-medium bg-surface-subtle p-4 text-body-small text-text-secondary">
              O conteúdo real será fornecido pelos módulos de negócio.
            </div>

            <DialogFooter>
              <Button type="button">
                Salvar exemplo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
        <p className="text-label font-semibold text-text-primary">
          Confirmação
        </p>

        <p className="mt-1 text-body-small text-text-muted">
          Ações destrutivas exigem confirmação explícita.
        </p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              className="mt-4 w-full"
            >
              Excluir exemplo
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Confirmar exclusão?
              </AlertDialogTitle>

              <AlertDialogDescription>
                Esta é apenas uma demonstração visual. Nenhum dado será excluído.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancelar
              </AlertDialogCancel>

              <AlertDialogAction>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
        <p className="text-label font-semibold text-text-primary">
          Dropdown
        </p>

        <p className="mt-1 text-body-small text-text-muted">
          Menu contextual para ações secundárias.
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full"
            >
              <Ellipsis aria-hidden="true" />
              Abrir ações
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Ações
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Pencil aria-hidden="true" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive">
              <Trash2 aria-hidden="true" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
        <p className="text-label font-semibold text-text-primary">
          Drawer lateral
        </p>

        <p className="mt-1 text-body-small text-text-muted">
          Painel lateral para detalhes e ações contextuais.
        </p>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full"
            >
              <PanelRightOpen aria-hidden="true" />
              Abrir drawer
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="sm:max-w-md"
          >
            <SheetHeader>
              <SheetTitle>
                Detalhes do registro
              </SheetTitle>

              <SheetDescription>
                Drawer demonstrativo do Design System.
              </SheetDescription>
            </SheetHeader>

            <div className="px-4">
              <div className="rounded-medium border border-border-subtle bg-surface-subtle p-4 text-body-small text-text-secondary">
                Área preparada para dados contextuais sem navegação para outra página.
              </div>
            </div>

            <SheetFooter>
              <Button type="button">
                Ação principal
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
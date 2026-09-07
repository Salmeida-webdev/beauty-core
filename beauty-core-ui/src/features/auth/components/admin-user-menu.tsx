"use client";

import {
  useState,
} from "react";
import {
  ChevronDown,
  CircleUserRound,
  LoaderCircle,
  LogOut,
  MonitorSmartphone,
  ShieldOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useAdminPrivateStateCleanup,
} from "@/features/auth/hooks/use-admin-private-state-cleanup";
import {
  markPendingAdminIntentionalLogout,
} from "@/features/auth/navigation/admin-login-navigation-state";
import {
  getAdminRoleLabel,
} from "@/features/auth/presentation/admin-role-label";
import {
  terminateAllAdminSessions,
  terminateCurrentAdminSession,
} from "@/features/auth/services/auth-session";
import { useAuthStore } from "@/stores/auth-store";

type LogoutAction =
  | "current"
  | "all"
  | null;

export function AdminUserMenu() {
  const router = useRouter();

  const clearPrivateState =
    useAdminPrivateStateCleanup();

  const status = useAuthStore(
    (state) => state.status,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const [open, setOpen] =
    useState(false);

  const [
    logoutAction,
    setLogoutAction,
  ] = useState<LogoutAction>(null);

  const [
    confirmGlobalLogout,
    setConfirmGlobalLogout,
  ] = useState(false);

  const authenticated =
    status === "authenticated" &&
    user !== null;

  if (!authenticated) {
    const secondaryText = (() => {
      if (status === "restoring") {
        return "Restaurando sessão";
      }

      if (status === "idle") {
        return "Inicializando sessão";
      }

      return "Sessão não autenticada";
    })();

    return (
      <div
        aria-label="Contexto da sessão administrativa"
        className="flex min-w-0 items-center gap-2 border-l border-border-subtle pl-3"
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle">
          <CircleUserRound
            aria-hidden="true"
            className="size-4 text-text-secondary"
          />
        </div>

        <div className="hidden min-w-0 sm:block">
          <p className="max-w-48 truncate text-sm font-semibold text-text-primary">
            Modo técnico
          </p>

          <p className="max-w-48 truncate text-caption text-text-muted">
            {secondaryText}
          </p>
        </div>
      </div>
    );
  }

  const displayName =
    user.nome ?? user.email;

  const roleLabel =
    getAdminRoleLabel(user.role);

  const isBusy =
    logoutAction !== null;

  async function finishLogout(
    action: Exclude<
      LogoutAction,
      null
    >,
  ) {
    setLogoutAction(action);

    markPendingAdminIntentionalLogout();

    let serverFailure = false;

    try {
      if (action === "current") {
        await terminateCurrentAdminSession();
      } else {
        await terminateAllAdminSessions();
      }
    } catch {
      serverFailure = true;
    } finally {
      await clearPrivateState();

      setOpen(false);
      setConfirmGlobalLogout(false);

      router.replace("/login");
      router.refresh();

      if (serverFailure) {
        if (action === "all") {
          toast.warning(
            "A sessão local foi encerrada, mas não foi possível confirmar o encerramento das demais sessões no servidor.",
          );
        } else {
          toast.warning(
            "A sessão local foi encerrada, mas não foi possível confirmar o logout no servidor.",
          );
        }
      }

      setLogoutAction(null);
    }
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen) {
          setConfirmGlobalLogout(
            false,
          );
        }
      }}
    >
      <DropdownMenuTrigger
        asChild
      >
        <Button
          type="button"
          variant="ghost"
          className="h-auto min-w-0 gap-2 border-l border-border-subtle px-2 py-1.5 sm:pl-3"
          aria-label="Abrir menu da conta administrativa"
          disabled={isBusy}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle">
            {isBusy ? (
              <LoaderCircle
                aria-hidden="true"
                className="size-4 animate-spin text-text-secondary"
              />
            ) : (
              <CircleUserRound
                aria-hidden="true"
                className="size-4 text-text-secondary"
              />
            )}
          </div>

          <div className="hidden min-w-0 text-left sm:block">
            <p className="max-w-48 truncate text-sm font-semibold text-text-primary">
              {displayName}
            </p>

            <p className="max-w-48 truncate text-caption font-normal text-text-muted">
              {user.email}
            </p>
          </div>

          <ChevronDown
            aria-hidden="true"
            className="hidden size-3.5 shrink-0 text-text-muted sm:block"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72"
      >
        <DropdownMenuLabel className="space-y-1">
          <p className="truncate text-sm font-semibold">
            {displayName}
          </p>

          <p className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </p>

          <p className="text-xs font-medium text-muted-foreground">
            {roleLabel}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isBusy}
          onSelect={(event) => {
            event.preventDefault();

            setOpen(false);

            router.push(
              "/sessoes",
            );
          }}
        >
          <MonitorSmartphone
            aria-hidden="true"
          />

          <span>
            Sessões e dispositivos
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isBusy}
          onSelect={(event) => {
            event.preventDefault();

            void finishLogout(
              "current",
            );
          }}
        >
          <LogOut
            aria-hidden="true"
          />

          <span>
            Sair desta sessão
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={isBusy}
          onSelect={(event) => {
            event.preventDefault();

            if (
              !confirmGlobalLogout
            ) {
              setConfirmGlobalLogout(
                true,
              );

              return;
            }

            void finishLogout("all");
          }}
        >
          <ShieldOff
            aria-hidden="true"
          />

          <span>
            {confirmGlobalLogout
              ? "Confirmar encerramento global"
              : "Sair de todas as sessões"}
          </span>
        </DropdownMenuItem>

        {confirmGlobalLogout && (
          <div
            role="note"
            className="mx-1 mt-1 rounded-md bg-destructive/10 px-2.5 py-2 text-xs leading-5 text-muted-foreground"
          >
            Esta ação encerrará o acesso em todos os dispositivos.
            Clique novamente para confirmar.
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

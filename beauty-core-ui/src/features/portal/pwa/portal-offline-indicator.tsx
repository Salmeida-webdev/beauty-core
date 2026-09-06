"use client";

import { usePortalOnlineStatus } from "./portal-online-status";

export function PortalOfflineIndicator() {
  const isOnline = usePortalOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="border-b border-amber-300/60 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-100"
      role="status"
    >
      Você está offline. Dados privados serão consultados novamente quando a
      conexão for restaurada.
    </div>
  );
}

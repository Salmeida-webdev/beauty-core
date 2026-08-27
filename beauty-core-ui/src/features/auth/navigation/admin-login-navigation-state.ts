import type {
  AdminLoginReason,
} from "@/features/auth/navigation/admin-return-to";

let pendingLoginReason:
  AdminLoginReason | null = null;

let pendingIntentionalLogout = false;

export function setPendingAdminLoginReason(
  reason: AdminLoginReason,
): void {
  if (pendingIntentionalLogout) {
    return;
  }

  pendingLoginReason = reason;
}

export function consumePendingAdminLoginReason():
  AdminLoginReason | null {
  const currentReason =
    pendingLoginReason;

  pendingLoginReason = null;

  return currentReason;
}

export function markPendingAdminIntentionalLogout():
  void {
  pendingIntentionalLogout = true;
  pendingLoginReason = null;
}

export function consumePendingAdminIntentionalLogout():
  boolean {
  const currentValue =
    pendingIntentionalLogout;

  pendingIntentionalLogout = false;

  if (currentValue) {
    pendingLoginReason = null;
  }

  return currentValue;
}

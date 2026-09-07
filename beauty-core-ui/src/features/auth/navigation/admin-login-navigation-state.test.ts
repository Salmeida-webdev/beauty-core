import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  consumePendingAdminIntentionalLogout,
  consumePendingAdminLoginReason,
  markPendingAdminIntentionalLogout,
  setPendingAdminLoginReason,
} from "@/features/auth/navigation/admin-login-navigation-state";

beforeEach(() => {
  consumePendingAdminIntentionalLogout();
  consumePendingAdminLoginReason();
});

describe("admin login navigation state", () => {
  it("armazena e consome motivo de sessão expirada", () => {
    setPendingAdminLoginReason(
      "session-expired",
    );

    expect(
      consumePendingAdminLoginReason(),
    ).toBe("session-expired");

    expect(
      consumePendingAdminLoginReason(),
    ).toBeNull();
  });

  it("marca logout intencional uma única vez", () => {
    markPendingAdminIntentionalLogout();

    expect(
      consumePendingAdminIntentionalLogout(),
    ).toBe(true);

    expect(
      consumePendingAdminIntentionalLogout(),
    ).toBe(false);
  });

  it("remove motivo pendente ao iniciar logout intencional", () => {
    setPendingAdminLoginReason(
      "session-expired",
    );

    markPendingAdminIntentionalLogout();

    expect(
      consumePendingAdminLoginReason(),
    ).toBeNull();
  });

  it("ignora motivo de expiração enquanto logout voluntário está pendente", () => {
    markPendingAdminIntentionalLogout();

    setPendingAdminLoginReason(
      "session-expired",
    );

    expect(
      consumePendingAdminLoginReason(),
    ).toBeNull();

    expect(
      consumePendingAdminIntentionalLogout(),
    ).toBe(true);
  });
});

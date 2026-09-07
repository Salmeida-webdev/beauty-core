import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  ADMIN_FORBIDDEN_EVENT,
  dispatchAdminForbiddenEvent,
} from "@/services/auth/access-events";

describe("admin forbidden event", () => {
  it("dispara evento administrativo de acesso negado", () => {
    const listener = vi.fn();

    window.addEventListener(
      ADMIN_FORBIDDEN_EVENT,
      listener,
    );

    dispatchAdminForbiddenEvent();

    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(
      ADMIN_FORBIDDEN_EVENT,
      listener,
    );
  });
});

export const ADMIN_FORBIDDEN_EVENT =
  "beauty-core:admin-forbidden";

export function dispatchAdminForbiddenEvent():
  void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new Event(
      ADMIN_FORBIDDEN_EVENT,
    ),
  );
}

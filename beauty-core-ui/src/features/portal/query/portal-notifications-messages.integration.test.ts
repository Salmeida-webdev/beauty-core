import { describe, expect, it } from "vitest";

import { portalClientQueryKeys } from "./portal-client-query-keys";
import { portalMessagesQueryKeys } from "./portal-messages-query";

describe("Portal notifications and messages cache boundaries", () => {
  it("keeps notifications and messages in separate query families", () => {
    const notificationsKey = portalClientQueryKeys.notifications(1, 20);
    const messagesKey = portalMessagesQueryKeys.list(1, 20);

    expect(notificationsKey[0]).toBe("portal");
    expect(messagesKey[0]).toBe("portal");
    expect(notificationsKey[1]).toBe("private");
    expect(notificationsKey[2]).toBe("notifications");
    expect(messagesKey[1]).toBe("messages");
    expect(notificationsKey).not.toEqual(messagesKey);
  });

  it("keeps pagination deterministic", () => {
    expect(
      portalClientQueryKeys.notifications(1, 20),
    ).not.toEqual(
      portalClientQueryKeys.notifications(2, 20),
    );

    expect(
      portalMessagesQueryKeys.list(1, 20),
    ).not.toEqual(
      portalMessagesQueryKeys.list(2, 20),
    );
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const messageQuery = readFileSync(
  resolve(
    process.cwd(),
    "src/features/portal/query/portal-messages-query.ts",
  ),
  "utf8",
);

const notificationQuery = readFileSync(
  resolve(
    process.cwd(),
    "src/features/portal/query/portal-notifications-query.ts",
  ),
  "utf8",
);

describe("Portal private query network policy", () => {
  it("uses controlled cache for messages and notifications", () => {
    for (const source of [messageQuery, notificationQuery]) {
      expect(source).toContain("staleTime");
      expect(source).toContain("gcTime");
      expect(source).toContain("retry: 1");
      expect(source).toContain("refetchOnWindowFocus: false");
    }
  });

  it("does not configure polling", () => {
    expect(messageQuery).not.toContain("refetchInterval");
    expect(notificationQuery).not.toContain("refetchInterval");
  });

  it("keeps private resource families explicit", () => {
    expect(messageQuery).toContain("portalMessagesQueryKeys");
    expect(notificationQuery).toContain("portalClientQueryKeys");
  });
});

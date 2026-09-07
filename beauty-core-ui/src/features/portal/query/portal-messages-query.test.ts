import { describe, expect, it } from "vitest";

import {
  portalMessagesQueryKeys,
} from "./portal-messages-query";

describe("portal-messages-query", () => {
  it("mantém uma chave privada e determinística por paginação", () => {
    expect(
      portalMessagesQueryKeys.list(1, 20),
    ).toEqual([
      "portal",
      "messages",
      "list",
      1,
      20,
    ]);
  });

  it("separa páginas distintas", () => {
    expect(
      portalMessagesQueryKeys.list(1, 20),
    ).not.toEqual(
      portalMessagesQueryKeys.list(2, 20),
    );
  });
});

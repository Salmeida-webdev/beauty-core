import { describe, expect, it } from "vitest";

import { portalAssets } from "./portal-assets";

function flattenAssets(value: unknown): Array<{ src: string }> {
  if (
    typeof value === "object" &&
    value !== null &&
    "src" in value &&
    typeof value.src === "string"
  ) {
    return [value as { src: string }];
  }

  if (typeof value !== "object" || value === null) {
    return [];
  }

  return Object.values(value).flatMap(flattenAssets);
}

describe("portal asset registry", () => {
  it("contains the 25 approved runtime assets", () => {
    const assets = flattenAssets(portalAssets);

    expect(assets).toHaveLength(25);
    expect(new Set(assets.map((asset) => asset.src)).size).toBe(25);
  });

  it("references only runtime paths from the public Portal directory", () => {
    const assets = flattenAssets(portalAssets);

    for (const asset of assets) {
      expect(asset.src).toMatch(/^\/images\/portal\//);
      expect(asset.src).not.toMatch(/source/i);
      expect(asset.src).toMatch(/\.(webp|png)$/);
    }
  });
});
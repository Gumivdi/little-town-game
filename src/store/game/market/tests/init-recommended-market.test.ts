import { describe, expect, it } from "vitest";
import { DBuildingsRecommended } from "@/data/buildings.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { createTestStore } from "./setup/create-test-store";

describe("initRecommendedMarket()", () => {
  it("should have 13 buildings", () => {
    const store = createTestStore();

    store.getState().initRecommendedMarket();

    expect(store.getState().market.length).toBe(13);
  });

  it("should have 12 recommended buildings", () => {
    const store = createTestStore();

    store.getState().initRecommendedMarket();
    const recommendedMarketQuantity = store
      .getState()
      .market.filter((building) =>
        DBuildingsRecommended.includes(building.name),
      );

    expect(recommendedMarketQuantity.length).toBe(12);
  });

  it("should always include wheat field", () => {
    const store = createTestStore();

    store.getState().initRecommendedMarket();

    expect(store.getState().market[0].name).toBe(EBuildings.WHEAT_FIELD);
  });
});

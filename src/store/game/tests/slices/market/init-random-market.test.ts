import { describe, expect, it } from "vitest";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { createGameTestStore } from "../../setup/create-game-test-store";

describe("initRandomMarket()", () => {
  it("should have 13 buildings", () => {
    const store = createGameTestStore();

    store.getState().initRandomMarket();

    expect(store.getState().market.length).toBe(13);
  });

  it("should always include wheat field", () => {
    const store = createGameTestStore();

    store.getState().initRandomMarket();

    expect(store.getState().market[0].name).toBe(EBuildings.WHEAT_FIELD);
  });
});

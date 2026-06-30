import { describe, expect, it } from "vitest";
import { DBuildings } from "@/data/buildings.data";
import { createGameTestStore } from "@/store/game/tests/setup/create-game-test-store";

describe("Market action: useItem()", () => {
  it("should decrease quantity of item in market", () => {
    const store = createGameTestStore();

    store.setState({
      market: [{ ...DBuildings[0], quantity: 2 }],
    });

    store.getState().useMarketItem(DBuildings[0].name);

    expect(store.getState().market[0].quantity).toBe(1);
  });

  it("should remove item from market when quantity reaches 0", () => {
    const store = createGameTestStore();

    store.setState({
      market: [{ ...DBuildings[0], quantity: 1 }],
    });

    store.getState().useMarketItem(DBuildings[0].name);

    expect(store.getState().market.length).toBe(0);
  });
});

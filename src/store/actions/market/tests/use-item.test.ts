import { describe, expect, it } from "vitest";
import { DBuildings } from "@/data/buildings.data";
import { useGameStore } from "@/store/game";
import { useMarketItem } from "..";

describe("Market action: useItem()", () => {
  it("should decrease quantity of item in market", () => {
    useGameStore.setState({
      market: [{ ...DBuildings[0], quantity: 2 }],
    });

    useMarketItem(DBuildings[0].name);

    expect(useGameStore.getState().market[0].quantity).toBe(1);
  });

  it("should remove item from market when quantity reaches 0", () => {
    useGameStore.setState({
      market: [{ ...DBuildings[0], quantity: 1 }],
    });

    useMarketItem(DBuildings[0].name);

    expect(useGameStore.getState().market.length).toBe(0);
  });
});

import { describe, expect, it } from "vitest";
import { create } from "zustand";
import { DBuildings } from "@/data/buildings.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { IMarketSlice } from "./market.types";
import { createMarketSlice } from "./market.slice";

const createTestStore = () =>
  create<IMarketSlice>((...args) => ({
    ...createMarketSlice(...args),
  }));

describe("MarketSlice", () => {
  describe("removeFromMarket()", () => {
    it("should remove building from market", () => {
      const store = createTestStore();
      store.setState({
        market: [DBuildings[0], DBuildings[1]],
      });
      store.getState().removeFromMarket(DBuildings[1].name);
      const { market } = store.getState();
      expect(market.length).toBe(1);
      expect(market[0].name).toBe(EBuildings.WHEAT_FIELD);
    });

    it("should do nothing if building not in market", () => {
      const store = createTestStore();
      store.setState({
        market: [DBuildings[0]],
      });
      store.getState().removeFromMarket(DBuildings[1].name);
      const { market } = store.getState();
      expect(market.length).toBe(1);
      expect(market[0].name).toBe(EBuildings.WHEAT_FIELD);
    });
  });

  describe("setAvailableMarket()", () => {
    it("should set available buildings", () => {
      const store = createTestStore();
      store.getState().setAvailableMarket([EBuildings.BAKERY, EBuildings.BARN]);
      const { availableMarket } = store.getState();
      expect(availableMarket).toEqual([EBuildings.BAKERY, EBuildings.BARN]);
    });
  });
});

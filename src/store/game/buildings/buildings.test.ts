import { describe, expect, it } from "vitest";
import { create } from "zustand";
import { DBuildings, DBuildingsRecommended } from "@/data/buildings.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { IBuildingsSlice } from "./buildings.types";
import { createBuildingsSlice } from "./buildings.slice";

const createTestStore = () =>
  create<IBuildingsSlice>((...args) => ({
    ...createBuildingsSlice(...args),
  }));

describe("BuildingsSlice", () => {
  describe("initRandom()", () => {
    it("should initialize random buildings", () => {
      const store = createTestStore();
      store.getState().initRandom();
      const { market } = store.getState();
      expect(market.length).toBe(13);
      expect(market[0].name).toBe(EBuildings.WHEAT_FIELD);
    });
  });

  describe("initRecommended()", () => {
    it("should initialize recommended buildings", () => {
      const store = createTestStore();
      store.getState().initRecommended();
      const { market } = store.getState();

      expect(market.length).toBe(13);
      expect(market[0].name).toBe(EBuildings.WHEAT_FIELD);
      for (const building of market) {
        expect(
          building.name === EBuildings.WHEAT_FIELD ||
            DBuildingsRecommended.includes(building.name),
        ).toBeTruthy();
      }
    });
  });

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

  describe("setAvailable()", () => {
    it("should set available buildings", () => {
      const store = createTestStore();
      store.getState().setAvailable([EBuildings.BAKERY, EBuildings.BARN]);
      const { available } = store.getState();
      expect(available).toEqual([EBuildings.BAKERY, EBuildings.BARN]);
    });
  });

  describe("updateBuilding()", () => {
    it("should update building in market", () => {
      const store = createTestStore();
      store.setState({
        market: [DBuildings[0]],
      });
      store.getState().updateBuilding(DBuildings[0].name, { quantity: 3 });
      const { market } = store.getState();
      expect(market[0].quantity).toBe(3);
    });
  });
});

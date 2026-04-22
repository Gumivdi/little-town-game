import { create } from "zustand"
import { describe, expect, it } from "vitest"
import { ISupplySlice } from "./supply.types";
import { createSupplySlice } from "./supply.slice";

const createTestStore = () => 
  create<ISupplySlice>((...args) => ({
    ...createSupplySlice(...args),
  }))


describe("SupplySlice", () => {
  it("should initialize with correct supplies", () => {
    const store = createTestStore();
    const { supplies } = store.getState();
    expect(supplies).toEqual({
      stone: 15,
      wood: 15,
      wheat: 15,
      fish: 15,
      coin: 40,
    });
  });
  
  describe("add()", () => {
    it("should add resources correctly", () => {
      const store = createTestStore();
      const { add } = store.getState();
      add({ stone: 5, wood: 3 });
      expect(store.getState().supplies).toEqual({
        stone: 20,
        wood: 18,
        wheat: 15,
        fish: 15,
        coin: 40,
      });
    });
  });

  describe("remove()", () => {
    it("should remove resources correctly", () => {
      const store = createTestStore();
      const { remove } = store.getState();
      remove({ stone: 2, coin: 10 });
      expect(store.getState().supplies).toEqual({
        stone: 13,
        wood: 15,
        wheat: 15,
        fish: 15,
        coin: 30,
      });
    });
  });
});
import { calculateResources } from "@/shared/helpers/calculateResources";
import { ISupplySlice, TSupplySliceCreator } from "./supply.types";

export const createSupplySlice: TSupplySliceCreator<ISupplySlice> = (set, get) => ({
  supplies: {
    stone: 15,
    wood: 15,
    wheat: 15,
    fish: 15,
    coin: 40,
  },

  add: (resources) => {
    set(state => {
      const newSupplies = calculateResources(state.supplies, resources, (a, b) => a + b);
      return { supplies: newSupplies };
    })
  },

  remove: (resources) => {
    set(state => {
      const newSupplies = calculateResources(state.supplies, resources, (a, b) => a - b);
      return { supplies: newSupplies };
    })
  }
});
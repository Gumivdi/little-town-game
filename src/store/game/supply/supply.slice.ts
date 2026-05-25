import { calculateResources } from "@/shared/helpers/calculateResources";
import { ISupplySlice, TSupplySliceCreator } from "./supply.types";

export const createSupplySlice: TSupplySliceCreator<ISupplySlice> = (set) => ({
  supplies: {
    stone: 15,
    wood: 15,
    wheat: 15,
    fish: 15,
    coin: 40,
  },

  // --- METHODS ---
  addToSupply: (resources) => {
    set((state) => {
      const newSupplies = calculateResources(
        state.supplies,
        resources,
        (a, b) => a + b,
      );
      return { supplies: newSupplies };
    });
  },

  removeFromSupply: (resources) => {
    set((state) => {
      const newSupplies = calculateResources(
        state.supplies,
        resources,
        (a, b) => a - b,
      );
      return { supplies: newSupplies };
    });
  },
});

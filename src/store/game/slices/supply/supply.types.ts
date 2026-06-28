import { StateCreator } from "zustand";
import { TResourcesOnly } from "@/shared/types/resources.type";

export interface ISupplySlice {
  supplies: TResourcesOnly;

  // --- METHODS ---
  addToSupply: (resources: Partial<TResourcesOnly>) => void;
  removeFromSupply: (resources: Partial<TResourcesOnly>) => void;
}

export type TSupplySliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  ISupplySlice
>;

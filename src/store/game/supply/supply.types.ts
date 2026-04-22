import { StateCreator } from "zustand";
import { TResourcesOnly } from "@/shared/types/resources.type";

export interface ISupplySlice {
  supplies: TResourcesOnly;
  add: (resources : Partial<TResourcesOnly>) => void;
  remove: (resources : Partial<TResourcesOnly>) => void;
}

export type TSupplySliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  ISupplySlice
>
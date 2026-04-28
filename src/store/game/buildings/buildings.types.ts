import { EBuildings } from "@/shared/enums/buildings.enum";
import { TBuilding } from "@/shared/types/building.type";
import { StateCreator } from "zustand";

export interface IBuildingsSlice {
  market: TBuilding[];
  available: EBuildings[];
  initRandom: () => void;
  initRecommended: () => void;
  removeFromMarket: (name: EBuildings) => void;
  setAvailable: (names: EBuildings[]) => void;
  updateBuilding: (name: EBuildings, partial: Partial<TBuilding>) => void;
}

export type TBuildingsSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IBuildingsSlice
>;

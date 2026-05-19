import { EBuildings } from "@/shared/enums/buildings.enum";
import { TBuilding } from "@/shared/types/building.type";
import { StateCreator } from "zustand";

export interface IMarketSlice {
  availableMarket: EBuildings[];
  market: TBuilding[];
  selectedMarketItem: EBuildings | null;

  decreaseMarketItemQuantity: (name: EBuildings) => void;
  removeFromMarket: (name: EBuildings) => void;
  setAvailableMarket: (names: EBuildings[]) => void;
  setMarket: (market: TBuilding[]) => void;
  setSelectedMarketItem: (name: EBuildings | null) => void;
}

export type TMarketSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IMarketSlice
>;

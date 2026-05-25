import { StateCreator } from "zustand";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { TBuilding } from "@/shared/types/building.type";

export interface IMarketSlice {
  availableMarket: EBuildings[];
  market: TBuilding[];
  selectedMarketItem: EBuildings | null;

  // --- SETTERS ---
  setAvailableMarket: (names: EBuildings[]) => void;
  setMarket: (market: TBuilding[]) => void;
  setSelectedMarketItem: (name: EBuildings | null) => void;

  // --- METHODS ---
  decreaseMarketItemQuantity: (name: EBuildings) => void;

  initRandomMarket: () => void;
  initRecommendedMarket: () => void;

  removeFromMarket: (name: EBuildings) => void;
}

export type TMarketSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IMarketSlice
>;

import { create } from "zustand";
import { createFlowSlice, IFlowSlice } from "./slices/flow";
import { createMapSlice, IMapSlice } from "./slices/map";
import { createMarketSlice, IMarketSlice } from "./slices/market";
import { createPlayersSlice, IPlayersSlice } from "./slices/players";
import { createSupplySlice, ISupplySlice } from "./slices/supply";
import { createToastSlice, IToastSlice } from "./slices/toast";

export type TGameStore = IFlowSlice &
  IMapSlice &
  IMarketSlice &
  IPlayersSlice &
  ISupplySlice &
  IToastSlice;

export const useGameStore = create<TGameStore>()((...a) => ({
  ...createFlowSlice(...a),
  ...createMapSlice(...a),
  ...createMarketSlice(...a),
  ...createPlayersSlice(...a),
  ...createSupplySlice(...a),
  ...createToastSlice(...a),
}));

import { create } from "zustand";
import { createMapSlice, IMapSlice } from "./map";
import { createPlayersSlice, IPlayersSlice } from "./players";
import { createSupplySlice, ISupplySlice } from "./supply";
import { createMarketSlice, IMarketSlice } from "./market";
import { createToastSlice, IToastSlice } from "./toast";
import { createFlowSlice, IFlowSlice } from "./flow";

export type TGameStore = IMapSlice &
  IPlayersSlice &
  ISupplySlice &
  IMarketSlice &
  IToastSlice &
  IFlowSlice;

export const useGameStore = create<TGameStore>()((...a) => ({
  ...createMapSlice(...a),
  ...createPlayersSlice(...a),
  ...createSupplySlice(...a),
  ...createMarketSlice(...a),
  ...createToastSlice(...a),
  ...createFlowSlice(...a),
}));

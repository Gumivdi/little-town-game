import { create } from "zustand";
import { createFlowSlice, IFlowSlice } from "./flow";
import { createMapSlice, IMapSlice } from "./map";
import { createMarketSlice, IMarketSlice } from "./market";
import { createPlayersSlice, IPlayersSlice } from "./players";
import { createSupplySlice, ISupplySlice } from "./supply";
import { createToastSlice, IToastSlice } from "./toast";

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

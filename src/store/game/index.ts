import { create } from "zustand";
import { createMapSlice, IMapSlice } from "./map";
import { createPlayersSlice, IPlayersSlice } from "./players";
import { createSupplySlice, ISupplySlice } from "./supply";
import { createBuildingsSlice, IBuildingsSlice } from "./buildings";
import { createToastSlice, IToastSlice } from "./toast";
import { createFlowSlice, IFlowSlice } from "./flow";

export type TGameStore = IMapSlice &
  IPlayersSlice &
  ISupplySlice &
  IBuildingsSlice &
  IToastSlice &
  IFlowSlice;

const useGameStore = create<TGameStore>()((...a) => ({
  ...createMapSlice(...a),
  ...createPlayersSlice(...a),
  ...createSupplySlice(...a),
  ...createBuildingsSlice(...a),
  ...createToastSlice(...a),
  ...createFlowSlice(...a),
}));

import { create } from "zustand";
import { TGameStore } from "../..";
import { createFlowSlice } from "../../slices/flow";
import { createMapSlice } from "../../slices/map";
import { createMarketSlice } from "../../slices/market";
import { createPlayersSlice } from "../../slices/players";
import { createSupplySlice } from "../../slices/supply";
import { createToastSlice } from "../../slices/toast";

export const createGameTestStore = () =>
  create<TGameStore>()((...a) => ({
    ...createFlowSlice(...a),
    ...createMapSlice(...a),
    ...createMarketSlice(...a),
    ...createPlayersSlice(...a),
    ...createSupplySlice(...a),
    ...createToastSlice(...a),
  }));

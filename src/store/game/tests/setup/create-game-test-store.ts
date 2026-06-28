import { create } from "zustand";
import { TGameStore } from "../..";
import { createFlowSlice } from "../../flow";
import { createMapSlice } from "../../map";
import { createMarketSlice } from "../../market";
import { createPlayersSlice } from "../../players";
import { createSupplySlice } from "../../supply";
import { createToastSlice } from "../../toast";

export const createGameTestStore = () =>
  create<TGameStore>()((...a) => ({
    ...createFlowSlice(...a),
    ...createMapSlice(...a),
    ...createMarketSlice(...a),
    ...createPlayersSlice(...a),
    ...createSupplySlice(...a),
    ...createToastSlice(...a),
  }));

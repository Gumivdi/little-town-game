import { EStatus } from "@/shared/enums/status.enum";
import { IFlowSlice, TFlowSliceCreator } from "./flow.types";

export const createFlowSlice: TFlowSliceCreator<IFlowSlice> = (set) => ({
  gameStatus: EStatus.SELECT_ACTION,
  round: 1,

  // --- SETTERS ---
  setGameStatus: (gameStatus) => set({ gameStatus }),

  // --- METHODS ---
  nextRound: () => {
    set((state) => ({ round: state.round + 1 }));
  },
});

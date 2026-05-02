import { EStatus } from "@/shared/enums/status.enum";
import { IFlowSlice, TFlowSliceCreator } from "./flow.types";

export const createFlowSlice: TFlowSliceCreator<IFlowSlice> = (set, get) => ({
  status: EStatus.SELECT_ACTION,
  round: 1,

  setStatus: (status) => {
    set({ status });
  },

  nextRound: () => {
    set((state) => ({ round: state.round + 1 }));
  },
});

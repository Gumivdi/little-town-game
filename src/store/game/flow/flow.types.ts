import { StateCreator } from "zustand";
import { EStatus } from "@/shared/enums/status.enum";

export interface IFlowSlice {
  status: EStatus;
  round: number;
  setStatus: (status: EStatus) => void;
  nextRound: () => void;
}

export type TFlowSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IFlowSlice
>;

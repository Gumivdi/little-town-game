import { StateCreator } from "zustand";
import { EStatus } from "@/shared/enums/status.enum";

export interface IFlowSlice {
  gameStatus: EStatus;
  round: number;

  // --- SETTERS ---
  setGameStatus: (gameStatus: EStatus) => void;

  // --- METHODS ---
  nextRound: () => void;
}

export type TFlowSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IFlowSlice
>;

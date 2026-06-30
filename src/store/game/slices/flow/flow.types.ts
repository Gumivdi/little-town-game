import { StateCreator } from "zustand";
import { EGameStatus } from "@/shared/enums/game-status.enum";

export interface IFlowSlice {
  gameStatus: EGameStatus;
  round: number;

  // --- SETTERS ---
  setGameStatus: (gameStatus: EGameStatus) => void;

  // --- METHODS ---
  nextRound: () => void;
}

export type TFlowSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IFlowSlice
>;

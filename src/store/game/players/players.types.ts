import { StateCreator } from "zustand";
import { TPlayer } from "@/shared/types/player.type";

export interface IPlayersSlice {
  players: TPlayer[];
  currentPlayer: number;

  setNextPlayer: () => void;
  updatePlayer: (id: number, data: TDeepParial<TPlayer>) => void;
}

export type TPlayersSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IPlayersSlice
>

export type TDeepParial<T> = {
  [K in keyof T]?: T[K] extends object
    ? TDeepParial<T[K]>
    : T[K]
}
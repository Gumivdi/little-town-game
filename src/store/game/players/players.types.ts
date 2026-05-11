import { StateCreator } from "zustand";
import { TPlayer } from "@/shared/types/player.type";
import { TResourcesAll } from "@/shared/types/resources.type";

export interface IPlayersSlice {
  players: TPlayer[];
  currentPlayerIndex: number;
  _decreasePlayerComponents: (component: "workers" | "buildings") => void;
  decrementPlayerBuildings: () => void;
  decrementPlayerWorkers: () => void;
  setNextPlayer: () => void;
  updatePlayerResources: (id: number, data: Partial<TResourcesAll>) => void;
}

export type TPlayersSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IPlayersSlice
>;

export type TDeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? TDeepPartial<T[K]> : T[K];
};

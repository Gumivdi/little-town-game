import { StateCreator } from "zustand";
import { TPlayer } from "@/shared/types/player.type";
import { TResourcesAll } from "@/shared/types/resources.type";

export interface IPlayersSlice {
  players: TPlayer[];
  currentPlayerIndex: number;

  // --- GETTERS ---
  getCurrentPlayer: () => TPlayer;
  getPlayer: (id: number) => TPlayer;

  // --- SETTERS ---
  setNextPlayer: () => void;
  setPlayers: (players: TPlayer[]) => void;
  setPlayerResources: (id: number, resources: Partial<TResourcesAll>) => void;

  // --- METHODS ---
  decrementPlayerWorkers: () => void;
  decrementPlayerBuildings: () => void;

  // --- PRIVATE METHODS ---
  _decreasePlayerComponents: (component: "workers" | "buildings") => void;
}

export type TPlayersSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IPlayersSlice
>;

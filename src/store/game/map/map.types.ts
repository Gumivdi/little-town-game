import { StateCreator } from "zustand";
import { TMap } from "@/shared/types/map.type";
import { TGameStore } from "../types";

export interface IMapSlice {
  map: TMap;

  activateFreeGrass: () => void;
  activateNeighboursForCollect: (fieldID: string) => void;
  cleanupWorkers: () => void;
  disableField: (fieldID: string) => void;
  disableFields: () => void;
  init: (map: TMap) => void;
}

export type TMapSliceCreator = StateCreator<
  TGameStore,
  [],
  [],
  IMapSlice
>
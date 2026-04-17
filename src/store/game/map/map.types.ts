import { StateCreator } from "zustand";
import { TMap } from "@/shared/types/map.type";

export interface IMapSlice {
  map: TMap;

  activateFreeGrass: () => void;
  activateNeighboursForCollect: (fieldID: string) => void;
  cleanupWorkers: () => void;
  disableField: (fieldID: string) => void;
  disableFields: () => void;
  init: (map: TMap) => void;
}

export type TMapSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IMapSlice
>
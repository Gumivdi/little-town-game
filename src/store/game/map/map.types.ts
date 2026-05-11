import { StateCreator } from "zustand";
import { TMap } from "@/shared/types/map.type";
import { TBuilding } from "@/shared/types/building.type";

export interface IMapSlice {
  map: TMap;
  disableField: (fieldID: string) => void;
  enableField: (fieldID: string) => void;
  setFieldBuilding: (fieldID: string, building: TBuilding) => void;
  setFieldOwner: (fieldID: string, owner: number) => void;
  unsetFieldOwner: (fieldID: string) => void;

  // ACTIONS ---------
  // activateFreeGrass: () => void;
  // activateNeighboursForCollect: (fieldID: string) => void;
  // cleanupWorkers: () => void;
  // disableFields: () => void;
  // initMap: (map: TMap) => void;
}

export type TMapSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IMapSlice
>;

// export type TDeepPartial<T> = {
//   [K in keyof T]?: T[K] extends object ? TDeepPartial<T[K]> : T[K];
// };

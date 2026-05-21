import { StateCreator } from "zustand";
import { TFieldID, TMap } from "@/shared/types/map.type";
import { TBuilding } from "@/shared/types/building.type";

export interface IMapSlice {
  map: TMap;
  memorizedFieldId: TFieldID | null;

  clearOwnersOnEmptyGrass: () => void;

  disableField: (fieldId: TFieldID) => void;
  disableFields: () => void;

  enableCollectableFields: (fieldId: TFieldID) => void;
  enableEmptyGrassFields: () => void;
  enableField: (fieldId: TFieldID) => void;

  setFieldBuilding: (fieldId: TFieldID, building: TBuilding) => void;
  setFieldOwner: (fieldId: TFieldID, owner: number) => void;
  setMap: (map: TMap) => void;
  setMemorizedFieldId: (fieldId: TFieldID) => void;

  unsetFieldOwner: (fieldId: TFieldID) => void;
}

export type TMapSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IMapSlice
>;

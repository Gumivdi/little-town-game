import { ETerrains } from "@/shared/enums/terrains.enum";
import { TBuilding } from "./building.type";

export type TFieldID = `${number}-${number}-${number}-${number}`;

export type TLandscapeArea = {
  id?: TFieldID;
  disabled?: boolean;
  type: Exclude<ETerrains, ETerrains.GRASS>;
};

export type TBuildArea = {
  id?: TFieldID;
  disabled?: boolean;
  type: ETerrains.GRASS;
  building: TBuilding | null;
  owner: number | null;
};

export type TField = TLandscapeArea | TBuildArea;
export type TMap = TField[][];
export type TFieldCoordinates = {
  row: number;
  col: number;
  rows: number;
  cols: number;
};

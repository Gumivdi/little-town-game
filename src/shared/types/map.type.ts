import { ETerrains } from "@/shared/enums/terrains.enum";
import { TBuilding } from "./building.type";

export type TLandscapeArea = {
  type: Exclude<ETerrains, ETerrains.GRASS>;
};

export type TBuildArea = {
  type: Required<ETerrains.GRASS>;
  building: TBuilding | null;
  owner: number | null;
};

export type TField = TLandscapeArea | TBuildArea;
export type TMap = TField[][];

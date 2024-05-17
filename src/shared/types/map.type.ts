import { ETerrains } from "@/shared/enums/terrains.enum";
import { TBuilding } from "./building.type";

export type TLandscapeArea = {
  id?: string;
  disabled?: boolean;
  type: Exclude<ETerrains, ETerrains.GRASS>;
};

export type TBuildArea = {
  id?: string;
  disabled?: boolean;
  type: Required<ETerrains.GRASS>;
  building: TBuilding | null;
  owner: number | null;
};

export type TField = TLandscapeArea | TBuildArea;
export type TMap = TField[][];

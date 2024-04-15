import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField, TLandscapeArea } from "@/shared/types/map.type";

export const FORREST: TLandscapeArea = {
  type: ETerrains.FORREST,
};

export const ROCKS: TLandscapeArea = {
  type: ETerrains.ROCKS,
};

export const POND: TLandscapeArea = {
  type: ETerrains.POND,
};

export const GRASS: TField = {
  type: ETerrains.GRASS,
  building: null,
  owner: null,
};

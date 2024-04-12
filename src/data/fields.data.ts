import { ETerrains } from "shared/enums/terrains.enum";
import { TField } from "shared/types/map.type";

export const FORREST: TField = {
  type: ETerrains.FORREST,
};

export const ROCKS: TField = {
  type: ETerrains.ROCKS,
};

export const POND: TField = {
  type: ETerrains.POND,
};

export const GRASS: TField = {
  type: ETerrains.GRASS,
  building: null,
  owner: null,
};

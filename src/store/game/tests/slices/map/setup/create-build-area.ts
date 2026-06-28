import { ETerrains } from "@/shared/enums/terrains.enum";
import { TBuildArea } from "@/shared/types/map.type";

export const createBuildArea = (
  partial: Partial<TBuildArea> = {},
): TBuildArea => ({
  type: ETerrains.GRASS,
  building: null,
  owner: null,
  ...partial,
});

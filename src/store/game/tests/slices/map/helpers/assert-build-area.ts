import { ETerrains } from "@/shared/enums/terrains.enum";
import { TBuildArea, TField } from "@/shared/types/map.type";

export const assertBuildArea = (field: TField): TBuildArea => {
  if (field.type !== ETerrains.GRASS) {
    throw new Error(`Expected BuildArea, got ${field.type}`);
  }
  return field;
};

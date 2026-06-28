import { ETerrains } from "@/shared/enums/terrains.enum";
import { TBuildArea, TField } from "@/shared/types/map.type";

export const isBuildArea = (field: TField): field is TBuildArea =>
  field.type === ETerrains.GRASS;

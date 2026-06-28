import { ETerrains } from "@/shared/enums/terrains.enum";
import { TBuildArea, TField } from "@/shared/types/map.type";

export const isBuildArea = (f: TField): f is TBuildArea =>
  f.type === ETerrains.GRASS;

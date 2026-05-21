import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField } from "@/shared/types/map.type";

export const isBuildingNameInArray = (field: TField, array: unknown[]) =>
  field.type === ETerrains.GRASS &&
  !!field.building &&
  array.includes(field.building.name);

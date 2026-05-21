import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField } from "@/shared/types/map.type";

export const isWorkerOnField = (field: TField) =>
  field.type === ETerrains.GRASS && field.owner && !field.building;

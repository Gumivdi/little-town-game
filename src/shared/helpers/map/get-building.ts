import { DBuildings } from "@/data/buildings.data";
import { EBuildings } from "@/shared/enums/buildings.enum";

export const getBuilding = (name: EBuildings) =>
  DBuildings.find((building) => building.name === name);

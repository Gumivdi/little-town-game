import { DBuildings } from "@/data/buildings.data";
import { EBuildings } from "@/shared/enums/buildings.enum";

export const getBuilding = (name: EBuildings) => {
  const building = DBuildings.find((building) => building.name === name);
  if (!building) throw new Error(`Building with name ${name} not found`);
  return building;
};

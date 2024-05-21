import { EResources } from "@/shared/enums/resources.enum";
import { TResourcesAll } from "@/shared/types/resources.type";

export const hasEnoughResources = (
  playerResources: TResourcesAll,
  buildingCost: Partial<TResourcesAll>
) => {
  for (const resource in buildingCost) {
    const resourceKey = resource as EResources;
    if (playerResources[resourceKey] < buildingCost[resourceKey]!) {
      return false;
    }
  }
  return true;
};
